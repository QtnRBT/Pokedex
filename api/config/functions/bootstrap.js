'use strict';

const { startOfWeekWithOptions } = require("date-fns/fp");

const axios = require('axios');

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = async () => {

    // let evols = [
    //     {id_pok_base:"1",id_pok_evol:"2",lvl_evol_pok:"16"},
    //     {id_pok_base:"2",id_pok_evol:"3",lvl_evol_pok:"32"},
    //     {id_pok_base:"4",id_pok_evol:"5",lvl_evol_pok:"16"},
    //     {id_pok_base:"5",id_pok_evol:"6",lvl_evol_pok:"36"},
    //     {id_pok_base:"7",id_pok_evol:"8",lvl_evol_pok:"16"},
    //     {id_pok_base:"8",id_pok_evol:"9",lvl_evol_pok:"36"},
    //     {id_pok_base:"10",id_pok_evol:"11",lvl_evol_pok:"7"},
    //     {id_pok_base:"11",id_pok_evol:"12",lvl_evol_pok:"10"},
    //     {id_pok_base:"13",id_pok_evol:"14",lvl_evol_pok:"7"},
    //     {id_pok_base:"14",id_pok_evol:"15",lvl_evol_pok:"10"},
    //     {id_pok_base:"16",id_pok_evol:"17",lvl_evol_pok:"18"},
    //     {id_pok_base:"17",id_pok_evol:"18",lvl_evol_pok:"36"},
    //     {id_pok_base:"19",id_pok_evol:"20",lvl_evol_pok:"20"},
    //     {id_pok_base:"21",id_pok_evol:"22",lvl_evol_pok:"20"},
    //     {id_pok_base:"23",id_pok_evol:"24",lvl_evol_pok:"22"},
    //     {id_pok_base:"25",id_pok_evol:"26",lvl_evol_pok:"-1"},
    //     {id_pok_base:"27",id_pok_evol:"28",lvl_evol_pok:"22"},
    //     {id_pok_base:"29",id_pok_evol:"30",lvl_evol_pok:"16"},
    //     {id_pok_base:"30",id_pok_evol:"31",lvl_evol_pok:"-1"},
    //     {id_pok_base:"32",id_pok_evol:"33",lvl_evol_pok:"16"},
    //     {id_pok_base:"33",id_pok_evol:"34",lvl_evol_pok:"-1"},
    //     {id_pok_base:"35",id_pok_evol:"36",lvl_evol_pok:"-1"},
    //     {id_pok_base:"37",id_pok_evol:"38",lvl_evol_pok:"-1"},
    //     {id_pok_base:"39",id_pok_evol:"40",lvl_evol_pok:"-1"},
    //     {id_pok_base:"41",id_pok_evol:"42",lvl_evol_pok:"22"},
    //     {id_pok_base:"43",id_pok_evol:"44",lvl_evol_pok:"21"},
    //     {id_pok_base:"44",id_pok_evol:"45",lvl_evol_pok:"-1"},
    //     {id_pok_base:"46",id_pok_evol:"47",lvl_evol_pok:"24"},
    //     {id_pok_base:"48",id_pok_evol:"49",lvl_evol_pok:"31"},
    //     {id_pok_base:"50",id_pok_evol:"51",lvl_evol_pok:"26"},
    //     {id_pok_base:"52",id_pok_evol:"53",lvl_evol_pok:"28"},
    //     {id_pok_base:"54",id_pok_evol:"55",lvl_evol_pok:"33"},
    //     {id_pok_base:"56",id_pok_evol:"57",lvl_evol_pok:"28"},
    //     {id_pok_base:"58",id_pok_evol:"59",lvl_evol_pok:"-1"},
    //     {id_pok_base:"60",id_pok_evol:"61",lvl_evol_pok:"25"},
    //     {id_pok_base:"61",id_pok_evol:"62",lvl_evol_pok:"-1"},
    //     {id_pok_base:"63",id_pok_evol:"64",lvl_evol_pok:"16"},
    //     {id_pok_base:"64",id_pok_evol:"65",lvl_evol_pok:"-2"},
    //     {id_pok_base:"66",id_pok_evol:"67",lvl_evol_pok:"28"},
    //     {id_pok_base:"67",id_pok_evol:"68",lvl_evol_pok:"-2"},
    //     {id_pok_base:"69",id_pok_evol:"70",lvl_evol_pok:"21"},
    //     {id_pok_base:"70",id_pok_evol:"71",lvl_evol_pok:"-1"},
    //     {id_pok_base:"72",id_pok_evol:"73",lvl_evol_pok:"30"},
    //     {id_pok_base:"74",id_pok_evol:"75",lvl_evol_pok:"25"},
    //     {id_pok_base:"75",id_pok_evol:"76",lvl_evol_pok:"-2"},
    //     {id_pok_base:"77",id_pok_evol:"78",lvl_evol_pok:"40"},
    //     {id_pok_base:"79",id_pok_evol:"80",lvl_evol_pok:"37"},
    //     {id_pok_base:"81",id_pok_evol:"82",lvl_evol_pok:"30"},
    //     {id_pok_base:"84",id_pok_evol:"85",lvl_evol_pok:"31"},
    //     {id_pok_base:"86",id_pok_evol:"87",lvl_evol_pok:"34"},
    //     {id_pok_base:"88",id_pok_evol:"89",lvl_evol_pok:"38"},
    //     {id_pok_base:"90",id_pok_evol:"91",lvl_evol_pok:"-1"},
    //     {id_pok_base:"92",id_pok_evol:"93",lvl_evol_pok:"25"},
    //     {id_pok_base:"93",id_pok_evol:"94",lvl_evol_pok:"-2"},
    //     {id_pok_base:"96",id_pok_evol:"97",lvl_evol_pok:"26"},
    //     {id_pok_base:"98",id_pok_evol:"99",lvl_evol_pok:"28"},
    //     {id_pok_base:"100",id_pok_evol:"101",lvl_evol_pok:"30"},
    //     {id_pok_base:"102",id_pok_evol:"103",lvl_evol_pok:"-1"},
    //     {id_pok_base:"104",id_pok_evol:"105",lvl_evol_pok:"28"},
    //     {id_pok_base:"109",id_pok_evol:"110",lvl_evol_pok:"35"},
    //     {id_pok_base:"111",id_pok_evol:"112",lvl_evol_pok:"42"},
    //     {id_pok_base:"116",id_pok_evol:"117",lvl_evol_pok:"32"},
    //     {id_pok_base:"118",id_pok_evol:"119",lvl_evol_pok:"33"},
    //     {id_pok_base:"120",id_pok_evol:"121",lvl_evol_pok:"-1"},
    //     {id_pok_base:"129",id_pok_evol:"130",lvl_evol_pok:"20"},
    //     {id_pok_base:"133",id_pok_evol:"134",lvl_evol_pok:"-1"},
    //     {id_pok_base:"133",id_pok_evol:"135",lvl_evol_pok:"-1"},
    //     {id_pok_base:"133",id_pok_evol:"136",lvl_evol_pok:"-1"},
    //     {id_pok_base:"138",id_pok_evol:"139",lvl_evol_pok:"40"},
    //     {id_pok_base:"140",id_pok_evol:"141",lvl_evol_pok:"40"},
    //     {id_pok_base:"147",id_pok_evol:"148",lvl_evol_pok:"30"},
    //     {id_pok_base:"148",id_pok_evol:"149",lvl_evol_pok:"55"}
    // ]

    // let c = 1;
    // for(let evol of evols) {
    //     let pok = await strapi.services.poke.findOne({
    //         id: evol.id_pok_base
    //     });
    //     strapi.services.evolution.update({
    //         id: c
    //     }, {
    //         base_pokemon_id: pok.id
    //     })
    //     c++;
    // }

    // let pok = {};

    // let entities = await strapi.services.poke.find({
    //     _limit: -1
    // });

    // entities.map(async entity => {
    //     console.log(entity.nom_pok)
    //     let pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon/"+entity.id);
    //     strapi.services.poke.update(entity.id, {"nom_pok": pokemon.data.name});
    // })

};
