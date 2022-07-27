<script setup lang="ts">
const props = withDefaults(defineProps<{ is?: string }>(), {
  is: 'div'
});
</script>

<template>
  <component
    :is="props.is"
    bg="white dark:dark-100 opacity-40"
    border="solid 2 white"
    color="inherit"
    p="6"
    rouned
  >
    <slot />
  </component>
</template>
