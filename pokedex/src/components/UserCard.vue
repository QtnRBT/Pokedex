<template>
<div>
    <div class="flex flex-row relative justify-between h-28 p-5 rounded-lg overflow-hidden" :style="style">
        <div class="flex flex-col text-left text-white space-y-3">
            <div>
                <p class="text-xs text-shadow-sm font-extralight">{{userId}}</p>
                <h3 class="text-2xl text-shadow-sm font-semibold">{{userName}}</h3>
                <p>{{lore}}</p>
            </div>
        </div>
        <div class="h-full w-1">
            <img class="z-20 absolute h-28 w-28 left-52 top-0 rounded-full p-2 object-cover" :src="imageLink" :alt="userName"  />
            <img class="absolute w-2/3 left-40 -top-1/2 transform rotate-12 z-10" src="../assets/ui/pokeball.png" alt="Ui Pokeball"/>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        name: "UserCard",
        props: ['bgColor', "userName", "userId", "imageLink", "lore"],
        computed: {
            style() {
                return 'background-color:' + this.bgColor + ';width: 21rem;'
            }
        }
    }
</script>