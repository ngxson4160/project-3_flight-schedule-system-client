import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Flight schedule system',
      meta: [
        {
          property: 'og:site_name',
          content: '株式会社パブリックコネクト',
        },
        {
          name: 'apple-mobile-web-app-title',
          content: '株式会社パブリックコネクト',
        },
        {
          name: 'application-name',
          content: '株式会社パブリックコネクト',
        },
        {
          name: 'robots',
          content: 'all',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
        },
        {
          property: 'og:title',
          content: '株式会社パブリックコネクト',
        },
        {
          name: 'description',
          content:
            'パブリックコネクトは、日本中の自治体が求人やPR情報を掲載する自治体の採用情報サイトです。事務職から保育士、保健師、土木職、地域おこし協力隊などあらゆる求人に応募できます。',
        },
        {
          property: 'og:description',
          content:
            'パブリックコネクトは、日本中の自治体が求人やPR情報を掲載する自治体の採用情報サイトです。事務職から保育士、保健師、土木職、地域おこし協力隊などあらゆる求人に応募できます。',
        },
        {
          name: 'author',
          content: '株式会社パブリックコネクト',
        },
        // {
        //   property: 'og:image',
        //   content:
        //     'https://storage.googleapis.com/production-os-assets/assets/47ca192e-0ce1-4ed1-bd4c-45b6c37be4a6',
        // },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: 'https://storage.googleapis.com/production-os-assets/assets/47ca192e-0ce1-4ed1-bd4c-45b6c37be4a6',
        },
      ],
      script: [
        {
          hid: 'gtm',
          innerHTML: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PQLL7KMC');
          `,
          type: 'text/javascript',
        },
        {
          hid: 'gtag',
          src: 'https://www.googletagmanager.com/gtag/js?id=G-T1F31EQYN9',
          async: true,
        },
        {
          hid: 'gtag-config',
          innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-T1F31EQYN9');
          `,
          type: 'text/javascript',
        },
        {
          hid: 'gtag-config',
          innerHTML: `
          gtag('config', 'AW-11257777975');
          gtag('event', 'conversion', {'send_to': 'AW-11257777975/mrk3CPjqw70YELeekPgp'});
          `,
          type: 'text/javascript',
        },
        // {
        //   type: 'application/ld+json',
        //   innerHTML: JSON.stringify({
        //     '@context': 'https://schema.org',
        //     '@type': 'WebSite',
        //     name: 'パブリックコネクト',
        //     url: process.env.SITE_URL,
        //   }),
        // },
        // {
        //   hid: 'global-script',
        //   innerHTML: 'window.global = window;',
        //   type: 'text/javascript',
        // },
        // {
        //   src: process.env.SITE_URL + '/script/ckeditor-ja.js',
        //   type: 'text/javascript',
        // },
      ],
    },
  },
  modules: [
    '@element-plus/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-lazy-load',
    'nuxt-simple-sitemap',
    'nuxt-mapbox',
  ],
  mapbox: {
    accessToken:
      'pk.eyJ1IjoiYmV0YXBjaG9pMTBrIiwiYSI6ImNrY2ZuaWEwNjA2ZW0yeWw4bG9yNnUyYm0ifQ.bFCQ-5yq6cSsrhugfxO2_Q',
  },
  lazyLoad: {
    images: true,
    videos: false,
    audios: true,
    iframes: false,
    native: false,
    directiveOnly: false,

    // Default image must be in the public folder
    // defaultImage: '/images/default-image.jpg',

    // To remove class set value to false
    loadingClass: 'isLoading',
    loadedClass: 'isLoaded',
    appendClass: 'lazyLoad',
  },
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    themes: ['dark'],
  },
  css: ['~/assets/scss/main.scss', '~/assets/scss/ckeditor.scss'],
  vueuse: {
    ssrHandlers: true,
  },
  vite: {
    plugins: [
      ckeditor5({
        theme: require.resolve('@ckeditor/ckeditor5-theme-lark'),
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/element.scss" as element;`,
        },
      },
      postcss: {
        plugins: [
          require('tailwindcss/nesting'),
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
    resolve: {
      alias: {
        process: 'process/browser',
      },
    },
  },
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [
    {
      src: '~/plugins/ckeditor.ts',
      mode: 'client',
    },
  ],
  imports: {
    dirs: [
      'composables/*.{ts,js,mjs,mts}',
      'plugins/utils/*.ts',
      '/server/utils/*.ts',
    ],
  },
  build: {
    transpile: ['fsevents'],
  },
  components: [
    {
      path: '~/components/',
      pathPrefix: false,
    },
  ],
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_API,
      nuxtAuthSecret: process.env.NUXT_AUTH_SECRET,
      ggAPIKey: process.env.API_KEY_GGMAP,
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      basicAuthUserName: process.env.BASIC_AUTH_USERNAME,
      basicAuthPassword: process.env.BASIC_AUTH_PASSWORD,
      // siteURL: process.env.SITE_URL,
      urlAwsS3: process.env.URL_AWS_S3,
    },
  },
  routeRules: {
    '/user/**': { ssr: false },
    '/employer/favorite': { ssr: false },
    '/employer/inquiry/*': { ssr: false },
    '/employer/message/**': { ssr: false },
    '/employer/job/**': { ssr: false },
    '/employer/login': { ssr: false },
    '/employer/member/**': { ssr: false },
    '/employer/mypage': { ssr: false },
    '/employer/news/**': { ssr: false },
    '/employer/blog/**': { ssr: false },
    '/employer/notice/**': { ssr: false },
    '/employer/register/*': { ssr: false },
    '/employer/register-member/**': { ssr: false },
    '/employer/search': { ssr: false },
    '/employer/setting/**': { ssr: false },
    '/employer/special-feature/**': { ssr: false },
    '/employer/user/**': { ssr: false },
    '/employer/withdraw/*': { ssr: false },
    '/employer/applicant/list': { ssr: false },
    '/employer/applicant/**': { ssr: false },
    '/employer/plan-confirmation': { ssr: false },
    '/employer': { ssr: false },
    '/employer/favorite-job': { ssr: false },
    '/employer/search-other-job': { ssr: false },
    '/employer/entry-form-settings': { ssr: false },
    // '/error': { ssr: false },
    '/admin/**': { ssr: false, index: false },
  },
  site: {
    // url: process.env.SITE_URL,
  },
  sitemap: {
    xslColumns: [
      { label: 'URL', width: '70%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '30%' },
    ],
    exclude: [
      '/',
      '/common',
      '/employer/message/detail/recruitment',
      '/user/testmessage',
    ],
  },
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml'],
      ignore: ['/', '/common'],
    },
  },
});
