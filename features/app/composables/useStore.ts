import { defineStore } from 'pinia';
import { CHANNEL_NAMES } from '../utils/constants';

export type Message = {
  author: string;
  message: string;
  isSystem?: boolean;
};

export type NewChannel = {
  id: string;
  name: string;
  message?: { author: string; message: string };
};

export type AppChannel = {
  id: string;
  name: string;
  isClosable: boolean;
  isDM: boolean;
  hasUnreadMessages: boolean;
  messages: Message[];
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

    createDMChannel(channel: NewChannel) {
      this.channels.push({
        id: channel.id,
        name: channel.name,
        isClosable: true,
        isDM: true,
        hasUnreadMessages: false,
        messages: channel.message ? [channel.message] : []
      });
    }
  }
});
