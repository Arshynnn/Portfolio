<script setup lang="ts">
const { topEdge, bottomEdge } = useBorders();

const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry) {
        isVisible.value = entry.isIntersecting
      }
    },
    { threshold: 0.3 }
  );

  if (sectionRef.value) observer.observe(sectionRef.value)

  onUnmounted(() => observer.disconnect());
})
</script>

<template>
  <section id="about" ref="sectionRef" class="relative w-full h-screen text-white">
    <transition name="fade">
      <div v-if="isVisible" class="w-full h-full grid grid-cols-2 grid-rows-2"
        :style="{ paddingTop: `${topEdge}px`, paddingBottom: `${bottomEdge}px` }">
        <div class="col-start-2 row-start-1 flex items-center justify-end gap-4">
          <div>
            <span>When im not <strong>Sleeping</strong></span>
            <div class="py-2 px-4 rounded-md bg-gray-700">
              <p class="truncate">Im trying to learn new things!</p>
            </div>
          </div>
          <div class="w-40 h-40 aspect-sqare overflow-hidden">
            <img src="/assets/icons/github.svg" alt="" class="w-full h-full object-cover" />
          </div>
        </div>
        <div class="flex flex-col justify-end row-start-2">
          <h2 class="text-4xl font-bold mb-4">About Me</h2>
          <p class="text-lg text-gray-300 leading-relaxed max-w-md">
            I'm a passionate developer focused on creating clean, interactive, and performant web
            applications. I love experimenting with frontend technologies and bringing ideas to life.
          </p>
        </div>
      </div>
    </transition>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
