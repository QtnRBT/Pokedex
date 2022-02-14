<template>
    <div class="home flex flex-col items-center h-full w-full pb-6">
        <div class="mx-auto space-y-4 fixed header pt-6 pb-2 w-full px-5 mid:px-72">
            <div class="flex justify-between">
                <div class="left flex items-center space-x-4">
                    <router-link to="/login" v-if="!cookie"><img src="https://www.pngrepo.com/png/95333/512/avatar.png" alt="User icon" class="w-10 rounded-full h-10 object-cover"></router-link>
                    <router-link to="/profile" v-else-if="!profileUrl"><img src="https://www.pngrepo.com/png/95333/512/avatar.png" alt="User icon" class="w-10 rounded-full h-10 object-cover"></router-link>
                    <router-link to="/profile" v-else><img :src="profileUrl" alt="User icon" class="w-10 rounded-full h-10 object-cover"></router-link>
                    <h6 class="font-bold">My Team</h6>
                </div>
            </div>
            <div class="flex flex-row justify-between px-3 uppercase font-bold text-center text-sm" :style="style">
                <router-link to="/">Pokédex</router-link>
                <router-link to="/users">Users</router-link>
                <router-link to="/myteam">My team</router-link>
            </div>
        </div>
        <div class="mx-auto pt-28 md:w-full md:px-72 md:-ml-3 md:flex md:flex-col md:items-center mt-3">
            <div class="md:flex md:flex-wrap space-y-3 md:space-y-0 md:gap-y-3 md:items-center md:gap-x-3 md:pt-0 md:justify-center" ref="pokeList">
                <PokemonCardTeam :bgColor="pokemon.dominant_color" :pokemonName="pokemon.nom_pok" :pokemonId="'#' + pokemon.id" :type1="pokemon.types.type1" :type2="pokemon.types.type2" :imageLink="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' + pokemon['id'] +'.svg'" v-for="pokemon in pokemons" v-bind:key="pokemon.id" />
            </div>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
import axios from 'axios';
import { apiURL } from '../config.json';

import PokemonCardTeam from '@/components/PokemonCardTeam';

export default {
    name: "MyTeam",
    components: {
        PokemonCardTeam,
    },
    data() {
        return {
            cookie: "",
            profileUrl: "",
            pokemons: [],
        }
    },
    mounted() {
        if(!Cookies.get("token")) this.$router.push("/login");
        this.pokemons = [];
        this.cookie = Cookies.get("token");
        this.profileUrl = localStorage.getItem("profileUrl");
        axios.get(`${apiURL}/users/me/team`, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        .then(response => {
            this.pokemons = response.data.pokemons.reverse();
        })
    },
}
</script>