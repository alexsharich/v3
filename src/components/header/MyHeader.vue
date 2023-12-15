<script setup>
defineProps({
    totalPrice:Number
})
const emit = defineEmits(['showDrawer'])
</script>

<template>
    <header class="flex justify-between  px-10 py-8 border-b border-slate-100">
            <div class="flex items-center gap-4">
                <img class="w-10" src="/logo.png" alt="logo">
                <div>
                    <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
                    <p class="text-slate-500">Super Shop</p>
                </div>
            </div>
            <ul class="flex items-center gap-10">
                <li @click = "() => emit('showDrawer')" class="flex items-center gap-3 text-gray-400 cursor-pointer hover:text-black" >
                    <img src="/cart.svg" alt="Cart">
                    <b>{{totalPrice}}$</b>
                </li>
                <li class="flex items-center gap-3 text-gray-400 cursor-pointer hover:text-black" >
                    <img src="/heart.svg" alt="Cart">
                    <span>Favorites</span>
                </li>
                <li class="flex items-center gap-3 text-gray-400 cursor-pointer hover:text-black" >
                    <img src="/profile.svg" alt="Cart">
                    <span>Profile</span>
                </li>
            </ul>
        </header>
</template>
<style>
</style>