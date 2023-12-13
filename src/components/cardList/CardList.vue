<script setup>
import MyCard from '../card/MyCard.vue'
const onClickAdd = () => {}
defineProps({
  items: Array
})
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <MyCard
      v-for="item in items"
      :key="item.id"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :title="item.title"
      :onClickAdd="onClickAdd"
    />
  </div>
</template>
