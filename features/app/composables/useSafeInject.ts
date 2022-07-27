import { InjectionKey } from 'vue';

export const useSafeInject = <T>(injectionKey: InjectionKey<T>): T => {
  const context = inject<T>(injectionKey);

  if (context === undefined) {
    throw new Error(
      `Your are trying to inject ${String(
        injectionKey
      )} outside of its provider.`
    );
  }

  return context;
};
