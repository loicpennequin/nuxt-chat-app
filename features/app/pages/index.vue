<script setup lang="ts">
const username = ref<string>('');

const { router, routes } = useTypedRouter();
const store = useStore();
const error = ref('');
const onSubmit = async () => {
  try {
    await store.login(username.value);
    router.push({ name: routes.chat });
  } catch (err: any) {
    error.value = err.data.statusMessage;
  }
};
</script>

<template>
  <UiSurface m-t-20 p="10" space-y-6>
    <h1 m-b-3xl text-3xl text-center>Nuxt Chat App</h1>

    <div flex justify-center>
      <AppSmileyFace />
    </div>

    <form flex flex-col gap-6 @submit.prevent="onSubmit">
      <UiTextInput
        v-model="username"
        id="username"
        aria-label="Select your username (min. 4 characters)"
        minlength="4"
        placeholder="Select your username (min. 4 characters)"
      />

      <UiButton color-scheme="purple">Let's go !</UiButton>
      <div v-if="error" color-red-700 font-bold>{{ error }}</div>
    </form>
  </UiSurface>
</template>
