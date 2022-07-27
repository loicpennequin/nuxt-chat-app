<script setup lang="ts">
const store = useStore();
const users = useChannelUsers(computed(() => store.currentChannelId));
const addChannel = (user: string) => {
  const channel = store.createDMChannel({
    name: user
  });

  store.currentChannelId = channel.id;
};
</script>

<template>
  <ul p-y-2 space-y-1>
    <li v-for="user in users" :key="user">
      <button @click="addChannel(user)">{{ user }}</button>
    </li>
  </ul>
</template>
