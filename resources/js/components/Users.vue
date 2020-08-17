<template>
    <div class="card">
        <div class="card-header">Users</div>
        <div class="card-body">
            <p v-if="users.length === 0">No users</p>
            <ul class="list-group list-group-flush">
                <router-link
                    v-for="(user, i) in users"
                    :key="i"
                    :to="{
                        name: 'chat',
                        params: { id: authUser.id + '-' + user.id }
                    }"
                    class="list-group-item list-group-item-action"
                    >{{ user.name }}</router-link
                >
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },

    computed: {
        users() {
            return this.$store.state.users;
        },
        authUser() {
            return this.$store.state.user;
        }
    }
};
</script>

<style></style>
