import * as trpc from '@trpc/server';

export const notFoundError = (err: any) => {
  throw new trpc.TRPCError({
    code: 'NOT_FOUND',
    message: 'Resource not found',
    cause: err
  });
};
