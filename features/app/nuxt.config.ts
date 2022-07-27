import { defineNuxtConfig } from 'nuxt';
import TypedRouter from 'nuxt-typed-router';

export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@pinia/nuxt', TypedRouter],

  components: {
    dirs: [{ path: './components', prefix: 'app' }]
  }
});
