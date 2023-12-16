<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import CardList from '../../components/cardList/CardList.vue'

const favorites = ref([])
onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://57aeef1f4f92097e.mokky.dev/favorites?_relations=items`
    )
    favorites.value = data.map((obj) => obj.item)
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <h2 class="text-xl font-bold mb-8">My Favorites</h2>
  <CardList :items="favorites" is-favorites />
</template>
