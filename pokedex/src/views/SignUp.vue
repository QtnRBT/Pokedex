<template lang="">
    <div class="relative h-screen md:w-screen md:flex md:flex-row-reverse">
        <div class="bg-login h-3/6 relative md:w-1/2 md:h-full md:flex md:flex-col md:items-center md:justify-center md:space-y-10">
            <img src="../assets/ui/pikachu_carre.png" class="absolute md:static md:h-96 h-60 mx-auto left-0 right-0" alt="Cute Pikachu" />
            <div class="px-6 relative top-60 md:static">
                <h2 class="text-5xl font-semibold text-white md:text-6xl md:text-center">Pokédex</h2>
                <p class="text-white w-48 pt-6 md:text-xl md:font-light md:w-max">Sign up to access all the features.</p>
            </div>
        </div>
        <div class="px-6 h-3/6 bg-white md:h-full md:flex md:w-1/2 md:justify-center md:items-center">
            <div class="flex flex-col justify-center h-full space-y-6 md:rounded-lg md:shadow-form md:h-auto md:py-12 md:px-6 md:w-96">
                <h3 class="text-xl font-semibold">Sign up</h3>
                <form class="w-full flex flex-col" @submit.prevent="register">
                    <input type="text" ref="username" placeholder="Username" class="p-2 rounded-lg border font-semibold placeholder-gray-300 border-gray-300 mb-6" required />
                    <input type="email" ref="email" placeholder="Email" class="p-2 rounded-lg border font-semibold placeholder-gray-300 border-gray-300 mb-6" required />
                    <input type="password" ref="password" placeholder="Password" class="p-2 rounded-lg border font-semibold placeholder-gray-300 border-gray-300 mb-6" required />
                    <p class="text-red-400 pb-3">{{ error }}</p>
                    <input type="Submit" ref="submit" value="SUBMIT" class="p-2 bg-login text-white font-semibold rounded-lg cursor-pointer" />
                    <p class="mt-1 text-center pt-2">Already have an account ? <router-link to="/login" class="color-login font-semibold">Log In</router-link></p>
                </form>
                <router-link to="/" class="color-login font-semibold text-center">Cancel</router-link>
            </div>
        </div>
    </div>
</template>
<script>
//import axios from 'axios'
import Cookies from 'js-cookie';
import axios from 'axios';
import { apiURL } from '../config.json';
export default {
    name: "Register",
    mounted() {
        Cookies.remove("token");
    },
    data() {
        return {
            error: ""
        }
    },
    methods: {
        errorOnInput(input) {
            input.classList.toggle("border-red-400");
            return;
        },
        validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        },
        validatePassword(password) {
            return password.length >= 8;
        },
        register()  {
            this.error = "";
            this.error = "";
            Cookies.remove("token");
            localStorage.removeItem("profileUrl");
            Cookies.remove("username");
            Cookies.remove("email");
            Cookies.remove("user_id");
            let username = this.$refs.username.value;

            let email = this.$refs.email.value;

            if(this.validateEmail(email)) {
                let password = this.$refs.password.value;

                if(this.validatePassword(password)) {

                    axios.post(`${apiURL}/auth/local/register`, {
                        email: email,
                        username: username,
                        password: password
                    })
                    .then(response => {
                        let user = response.data.user;
                        let team = {}
                        team.user = user;
                        team.pokemons = [];
                        team.user_id = response.data.user.id;
                        axios.post(`${apiURL}/auth/local`, {
                            "identifier": email,
                            "password": password
                        }).then(response => {
                            let token = response.data.jwt;
                            axios.post(`${apiURL}/teams`,team, {
                                headers: {
                                    "Authorization": `Bearer ${token}`
                                }
                            })
                            .then(response => {
                                if(response.status == 200) {
                                    Cookies.set("token", response.data.jwt);
                                    Cookies.set("token", response.data.jwt);
                                    localStorage.setItem("profileUrl", response.data.user.profile_picture_url);
                                    Cookies.set("username", response.data.user.username);
                                    Cookies.set("email", response.data.user.email);
                                    Cookies.set("user_id", response.data.user.id);
                                    this.$router.push("/");
                                }
                            })
                        })
                    })
                    .catch(error => {
                        this.error = error.data.message;
                        return;
                    })

                } else {
                    this.error = "Password length must be at least 8 caracters long.s"
                }

            } else {
                this.error = "Invalid email format !";
                this.errorOnInput(this.$refs.email);
            }
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