<script setup>
import DrawerHead from '../drawerHead/DrawerHead.vue'
import CartItemList from '../cartItemList/CartItemList.vue'
import { ref, inject, computed } from 'vue'
import InfoBlock from '../infoBlock/InfoBlock.vue'
import axios from 'axios'

const props = defineProps({
  vatPrice: Number,
  totalPrice: Number
})
const isCreating = ref(false)
const createOrder = async () => {
  try {
    isCreating.value = true
    const { data } = await axios.post(`https://57aeef1f4f92097e.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: props.totalPrice.value
    })
    cart.value = []
    orderId.value = data.id
    return data
  } catch (err) {
    console.log(err)
  } finally {
    isCreating.value = false
  }
}
const orderId = ref(null)
const { cart, hideDrawer } = inject('cart')
const cartIsEmpty = computed(() => cart.value.length === 0)
const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black z-10 opacity-70"></div>

  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />

    <div v-if="!totalPrice || orderId" class="flex h-full items-center">
      <InfoBlock
        v-if="!totalPrice && !orderId"
        title="Drawer is empty"
        description="Add order, please"
        image-url="/package-icon.png"
      />
      <InfoBlock
        v-if="orderId"
        title="Your order is done"
        description="Congratulate ! Your order is done ! "
        image-url="/order-success-icon.png"
      />
    </div>
    <div v-else>
      <CartItemList />

      <div class="flex flex-col gap-5 mt-7">
        <div class="flex gap-2">
          <span>SUM: </span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} $</b>
        </div>
        <div class="flex gap-2">
          <span>NNN 5 %:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ vatPrice }}$</b>
        </div>
        <button
          :disabled="buttonDisabled"
          @click="createOrder"
          class="mt-4 bg-lime-500 w-full rounded-xl py-3 disabled:bg-slate-400 text-white hover:bg-lime-600 transition cursor-pointer active:bg-lime-700"
        >
          Buy
        </button>
      </div>
    </div>
  </div>
</template>
