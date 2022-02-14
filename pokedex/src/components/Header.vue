<template>
    <div class="mx-auto space-y-4 fixed header pt-6 pb-2">
        <div class="flex justify-between">
            <div class="left flex items-center space-x-6">
                <img src="../assets/icons/menu.svg" class="h-6" />
                <h6 class="font-bold">{{page}}</h6>
            </div>
            <div class="right flex items-center space-x-6">
                <img src="https://www.pngrepo.com/png/95333/512/avatar.png" alt="user icon" class="w-8">
                <img src="../assets/icons/search.svg" class="h-6 search" @click="toggleSearch">
            </div>
        </div>
        <div class="flex flex-row items-center justify-between hidden" ref="search">
            <form @submit.prevent="search">
            <input type="text" placeholder="Pikachu" class="bg-gray-200 rounded-lg px-3 w-60 py-1" />
            </form>
            <p @click="toggleSearch">Cancel</p>
        </div>
        <div class="flex flex-row justify-between px-3 uppercase font-bold text-center" :style="style">
            <router-link to="/">Pokédex</router-link>
            <router-link to="/users">Users</router-link>
            <router-link to="/myteam">My Team</router-link>
            <router-link to="/trade">Trade</router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Navbar',
    computed: {
        style() {
            return 'width: 21rem;font-size: 14px;'
        }
    },
    data() {
        return {
            searchValue: ""
        }
    },
    props: ['page'],
    methods: {
        toggleSearch() {
            this.$refs.search.classList.toggle("hidden");
        }
    },
}
</script>
<style scoped>
    .router-link-exact-active {
        border-bottom: 2px solid black;
    }

    .search {
        transform: scale(-1, 1);
    }

    .header {
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        background: white;
    }
</style>