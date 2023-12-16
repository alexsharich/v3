<script setup>
import { inject, reactive, watch, ref, onMounted } from 'vue'
import CardList from '../../components/cardList/CardList.vue'
import axios from 'axios'
import debounce from 'lodash.debounce'

const items = ref([])
const { cart, addToCart, removeFromCart, addFavorite } = inject('cart')
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onChangeSelect = (e) => {
  filters.sortBy = e.target.value
}
const onChangeQueryInput = debounce((e) => {
  filters.searchQuery = e.target.value
}, 500)
const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
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

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://57aeef1f4f92097e.mokky.dev/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.itemId === item.id)
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
onMounted(async () => {
  const localStorageCart = localStorage.getItem('cart')
  cart.value = localStorageCart ? JSON.parse(localStorageCart) : []

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})
watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})
watch(filters, fetchItems)
</script>

<template>
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
    <CardList :items="items" @add-favorite="addFavorite" @add-to-cart="onClickAddPlus" />
  </div>
</template>
