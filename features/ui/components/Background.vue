<script setup lang="ts">
import { theme } from '@unocss/preset-wind';

const gradientColors = computed(() => ({
  // @ts-ignore
  from: theme.colors.white,
  // @ts-ignore
  to: theme.colors.white
}));
</script>

<template>
  <div class="background" h-screen t>
    <slot />
  </div>
</template>

<style scoped>
.background {
  background-image: linear-gradient(
    135deg,
    v-bind('gradientColors.from'),
    v-bind('gradientColors.to')
  );
}
</style>
