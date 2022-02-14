<template>
  <div class="home flex flex-col items-center h-full w-full pb-6">
    <div class="mx-auto space-y-4 fixed header pt-6 pb-2 w-full px-5 mid:px-72">
        <div class="flex justify-between">
            <div class="left flex items-center space-x-4">
                <router-link to="/login" v-if="!cookie"><img src="https://www.pngrepo.com/png/95333/512/avatar.png" alt="User icon" class="w-10 rounded-full h-10 object-cover"></router-link>
                <router-link to="/profile" v-else-if="!profileUrl"><img src="https://www.pngrepo.com/png/95333/512/avatar.png" alt="User icon" class="w-10 rounded-full h-10 object-cover"></router-link>
                <router-link to="/profile" v-else><img :src="profileUrl" alt="User icon" class="w-10 rounded-full h-10 object-cover"></router-link>
                <h6 class="font-bold">Users</h6>
            </div>
            <div class="right flex items-center space-x-6">
                <img src="../assets/icons/search.svg" class="h-6 search cursor-pointer" @click="toggleSearch" alt="Search magnifier">
            </div>
        </div>
        <div class="flex flex-row items-center justify-between hidden" ref="search">
            <form @submit.prevent="search" class="relative" ref="search2">
              <input type="text" placeholder="Pikachu" class="bg-gray-200 rounded-lg px-3 w-60 py-1 lg:w-96" ref="searchBar" />
              <p class="absolute -top-1 right-4 transform rotate-45 text-3xl cursor-pointer" @click="remove">+</p>
            </form>
            <p @click="cancel" class="cursor-pointer">Cancel</p>
        </div>
        <div class="flex flex-row justify-between px-3 uppercase font-bold text-center text-sm" :style="style">
            <router-link to="/">Pokédex</router-link>
            <router-link to="/users">Users</router-link>
            <router-link to="/myteam">My team</router-link>
        </div>
    </div>
    <div class="mx-auto pt-28 md:w-full md:px-72 md:-ml-3 md:flex md:flex-col md:items-center md:space-y-6">
      <div class="md:flex md:flex-wrap space-y-3 md:items-center md:space-x-3 md:pt-0 md:justify-center" ref="pokeList">
        <p> {{error}} </p>
        <UserCard bgColor="#E02D1D" :userName="user.username" :userId="'#' + user.id" :imageLink="user.profile_picture_url" v-for="user in noDuplicates" v-bind:key="user.id"/>
      </div>
      <button class="px-6 py-3 bg-login text-white uppercase font-bold rounded-xl hidden 3xl:block" v-if="nextPage" @click.prevent="loadMoreUsers" ref="loadButton">Load more users</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UserCard from '@/components/UserCard.vue';
import Cookies from 'js-cookie';
//import Header from '@/components/Header.vue';
import axios from 'axios';

import { apiURL } from '../config.json';

export default {
  name: 'Home',
  components: {
    UserCard,
    //Header
  },
  data: () => {
    return {
      users: [],
      nextPage: null,
      searched: false,
      error: "",
      cookie: "",
      user_id: "",
      profileUrl: "",
      possibleErrors: ["Haven't you missclicked ?", "Retry once, just to see ..?", "You sure that's a user ?", "I don't know this user...", "Error 404 : not found (cheh)", "'No.' - Professor Oak"]
    }
  },
  mounted() {
    this.error = "";
    this.user_id = Cookies.get("user_id");
    this.cookie = Cookies.get('token');
    this.profileUrl = localStorage.getItem("profileUrl");
    this.users = [];
    axios.get(`${apiURL}/users-permissions/users/page/1`)
    .then(response => {
      this.users = response.data[0].users;
      this.nextPage = response.data[0].nextPage;
    })

    window.onscroll = () => {
      if(!this.searched) {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
  
        if (bottomOfWindow && this.nextPage) {
          axios.get(`${apiURL}/users-permissions/users/page/${this.nextPage}`)
            .then(response => {
              response.data[0].users.map(user => {
                this.users.push(user);
              })
              if(!response.data[0].nextPage) {
                delete this.nextPage;
              }
              this.nextPage = response.data[0].nextPage;
            })
        }
      } else {
        return;
      }
    }
  },
  methods: {
    capitalize: (word) => {
        if(!word) return "";
        return (word[0].toUpperCase() + word.slice(1,word.length))
    },
    toggleSearch() {
        this.$refs.search.classList.toggle("hidden");
        this.$refs.pokeList.classList.toggle("pt-10");
        this.$refs.pokeList.classList.toggle("md:pt-10");
    },
    search() {
        this.error = "";
        if(this.$refs.searchBar.value.length > 0) this.searched = true;
        else this.searched = false;
        if(this.$refs.searchBar.value.length > 0) {
          axios.get(`${apiURL}/users-permissions/userSearch/${this.$refs.searchBar.value}`)
          .then(response => {
            if(response.data.length == 0) {
              let item = this.possibleErrors[Math.floor(Math.random()*this.possibleErrors.length)];
              this.error = item;
            }
            this.users = response.data;
          })
        } else {
            this.users = [];
            axios.get(`${apiURL}/users-permissions/users/page/1`)
            .then(response => {
              this.users = response.data[0].users;
              this.nextPage = response.data[0].nextPage;
            })
        }
    },
    remove() {
      this.$refs.searchBar.value = "";
      this.search();
      this.error = "";
    }
    ,cancel() {
      this.remove();
      this.toggleSearch();
    }
  },
  computed: {
    noDuplicates() {
      return this.users.filter(u => u.id != this.user_id && u.id != 5);
    }
  }
  
}
</script>
<style>
    .router-link-exact-active {
        border-bottom: 2px solid black;
    }

    .search {
        transform: scale(-1, 1);
    }

    .header {
        /* left: 50%; */
        /* transform: translateX(-50%); */
        z-index: 1000;
        background: white;
    }
</style>