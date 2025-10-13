<script setup lang="ts">
const { topEdge, bottomEdge } = useBorders();

const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);

const activities = [
  { word: "Snoozing", img: "/images/about/sleeping.jpg" },
  { word: "Training", img: "/images/about/training.gif" },
  { word: "Reading", img: "/images/about/reading.png" },
] as const;

const currentIndex = ref(0);

const currentActivity = computed(() => {
  const activity = activities[currentIndex.value];
  if (!activity) {
    return activities[0];
  }
  return activity;
})

let intervalId: number | undefined;

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

  intervalId = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % activities.length;
  }, 4000);

  onUnmounted(() => {
    observer.disconnect();
    clearInterval(intervalId);
  });
});
</script>

<template>
  <section ref="sectionRef" id="about" class="relative w-full h-screen text-white">
    <transition name="fade">
      <div v-if="isVisible" class="w-full h-full grid grid-cols-2 grid-rows-2"
        :style="{ paddingTop: `${topEdge}px`, paddingBottom: `${bottomEdge}px` }">
        <div class="p-4 space-y-4">
          <div class="flex items-center gap-2">
            <span class="w-10 h-10 rounded-full flex items-center justify-center bg-white ">
              <img src="/assets/icons/study.svg" alt="">
            </span>
            <strong>Edudation</strong>
          </div>
          <ul class="relative pl-8.5 space-y-4 list-disc">
            <div class="absolute left-4.5 w-[1px] h-full bg-gradient-to-b via-gray-500/80 to-transparent"></div>
            <li>Bilim Innovation Lyceum (KTL)</li>
            <li>SDU University</li>
          </ul>
        </div>

        <div class="row-span-2 flex items-center justify-end gap-4">
          <div class="flex flex-col gap-2 items-end text-right">
            <div class="flex gap-1">
              When I'm not
              <span class="w-20 text-center rounded-md bg-gray-800">
                <transition name="slide-fade" mode="out-in">
                  <strong :key="currentActivity.word" class="text-sky-500">
                    {{ currentActivity.word }}
                  </strong>
                </transition>
              </span>
            </div>

            <div class="py-2 px-4 rounded-md bg-gray-700 rounded-tr-none">
              <p class="truncate">I'm trying to learn new skills!</p>
            </div>
          </div>

          <transition name="fade" mode="out-in">
            <div :key="currentActivity.img" class="w-40 h-40 aspect-square overflow-hidden rounded-lg shadow-lg">
              <img :src="currentActivity.img" alt="" class="w-full h-full object-cover" />
            </div>
          </transition>
        </div>

        <div class="flex flex-col justify-end row-start-2">
          <h2 class="text-4xl font-bold mb-4">About Me</h2>
          <p class="text-lg text-gray-300 leading-relaxed max-w-md">
            Web dev, design, and a bit of chaos — I like creating stuff that feels good to use.
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

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.6s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(15px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>