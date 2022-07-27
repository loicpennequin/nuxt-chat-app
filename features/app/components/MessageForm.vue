<script setup lang="ts">
import { Maybe } from '../utils';
import { KEYBOARD } from '../utils/constants';

const currentMessage = ref('');
const store = useStore();

const users = useChannelUsers(computed(() => store.currentChannelId));

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

const cursorPosition = ref(0);
const currentWord = computed(() => {
  const wordStart =
    currentMessage.value.slice(0, cursorPosition.value).lastIndexOf(' ') + 1;
  const nextSpaceIndex = currentMessage.value
    .slice(cursorPosition.value)
    .indexOf(' ');
  const wordEnd =
    nextSpaceIndex === -1 ? undefined : nextSpaceIndex + cursorPosition.value;

  return currentMessage.value.slice(wordStart, wordEnd);
});

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

const handleSuggestionNavigation = (key: string) => {
  const currentIndex = suggestedMentions.value.indexOf(
    selectedSuggestion.value
  );

  switch (key) {
    case KEYBOARD.ARROW_DOWN:
      selectedSuggestion.value =
        suggestedMentions.value[currentIndex + 1] ??
        suggestedMentions.value.at(0);
      return;
    case KEYBOARD.ARROW_UP:
      selectedSuggestion.value =
        suggestedMentions.value[currentIndex - 1] ??
        suggestedMentions.value.at(-1);
      return;
    case KEYBOARD.ENTER:
      currentMessage.value = currentMessage.value.replace(
        currentWord.value,
        '@' + selectedSuggestion.value + ' '
      );
      nextTick(() => {
        cursorPosition.value = unrefElement(inputRef)?.selectionStart ?? 0;
      });
      return;
  }
};

const inputRef = ref<HTMLInputElement>();
const onKeyup = (event: any) => {
  const { target, key } = event;

  if (suggestedMentions.value.length) {
    handleSuggestionNavigation(key);
  }

  if (target.selectionStart !== target.selectionEnd) return;
  cursorPosition.value = target.selectionStart ?? 0;
};

const onKeydown = (event: any) => {
  if (
    suggestedMentions.value.length &&
    [KEYBOARD.ENTER, KEYBOARD.ARROW_DOWN, KEYBOARD.ARROW_UP].includes(event.key)
  ) {
    console.log('should prevent default');
    event.preventDefault();
  }
};

const isInputFocused = ref(false);
</script>

<template>
  <form col-span-full flex relative @submit.prevent="sendMessage">
    <UiSurface
      v-if="suggestedMentions.length && isInputFocused"
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
      @blur="isInputFocused = false"
      @focus="isInputFocused = true"
      @keydown="onKeydown"
      @keyup="onKeyup"
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
