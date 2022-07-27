export default defineNuxtRouteMiddleware(to => {
  const username = useCookie('username');

  if (to.meta.needsAuth && !username.value) {
    return navigateTo('/');
  }
});
