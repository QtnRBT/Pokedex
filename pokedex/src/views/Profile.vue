<template lang="">
    <div class="relative h-screen md:w-screen md:flex md:flex-row-reverse">
        <div class="bg-login h-3/6 relative md:w-1/2 md:h-full md:flex md:flex-col md:items-center md:justify-center md:space-y-10">
            <img :src="profileUrl" class="absolute rounded-full w-40 mx-auto left-0 right-0 top-10 h-40 md:static md:w-72 md:h-72 object-cover" alt="User icon"/>
            <div class="px-6 relative top-60 md:top-0 md:text-center md:flex md:flex-col md:items-center">
                <h2 class="text-3xl font-semibold text-white md:text-6xl">{{username}}</h2>
                <p class="text-white w-48 pt-6 md:text-xl md:font-light md:w-max md:text-center">{{email}}</p>
            </div>
        </div>
        <div class="px-6 h-3/6 bg-white md:h-full md:flex md:w-1/2 md:justify-center md:items-center">
            <div class="flex flex-col justify-start h-full space-y-1 mt-6 md:rounded-lg md:shadow-form md:h-auto md:py-16 md:px-6 md:w-96 md:mt-0 md:flex md:justify-center md:space-y-6">
                <h3 class="text-xl font-semibold">My profile picture URL</h3>
                <form class="w-full flex flex-col" @submit.prevent="updatePhoto">
                    <input type="text" ref="url" :value="profileUrl" class="p-2 rounded-lg border font-semibold placeholder-gray-300 border-gray-300 mb-6" required />
                    <input type="Submit" ref="submit" value="CHANGE PICTURE" class="p-2 bg-login text-white font-semibold rounded-lg cursor-pointer" />
                </form>
                <div class="flex flex-row justify-between">
                    <router-link to="/logout" class="color-login font-semibold text-center">Log Out</router-link>
                    <router-link to="/" class="color-login font-semibold text-center">Cancel</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//import axios from 'axios'
import Cookies from 'js-cookie';
import axios from 'axios';
import { apiURL } from '../config.json'
export default {
    name: "Login",
    data() {
        return {
            error: "",
            username: "",
            profileUrl: "",
            email: "",
            user_id: null
        }
    },
    mounted() {
        this.username = Cookies.get("username");
        this.email = Cookies.get("email");
        this.profileUrl = localStorage.getItem("profileUrl");
        this.user_id = Cookies.get("user_id");
    },
    methods: {
        updatePhoto() {
            axios.put(`${apiURL}/users/${this.user_id}`, {
                profile_picture_url: this.$refs.url.value
            }, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            })
            .then(response => {
                if(response.status == 200) {
                    this.profileUrl = this.$refs.url.value;
                    localStorage.setItem("profileUrl", this.$refs.url.value);
                }
            })
        }
    },
}
</script>
<style>
    .bg-login {
        background: #E02D1D; 
    }

    .color-login {
        color: #E02D1D; 
    }
</style>