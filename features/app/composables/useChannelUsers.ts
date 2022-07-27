import { PresenceChannel } from 'pusher-js';
import { ComputedRef } from 'vue';
import { MaybeRef } from '../utils';

export const useChannelUsers = (channelId: MaybeRef<string>) => {
  const channel = usePusherChannel(
    channelId
  ) as unknown as ComputedRef<PresenceChannel>;

  const users = ref<any[]>(Object.keys(channel?.value.members.members || {}));

  const setUsers = () => {
    users.value = Object.keys(channel.value.members.members);
  };

  const setListeners = (channel: PresenceChannel) => {
    channel.bind('pusher:subscription_succeeded', setUsers);
    channel.bind('pusher:member_added', setUsers);
    channel.bind('pusher:member_removed', setUsers);
  };

  const removeListeners = (channel: PresenceChannel) => {
    channel.unbind('pusher:subscription_succeeded', setUsers);
    channel.unbind('pusher:member_added', setUsers);
    channel.unbind('pusher:member_removed', setUsers);
  };

  onMounted(() => {
    watch(channel, (channel, oldChannel) => {
      users.value = Object.keys(channel.members.members || {});
      removeListeners(oldChannel);
      setListeners(channel);
    });
    setListeners(channel.value);
  });

  onUnmounted(() => removeListeners(channel.value));

  return users;
};
