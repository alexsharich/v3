<script setup>
import MyHeader from './components/header/MyHeader.vue';
import CardList from './components/cardList/CardList.vue'
</script>

<template>
    <div class="rounded-xl bg-white w-4/5 m-auto shadow-xl mt-10">

        <MyHeader/>

        <div class="p-10">
            <h2 class="text-3xl font-bold mb-8">ALL SNEAKERS</h2>
                <CardList/>
        </div>
        
    </div>

</template>


