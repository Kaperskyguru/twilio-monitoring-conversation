import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
Vue.use(VueRouter);

import User from "./views/User";
import Chat from "./views/Chat";
import Login from "./views/Login";
import Register from "./views/Register";
import Admin from "./views/Admin";

const router = new VueRouter({
    // mode: "history",
    linkActiveClass: "active",
    routes: [
        {
            path: "/",
            name: "home",
            component: Login
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/register",
            name: "register",
            component: Register
        },
        {
            path: "/chat/:id",
            name: "chat",
            component: Chat
        },
        {
            path: "/user",
            name: "user",
            component: User
            // meta: { requiresAuth: true },
            // beforeEnter(to, from, next) {
            //     if (
            //         store.getters["isUser"] &&
            //         parseInt(store.state.user.id) === parseInt(to.params.id)
            //     ) {
            //         next();
            //     } else {
            //         next({
            //             name: "login"
            //         });
            //     }
            // }
        },
        {
            path: "/admin",
            name: "admin",
            component: Admin,
            meta: { requiresAuth: true },
            // children: [
            //     {
            //         path: "add",
            //         component: Add
            //     },
            //     {
            //         path: "/",
            //         component: AdminHome
            //     }
            // ],
            beforeEnter(to, from, next) {
                if (store.getters["isAdmin"]) {
                    next();
                } else {
                    next({
                        name: "login"
                    });
                }
            }
        }
    ]
});

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (!store.state.loggedIn) {
//             next({
//                 path: "/login",
//                 query: { redirect: to.fullPath }
//             });
//         } else {
//             next();
//         }
//     } else {
//         next();
//     }
// });

export default router;
