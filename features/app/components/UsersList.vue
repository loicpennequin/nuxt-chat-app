<script setup lang="ts">
import { PresenceChannel } from 'pusher-js';
import { ComputedRef } from 'vue';
import { CHANNEL_NAMES } from '../utils/constants';
import { nanoid } from 'nanoid';

const channel = usePusherChannel(
  CHANNEL_NAMES.PUBLIC
) as unknown as ComputedRef<PresenceChannel>;
const store = useStore();

const users = ref<any[]>(Object.keys(channel?.value.members.members || {}));

const setUsers = () => {
  users.value = Object.keys(channel.value.members.members);
};

onMounted(() => {
  channel.value.bind('pusher:subscription_succeeded', setUsers);
  channel.value.bind('pusher:member_added', setUsers);
  channel.value.bind('pusher:member_removed', setUsers);
});

onUnmounted(() => {
  channel.value.unbind('pusher:subscription_succeeded', setUsers);
  channel.value.unbind('pusher:member_added', setUsers);
  channel.value.unbind('pusher:member_removed', setUsers);
});

const addChannel = (user: string) => {
  const channelId = `presence-${user}-${store.username}-${nanoid(4)}`;
  store.createDMChannel({
    id: channelId,
    name: user
  });

  store.currentChannelId = channelId;
};
</script>

<template>
  <ul p-y-2 space-y-1>
    <li v-for="user in users" :key="user">
      <button @click="addChannel(user)">{{ user }}</button>
    </li>
  </ul>
</template>
