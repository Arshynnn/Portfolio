<script setup lang="ts"></script>

<template>
  <section class="relative w-full h-screen grid grid-cols-5 grid-rows-5">
    <div class="col-start-1 row-start-1 w-full h-full grid border-b border-dashed border-gray-500"></div>
    <div class="col-start-5 row-start-1 w-full h-full grid border-b border-dashed border-gray-500"></div>
    <!-- <atom-morphing-gradient class="opavity-50 z-0" /> -->
    <organism-about-me />
    <div class="col-start-1 row-start-5 w-full h-full grid border-t border-dashed border-gray-500"></div>
    <div class="col-start-5 row-start-5 w-full h-full grid border-t border-dashed border-gray-500"></div>
  </section>
</template>