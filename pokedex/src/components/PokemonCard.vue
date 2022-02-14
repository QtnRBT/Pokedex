<template>
    <div>
        <router-link v-bind:to="'/pokemon/' + pokemonId.slice(1, pokemonId.length)">
            <div class="flex flex-row relative justify-between h-28 p-5 rounded-lg overflow-hidden" :style="style">
                <div class="flex flex-col text-left text-white space-y-3">
                    <div>
                        <p class="text-xs text-shadow-sm font-extralight">{{pokemonId}}</p>
                        <h3 class="text-2xl text-shadow-sm font-semibold">{{pokemonName}}</h3>
                    </div>
                    <div class="flex flex-row space-x-2">
                        <div class="text-xs bg-black bg-opacity-50 text-white text-opacity-90 px-4 rounded-full" v-if="this.capitalize(type1).length > 0"> {{this.capitalize(type1)}} </div>
                        <div class="text-xs bg-black bg-opacity-50 text-white text-opacity-90 px-4 rounded-full" v-if="this.capitalize(type2).length > 0 && type2 != type1"> {{this.capitalize(type2)}} </div>
                    </div>
                </div>
                <div class="flex flex-col align-items-center h-full w-1">
                    <img class="z-20 absolute w-28 max-h-full h-full left-52 top-0" :src="imageLink" :alt="pokemonName"  />
                    <img class="absolute w-2/3 left-40 -top-1/2 transform rotate-12 z-10" src="../assets/ui/pokeball.png" alt="Ui Pokeball"/>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script>
    export default {
        name: "PokemonCard",
        props: ['bgColor', "pokemonName", "pokemonId", "type1", "type2", "imageLink"],
        computed: {
            style() {
                return 'background-color:' + this.bgColor + ';width: 21rem;'
            }
        },
        methods: {
            capitalize: (word) => {
                if(!word) return "";
                return (word[0].toUpperCase() + word.slice(1,word.length))
            }
        }
    }
</script>