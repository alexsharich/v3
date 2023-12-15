<script setup>
import DrawerHead from '../drawerHead/DrawerHead.vue'
import CartItemList from '../cartItemList/CartItemList.vue'
import { computed } from 'vue'
import InfoBlock from '../infoBlock/InfoBlock.vue'

defineProps({
  vatPrice: Number,
  totalPrice: Number,
  buttonDisabled: Boolean
})

const emit = defineEmits(['createOrder'])
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black z-10 opacity-70"></div>

  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />
    <div v-if="!totalPrice" class="flex h-full items-center">
      <InfoBlock
        title="Empty drawer"
        description="Add order, please"
        image-url="/package-icon.png"
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
          @click="() => emit('createOrder')"
          class="mt-4 bg-lime-500 w-full rounded-xl py-3 disabled:bg-slate-400 text-white hover:bg-lime-600 transition cursor-pointer active:bg-lime-700"
        >
          Buy
        </button>
      </div>
    </div>
  </div>
</template>
