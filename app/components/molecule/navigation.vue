<script setup lang="ts">
import { frame, motion, type SpringOptions, useMotionValue, useSpring } from 'motion-v';
</script>

<template>
  <nav class="flex items-end justify-between border-b border-dashed border-gray-700">
    <ul class="flex items-center gap-10 p-2 px-10">
      <li>About</li>
      <li>Career</li>
      <li>Projects</li>
    </ul>

    <div class="border-l border-dashed border-gray-700 h-20 w-50 flex items-end">
      <button class="bg-violet-600 py-4 px-8 text-xl">
        Reach me
      </button>
    </div>
  </nav>
</template>