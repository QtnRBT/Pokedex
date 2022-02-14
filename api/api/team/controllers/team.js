'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    findMine: async ctx => {
        if(!ctx.state.user) {
            return ctx.notFound("You're not logged in.");
        }

        let entity = await strapi.services.team.findOne({
            user_id: ctx.state.user.id
        });

        delete entity.user;

        let newPok = [];

        for(let pokemon of entity.pokemons) {
            let types = await strapi.services.type.find({
                id: pokemon.id
            })
            delete types[0].id;
            delete types[0].pokemon;
            pokemon.types = sanitizeEntity(types[0], { model: strapi.models.type });
            newPok.push(pokemon);
        }

        entity.pokemons = newPok;

        return sanitizeEntity(entity, { model: strapi.models.team });

    },

    findOne: async ctx => {
        let user_id = ctx.params.id;

        let entity = await strapi.services.team.findOne({
            user_id: user_id
        });

        delete entity.user;

        let newPok = [];

        for(let pokemon of entity.pokemons) {
            let types = await strapi.services.type.find({
                id: pokemon.id
            })
            delete types[0].id;
            delete types[0].pokemon;
            pokemon.types = sanitizeEntity(types[0], { model: strapi.models.type });
            newPok.push(pokemon);
        }

        entity.pokemons = newPok;

        return sanitizeEntity(entity, { model: strapi.models.team });
    }

};
