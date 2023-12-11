<script setup> 
defineProps({
    imageUrl:String,
    title: String,
    price:Number,
    isAdded:Boolean,
    isFavorite:Boolean,
    onClickAdd: Function,
    onClickFavorite:Function
})
</script>

<template>
    <div class="relative bg-white border boreder-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xlS">
                <img @click="onClickFavorite" :src="isFavorite ? '/like-2.svg': '/like-1.svg'" alt="Like" class="absolute top-0 left-0">
                <img :src='imageUrl' alt="Sneaker">
                <p class="mt-2">{{ title }}</p>
                <div class="flex justify-between mt-5s">
                    <div class="flex flex-col">
                        <span class="text-slate-400">Price</span>
                        <b>{{ price }} $</b>
                    </div>
                    <img @click="onClickAdd()" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Add" > 
                </div>
            </div>
</template>