<script setup lang="ts">
const emitCursorHover = (hovering: boolean) => {
  window.dispatchEvent(new CustomEvent('cursor-hover', {
    detail: { hovering }
  }))
}
</script>

<template>
  <div class="w-full flex flex-col gap-10">
    <div>
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
    </div>
    <div class="ml-auto flex items-end gap-4">
      <div class="flex items-center gap-8 p-4" @mouseenter="emitCursorHover(true)" @mouseleave="emitCursorHover(false)">
        <a href="">
          <button>
            <img src="/assets/icons/linkedin.svg" class="w-6 h-6" alt="linkedin">
          </button>
        </a>
        <a href="">
          <button>
            <img src="/assets/icons/github.svg" class="w-6 h-6" alt="github">
          </button>
        </a>
        <a href="">
          <button>
            <img src="/assets/icons/telegram.svg" class="w-6 h-6" alt="telegram">
          </button>
        </a>
      </div>
      <div class="w-80 overflow-hidden">
        <img src="/images/image.jpg" alt="" class="w-full h-full object-cover aspect-square"></img>
      </div>
    </div>
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