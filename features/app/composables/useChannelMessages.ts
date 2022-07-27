import { MENTIONS_REGEXP } from '../utils/constants';

export type Message = {
  author: string;
  message: string;
  isSystem?: boolean;
};

export const useChannelMessages = () => {
  const store = useStore();

  return {
    getListeners(channelId: string) {
      const hasCurrentUserMention = (message: Message) => {
        const mentions = [...message.message.matchAll(MENTIONS_REGEXP)];

        return mentions.some(
          ([mention]) => mention.substring(1) === store.username
        );
      };

      const onMessage = (message: Message) => {
        const channel = store.getChannelById(channelId);

        channel.messages.push(message);
        if (channelId !== store.currentChannelId) {
          store.getChannelById(channelId).hasMention =
            hasCurrentUserMention(message);
        }

        channel.hasUnreadMessages = store.currentChannelId !== channelId;
      };

      const addSystemMessage = (message: string) => {
        onMessage({
          author: '',
          isSystem: true,
          message
        });
      };

      const onMemberAdded = (member: { id: string }) => {
        addSystemMessage(`${member.id} has joined the channel.`);
      };

      const onMemberRemoved = (member: { id: string }) => {
        addSystemMessage(`${member.id} has left the channel.`);
      };

      return { onMessage, onMemberAdded, onMemberRemoved };
    }
  };
};
