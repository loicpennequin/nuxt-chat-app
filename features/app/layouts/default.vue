<script setup lang="ts">
const nuxtApp = useNuxtApp();

const isTransitioning = ref(false);
nuxtApp.hook('page:start', () => {
  isTransitioning.value = true;
});
nuxtApp.hook('page:finish', () => {
  setTimeout(() => {
    isTransitioning.value = false;
  }, 300);
});
</script>
<template>
  <UiBackground :class="isTransitioning && 'overflow-hidden h-screen'">
    <UiContainer h-full p-y-5>
      <slot />
    </UiContainer>
  </UiBackground>
</template>
