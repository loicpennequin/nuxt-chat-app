<script setup lang="ts">
import { AppChannel } from '../composables/useStore';

const store = useStore();
const pusher = usePusher();
const { getListeners } = useChannelMessages();

const getChannelListeners = ({ id }: AppChannel) => {
  if (!pusher) return;
  const { onMessage, onMemberAdded, onMemberRemoved } = getListeners(id);
  const channel = pusher.subscribe(id);

  channel
    .bind('new-message', onMessage)
    .bind('pusher:member_added', onMemberAdded)
    .bind('pusher:member_removed', onMemberRemoved);

  return () => {
    channel
      .unbind('new-message', onMessage)
      .unbind('pusher:member_added', onMemberAdded)
      .unbind('pusher:member_removed', onMemberRemoved);
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
      border-l="solid 1 white"
      p-x-5
      w-12rem
    />
  </div>
</template>
