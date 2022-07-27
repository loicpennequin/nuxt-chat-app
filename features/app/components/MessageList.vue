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

// avoids animating all the messages when switching channel
const isTransitionDisabled = ref(false);
watch(
  () => store.currentChannelId,
  () => {
    console.log('?');
    isTransitionDisabled.value = true;
    setTimeout(() => {
      isTransitionDisabled.value = false;
    }, 50);
  }
);
</script>

<template>
  <div :class="isTransitionDisabled && 'no-transitions'" h-full>
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
        <AppMessage :message="message" />
      </li>
      <li key="back-anchor">
        <a ref="anchor" href="#message-list-top" invisible>Back to top</a>
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.message-enter-active {
  --at-apply: 'transition-all ease-in-out duration-300';
}

.message-enter-from {
  opacity: 0;
  --at-apply: 'opacity-0 -translate-x-10';
}

.no-transitions * {
  transition: none !important;
}
</style>
