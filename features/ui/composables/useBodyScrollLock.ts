import { MaybeRef } from '@/features/app/utils';
import { breakpointsTailwind } from '@vueuse/core';

export const useBodyScrollLock = (isLocked: MaybeRef<boolean> = true) => {
  if (import.meta.env.SSR) return;
  const _isLocked = useScrollLock(document.getElementById('__nuxt'));

  watchEffect(() => {
    _isLocked.value = unref(isLocked);
  });

  onUnmounted(() => {
    _isLocked.value = false;
  });
  // const breakpoints = useBreakpoints(breakpointsTailwind);

  // const unset = () => {
  //   const root = document.getElementById('__nuxt');
  //   if (!root) return;

  //   root?.removeAttribute('inert');
  //   document.body.style.removeProperty('overflow');
  //   document.body.style.removeProperty('width');
  // };

  // watchEffect(onInvalidate => {
  //   const root = document.getElementById('__nuxt');

  //   if (!root) return;
  //   const scrollbarWidth = root.offsetWidth - root.clientWidth;

  //   if (unref(isLocked)) {
  //     root.setAttribute('inert', 'true');
  //     document.body.style.overflow = 'hidden';
  //     if (!breakpoints.sm) return;

  //     document.body.style.width =
  //       document.body.clientWidth - scrollbarWidth + 'px';
  //   }

  //   onInvalidate(unset);
  // });

  // onUnmounted(unset);
};
