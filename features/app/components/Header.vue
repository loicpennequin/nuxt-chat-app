<script setup lang="ts">
const store = useStore();

const { router, routes } = useTypedRouter();

const onLogout = async () => {
  await store.logout();
  router.push({ name: routes.index });
};
</script>

<template>
  <header flex items-center justify-between p-3>
    <span text-xl>
      Nice to see you,
      <span font-bold>{{ store.username }}</span>
    </span>

    <button i-ui-power-off p-3 title="logout" @click="onLogout" />
  </header>
</template>
