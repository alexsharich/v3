<script setup>
import MyHeader from './components/header/MyHeader.vue'
import CardList from './components/cardList/CardList.vue'

import { onMounted, ref, watch, reactive, provide } from 'vue'
import axios from 'axios'
/* import MyDrawer from './components/drawer/MyDrawer.vue' */

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})
const items = ref([])

const onChangeSelect = (e) => {
  filters.sortBy = e.target.value
}
const onChangeQueryInput = (e) => {
  filters.searchQuery = e.target.value
}
const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get(`https://57aeef1f4f92097e.mokky.dev/items`, { params })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorites: false,
      isAdded: false
    }))
  } catch (err) {
    console.log(err)
  }
}
onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
})
watch(filters, fetchItems)

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://57aeef1f4f92097e.mokky.dev/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)
      if (!favorite) {
        return item
      }
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
        isAdded: false
      }
    })
  } catch (err) {
    console.log(err)
  }
}
const addFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id
      }
      item.isFavorite = true
      const { data } = await axios.post(`https://57aeef1f4f92097e.mokky.dev/favorites`, obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false

      await axios.delete(`https://57aeef1f4f92097e.mokky.dev/favorites/${item.favoriteId}`)
      item.isFavorite = false
      item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}
provide('addFavorite', addFavorite)
</script>

<template>
  <!-- <MyDrawer/> -->
  <div class="rounded-xl bg-white w-4/5 m-auto shadow-xl mt-10">
    <MyHeader />
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">ALL SNEAKERS</h2>

        <div class="flex gap-4">
          <select @change="onChangeSelect" class="py-2 px-3 border rounded outline-none">
            <option value="name">Name</option>
            <option value="price">Price +</option>
            <option value="-price">Price -</option>
          </select>

          <div class="relative">
            <img class="absolute left-3 top-3" src="/search.svg" alt="Search" />
            <input
              @input="onChangeQueryInput"
              class="border rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400"
              type="text"
              placeholder="search..."
            />
          </div>
        </div>
      </div>
      <div class="mt-10">
        <CardList :items="items" @addFavorite="addFavorite" />
      </div>
    </div>
  </div>
</template>
