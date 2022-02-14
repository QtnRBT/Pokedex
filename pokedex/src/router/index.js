import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';

import UsersTwo from '../views/UsersTwo.vue';
import Pokemon from '../views/Pokemon.vue';

import PokemonStats from '../views/PokemonStats.vue';
import PokemonEvolutions from '../views/PokemonEvolutions.vue';
import DeletePokemon from '../views/DeletePokemon.vue';

import SignUp from '../views/SignUp.vue';
import SignIn from '../views/SignIn.vue';

import Profile from '../views/Profile.vue';
import MyTeam from '../views/MyTeam.vue';
import Trade from '../views/Trade.vue';

import Logout from '../views/Logout.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    name: 'UsersTwo',
    component: UsersTwo
  },
  {
    path: "/pokemon/:id",
    name: "Pokemon",
    component: Pokemon
  },
  {
    path: "/pokemon/:id/stats",
    name: "PokemonStats",
    component: PokemonStats
  },
  {
    path: "/pokemon/:id/evolutions",
    name: "PokemonEvolutions",
    component: PokemonEvolutions
  },
  {
    path: "/register",
    name: "Register",
    component: SignUp
  },
  {
    path: "/login",
    name: "Login",
    component: SignIn
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout
  },
  {
    path: "/myteam",
    name: "MyTeam",
    component: MyTeam
  },
  {
    path: "/deletepokemon/:id",
    name: "Deletepokemon",
    component: DeletePokemon
  },
  {
    path: "/trade/:id",
    name: "Trade",
    component: Trade
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
