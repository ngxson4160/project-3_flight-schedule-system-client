import { useEmployer } from '~~/composables/auth/useEmployer';
export default defineNuxtRouteMiddleware(() => {
  const cookieSessionAuth = useCookie('auth.session-token').value;
  if (cookieSessionAuth) {
    const isEmployer = useEmployer();
    if (isEmployer) return navigateTo('/employer');
  }
});
