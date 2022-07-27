import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
  extends: ['./features/app', './features/ui'],
  typescript: {
    strict: true
  },

  runtimeConfig: {
    pusherAppId: '',
    pusherSecret: '',
    public: {
      pusherAppKey: '',
      pusherCluster: '',
      authClientId: '',
      authDomain: ''
    }
  }
});
