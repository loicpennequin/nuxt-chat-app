import { pusherServerClient } from '~~/features/app/server/pusher';
import { useCookie } from 'h3';

export default defineEventHandler(async event => {
  const body = await useBody(event);

  const socketId = body.socket_id;
  const channel = body.channel_name;
  const username = useCookie(event, 'username');

  const presenceData = {
    user_id: username || ''
  };

  return pusherServerClient.authorizeChannel(socketId, channel, presenceData);
});
