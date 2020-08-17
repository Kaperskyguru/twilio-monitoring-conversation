<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <Users />
            </div>
            <div class="col-md-9">
                <Chat :authUser="authUser" :otherUser="otherUser" />
            </div>
        </div>
    </div>
</template>

<script>
import Users from "../components/Users";
import Chat from "../components/Chat";
export default {
    components: {
        Chat,
        Users
    },
    data() {
        return {
            authUser: {
                id: 1,
                email: "solomoneseme@gmail.com",
                name: "Solomon Eseme"
            },
            otherUser: {
                id: 2,
                email: "kaperskyguru@gmail.com",
                name: "Kapersky Guru"
            }
        };
    }
};
</script>

<style></style>
