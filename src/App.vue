<script setup>
import MyHeader from './components/header/MyHeader.vue'

import { ref, watch, provide, computed } from 'vue'
import axios from 'axios'
import MyDrawer from './components/drawer/MyDrawer.vue'

const isDrawerOpen = ref(false)

const showDrawer = () => (isDrawerOpen.value = true)
const hideDrawer = () => (isDrawerOpen.value = false)

const cart = ref([])
const totalPrice = computed(() => cart.value.reduce((acc, el) => acc + el.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))
const cartIsEmpty = computed(() => cart.value.length === 0)

const addFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        itemId: item.id,
        item
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
  <MyDrawer v-if="isDrawerOpen" :total-price="totalPrice" :vat-price="vatPrice" />
  <div class="rounded-xl bg-white w-4/5 m-auto shadow-xl mt-10">
    <MyHeader :total-price="totalPrice" @show-drawer="showDrawer" />
    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
