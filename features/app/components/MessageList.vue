<script setup lang="ts">
export type Message = {
  author: string;
  message: string;
  isSystem?: boolean;
};

const store = useStore();
const messages = computed(() => store.currentChannel.messages);

const anchor = ref<HTMLElement>();
const scrollToBottom = () => {
  requestAnimationFrame(() => {
    anchor.value?.scrollIntoView({ behavior: 'smooth' });
  });
};

watch(() => messages.value.length, scrollToBottom);
</script>

<template>
  <div h-full>
    <div id="message-list-top" />
    <TransitionGroup
      id="message-list-top"
      h-full
      name="message"
      overflow-y-auto
      p-x-4
      p-y-2
      tag="ul"
    >
      <li v-for="message in messages" :key="message.message" flex gap-3>
        <span break-all :font="message.isSystem && 'italic'">
          <span v-if="!message.isSystem" font-bold>{{ message.author }}</span>
          : {{ message.message }}
        </span>
      </li>
      <li key="back-anchor">
        <a ref="anchor" href="#message-list-top" invisible>Back to top</a>
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.message-move,
.message-enter-active,
.message-leave-active {
  --at-apply: 'transition-all ease-in-out duration-300';
}

.message-enter-from,
.message-leave-to {
  opacity: 0;
  --at-apply: 'opacity-0 -translate-x-10';
}
</style>
