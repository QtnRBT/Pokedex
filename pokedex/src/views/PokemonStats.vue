<template>
    <div class="home flex flex-col align-items-center h-screen w-screen pb-6">
        <div class="w-full h-full">
            <div class="h-2/5">
                <div class="h-full w-full mx-auto pokemon p-3 px-6 relative mid:px-72">
                    <img src="../assets/icons/backArrow.svg" class="h-5 self-baseline absolute top-10 z-30 cursor-pointer" @click="home" alt="Back arrow"/>
                    <img v-bind:src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' + this.$route.params.id + '.svg'" class="absolute z-30 mx-auto left-0 right-0 my-auto top-0 bottom-0 h-3/6" ref="pokeImage" :alt="pokemon.nom_pok">
                    <img src="../assets/ui/pokeball.png" class="h-5/6 absolute mx-auto left-0 right-0 my-auto top-0 bottom-0 z-20" alt="Ui Pokeball"/>
                    <h3 class="z-30 absolute text-center mx-auto left-0 right-0 bottom-16 text-white font-bold text-shadow-sm text-lg"> {{ pokemon.nom_pok }} <span class="font-light">#{{ pokemon.id }}</span> </h3>
                    <div class="flex flex-row space-x-2 absolute z-30 bottom-12 mx-auto left-0 right-0 justify-center">
                        <div class="text-xs bg-black bg-opacity-50 text-white text-opacity-90 px-4 rounded-full" v-if="this.capitalize(pokemon.types.type1).length > 0"> {{this.capitalize(pokemon.types.type1)}} </div>
                        <div class="text-xs bg-black bg-opacity-50 text-white text-opacity-90 px-4 rounded-full" v-if="this.capitalize(pokemon.types.type2).length > 0 && pokemon.types.type2 != pokemon.types.type1"> {{this.capitalize(pokemon.types.type2)}} </div>
                    </div>
                <div class="h-full w-screen absolute top-0 left-0 z-5" :style="style"></div>
                <div class="h-full w-screen absolute top-0 left-0 z-10" :style="style2"></div>
                </div>
            </div>
            <div class="relative h-3/5 bg-white z-30 rounded-t-lg px-6 pt-3 infos mid:px-72">
                <div class="header absolute z-30 space-x-5">
                    <router-link v-bind:to="'/pokemon/' + this.$route.params.id" class="text-lg font-bold">Infos</router-link>
                    <router-link v-bind:to="'/pokemon/' + this.$route.params.id + '/stats'" class="text-lg font-bold">Stats</router-link>
                    <router-link v-if="pokemon.evolutions" v-bind:to="'/pokemon/' + this.$route.params.id + '/evolutions'" class="text-lg font-bold">Evolutions</router-link>
                </div>
                <div class="content font-bold flex flex-row justify-between items-center relative h-full">
                    <div class="left text-gray-400 text-lg space-y-3">
                        <h3>HP</h3>
                        <h3>Attack</h3>
                        <h3>Defense</h3>
                        <h3>Sp-attack</h3>
                        <h3>Sp-defense</h3>
                        <h3>Speed</h3>
                    </div>
                    <div class="right text-xs space-y-9 text-left w-28">
                        <div class="relative" v-for="stat of this.pokemon.stat" v-bind:key="stat">
                            <div class="currentProgress h-0.5 rounded-full bg-red-500 absolute z-30 bar" v-bind:style="'width:' + stat + '%; overflow: hidden;'" v-if="stat <= 25"></div>
                            <div class="currentProgress h-0.5 rounded-full bg-yellow-500 absolute z-30 bar" v-bind:style="'width:' + stat + '%; overflow: hidden;'" v-else-if="stat >= 25 && stat < 60"></div>
                            <div class="currentProgress h-0.5 rounded-full bg-green-500 absolute z-30 bar" v-bind:style="'width:' + stat + '%; overflow: hidden;'" v-else-if="stat >= 60 && stat < 90"></div>
                            <div class="currentProgress h-0.5 rounded-full bg-blue-500 absolute z-30 bar" v-bind:style="'width:' + stat + '%; overflow: hidden;'" v-else-if="stat >= 90"></div>
                            <div class="progressBar h-0.5 rounded-full bg-gray-300 asbolute z-10 bar"></div>
                            <p class="absolute -left-10 -top-3.5 text-lg" v-if="stat < 100">{{stat}}</p>
                            <p class="absolute -left-10 -top-3.5 text-lg bg-gold" v-else>{{stat}}</p>
                        </div>
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
    name: "Pokemon",
    data() {
        return {
            pokemon: {
                types: {},
                abilities: "",
                weakness: "",
                stat: [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            }
        }
    },
    mounted() {
        let maxValue = Math.max(this.$refs.pokeImage.width, this.$refs.pokeImage.height);
        if(maxValue == this.$refs.pokeImage.width) {
            let height = Math.round(150*(this.$refs.pokeImage.height/this.$refs.pokeImage.width));
            let width = 150;
            this.$refs.pokeImage.width = width;
            this.$refs.pokeImage.height = height;
        } else {
            let width = Math.round(150*(this.$refs.pokeImage.width/this.$refs.pokeImage.height));
            let height = 150;
            this.$refs.pokeImage.width = width;
            this.$refs.pokeImage.height = height;
        }
        this.pokemon.abilities = "";
        axios.get(`${apiURL}/pokemons/${this.$route.params.id}`)
        .then(response => {
            this.pokemon = response.data;
            this.pokemon.weakness = ""
            this.pokemon.stat = [];
            for(let stat of Object.keys(this.pokemon.stats)) {
                this.pokemon.stat.push(this.pokemon.stats[stat]);
            }
            axios.get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`)
            .then(response => {
                this.pokemon.height = response.data.height*10;
                this.pokemon.weight = response.data.weight/10;
                for (const ability of response.data.abilities) {
                    this.pokemon.abilities += ability.ability.name + ", "
                }
                for(let weakness of Object.keys(this.pokemon.weaknesses)) {
                    if(this.pokemon.weaknesses[weakness] == 2) {
                        this.pokemon.weakness += weakness + ", ";
                    }
                }
            })
        })
    },
    methods: {
        capitalize: (word) => {
            if(!word) return "";
            return (word[0].toUpperCase() + word.slice(1,word.length))
        },
        home () {
            this.$router.push("/");
        }
    },
    computed: {
        style() {
            return 'background-color: ' + this.pokemon.dominant_color + ';'
        },
        style2() {
            return 'background-color: rgba(0,0,0,0.1);'
        }
    }
}
</script>
<style>
    .pokemon {
        width: 21rem;
    }

    .router-link-exact-active {
        border-bottom: 2px solid black;
    }

    .bar {
        max-width: 7rem;
    }

    .bg-gold {
        background-color: #fbb034;
        background-image: linear-gradient(315deg, #fbb034 0%, #ffdd00 74%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>