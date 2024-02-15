import { useUser } from '~~/composables/auth/useUser';
export default defineNuxtRouteMiddleware(() => {
  const cookieSessionAuth = useCookie('auth.session-token').value;
  if (cookieSessionAuth) {
    const isUser = useUser();
    if (isUser) return navigateTo('/user');
  }
});
