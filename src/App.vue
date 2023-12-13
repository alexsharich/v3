<script setup>
import MyHeader from './components/header/MyHeader.vue';
import CardList from './components/cardList/CardList.vue'
/* import MyDrawer from './components/drawer/MyDrawer.vue' */
</script>

<template>
    <!-- <MyDrawer/> -->
    <div class="rounded-xl bg-white w-4/5 m-auto shadow-xl mt-10">
        <MyHeader/>
        <div class="p-10">
            <div class="flex justify-between items-center">
                <h2 class="text-3xl font-bold mb-8">ALL SNEAKERS</h2>

                <div class="flex gap-4">
                    <select class="py-2 px-3 border rounded outline-none">
                    <option>Name</option>
                    <option>Price</option>
                    <option>Price +</option>
                    <option>Price -</option>
                </select>

                <div class="relative">
                    <img  class="absolute left-3 top-3" src="/search.svg" alt="Search">
                    <input class="border rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400" type="text" placeholder="search...">
                </div>
                </div>
            </div>
                <CardList/>
        </div>        
    </div>
</template>


