<script setup lang="ts">
const { leftEdge, rightEdge, topEdge, bottomEdge } = useBorders();
</script>

<template>
  <div class="pointer-events-none">
    <!-- Top Border -->
    <div
      class="fixed w-full h-[1px] left-0 top-0 bg-gradient-to-r via-gray-500/80 to-transparent z-50 transition-all duration-400 ease-out"
      :style="{ top: `${topEdge}px` }" />

    <!-- Left Border -->
    <div
      class="fixed h-screen w-[1px] top-0 left-0 bg-gradient-to-b via-gray-500/80 to-transparent z-50 transition-all duration-400 ease-out"
      :style="{ left: `${leftEdge}px` }" />

    <!-- Bottom Border -->
    <div
      class="fixed w-full h-[1px] left-0 bottom-0 bg-gradient-to-r via-gray-500/80 to-transparent z-50 transition-all duration-400 ease-out"
      :style="{ bottom: `${bottomEdge}px` }" />

    <!-- Right Border -->
    <div
      class="fixed h-screen w-[1px] top-0 right-0 bg-gradient-to-b via-gray-500/80 to-transparent z-50 transition-all duration-400 ease-out"
      :style="{ right: `${rightEdge}px` }" />
  </div>
</template>