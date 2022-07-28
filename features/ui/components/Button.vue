<script setup lang="ts">
const props = defineProps<{
  colorScheme: string;
}>();

const colorProps = computed(() => ({
  from: `
    ${props.colorScheme}-400 
    hover:${props.colorScheme}-600 
    focus:${props.colorScheme}-700
    disabled:${props.colorScheme}-300
  `,
  to: `
    ${props.colorScheme}-600
    hover:${props.colorScheme}-800 
    focus:${props.colorScheme}-900 
    disabled:${props.colorScheme}-400
  `
}));
</script>

<template>
  <button
    v-bind="colorProps"
    bg-gradient-to-r
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
