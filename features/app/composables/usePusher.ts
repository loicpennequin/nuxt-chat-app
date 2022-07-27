import Pusher from 'pusher-js';
import { INJECTION_KEYS } from '../utils/constants';

export const usePusher = () => {
  if (import.meta.env.SSR) return;

  return useSafeInject(INJECTION_KEYS.PUSHER);
};
