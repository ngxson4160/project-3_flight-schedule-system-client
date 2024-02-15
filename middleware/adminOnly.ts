import { useAdmin } from '~~/composables/auth/useAdmin';
export default defineNuxtRouteMiddleware(() => {
  const cookieSessionAuth = useCookie('auth.session-token').value;
  if (cookieSessionAuth) {
    const isAdmin = useAdmin();
    if (!isAdmin) return navigateTo('/');
    return;
  }
  return navigateTo('/admin/login');
});
