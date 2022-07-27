export const useUserChannel = () => {
  const store = useStore();

  return usePusherChannel(computed(() => store.username));
};
