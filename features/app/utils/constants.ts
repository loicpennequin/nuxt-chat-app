import Pusher from 'pusher-js';
import { InjectionKey } from 'vue';

export const INJECTION_KEYS = {
  PUSHER: Symbol('pusher') as InjectionKey<Pusher>
} as const;

export const CHANNEL_NAMES = {
  PUBLIC: 'presence-general'
};
