<script setup lang="ts"></script>

<template>
  <div class="col-span-3 row-span-5 grid grid-rows-5 border-x border-dashed border-gray-500">
    <div class="border-b border-dashed border-gray-500"></div>
    <div class="row-span-3 grid grid-cols-2 grid-rows-3">
      <molecule-navigation />
      <div class="relative">
        <div class="flex items-end gap-2">
          <small class="mb-4.5">aka</small>
          <h1 class="title text-9xl uppercase font-extrabold">Arshyn</h1>
        </div>
        <p class="subtitle absolute top-20 left-1/3 transform italic text-rose-600 text-5xl font-medium font-serif">
          engineea
        </p>
      </div>
      <div class="row-start-3 col-start-3 overflow-hidden">
        <img src="/images/image.jpg" alt="" class="w-full h-full object-cover"></img>
      </div>
    </div>
    <div class="border-t border-dashed border-gray-500"></div>
  </div>
</template>

<style scoped>
.title {
  font-family: "Staatliches", sans-serif;
}

.subtitle {
  font-family: "Dancing Script", cursive;
}
</style>