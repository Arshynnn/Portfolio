<script setup lang="ts">
const { topEdge, bottomEdge } = useBorders();

const sectionRef = ref<HTMLElement | null>(null);
const visibleItems = ref<number[]>([]);
const isVisible = ref(false);
let timeouts: number[] = [];

function clearTimers() {
  timeouts.forEach((t) => clearTimeout(t));
  timeouts = [];
}

function animateTimeline() {
  visibleItems.value = [];
  clearTimers();

  for (let i = 1; i <= 32; i++) {
    const timer = window.setTimeout(() => {
      visibleItems.value.push(i);
    }, i * 80);
    timeouts.push(timer);
  }
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry && entry.isIntersecting) {
        if (!isVisible.value) {
          isVisible.value = true;
          animateTimeline();
        }
      } else {
        if (isVisible.value) {
          isVisible.value = false;
          clearTimers();
          visibleItems.value = [];
        }
      }
    },
    { threshold: 0.3 }
  );

  if (sectionRef.value) observer.observe(sectionRef.value);

  onUnmounted(() => {
    observer.disconnect();
    clearTimers();
  });
});
</script>

<template>
  <section ref="sectionRef" id="career" class="relative w-full h-screen">
    <transition name="fade">
      <div v-if="isVisible" class="w-full h-full grid grid-cols-2 items-center gap-4 overflow-hidden"
        :style="{ paddingTop: `${topEdge}px`, paddingBottom: `${bottomEdge}px` }">
        <atom-morphing-gradient class="opacity-50 z-0" />

        <div class="w-60 h-60 aspect-square overflow-hidden ml-auto">
          <img src="/assets/icons/github.svg" alt="" class="w-full h-full object-cover" />
        </div>

        <div class="w-full h-full flex items-start justify-between">
          <div class="w-full h-full flex items-center justify-center">
            <ul class="timeline p-4 h-full flex flex-col-reverse justify-end gap-2 overflow-hidden">
              <transition-group name="slide-fade" tag="div">
                <li v-for="i in visibleItems" :key="i" :class="['animate-timeline', `time-${i}`]">
                  {{ i.toString().padStart(2, '0') }}
                </li>
              </transition-group>
            </ul>

            <ul class="relative w-full max-h-screen overflow-hidden pl-8.5 space-y-10">
              <div class="absolute left-4 w-[1px] h-full bg-gradient-to-b via-gray-500/80 to-transparent"></div>
              <li
                class="before:content-['01.'] before:mr-2 before:border before:rounded-full before:w-9 before:h-9 before:flex before:items-center before:justify-center flex items-start">
                <div class="flex flex-col">
                  <strong>Event GO</strong>
                  <small>Interactive Developer</small>
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
                class="before:content-['03.'] before:mr-2 before:border before:rounded-full before:w-9 before:h-9 before:flex before:items-center before:justify-center flex items-start">
                <div class="flex flex-col">
                  <strong>Ai-man</strong>
                  <small>Software Engineer</small>
                </div>
              </li>
              <li
                class="before:content-['04.'] before:mr-2 before:bg-white before:text-black before:rounded-full before:w-9 before:h-9 before:flex before:items-center before:justify-center flex items-start">
                <div class="flex flex-col">
                  <strong>ForteBank</strong>
                  <small>Frontend Engineer</small>
                </div>
              </li>
            </ul>
          </div>
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

.slide-fade-enter-active {
  transition: all 0.4s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.timeline {
  font-family: "Handjet", sans-serif;
}

.animate-timeline {
  animation: fadeSlideUp 0.4s ease forwards;
  opacity: 0;
  will-change: transform, opacity;
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }

  to {
    opacity: var(--final-opacity, 1);
    transform: translateY(0);
  }
}

.time-1  { --final-opacity: 0.960; }
.time-2  { --final-opacity: 0.922; }
.time-3  { --final-opacity: 0.884; }
.time-4  { --final-opacity: 0.848; }
.time-5  { --final-opacity: 0.812; }
.time-6  { --final-opacity: 0.777; }
.time-7  { --final-opacity: 0.743; }
.time-8  { --final-opacity: 0.710; }
.time-9  { --final-opacity: 0.678; }
.time-10 { --final-opacity: 0.646; }
.time-11 { --final-opacity: 0.616; }
.time-12 { --final-opacity: 0.586; }
.time-13 { --final-opacity: 0.557; }
.time-14 { --final-opacity: 0.529; }
.time-15 { --final-opacity: 0.501; }
.time-16 { --final-opacity: 0.474; }
.time-17 { --final-opacity: 0.448; }
.time-18 { --final-opacity: 0.422; }
.time-19 { --final-opacity: 0.397; }
.time-20 { --final-opacity: 0.373; }
.time-21 { --final-opacity: 0.349; }
.time-22 { --final-opacity: 0.326; }
.time-23 { --final-opacity: 0.303; }
.time-24 { --final-opacity: 0.281; }
.time-25 { --final-opacity: 0.260; }
.time-26 { --final-opacity: 0.239; }
.time-27 { --final-opacity: 0.218; }
.time-28 { --final-opacity: 0.198; }
.time-29 { --final-opacity: 0.179; }
.time-30 { --final-opacity: 0.160; }
.time-31 { --final-opacity: 0.122; }
.time-32 { --final-opacity: 0.084; }
</style>