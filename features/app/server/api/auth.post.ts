import { CHANNEL_NAMES } from '~~/features/app/utils/constants';
import { pusherServerClient } from '../pusher';

export default defineEventHandler(async event => {
  const response = await pusherServerClient.get({
    path: `/channels/${CHANNEL_NAMES.PUBLIC}/users`,
    params: {}
  });

  if (response.status !== 200) {
    return createError({
      statusCode: 500,
      statusMessage: 'An unexpected error has occured'
    });
  }

  const { users } = await response.json();
  const body = await useBody(event);

  const isUsernameTaken = users.some(
    (user: { id: string }) => user.id === body.username
  );
  if (isUsernameTaken) {
    return createError({
      statusCode: 401,
      statusMessage: 'This username is already taken'
    });
  }

  setCookie(event, 'username', body.username);

  return { status: 'ok' };
});
