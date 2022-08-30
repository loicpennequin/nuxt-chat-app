<script setup lang="ts">
import { AppChannel, NewChannel } from '../composables/useStore';
import { PUSHER_EVENTS } from '../utils/constants';

const store = useStore();
const pusher = usePusher();

const userChannel = useUserChannel();

const createChannel = (data: { channel: NewChannel }) => {
  store.createDMChannel(data.channel);
};

const closeChannel = (index: number) => {
  pusher?.unsubscribe(store.channels[index].id);
  store.closeChannel(index);
};

const isCurrentChannel = (channel: AppChannel) =>
  channel === store.currentChannel;

onMounted(() => {
  userChannel?.value.bind(
    PUSHER_EVENTS.CREATED_NEW_CONVERSATION,
    createChannel
  );
});
</script>

<template>
  <nav>
    <ul flex>
      <li
        v-for="(channel, index) in store.channels"
        :key="channel.id"
        border="solid light-8 1"
        :border-b-color="isCurrentChannel(channel) && 'transparent'"
        :class="channel.hasUnreadMessages && 'animate-bounce'"
        flex
        gap-2
        items-center
        p-x-3
        p-y-2
        relative
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

        <div
          v-if="channel.hasMention"
          absolute
          bg-red-500
          class="translate-x-1/4 -translate-y-1/4 rounded-1/2"
          h-4
          right-0
          rounded-4xl
          top-0
          w-4
        />
      </li>
      <li border-b="solid 1 light-8" grow-1></li>
    </ul>
  </nav>
</template>
