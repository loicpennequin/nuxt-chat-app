import { Ref } from 'vue';
import type { inferProcedureOutput } from '@trpc/server';
import {
  TQueries,
  TQueryValues,
  inferProcedures
} from 'trpc-nuxt/dist/runtime/client';
import type { router } from '@/server/trpc';

export type MaybeRef<T> = Ref<T> | T;
export type Maybe<T> = T | null | undefined;
export type AppRouter = typeof router;

export type TMutations = AppRouter['_def']['mutations'];

export type TMutationValues = inferProcedures<AppRouter['_def']['mutations']>;

export type InferQueryOutput<TRouteKey extends keyof TQueryValues & string> =
  inferProcedureOutput<TQueries[TRouteKey]>;

export type InferMutationOutput<
  TRouteKey extends keyof TMutationValues & string
> = inferProcedureOutput<TMutations[TRouteKey]>;

export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T];