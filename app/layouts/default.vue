<script setup lang="ts">
const { height: windowHeight } = useWindowSize();
const { y: scrollY } = useWindowScroll();

const width = ref(1024);
const maxWidth = ref(1536);

const updateDimensions = () => {
  const scrollPosition = scrollY.value;
  const documentHeight = document.documentElement.scrollHeight;
  const maxScroll = documentHeight - windowHeight.value;
  const scrollPercent = Math.min(scrollPosition / Math.max(maxScroll, 1), 1);

  const minWidth = 768;

  width.value = minWidth + (maxWidth.value - minWidth) * scrollPercent;
};

watch(scrollY, updateDimensions);
onMounted(updateDimensions);
</script>

<template>
  <div
    class="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center bg-black text-white">
    <div class="fixed inset-0 opacity-20 z-30 pointer-events-none">
      <div v-for="i in 100" :key="`v-${i}`"
        class="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-400/60 to-transparent"
        :style="{ left: `${i * 20}px` }" />

      <div v-for="i in 100" :key="`h-${i}`"
        class="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400/60 to-transparent"
        :style="{ top: `${i * 20}px` }" />
    </div>

    <div class="w-full mx-auto flex flex-col transition-all duration-300 ease-out" :style="{ maxWidth: `${width}px` }">
      <slot />
    </div>

    <organism-app-footer />
  </div>
</template>