import { Ref } from 'vue';

export type MaybeRef<T> = Ref<T> | T;
export type Maybe<T> = T | null | undefined;

export type Values<T> = { [K in keyof T]: T[K] }[keyof T];
export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T];
