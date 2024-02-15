import jwtDecode from 'jwt-decode';

export const useJwtDecode = async () => {
  const route = useRoute();
  const metaData = ref();
  const token = route.params.token;
  if (route.params.token && typeof route.params.token === 'string') {
    const token = route.params.token;
    metaData.value = await jwtDecode(token);
  }

  return { metaData, token };
};
