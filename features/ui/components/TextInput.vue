<script setup lang="ts">
import { Maybe } from '~~/features/app/utils';

const props = defineProps<{ modelValue: Maybe<string> }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>();

const vModel = useVModel(props, 'modelValue', emit);
</script>

<template>
  <input
    v-model="vModel"
    bg-opacity-80
    bg-white
    border="solid 1 light-8"
    outline="focus:none"
    p-2
  />
</template>
