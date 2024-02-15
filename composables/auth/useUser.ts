import { ERole } from '~~/utils/enum';

export const useUser = () => {
  const cookieSystemData = useCookie('auth.system-data').value;

  if (cookieSystemData) {
    const systemData = handleJWTDecrypt(cookieSystemData);
    return systemData && systemData.roles?.[0] === ERole.USER;
  }
  return false;
};
