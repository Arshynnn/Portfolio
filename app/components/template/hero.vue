<script setup lang="ts">
interface Dot {
  id: number
  isVertical: boolean
  position: number
  delay: number
  duration: number
  size: number
  color: string
};

const dots = ref<Dot[]>([]);

const colors: string[] = ["#a855f7", "#3b82f6", "#06b6d4", "#f472b6"];

function randomItem<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error("Array must not be empty")
  }
  return arr[Math.floor(Math.random() * arr.length)]!
}

onMounted(() => {
  dots.value = Array.from({ length: 8 }, (_, i): Dot => ({
    id: i,
    isVertical: Math.random() > 0.5,
    position: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 6 + 6,
    size: Math.random() * 3 + 2,
    color: randomItem(colors)
  }))
})
</script>


<template>
  <section class="relative w-full h-screen bg-black text-white flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 opacity-50">
      <div v-for="i in 22" :key="`v-${i}`"
        class="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/25 to-transparent"
        :style="{ left: `${(i * 4.5)}%` }" />
      <div v-for="i in 16" :key="`h-${i}`"
        class="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/25 to-transparent"
        :style="{ top: `${(i * 6)}%` }" />
    </div>

    <div class="absolute inset-0">
      <template v-for="dot in dots" :key="dot.id">
        <div :class="[
          'absolute rounded-full blur-[1px]',
          dot.isVertical ? 'animate-travel-vertical' : 'animate-travel-horizontal'
        ]" :style="{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: dot.color,
            boxShadow: `0 0 12px 2px ${dot.color}`,
            ...(dot.isVertical ? { left: `${dot.position}%` } : { top: `${dot.position}%` }),
            animationDelay: `${dot.delay}s`,
            animationDuration: `${dot.duration}s`
          }" />
      </template>
    </div>

    <organism-about-me class="relative z-10" />
  </section>
</template>

<style scoped>
@keyframes travel-vertical {
  0% {
    top: -10px;
    opacity: 0;
    transform: scale(0.6);
  }

  15% {
    opacity: 1;
    transform: scale(1);
  }

  85% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    top: calc(100% + 10px);
    opacity: 0;
    transform: scale(0.6);
  }
}

@keyframes travel-horizontal {
  0% {
    left: -10px;
    opacity: 0;
    transform: scale(0.6);
  }

  15% {
    opacity: 1;
    transform: scale(1);
  }

  85% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    left: calc(100% + 10px);
    opacity: 0;
    transform: scale(0.6);
  }
}

.animate-travel-vertical {
  animation: travel-vertical linear infinite;
}

.animate-travel-horizontal {
  animation: travel-horizontal linear infinite;
}
</style>
