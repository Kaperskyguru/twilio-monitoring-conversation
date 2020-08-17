<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <Users />
            </div>
            <div class="col-md-9">
                <div class="card">
                    <div class="card-body text-center">
                        <p class="font-weight-bold">
                            You don’t have a chat selected
                        </p>
                        <p>
                            Choose a user to continue an existing chat or start
                            a new one.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Users from "../components/Users";
import Chat from "../components/ChatComponent";
export default {
    components: {
        Chat,
        Users
    }
};
</script>

<style></style>
