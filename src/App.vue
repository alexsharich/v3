<script setup>
import MyHeader from './components/header/MyHeader.vue'
import CardList from './components/cardList/CardList.vue'

import { onMounted, ref, watch, reactive, provide, computed } from 'vue'
import axios from 'axios'
import MyDrawer from './components/drawer/MyDrawer.vue'

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const isDrawerOpen = ref(false)
const isCreatingOrder = ref(false)

const showDrawer = () => (isDrawerOpen.value = true)
const hideDrawer = () => (isDrawerOpen.value = false)

const items = ref([])
const cart = ref([])
const totalPrice = computed(() => cart.value.reduce((acc, el) => acc + el.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))
const cartIsEmpty = computed(() => cart.value.length === 0)
const buttonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)

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
const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}
const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}
const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}
const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post(`https://57aeef1f4f92097e.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: totalPrice.value
    })
    cart.value = []
    return data
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingOrder.value = false
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
watch(filters, fetchItems)
watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})
watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)
provide('cart', { cart, addToCart, removeFromCart, hideDrawer, showDrawer, addFavorite })
</script>

<template>
  <MyDrawer
    v-if="isDrawerOpen"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    @create-order="createOrder"
    :button-disabled="buttonDisabled"
  />
  <div class="rounded-xl bg-white w-4/5 m-auto shadow-xl mt-10">
    <MyHeader :total-price="totalPrice" @show-drawer="showDrawer" />
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
        <CardList :items="items" @add-favorite="addFavorite" @add-to-cart="onClickAddPlus" />
      </div>
    </div>
  </div>
</template>
