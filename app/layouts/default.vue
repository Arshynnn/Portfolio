<script setup lang="ts"></script>

<template>
  <div class="w-full min-h-screen bg-black text-white relative overflow-hidden">
    <div class="fixed inset-0 opacity-20 z-30 pointer-events-none">
      <!-- Vertical lines -->
      <div v-for="i in 100" :key="`v-${i}`"
        class="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-400/60 to-transparent"
        :style="{ left: `${i * 20}px` }" />

      <!-- Horizontal lines -->
      <div v-for="i in 100" :key="`h-${i}`"
        class="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400/60 to-transparent"
        :style="{ top: `${i * 20}px` }" />
    </div>

    <slot />
    <!-- <organism-app-footer /> -->
  </div>
</template>