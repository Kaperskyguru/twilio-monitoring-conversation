import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
const baseURL = "http://localhost:8000/api/v1";

Vue.use(Vuex);

Axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const store = new Vuex.Store({
    state: {
        user: [],
        users: [],
        loggedIn: false
    },

    actions: {
        async login({ commit }, payload) {
            payload.api_token = localStorage.getItem("api_token");
            commit(
                "STORE_LOGGED_IN_USER",
                await Axios.post(`${baseURL}/login`, payload)
            );
        },
        async getUsers({ commit }) {
            const api_token = localStorage.getItem("api_token");
            const { data } = await Axios.get(
                `${baseURL}/users?api_token=${api_token}`
            );
            commit("STORE_USERS", data.users);
        },
        // async logout({ commit }) {
        //     try {
        //         await AuthRepository.logout();
        //         commit("STORE_LOGGED_OUT_USER", true);
        //         return true;
        //     } catch (error) {
        //         console.log(error);
        //     }
        //     return false;
        // },
        async register({ commit }, payload) {
            return await Axios.post(`${baseURL}/register`, payload);
        }
    },

    mutations: {
        STORE_LOGGED_IN_USER: (state, response) => {
            const { data } = response;
            if (data) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", data.user);
                localStorage.setItem("api_token", data.user.api_token);
                state.user = data.user;
                state.token = data.token;
                state.loggedIn = true;
            }
        },

        STORE_USERS: (state, users) => {
            if (users) {
                state.users = users;
            }
        }

        // STORE_LOGGED_OUT_USER: (state, response) => {
        //     if (response) {
        //         localStorage.removeItem("token");
        //         localStorage.removeItem("user");
        //         state.user = {};
        //         state.token = null;
        //         state.insights = null;
        //         state.loggedIn = false;
        //     }
        // }
    },

    getters: {
        isAdmin: state => {
            return state.user.is_admin;
        },
        isUser: state => {
            return !state.user.is_admin;
        }
    }

    // strict: true
});

export default store;
