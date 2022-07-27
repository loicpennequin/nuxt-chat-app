<script setup lang="ts">
import { Message } from '../composables/useStore';
import { MENTIONS_REGEXP } from '../utils/constants';

const props = defineProps<{ message: Message }>();
const store = useStore();
const users = useChannelUsers(computed(() => store.currentChannelId));

type MessageToken = {
  text: string;
  mention?: {
    target: string;
  };
};

const mentions = computed(() => {
  const matches = [...props.message.message.matchAll(MENTIONS_REGEXP)];
  return matches.filter(match => users.value.includes(match[0].substring(1)));
});

const tokens = computed(() => {
  const message = props.message.message;
  if (mentions.value.length === 0) return [{ text: message }];

  const _tokens: MessageToken[] = [];
  mentions.value.forEach((mention, index) => {
    const prevMention = index > 0 ? mentions.value[index - 1] : null;

    _tokens.push({
      text: message.slice(
        prevMention ? (prevMention.index ?? 0) + prevMention[0].length : 0,
        mention.index
      )
    });
    if (!mention.index === undefined) return tokens;

    _tokens.push({
      mention: {
        target: mention[0].substring(1)
      },
      text: message.slice(
        mention.index,
        (mention.index ?? 0) + mention[0].length
      )
    });

    if (index === mentions.value.length - 1) {
      _tokens.push({
        text: message.slice((mention.index ?? 0) + mention[0].length)
      });
    }
  });
  return _tokens;
});

const onTokenClick = (token: MessageToken) => {
  if (!token.mention) return;

  const channel = store.createDMChannel({
    name: token.mention.target
  });

  store.currentChannelId = channel.id;
};
</script>

<template>
  <span break-all :font="props.message.isSystem && 'italic'">
    <span v-if="!props.message.isSystem" font-bold>
      {{ props.message.author }} :
    </span>
    <component
      :is="token.mention ? 'button' : 'span'"
      v-for="token in tokens"
      :key="token.text"
      :color="token.mention ? 'purple-600' : 'inherit'"
      :font="token.mention && 'bold'"
      @click="onTokenClick(token)"
    >
      {{ token.text }}
    </component>
  </span>
</template>
