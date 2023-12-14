<script setup>
import MyCard from '../card/MyCard.vue'

const props = defineProps({
  items: Array
})

const emit = defineEmits(['addFavorite'])
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <MyCard
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :title="item.title"
      :onClickAdd="onClickAdd"
      :onClickFavorite="() => emit('addFavorite', item)"
      :isFavorite="item.isFavorite"
    />
  </div>
</template>
