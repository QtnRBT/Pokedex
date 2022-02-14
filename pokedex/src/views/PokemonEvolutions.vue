<template lang="">
    <div class="home flex flex-col align-items-center h-screen w-screen pb-6 overflow-hidden">
        <div class="w-full h-full">
            <div class="h-1/5 relative">
                <div class="h-full w-full mx-auto pokemon p-3 px-6 relative mid:px-72">
                    <img src="../assets/icons/backArrow.svg" class="h-5 self-baseline absolute z-30 cursor-pointer my-auto top-0 bottom-0" @click="home" alt="Back arrow" />
                </div>
                <div class="h-full w-screen absolute top-0 left-0 z-5" :style="style"></div>
                <div class="h-full w-screen absolute top-0 left-0 z-10" :style="style2"></div>
            </div>
            <div class="h-4/5">
                <div class="header z-30 space-x-5 self-start justify-self-start ml-6 pt-3 mid:ml-72">
                    <router-link v-bind:to="'/pokemon/' + this.$route.params.id" class="text-lg font-bold">Infos</router-link>
                    <router-link v-bind:to="'/pokemon/' + this.$route.params.id + '/stats'" class="text-lg font-bold">Stats</router-link>
                    <router-link v-bind:to="'/pokemon/' + this.$route.params.id + '/evolutions'" class="text-lg font-bold">Evolutions</router-link>
                </div>
                <div class="flex flex-col justify-around items-center h-full px-6 py-20">
                    <div class="flex flex-col space-y-2" @click="nextPokemon">
                        <img class="h-20" :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' + nextEvolution.id + '.svg'" :alt="nextEvolution.nom_pok"/>
                        <p class="text-center font-bold"> {{ this.nextEvolution.nom_pok }} <span class="font-normal">#{{this.nextEvolution.id}}</span> </p>
                    </div>
                    <img src="../assets/icons/down.svg" class="transform rotate-180 h-20" alt="Down arrow"/>
                    <div class="flex flex-col space-y-2">
                        <img class="h-20" :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' + currentPokemon.id + '.svg'" :alt="currentPokemon.nom_pok"/>
                        <p class="text-center font-bold"> {{ this.currentPokemon.nom_pok }} <span class="font-normal">#{{this.currentPokemon.id}}</span> </p>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { apiURL } from '../config.json';
export default {
    name: "PokemonEvolutions",
    data() {
        return {
            currentPokemon: {
                id: 1
            },
            nextEvolution: {
                id: 1
            }
        }
    },
    mounted() {
        axios.get(`${apiURL}/pokemons/${this.$route.params.id}`)
        .then(response => {
            this.currentPokemon = response.data;
            axios.get(`${apiURL}/pokemons/${this.$route.params.id}`)
            .then(response => {
                if(response.data.evolutions) {
                    axios.get(`${apiURL}/pokemons/${response.data.evolutions.evol_pokemon.id}`)
                    .then(response => {
                        this.nextEvolution = response.data;
                    })
                }
            })
        });
    },
    computed: {
        style() {
            return 'background-color: ' + this.currentPokemon.dominant_color + ';'
        },
        style2() {
            return 'background-color: rgba(0,0,0,0.1);'
        }
    },
    methods: {
        home () {
            this.$router.push("/");
        },
        nextPokemon() {
            this.$router.push('../' + this.nextEvolution.id)
        }
    }
}
</script>