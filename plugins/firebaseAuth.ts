import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) return;
  const runtimeConfig = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: runtimeConfig.public.apiKey,
    authDomain: runtimeConfig.public.authDomain,
    projectId: runtimeConfig.public.projectId,
    storageBucket: runtimeConfig.public.storageBucket,
    messagingSenderId: runtimeConfig.public.messagingSenderId,
    appId: runtimeConfig.public.appId,
    measurementId: runtimeConfig.public.measurementId,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.vueApp.provide('provider', provider);
  nuxtApp.provide('auth', auth);
  nuxtApp.provide('provider', provider);
});
