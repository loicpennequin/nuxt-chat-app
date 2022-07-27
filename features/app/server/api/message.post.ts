import { pusherServerClient } from '../pusher';
import { useCookie } from 'h3';

const notifyOtherUser = async (body: any, from: string) => {
  const { users } = await (
    await pusherServerClient.get({
      path: `/channels/${body.channel}/users`,
      params: {}
    })
  ).json();

  const hasAlreadyJoined = users.some(
    (user: { id: string }) => user.id === body.target
  );

  if (hasAlreadyJoined) return;

  pusherServerClient.trigger(body.target, 'new-conversation', {
    channel: {
      id: body.channel,
      name: from,
      message: {
        author: from,
        message: body.message
      }
    }
  });
};

export default defineEventHandler(async event => {
  const username = useCookie(event, 'username');
  if (!username) {
    return createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const body = await useBody(event);

  pusherServerClient.trigger(body.channel, 'new-message', {
    author: username,
    message: body.message
  });

  if (body.target) {
    notifyOtherUser(body, username);
  }

  return { status: 'ok' };
});
