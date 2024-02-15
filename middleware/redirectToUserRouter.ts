export default defineNuxtRouteMiddleware((to) => {
  const cookieSystemData = useCookie('auth.system-data').value;
  if (cookieSystemData) {
    const systemData = handleJWTDecrypt(cookieSystemData);

    if (systemData && systemData.roles?.[0] === 'USER')
      return navigateTo('/user' + to.fullPath);
  }
});
