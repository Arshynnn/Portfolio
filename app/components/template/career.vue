<script setup lang="ts">
const { topEdge, bottomEdge } = useBorders();

const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry) {
        isVisible.value = entry.isIntersecting;
      }
    },
    { threshold: 0.3 }
  )

  if (sectionRef.value) observer.observe(sectionRef.value);

  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

<template>
  <section ref="sectionRef" id="career" class="relative w-full h-screen">
    <transition name="fade">
      <div v-if="isVisible" class="w-full h-full grid grid-cols-2 items-center gap-4 overflow-hidden"
        :style="{ paddingTop: `${topEdge}px`, paddingBottom: `${bottomEdge}px` }">
        <atom-morphing-gradient class="opavity-50 z-0" />
        <div class="w-60 h-60 aspect-square overflow-hidden p-4">
          <img src="/assets/icons/github.svg" alt="" class="w-full h-full object-cover" />
        </div>

        <div class="w-full h-full flex items-start justify-between">
          <div class="w-full h-full flex items-center justify-center">
            <ul class="relative w-full pl-8.5 space-y-10">
              <div class="absolute left-4 w-[1px] h-full bg-gradient-to-b via-gray-500/80 to-transparent"></div>
              <li
                class="before:content-['04.'] before:mr-2 before:bg-white before:text-black before:rounded-full before:w-9 before:h-9 before:flex before:items-center before:justify-center flex items-start">
                <div class="flex flex-col">
                  <strong>ForteBank</strong>
                  <small>Frontend Engineer</small>
                </div>
              </li>
              <li
                class="before:content-['03.'] before:mr-2 before:border before:rounded-full before:w-9 before:h-9 before:flex before:items-center before:justify-center flex items-start">
                <div class="flex flex-col">
                  <strong>Ai-man</strong>
                  <small>Software Engineer</small>
                </div>
              </li>
              <li
                class="before:content-['02.'] before:mr-2 before:border before:rounded-full before:w-9 before:h-9 before:flex before:items-center before:justify-center flex items-start">
                <div class="flex flex-col">
                  <strong>ABMco</strong>
                  <small>Software Engineer</small>
                </div>
              </li>
              <li
                class="before:content-['01.'] before:mr-2 before:border before:rounded-full before:w-9 before:h-9 before:flex before:items-center before:justify-center flex items-start">
                <div class="flex flex-col">
                  <strong>Event GO</strong>
                  <small>Interactive Developer</small>
                </div>
              </li>
            </ul>
          </div>

          <ul class="timeline p-4 h-full flex flex-col-reverse justify-end gap-2">
            <li v-for="i in 24" :key="i">{{ i.toString().padStart(2, '0') }}</li>
          </ul>
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

.timeline {
  font-family: "Handjet", sans-serif;
}
</style>