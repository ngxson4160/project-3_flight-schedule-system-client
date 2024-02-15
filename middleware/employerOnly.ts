import { useEmployer } from '~~/composables/auth/useEmployer';
export default defineNuxtRouteMiddleware(() => {
  const cookieSessionAuth = useCookie('auth.session-token').value;
  if (cookieSessionAuth) {
    const isEmployer = useEmployer();
    if (!isEmployer) return navigateTo('/');
    return;
  }
  const pathBefore = useSessionStorage('pathBefore', '');
  const route = useRoute();
  pathBefore.value = route.fullPath;
  return navigateTo('/employer/login');
});
