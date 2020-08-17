<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <Users />
            </div>
            <div class="col-md-9">
                <Chat :authUser="1" :otherUser="2" />
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
    }
};
</script>

<style></style>
