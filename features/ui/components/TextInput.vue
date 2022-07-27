<script setup lang="ts">
import { Maybe } from '~~/features/app/utils';

const props = defineProps<{ modelValue: Maybe<string> }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>();

const vModel = useVModel(props, 'modelValue', emit);
</script>

<template>
  <input v-model="vModel" bg-opacity-50 bg-white outline="focus:none" p-2 />
</template>
