import Lenis from 'lenis';

interface LenisScrollEvent {
  scroll: number;
  velocity: number;
}

export const useSmoothScroll = () => {
  const lenis = ref<Lenis | null>(null);

  onMounted(() => {
    lenis.value = new Lenis({
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 2,
      infinite: false,
    })

    let snapTimeout: ReturnType<typeof setTimeout> | null = null;
    let lastScrollTime = Date.now();
    let isSnapping = false;

    lenis.value.on('scroll', ({ scroll, velocity }: LenisScrollEvent) => {
      const now = Date.now();

      if (Math.abs(velocity) < 0.05 && !isSnapping && now - lastScrollTime > 100) {
        if (snapTimeout) clearTimeout(snapTimeout);

        snapTimeout = setTimeout(() => {
          const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));
          const scrollPosition = scroll;
          const windowHeight = window.innerHeight;

          let closestSection: HTMLElement | null = null;
          let closestDistance = Infinity;

          for (const section of sections) {
            const rect = section.getBoundingClientRect();
            const sectionTop = scrollPosition + rect.top;
            const distance = Math.abs(sectionTop);

            if (distance < windowHeight * 0.5 && distance < closestDistance) {
              closestDistance = distance;
              closestSection = section;
            }
          }

          if (closestSection && closestDistance < windowHeight * 0.4) {
            isSnapping = true;
            const rect = closestSection.getBoundingClientRect();
            const targetScroll = scrollPosition + rect.top;

            lenis.value?.scrollTo(targetScroll, {
              duration: 1.0,
              easing: (t: number) =>
                t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
              onComplete: () => {
                isSnapping = false;
              },
            })
          }
        }, 200);
      }

      lastScrollTime = now;
    })

    const raf = (time: number) => {
      lenis.value?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  })

  onUnmounted(() => {
    lenis.value?.destroy();
  })

  const scrollTo = (target: string | number | HTMLElement, options?: any) => {
    lenis.value?.scrollTo(target, options);
  }

  const stop = () => lenis.value?.stop();
  const start = () => lenis.value?.start();

  return {
    lenis,
    scrollTo,
    stop,
    start,
  }
}
