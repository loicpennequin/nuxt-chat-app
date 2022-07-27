import { MaybeRef } from '../utils';

export const usePusherChannel = (channel: MaybeRef<string>) => {
  const client = usePusher();

  if (!client) return;

  const subscription = computed(() => {
    const id = unref(channel);
    return client.subscribe(id);
  });

  return subscription;
};
