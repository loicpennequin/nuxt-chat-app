import { defineNuxtPlugin } from '#app';
import Pusher from 'pusher-js';
import { INJECTION_KEYS } from '../utils/constants';

export default defineNuxtPlugin(nuxt => {
  if (process.server) return;

  const config = useRuntimeConfig();
  const client = new Pusher(config.public.pusherAppKey, {
    cluster: config.public.pusherCluster,
    channelAuthorization: { endpoint: '/api/pusher/auth', transport: 'ajax' }
  });
  nuxt.vueApp.provide(INJECTION_KEYS.PUSHER, client);
});
