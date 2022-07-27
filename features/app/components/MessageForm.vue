<script setup lang="ts">
const currentMessage = ref('');
const store = useStore();

const sendMessage = async () => {
  await $fetch('/api/message', {
    method: 'post',
    body: {
      channel: store.currentChannelId,
      message: currentMessage.value,
      target: store.currentChannel.isDM && store.currentChannel.name
    }
  });

  currentMessage.value = '';
};
</script>

<template>
  <form col-span-full flex @submit.prevent="sendMessage">
    <UiTextInput v-model="currentMessage" flex-1 />
    <UiButton
      color-scheme="purple"
      :disabled="!currentMessage.length"
      rounded="0"
      title="send message"
    >
      <div i-ui-send-message />
    </UiButton>
  </form>
</template>
