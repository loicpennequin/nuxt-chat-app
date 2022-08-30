import Pusher from 'pusher-js';
import { InjectionKey } from 'vue';
import { Values } from '.';

export const INJECTION_KEYS = {
  PUSHER: Symbol('pusher') as InjectionKey<Pusher>
} as const;

export const CHANNEL_NAMES = {
  PUBLIC: 'presence-general'
} as const;

export type Keyboard = Values<typeof KEYBOARD>;
export const KEYBOARD = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ENTER: 'Enter'
} as const;

export const MENTIONS_REGEXP = /@[a-zA-z0-9]+/g;

export const PUSHER_EVENTS = {
  RECEIVED_NEW_MESSAGE: 'new-message',
  USER_JOINED_CHANNEL: 'pusher:member_added',
  USER_LEFT_CHANNEL: 'pusher:member_removed',
  CREATED_NEW_CONVERSATION: 'new-conversation'
};
