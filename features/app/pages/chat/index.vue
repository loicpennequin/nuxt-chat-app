<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  needsAuth: true
});

const pusher = usePusher();

onUnmounted(() => {
  Object.keys(pusher?.channels.channels || {}).forEach(channel => {
    pusher?.unsubscribe(channel);
  });
});
</script>

<template>
  <UiSurface class="chat-grid" grid h-full p="0">
    <AppHeader />
    <AppChannelList border-b="solid 1 white" />
    <AppChannelView />
    <AppMessageForm />
  </UiSurface>
</template>

<style scoped>
.chat-grid {
  grid-template-rows: auto auto 1fr auto;
  grid-auto-columns: minmax(0, 1fr);
}
</style>
