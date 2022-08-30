<script setup lang="ts">
import { AppChannel } from '../composables/useStore';
import { PUSHER_EVENTS } from '../utils/constants';

const store = useStore();
const pusher = usePusher();
const { getListeners } = useChannelMessages();

const getChannelListeners = ({ id }: AppChannel) => {
  if (!pusher) return;
  const { onMessage, onMemberAdded, onMemberRemoved } = getListeners(id);
  const channel = pusher.subscribe(id);

  channel
    .bind(PUSHER_EVENTS.RECEIVED_NEW_MESSAGE, onMessage)
    .bind(PUSHER_EVENTS.USER_JOINED_CHANNEL, onMemberAdded)
    .bind(PUSHER_EVENTS.USER_LEFT_CHANNEL, onMemberRemoved);

  return () => {
    channel
      .unbind(PUSHER_EVENTS.RECEIVED_NEW_MESSAGE, onMessage)
      .unbind(PUSHER_EVENTS.USER_JOINED_CHANNEL, onMemberAdded)
      .unbind(PUSHER_EVENTS.USER_LEFT_CHANNEL, onMemberRemoved);
  };
};

watchEffect(onInvalidate => {
  if (!pusher) return;

  const unsubs = store.channels.map(getChannelListeners);

  onInvalidate(() => {
    unsubs.forEach(unsub => unsub?.());
  });
});

watchEffect(() => {
  store.currentChannel.hasUnreadMessages = false;
  store.currentChannel.hasMention = false;
});
</script>

<template>
  <div flex h-full overflow-y-auto>
    <ClientOnly>
      <AppMessageList flex-1 />
      <template #fallback>
        <div flex-1 />
      </template>
    </ClientOnly>

    <AppUsersList
      v-if="!store.currentChannel.isDM"
      border-l="solid 1 light-8"
      p-x-5
      w-12rem
    />
  </div>
</template>
