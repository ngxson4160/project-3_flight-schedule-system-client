export default defineNuxtRouteMiddleware(() => {
  if (!process.client) return;
  const cookieSessionAuth = useCookie('auth.session-token');
  const cookieSystemData = useCookie('auth.system-data');
  const localStorageSessionAuth = useLocalStorage('auth.session-token', '');
  const localStorageSystemData = useLocalStorage('auth.system-data', '');

  if (localStorageSessionAuth.value && !cookieSessionAuth.value)
    cookieSessionAuth.value = localStorageSessionAuth.value;
  if (localStorageSystemData.value && !cookieSystemData.value)
    cookieSystemData.value = localStorageSystemData.value;
});
