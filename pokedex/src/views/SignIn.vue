<template lang="">
    <div class="relative h-screen md:w-screen md:flex md:flex-row-reverse">
        <div class="bg-login h-3/6 relative md:w-1/2 md:h-full md:flex md:flex-col md:items-center md:justify-center md:space-y-10">
            <img src="../assets/ui/pikachu_carre.png" class="absolute md:static md:h-96 h-60 mx-auto left-0 right-0" alt="Cute Pikachu" />
            <div class="px-6 relative top-60 md:static">
                <h2 class="text-5xl font-semibold text-white md:text-6xl md:text-center">Pokédex</h2>
                <p class="text-white w-48 pt-6 md:text-xl md:font-light md:w-max">Sign in to access all the features.</p>
            </div>
        </div>
        <div class="px-6 h-3/6 bg-white md:h-full md:flex md:w-1/2 md:justify-center md:items-center">
            <div class="flex flex-col justify-center h-full space-y-6 md:rounded-lg md:shadow-form md:h-auto md:py-12 md:px-6 md:w-96">
                <h3 class="text-xl font-semibold">Log in</h3>
                <form class="w-full flex flex-col" @submit.prevent="register">
                    <input type="text" ref="username" placeholder="Username" class="p-2 rounded-lg border font-semibold placeholder-gray-300 border-gray-300 mb-6" required />
                    <input type="password" ref="password" placeholder="Password" class="p-2 rounded-lg border font-semibold placeholder-gray-300 border-gray-300 mb-6" required />
                    <p class="text-red-400 pb-3">{{ error }}</p>
                    <input type="Submit" ref="submit" value="SUBMIT" class="p-2 bg-login text-white font-semibold rounded-lg cursor-pointer" />
                    <p class="mt-1 text-center pt-2">Don't have an account ? <router-link to="/register" class="color-login font-semibold">Sign Up</router-link></p>
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
    name: "Login",
    data() {
        return {
            error: ""
        }
    },
    methods: {
        register()  {
            this.error = "";
            Cookies.remove("token");
            localStorage.removeItem("profileUrl");
            Cookies.remove("username");
            Cookies.remove("email");
            Cookies.remove("user_id");
            let username = this.$refs.username.value;
            let password = this.$refs.password.value;
            axios.post(`${apiURL}/auth/local`, {
                "identifier": username,
                "password": password
            })
            .then(response => {
                Cookies.set("token", response.data.jwt);
                localStorage.setItem("profileUrl", response.data.user.profile_picture_url);
                Cookies.set("username", response.data.user.username);
                Cookies.set("email", response.data.user.email);
                Cookies.set("user_id", response.data.user.id);
                let random = Math.floor(Math.random() * 151);
                axios.get(`${apiURL}/users/me/team`, {
                    headers:{
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                })
                .then(response => {
                    let teamId = response.data.id;
                    let pokemons = response.data.pokemons;
                    if(response.data.pokemons.length < 6) {
                        axios.get(`${apiURL}/pokemons/${random}`)
                        .then(response => {
                            let pokemon = response.data;
                            delete pokemon.evolutions;
                            delete pokemon.stats;
                            delete pokemon.types;
                            delete pokemon.weaknesses;
                            pokemons.push(pokemon);
                            axios.put(`${apiURL}/teams/${teamId}`, {
                                "pokemons": pokemons
                            }, {
                                headers: {
                                    "Authorization": `Bearer ${Cookies.get("token")}`
                                }
                            })
                        })
                    }
                    this.$router.push("/");
                })
            })
            .catch(error => {
                this.error = error.response.data.message[0].messages[0].message;
            })
        },
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