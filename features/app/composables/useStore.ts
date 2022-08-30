import { defineStore } from 'pinia';
import { CHANNEL_NAMES } from '../utils/constants';
import { nanoid } from 'nanoid';

export type Message = {
  author: string;
  message: string;
  isSystem?: boolean;
};

export type NewChannel = {
  id: string;
  name: string;
  isDM: boolean;
  message?: { author: string; message: string };
};

export type NewDMChannel = Omit<NewChannel, 'id' | 'isDM'>;

export type AppChannel = {
  id: string;
  name: string;
  isClosable: boolean;
  isDM: boolean;
  hasUnreadMessages: boolean;
  messages: Message[];
  hasMention?: boolean;
};

type AppState = {
  username: string;
  currentChannelId: string;
  channels: AppChannel[];
};

export const useStore = defineStore('app', {
  state: (): AppState => ({
    username: useCookie('username').value,
    currentChannelId: CHANNEL_NAMES.PUBLIC,
    channels: [
      {
        id: CHANNEL_NAMES.PUBLIC,
        name: 'Public chat',
        isClosable: false,
        isDM: false,
        hasUnreadMessages: false,
        messages: []
      }
    ]
  }),

  getters: {
    currentChannel: state =>
      state.channels.find(c => c.id === state.currentChannelId) as AppChannel,
    getChannelById: state => (id: string) =>
      state.channels.find(c => c.id === id) as AppChannel
  },

  actions: {
    async login(username: string) {
      await $fetch('/api/auth', { method: 'post', body: { username } });
      this.username = username;
    },

    async logout() {
      useCookie('username').value = '';
      this.username = '';
    },

    selectChannel(channelId: string) {
      this.currentChannelId = channelId;
    },

    closeChannel(index: number) {
      if (this.channels[index] === this.currentChannel) {
        this.currentChannelId = CHANNEL_NAMES.PUBLIC;
      }

      this.channels.splice(index, 1);
    },

    createChannel(channel: NewChannel) {
      this.channels.push({
        id: channel.id,
        name: channel.name,
        isClosable: true,
        isDM: channel.isDM,
        hasUnreadMessages: false,
        messages: channel.message ? [channel.message] : []
      });

      return this.channels.at(-1) as AppChannel;
    },

    createDMChannel(channel: NewDMChannel) {
      const channelId = `presence-${channel.name}-${this.username}-${nanoid(
        4
      )}`;

      const existingChannel = this.channels.find(c => channel.name === c.name);
      if (existingChannel) return existingChannel;

      return this.createChannel({
        ...channel,
        id: channelId,
        isDM: true
      });
    }
  }
});
