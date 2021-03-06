<template>
    <div class="card">
        <div class="card-header">{{ otherUser.name }}</div>
        <div class="card-body">
            <div v-for="message in messages" v-bind:key="message.state.index">
                <div
                    :class="{
                        'text-right': message.state.author === authUser.email
                    }"
                >
                    {{ message.state.body }}
                </div>
            </div>
        </div>
        <div class="card-footer">
            <input
                type="text"
                v-model="newMessage"
                class="form-control"
                placeholder="Type your message..."
                @keyup.enter.prevent="sendMessage()"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "Chat",
    props: {
        authUser: {
            type: Object,
            required: true
        },
        otherUser: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            messages: [],
            newMessage: "",
            channel: ""
        };
    },
    async created() {
        const token = await this.fetchToken();
        await this.initializeClient(token);
        await this.fetchMessages();
        await this.removeMessages();
    },
    methods: {
        async fetchToken() {
            const { data } = await axios.post("/api/token", {
                email: this.authUser.email
            });

            return data.token;
        },
        async initializeClient(token) {
            const client = await Twilio.Chat.Client.create(token);

            client.on("tokenAboutToExpire", async () => {
                const token = await this.fetchToken();
                client.updateToken(token);
            });

            this.channel = await client.getChannelByUniqueName(
                `${this.authUser.id}-${this.otherUser.id}`
            );

            this.channel.on("messageAdded", message => {
                this.messages.push(message);
            });
        },

        async fetchMessages() {
            this.messages = (await this.channel.getMessages()).items;
        },

        async removeMessages() {
            this.messages = await this.messages.remove();
        },

        sendMessage() {
            this.channel.sendMessage(this.newMessage);
            this.newMessage = "";
        }
    }
};
</script>
