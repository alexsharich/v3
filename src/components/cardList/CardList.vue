<script setup>
import MyCard from '../card/MyCard.vue'
const onClickAdd = ()=>{}
</script>


<template>
    <div class="grid grid-cols-4 gap-5">
        <MyCard imageUrl="/sneakers/sneakers-1.jpg" :price="120" title="NIKE" :onClickAdd="onClickAdd" /> 
    </div>
</template>