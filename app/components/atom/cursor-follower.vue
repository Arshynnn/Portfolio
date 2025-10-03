<script setup lang="ts">
import { Motion, useMotionValue, useSpring } from 'motion-v'

const mouseX = useMotionValue(0)
const mouseY = useMotionValue(0)

const cursorX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 })
const cursorY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 })

const scale = useMotionValue(1)
const cursorScale = useSpring(scale, { stiffness: 300, damping: 20 })

const handleMouseMove = (e: MouseEvent) => {
  mouseX.set(e.clientX)
  mouseY.set(e.clientY)
}

const handleCursorHover = (e: CustomEvent) => {
  scale.set(e.detail.hovering ? 2 : 1)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('cursor-hover', handleCursorHover as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('cursor-hover', handleCursorHover as EventListener)
})
</script>

<template>
  <Motion
    tag="div"
    class="fixed pointer-events-none z-50 w-10 h-10 rounded-full mix-blend-difference bg-white"
    :style="{
      left: 0,
      top: 0,
      x: cursorX,
      y: cursorY,
      scale: cursorScale,
      translateX: '-50%',
      translateY: '-50%',
    }"
  />
</template>