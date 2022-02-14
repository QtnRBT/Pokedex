'use strict';

const { sanitizeEntity } = require("strapi-utils/lib");

const axios = require("axios");


/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    
    findPage: async (ctx) => {
        async function processArray(arr) {
            let ent = [
                {
                    pokemons: []
                },
            ];
            if(ctx.params.page < 11) {
                ent[0].nextPage = parseInt(ctx.params.page) + 1
            }
            for(let pokemon of arr) { 
                let types = await strapi.services.type.findOne({
                    id: pokemon.id
                })
                delete types.pokemon;
                pokemon.types = sanitizeEntity(types, { model: strapi.models.type });
                let weaknesses = await strapi.services.weakness.findOne({
                    id: pokemon.id+302
                });
                delete weaknesses.pokemon;
                delete weaknesses.id;
                pokemon.weaknesses = sanitizeEntity(weaknesses, { model: strapi.models.weakness });
                
                let evolutions = await strapi.services.evolution.findOne({
                    base_pokemon_id: pokemon.id
                });
                if(evolutions) {
                    delete evolutions.base_pokemon;
                    delete evolutions.base_pokemon_id;
                    delete evolutions.id;
    
                    pokemon.evolutions = sanitizeEntity(evolutions, { model: strapi.models.evolution })
                }
    
                let stats = await strapi.services.stat.findOne({
                    id: pokemon.id
                });
                delete stats.pokemon;
                delete stats.id;
    
                pokemon.stats = sanitizeEntity(stats, { model: strapi.models.stat});
                
                ent[0].pokemons.push(sanitizeEntity(pokemon, { model: strapi.models.poke }));
            }
            return ent;
        }

        let arr = await strapi.services.poke.find({
            _start: (parseInt(ctx.params.page)-1)*15,
            _limit:15
        });
        return processArray(arr);
    },

    find: async ctx => {

        async function processArray(arr) {
            let ent = [];
            for(let pokemon of arr) { 
                let types = await strapi.services.type.findOne({
                    id: pokemon.id
                })
                delete types.pokemon;
                pokemon.types = sanitizeEntity(types, { model: strapi.models.type });
                let weaknesses = await strapi.services.weakness.findOne({
                    id: pokemon.id+302
                });
                delete weaknesses.pokemon;
                delete weaknesses.id;
                pokemon.weaknesses = sanitizeEntity(weaknesses, { model: strapi.models.weakness });
                
                let evolutions = await strapi.services.evolution.findOne({
                    base_pokemon_id: pokemon.id
                });
                if(evolutions) {
                    delete evolutions.base_pokemon;
                    delete evolutions.base_pokemon_id;
                    delete evolutions.id;
    
                    pokemon.evolutions = sanitizeEntity(evolutions, { model: strapi.models.evolution })
                }
    
                let stats = await strapi.services.stat.findOne({
                    id: pokemon.id
                });
                delete stats.pokemon;
                delete stats.id;
    
                pokemon.stats = sanitizeEntity(stats, { model: strapi.models.stat});
                
                ent.push(sanitizeEntity(pokemon, { model: strapi.models.poke }));
            }
            return ent;
        }

        let arr = await strapi.services.poke.find({
            _limit:-1
        });
        return processArray(arr);

    },

    findOne: async ctx => {
        let pokemon = await strapi.services.poke.findOne({
            id: ctx.params.id
        });
        let types = await strapi.services.type.findOne({
            id: pokemon.id
        });
        delete types.pokemon;
        pokemon.types = sanitizeEntity(types, { model: strapi.models.type });
        let weaknesses = await strapi.services.weakness.findOne({
            id: pokemon.id+302
        });
        delete weaknesses.pokemon;
        delete weaknesses.id;
        pokemon.weaknesses = sanitizeEntity(weaknesses, { model: strapi.models.weakness });
        
        let evolutions = await strapi.services.evolution.findOne({
            base_pokemon_id: pokemon.id
        });
        if(evolutions) {
            delete evolutions.base_pokemon;
            delete evolutions.base_pokemon_id;
            delete evolutions.id;

            pokemon.evolutions = sanitizeEntity(evolutions, { model: strapi.models.evolution })
        }

        let stats = await strapi.services.stat.findOne({
            id: pokemon.id
        });
        delete stats.pokemon;
        delete stats.id;

        pokemon.stats = sanitizeEntity(stats, { model: strapi.models.stat});
        return sanitizeEntity(pokemon, { model: strapi.models.poke });
    },

    search: async ctx => {
        let entities = await strapi.query('poke').search({
            _q: ctx.params.value.toLowerCase()
        })

        async function processArray(arr) {
            let ent = [];
            for(let pokemon of arr) { 
                let types = await strapi.services.type.findOne({
                    id: pokemon.id
                })
                delete types.pokemon;
                pokemon.types = sanitizeEntity(types, { model: strapi.models.type });
                let weaknesses = await strapi.services.weakness.findOne({
                    id: pokemon.id+302
                });
                delete weaknesses.pokemon;
                delete weaknesses.id;
                pokemon.weaknesses = sanitizeEntity(weaknesses, { model: strapi.models.weakness });
                
                let evolutions = await strapi.services.evolution.findOne({
                    base_pokemon_id: pokemon.id
                });
                if(evolutions) {
                    delete evolutions.base_pokemon;
                    delete evolutions.base_pokemon_id;
                    delete evolutions.id;
    
                    pokemon.evolutions = sanitizeEntity(evolutions, { model: strapi.models.evolution })
                }
    
                let stats = await strapi.services.stat.findOne({
                    id: pokemon.id
                });
                delete stats.pokemon;
                delete stats.id;
    
                pokemon.stats = sanitizeEntity(stats, { model: strapi.models.stat});
                
                ent.push(sanitizeEntity(pokemon, { model: strapi.models.poke }));
            }
            return ent;
        }

        return processArray(entities);
    }
};
