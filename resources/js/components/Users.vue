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
                        params: { id: user.id + '-' + user.other }
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
        return {
            users: [
                {
                    name: "Solomon",
                    id: "1",
                    other: "2"
                },
                {
                    name: "Paul",
                    id: "2",
                    other: "1"
                }
            ]
        };
    }
};
</script>

<style></style>
