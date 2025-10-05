<script setup lang="ts">
const mounted = useMounted();
const blobEl = ref<{ $el: HTMLElement } | null>(null);

const props = withDefaults(
  defineProps<{
    size?: string;
    blur?: number;
    scaleAmplitude?: number;
  }>(),
  {
    size: "20vw",
    blur: 70,
    scaleAmplitude: 0.2,
  }
);

const previousAngle = ref(0);
const totalRotation = ref(0);
const smoothAngle = ref(0);

function remap(v: number, domain: [number, number], newDomain: [number, number]): number {
  return newDomain[0] + ((v - domain[0]) * (newDomain[1] - newDomain[0])) / (domain[1] - domain[0]);
}

function randomScale(): string {
  if (!blobEl.value) return "1 1 1";
  const magnitude = props.scaleAmplitude;
  return [
    remap(Math.random(), [0, 1], [1 - magnitude, 1 + magnitude]),
    remap(Math.random(), [0, 1], [1 - magnitude, 1 + magnitude]),
    remap(Math.random(), [0, 1], [1 - magnitude, 1 + magnitude]),
  ].join(" ");
}

function randomBorderRadius(): string {
  if (!blobEl.value) return "0%";
  const rand = () => remap(Math.random(), [0, 1], [10, 80]);
  return `${rand()}% ${rand()}% ${rand()}% ${rand()}% / ${rand()}% ${rand()}% ${rand()}% ${rand()}%`;
}

function morph() {
  if (!blobEl.value) return;
  const el = blobEl.value.$el as HTMLElement;

  el.style.scale = randomScale();
  el.style.borderRadius = randomBorderRadius();
  el.style.filter = `blur(${props.blur}px)`;

  setTimeout(() => requestAnimationFrame(morph), Math.random() * 2000 + 2000);
}

function getSmoothAngle(angle: number) {
  let delta = angle - previousAngle.value;
  if (delta > Math.PI) delta -= 2 * Math.PI;
  else if (delta < -Math.PI) delta += 2 * Math.PI;

  totalRotation.value += delta;
  previousAngle.value = angle;
  return totalRotation.value;
}

function mouseMove(ev: MouseEvent) {
  if (!blobEl.value?.$el) return;
  const rect = blobEl.value.$el.getBoundingClientRect();
  const deltaX = ev.clientX - (rect.left + rect.width / 2);
  const deltaY = ev.clientY - (rect.top + rect.height / 2);
  smoothAngle.value = getSmoothAngle(Math.atan2(deltaY, deltaX));
}

onMounted(() => {
  setTimeout(() => requestAnimationFrame(morph), 400);
  window.addEventListener("mousemove", mouseMove);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", mouseMove);
});
</script>

<template>
  <div
    v-if="mounted"
    class="absolute z-0 top-1/2 left-1/2 transform -translate-1/2 flex justify-center items-start pointer-events-none"
  >
    <Motion
      ref="blobEl"
      tag="div"
      class="blob"
      :animate="{ rotate: `${smoothAngle}rad`, transition: { duration: 2 } }"
    />
  </div>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.blob {
  width: v-bind(size);
  height: v-bind(size);
  transform-origin: center !important;
  filter: blur(0px);
  border-radius: 40%;
  background: linear-gradient(var(--color-violet-600), var(--color-rose-600));
  animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
  /* z-index: -100 !important; */
  transition: filter 3s, scale 3s, border-radius 6s;
}
</style>
