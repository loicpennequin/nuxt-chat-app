<script setup lang="ts">
import { StarportCarrier } from 'vue-starport';
</script>

<template>
  <Meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <Title>Nuxt Chat app</Title>

  <StarportCarrier>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </StarportCarrier>
</template>

<style lang="scss">
* {
  /* Firefox */
  scrollbar-color: #666;
  scrollbar-width: 12px;
  /* Chrome */
  ::-webkit-scrollbar {
    --at-apply: 'bg-transparent';
    width: 10px;
    height: 10px;
    border-radius: 4px;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar-thumb {
    --at-apply: 'bg-gray-800 dark-bg-dark-300';
    border-radius: 10px;
  }
}

#__nuxt {
  --at-apply: 'bg-light-300 dark:bg-dark-300 color-black dark:color-white font-sans min-h-screen';
}

// .page-enter-active,
// .page-leave-active {
//   --at-apply: 'transition-all duration-300';
// }

// .page-enter-from,
// .page-leave-to {
//   opacity: 0;
// }

// .page-enter-from {
//   transform: translateY(-400px);
// }

// .page-leave-to {
//   transform: translateY(400px);
// }
</style>
