<script setup lang="ts">
import { Starport } from 'vue-starport';

const store = useStore();
const { router, routes } = useTypedRouter();

const onLogout = async () => {
  await store.logout();
  router.push({ name: routes.index });
};
</script>

<template>
  <header flex gap-3 items-center p-l-3 p-r-4 p-y-3>
    <!-- <Starport port="smiley-face" style="height: 50px">
      <AppSmileyFace :size="50" />
    </Starport> -->
    <span text-xl>
      Nice to see you,
      <span font-bold>{{ store.username }}</span>
    </span>

    <button i-ui-power-off m-l-auto p-3 title="logout" @click="onLogout" />
  </header>
</template>
