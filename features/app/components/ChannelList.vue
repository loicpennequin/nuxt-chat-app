<script setup lang="ts">
import { AppChannel, NewChannel } from '../composables/useStore';

const store = useStore();
const pusher = usePusher();

const userChannel = useUserChannel();

const createChannel = (data: { channel: NewChannel }) => {
  store.createDMChannel(data.channel);
};

const closeChannel = (index: number) => {
  store.closeChannel(index);
  pusher?.unsubscribe(store.channels[index].id);
};
userChannel?.value.bind('new-conversation', createChannel);

const getChannelColor = (channel: AppChannel) => {
  if (channel.id === store.currentChannelId) return 'purple-500';
  if (channel.hasUnreadMessages) return 'purple-300';

  return 'transparent';
};
</script>

<template>
  <nav>
    <ul flex gap-2>
      <li
        v-for="(channel, index) in store.channels"
        :key="channel.id"
        :bg="getChannelColor(channel)"
        :class="channel.hasUnreadMessages && 'animate-bounce'"
        :color="channel.id === store.currentChannelId ? 'white' : 'white'"
        flex
        gap-2
        items-center
        p-x-3
        p-y-2
        rounded-t-lg
      >
        <button @click="store.selectChannel(channel.id)">
          {{ channel.name }}
        </button>

        <button
          v-if="channel.isClosable"
          i-ui-close
          :title="`close channel ${channel.name}`"
          @click="closeChannel(index)"
        />
      </li>
    </ul>
  </nav>
</template>
