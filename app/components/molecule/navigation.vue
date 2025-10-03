<script setup lang="ts">
const emitCursorHover = (hovering: boolean) => {
  window.dispatchEvent(new CustomEvent('cursor-hover', {
    detail: { hovering }
  }))
}
</script>

<template>
  <nav class="flex items-end justify-between border-b border-dashed border-gray-700">
    <ul class="flex items-center gap-10 p-2 px-10">
      <li>About</li>
      <li>Career</li>
      <li>Projects</li>
    </ul>

    <div class="border-l border-dashed border-gray-700 h-25 w-55 flex items-end">
      <atom-sticky-element>
        <button class="bg-violet-600 py-5 px-10 text-xl flex gap-4" @mouseenter="emitCursorHover(true)"
          @mouseleave="emitCursorHover(false)">
          <img src="/assets/icons/send.svg" alt="" class="" />
          Reach me
        </button>
      </atom-sticky-element>
    </div>
  </nav>
</template>