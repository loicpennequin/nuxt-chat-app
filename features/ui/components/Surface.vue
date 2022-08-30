<script setup lang="ts">
const props = withDefaults(defineProps<{ is?: string }>(), {
  is: 'div'
});
</script>

<template>
  <component
    :is="props.is"
    backdrop-blur-xl
    bg="white opacity-40"
    border="solid 1 light-8"
    color="inherit"
    p="6"
    rounded
  >
    <slot />
  </component>
</template>
