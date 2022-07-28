<script setup lang="ts">
import { Maybe } from '../utils';
import { KEYBOARD } from '../utils/constants';

const currentMessage = ref('');
const store = useStore();
const users = useChannelUsers(computed(() => store.currentChannelId));
const inputRef = ref<HTMLInputElement>();
const { currentWord, replaceCurrentWord } = useTextField(
  inputRef,
  currentMessage
);

const sendMessage = async () => {
  await $fetch('/api/message', {
    method: 'post',
    body: {
      channel: store.currentChannelId,
      message: currentMessage.value,
      target: store.currentChannel.isDM && store.currentChannel.name
    }
  });

  currentMessage.value = '';
};

const selectedSuggestion = ref<Maybe<string>>(null);
const suggestedMentions = computed(() => {
  if (!currentWord.value.startsWith('@')) return [];

  return users.value.filter(u =>
    u.toLowerCase().includes(currentWord.value.substring(1).toLowerCase())
  );
});
watch(suggestedMentions, suggestions => {
  selectedSuggestion.value = suggestions[0] ?? null;
});

const handleSuggestionNavigation = (event: any) => {
  const currentIndex = suggestedMentions.value.indexOf(
    selectedSuggestion.value
  );

  switch (event.key) {
    case KEYBOARD.ARROW_DOWN:
      event.preventDefault();
      selectedSuggestion.value =
        suggestedMentions.value[currentIndex + 1] ??
        suggestedMentions.value.at(0);
      return;

    case KEYBOARD.ARROW_UP:
      event.preventDefault();
      selectedSuggestion.value =
        suggestedMentions.value[currentIndex - 1] ??
        suggestedMentions.value.at(-1);
      return;

    case KEYBOARD.ENTER:
      event.preventDefault();
      replaceCurrentWord(`@${selectedSuggestion.value}`);
      return;
  }
};

const onKeydown = (event: any) => {
  if (suggestedMentions.value.length) {
    handleSuggestionNavigation(event);
  }
};

const activeElement = useActiveElement();
const isSuggestionBoxDisplayed = computed(() => {
  return (
    suggestedMentions.value.length &&
    activeElement.value === unrefElement(inputRef)
  );
});
</script>

<template>
  <form col-span-full flex relative @submit.prevent="sendMessage">
    <UiSurface
      v-if="isSuggestionBoxDisplayed"
      absolute
      bottom-full
      p="0"
      w-10em
    >
      <ul space-y-1>
        <li
          v-for="user in suggestedMentions"
          :key="user"
          :bg="user === selectedSuggestion && 'purple-500'"
          :color="user === selectedSuggestion ? 'white' : 'inherit'"
          p-x-2
          p-y-1
        >
          {{ user }}
        </li>
      </ul>
    </UiSurface>
    <UiTextInput
      v-model="currentMessage"
      ref="inputRef"
      flex-1
      placeholder="Type your message here (use @ to mention someone)"
      required
      @keydown="onKeydown"
    />
    <UiButton
      color-scheme="purple"
      :disabled="!currentMessage.length"
      rounded="0"
      title="send message"
    >
      <div i-ui-send-message />
    </UiButton>
  </form>
</template>
