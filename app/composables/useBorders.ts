export function useBorders() {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const { y: scrollY } = useWindowScroll();

  const width = ref(1024);
  const height = ref(800);
  const maxWidth = ref(1536);
  const maxHeight = ref(1000);

  const updateDimensions = () => {
    const scrollPosition = scrollY.value;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight.value;
    const scrollPercent = Math.min(scrollPosition / Math.max(maxScroll, 1), 1);

    const minWidth = 768;
    const minHeight = 575;

    width.value = minWidth + (maxWidth.value - minWidth) * scrollPercent;
    height.value = minHeight + (maxHeight.value - minHeight) * scrollPercent;
  };

  const leftEdge = computed(() => (windowWidth.value - width.value) / 2 - 8);
  const rightEdge = computed(() => (windowWidth.value - width.value) / 2 - 8);
  const topEdge = computed(() => (windowHeight.value - height.value) / 2);
  const bottomEdge = computed(() => (windowHeight.value - height.value) / 2);

  watch(scrollY, updateDimensions);
  onMounted(updateDimensions);

  return { leftEdge, rightEdge, topEdge, bottomEdge, scrollY };
}
