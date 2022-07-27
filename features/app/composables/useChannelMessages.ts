import { AppChannel } from './useStore';

export type Message = {
  author: string;
  message: string;
  isSystem?: boolean;
};

export const useChannelMessages = () => {
  const store = useStore();

  return {
    getListeners(id: string) {
      const onMessage = (message: Message) => {
        const channel = store.getChannelById(id);

        channel.messages.push(message);

        channel.hasUnreadMessages = store.currentChannelId !== id;
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
