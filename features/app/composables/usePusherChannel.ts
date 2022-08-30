import { Channel } from 'pusher-js';
import { MaybeRef } from '../utils';

export const usePusherChannel = <T extends Channel = Channel>(
  channel: MaybeRef<string>
) => {
  const client = usePusher();

  const subscription = computed(() => {
    const id = unref(channel);
    return client?.subscribe(id) as T;
  });

  return subscription;
};
