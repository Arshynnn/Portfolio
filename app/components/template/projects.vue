<script setup lang="ts">
const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);
let timeoutId: number | null = null;

const emitCursorHover = (hovering: boolean) => {
  window.dispatchEvent(new CustomEvent('cursor-hover', {
    detail: { hovering }
  }))
}

interface Project {
  id: number;
  tag: string;
  name: string;
  description: string;
  image: string;
  link?: string;
  archived: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    tag: "wepapp",
    name: "Ai-man",
    description: "No-code AI assistant platform for business messaging",
    image: "/images/projects/ai-man.png",
    link: "https://ai-man.kz/",
    archived: false,
  },
  {
    id: 2,
    tag: "mobile",
    name: "Unio",
    description: "Cross-platform NFC mobile app with customizable digital identity cards",
    image: "/images/projects/unio.png",
    archived: true,
  },
  {
    id: 3,
    tag: "webapp",
    name: "SDU-LIFE",
    description: "Event management platform for university administration",
    image: "/images/projects/sdu-life.png",
    link: "https://life.sdu.edu.kz/",
    archived: false,
  }
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry) {
        if (entry.isIntersecting) {
          timeoutId = window.setTimeout(() => {
            isVisible.value = true;
          }, 200);
        } else {
          if (timeoutId) clearTimeout(timeoutId);
          isVisible.value = false;
        }
      }
    },
    { threshold: 0.3 }
  );

  if (sectionRef.value) observer.observe(sectionRef.value);

  onUnmounted(() => {
    observer.disconnect();
    if (timeoutId) clearTimeout(timeoutId);
  })
})
</script>

<template>
  <section ref="sectionRef" id="projects"
    class="relative w-full h-screen flex items-center justify-center overflow-hidden">
    <transition name="fade">
      <div v-if="isVisible" class="absolute top-0 w-full overflow-hidden bg-violet-700 text-white py-3 z-50">
        <div class="ribbon flex gap-8 whitespace-nowrap">
          <template v-for="repeat in 2">
            <span v-for="i in 8" :key="`${repeat}-${i}`" class="flex items-center gap-6 mx-3">
              <p class="text-lg font-semibold">HELLO, WORLD!</p>
              <img src="/assets/icons/x-fat.svg" alt="x" />
            </span>
          </template>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="isVisible" class="absolute inset-0 flex z-40">
        <div class="w-3/10 bg-neutral-900"></div>
        <div class="w-6/10 bg-neutral-900 ml-auto"></div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="isVisible" class="w-full h-full flex justify-between z-50">
        <div class="w-3/10 px-10 py-20 flex flex-col justify-between">
          <div>
            <h2 class="projects-title text-2xl font-bold">Fancy Staff from My Collection</h2>
            <p class="text-gray-500">Ideas I've brought to life</p>
          </div>

          <footer>
            <div class="flex items-center gap-8" @mouseenter="emitCursorHover(true)"
              @mouseleave="emitCursorHover(false)">
              <a href="">
                <button>
                  <img src="/assets/icons/linkedin.svg" class="w-6 h-6" alt="linkedin">
                </button>
              </a>
              <a href="">
                <button>
                  <img src="/assets/icons/github.svg" class="w-6 h-6" alt="github">
                </button>
              </a>
              <a href="">
                <button>
                  <img src="/assets/icons/telegram.svg" class="w-6 h-6" alt="telegram">
                </button>
              </a>
            </div>
          </footer>
        </div>

        <div class="w-6/10 h-full p-40 grid grid-cols-2 gap-10">
          <div v-for="project in projects" :key="project.id" class="w-full h-full flex flex-col group">
            <div class="flex items-center justify-between">
              <span class="px-2 text-sm font-semibold bg-gray-700 text-gray-500">index#0{{ project.id }}</span>
              <span class="px-2 text-sm font-semibold bg-violet-700 text-white">{{ project.tag }}</span>
            </div>
            <div class="relative w-full h-full flex flex-col justify-between p-4 border border-gray-700">
              <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
                <img :src="project.image" :alt="project.name"
                  class="w-full h-full object-cover opacity-0 transition-all duration-300 hover:opacity-20 hover:scale-110">
              </div>
              <a :href="project.link" target="_blank"
                class="absolute top-4 right-4 transition-all duration-300 group-hover:top-2 group-hover:right-2">
                <img src="/assets/icons/arrow-up-right.svg" alt="visit" />
              </a>
              <div class="flex flex-col items-start">
                <h3>{{ project.name }}</h3>
                <span class="rounded-md px-3 py-1 flex items-center gap-2 text-xs font-medium border border-gray-500">
                  {{ project.archived ? '🗃️ archived' : '🚀 shipped' }}
                  <div
                    :class="['w-1.5 h-1.5 rounded-full animate-pulse', project.archived ? 'bg-amber-500' : 'bg-green-500']">
                  </div>
                </span>
              </div>
              <p class="text-gray-500 text-sm/tight">
                {{ project.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease, transform 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.ribbon {
  font-family: "Noto Sans", sans-serif;
  display: inline-flex;
  animation: scroll-left 40s linear infinite;
  will-change: transform;
  font-variation-settings:
    "wdth" 100;
}

.projects-title {
  font-family: "Inter", sans-serif;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>