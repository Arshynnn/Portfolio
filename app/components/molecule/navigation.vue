<script setup lang="ts">
const emitCursorHover = (hovering: boolean) => {
  window.dispatchEvent(new CustomEvent('cursor-hover', {
    detail: { hovering }
  }))
}

const scrollToSection = (id: string) => {
  const el = document.querySelector(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <nav class="w-full flex items-end justify-between">
    <ul class="flex items-center gap-10 p-2 px-10">
      <li><a @click.prevent="scrollToSection('#about')" href="#about">About</a></li>
      <li><a @click.prevent="scrollToSection('#career')" href="#career">Career</a></li>
      <li><a @click.prevent="scrollToSection('#projects')" href="#projects">Projects</a></li>
    </ul>

    <div class="h-full">
      <atom-sticky-element>
        <button class="py-5 pl-6 pr-8 text-xl flex items-center gap-4"
          @mouseenter="emitCursorHover(true)" @mouseleave="emitCursorHover(false)">
          <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <img src="/assets/icons/send.svg" alt="" class="-ml-0.5 -mb-0.5" />
          </div>
          Reach me
        </button>
      </atom-sticky-element>
    </div>
  </nav>
</template>