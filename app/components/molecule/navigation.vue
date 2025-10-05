<script setup lang="ts">
const emitCursorHover = (hovering: boolean) => {
  window.dispatchEvent(new CustomEvent('cursor-hover', {
    detail: { hovering }
  }))
}
</script>

<template>
  <nav class="col-span-3 flex items-end justify-between">
    <ul class="flex items-center gap-10 p-2 px-10">
      <li>About</li>
      <li>Career</li>
      <li>Projects</li>
    </ul>

    <div class="h-full">
      <atom-sticky-element>
        <button class="py-5 pl-6 pr-8 text-xl flex items-center gap-4 border-gray-500 hover:border"
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