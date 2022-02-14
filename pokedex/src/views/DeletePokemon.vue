<template lang="">
    <div>
        
    </div>
</template>
<script>
import axios from 'axios';
import { apiURL } from '../config.json';
import Cookies from 'js-cookie';
export default {
    name: "DeletePokemon",
    mounted() {
        let pokemonId = this.$route.params.id
        axios.get(`${apiURL}/users/me/team`, {
            headers: { 
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        .then(response => {
            if(response.data.pokemons.length > 1) {
                let teamId = response.data.id;
                let pokemons = response.data.pokemons;
                let pok = [];
                pokemons.map(p => {
                    if(p.id != pokemonId) {
                        pok.push(p);
                    }
                });
                let team = {
                    pokemons: pok
                }
                axios.put(`${apiURL}/teams/${teamId}`,team, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                })
                .then(response => {
                    response.data;
                    this.$router.push("/myteam");
                })
            } else {
                this.$router.push('/myteam');
                alert("You can't have less than one pokemon.");
                return;
            }
        })
    },
}


</script>