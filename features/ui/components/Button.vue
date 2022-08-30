<script setup lang="ts">
const props = defineProps<{
  colorScheme: string;
}>();

const colorProps = computed(() => ({
  bg: `
    ${props.colorScheme}-500 
    hover:${props.colorScheme}-600 
    focus:${props.colorScheme}-700
    disabled:${props.colorScheme}-300
  `
}));
</script>

<template>
  <button
    v-bind="colorProps"
    color-white
    duration-200
    font-bold
    outline="focus:none"
    p-x-5
    p-y-2
    rounded
    text-xl
    transition-colors
  >
    <slot />
  </button>
</template>
