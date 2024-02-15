import { ERole } from '~~/utils/enum';

export const useEmployer = () => {
  const cookieSystemData = useCookie('auth.system-data').value;

  if (cookieSystemData) {
    const systemData = handleJWTDecrypt(cookieSystemData);
    return systemData && systemData.roles?.[0] === ERole.EMPLOYER;
  }
  return false;
};
