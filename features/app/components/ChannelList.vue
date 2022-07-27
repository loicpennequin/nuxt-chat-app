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

const isCurrentChannel = (channel: AppChannel) =>
  channel === store.currentChannel;

userChannel?.value.bind('new-conversation', createChannel);
</script>

<template>
  <nav>
    <ul flex>
      <li
        v-for="(channel, index) in store.channels"
        :key="channel.id"
        border="solid white 1"
        :border-b-color="isCurrentChannel(channel) && 'transparent'"
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
      <li border-b="solid 1 white" grow-1></li>
    </ul>
  </nav>
</template>
