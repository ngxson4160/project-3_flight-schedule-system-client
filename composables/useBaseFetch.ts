import { useUser } from '~~/composables/auth/useUser';
import { useEmployer } from '~~/composables/auth/useEmployer';
import { useAdmin } from '~~/composables/auth/useAdmin';

export interface IJwt {
  token: string;
}

export async function useBaseFetch<T = any>(request: string, opts: any) {
  const config = useRuntimeConfig();
  const { tokenClientEncrypt } = handleGetAuthCookie();

  let token;
  if (tokenClientEncrypt) {
    const client = handleJWTDecrypt(tokenClientEncrypt) as IJwt;
    token = client.token;
  }

  const { data, pending, error, refresh } = await useFetch<T>(request, {
    baseURL: config.public.baseURL,
    ...(token && {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    ...opts,
  });
  const errorCode = error.value?.data?.error_code;
  if (errorCode === 'TOKEN_EXPIRED') {
    const isUser = useUser();
    const isEmployer = useEmployer();
    const isAdmin = useAdmin();

    if (isUser) {
      routerPush('/user/login');
    }
    if (isEmployer) {
      routerPush('/employer/login');
    }
    if (isAdmin) {
      routerPush('/admin/login');
    }

    handleRemoveAuthCookie();
    handleRemoveAuthLocalStorage();
  }
  if (error.value?.data?.errorMessage?.message === 'Unauthorized') {
    routerPush('/');
  }

  return { data, pending, error, refresh };
}
