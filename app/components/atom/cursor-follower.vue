<script setup lang="ts">
type Position = { x: number; y: number };

const mousePos = ref<Position>({ x: 0, y: 0 });
const followerPos = ref<Position>({ x: 0, y: 0 });

let rafId: number | null = null;

const handleMouseMove = (e: MouseEvent) => {
  mousePos.value = { x: e.clientX, y: e.clientY };
};

const animate = (): void => {
  followerPos.value = {
    x: followerPos.value.x + (mousePos.value.x - followerPos.value.x) * 0.1,
    y: followerPos.value.y + (mousePos.value.y - followerPos.value.y) * 0.1,
  };
  rafId = requestAnimationFrame(animate);
};

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
  animate();
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
  if (rafId !== null) cancelAnimationFrame(rafId);
});
</script>

<template>
  <div
    :class="['fixed pointer-events-none z-50 w-10 h-10 rounded-full mix-blend-difference bg-white']"
    :style="{
      left: `${followerPos.x}px`,
      top: `${followerPos.y}px`,
      transform: 'translate(-50%, -50%)',
    }"
  />
</template>
