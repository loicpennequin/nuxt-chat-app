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
    <ClientOnly>
      <AppHeader />
      <AppChannelList />
      <AppChannelView />
      <AppMessageForm />
    </ClientOnly>
  </UiSurface>
</template>

<style scoped>
.chat-grid {
  grid-template-rows: auto auto minmax(0, 1fr) auto;
  grid-auto-columns: minmax(0, 1fr);
}
</style>
