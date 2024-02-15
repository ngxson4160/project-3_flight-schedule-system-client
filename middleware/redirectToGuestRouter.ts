export default defineNuxtRouteMiddleware((to) => {
  const cookieSystemData = useCookie('auth.system-data').value;
  if (!cookieSystemData) return navigateTo(to.fullPath.replace('/user', ''));
});
