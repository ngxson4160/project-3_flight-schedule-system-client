<template>
  <div class="">
    <div
      v-if="role === 'GUEST' || role === 'USER'"
      class="flex gap-2 text-sm mobile:px-6 mobile:file:py-10 pt-8 pb-4 w-[1312px] mobile:w-full mx-auto mobile:py-4"
    >
      <p
        class="text-primary cursor-pointer underline underline-offset-2"
        @click="routerPush('/')"
      >
        ホーム
      </p>
      <img
        src="~/assets/images/arrow_right_black.svg"
        alt=""
        class="border-style"
      />
      <h3 class="text-black text-sm leading-[170%]">{{ title }}</h3>
    </div>

    <div v-if="props.isBackGround" class="relative w-full">
      <div
        v-if="srcBackground"
        class="custom-image pc:!h-[240px] !h-[65px] w-full block bg-no-repeat bg-center bg-cover mobile:rounded-none"
        :style="{
          'background-image': 'url(' + srcBackground + ')',
        }"
      ></div>
      <img
        v-else
        src="~/assets/images/job-list-banner-1.webp"
        class="w-full pc:h-[440px] h-[120px] object-fill"
        alt=""
      />
      <div class="style-image-47 pc:!hidden">
        <div
          v-if="srcAvatar"
          class="bg-cover pc:hidden bg-white h-16 w-16 rounded-full bg-no-repeat bg-center border border-solid border-gray-third"
          :style="{
            'background-image': 'url(' + srcAvatar + ')',
          }"
        ></div>
        <img
          v-else
          src="~/assets/images/icon-fire-large.svg"
          class="pc:w-[96px] pc:h-[96px] h-[60px] w-[60px] object-fill"
          alt=""
        />
      </div>
      <div class="px-6 pc:!hidden">
        <p class="font-bold text-2xl mt-12 mb-2 mobile:text-lg">
          {{ title }}
        </p>
        <div class="mb-4">
          <div
            id="parentMobile"
            class="text-col-mobile"
            :class="{ active: isActiveMobile }"
          >
            <div
              class="text-sm whitespace-pre-line break-words !leading-[170%]"
            >
              {{ profileEmployerStore.aboutUs }}
            </div>
          </div>
          <span
            v-if="isShowMobile"
            class="text-gray text-sm underline cursor-pointer !leading-[170%]"
            @click="handleShowMore()"
          >
            もっと見る
          </span>
          <span
            v-else
            class="text-gray text-sm underline cursor-pointer !leading-[170%]"
            @click="handleShowLess()"
          >
            閉じる
          </span>
        </div>
        <EmployerSummaryCardInfo
          :role="role"
          :employer-id="employerId"
          :social-links="profileEmployerStore.socialLinks"
        />
      </div>
    </div>
    <div
      v-if="role === 'EMPLOYER'"
      class="w-full mx-auto flex items-center justify-center border-b-[1px] border-gray-third"
    >
      <div
        class="flex text-gray font-bold mobile:overflow-x-auto pt-16 mobile:w-full mobile:px-6 gap-x-16 mobile:gap-x-0"
        :class="{
          'mobile:pt-6': props.isBackGround,
          'mobile:pt-10': !props.isBackGround,
        }"
      >
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ 'tab-current ': tab.isActive }"
        >
          <p
            class="hover:cursor-pointer whitespace-nowrap text-sm mobile:p-4"
            :class="{
              'pc:pb-5 mobile:pb-3': tab.isActive,
              'pc:pb-6 mobile:pb-4': !tab.isActive,
            }"
            @click="routerPush(tab.fullPath)"
          >
            {{ tab.content }}
          </p>
          <div v-if="tab.isActive" class="bg-primary w-full h-1"></div>
        </div>
      </div>
    </div>
    <div
      v-if="role === 'EMPLOYER'"
      class="flex mobile:px-6 pt-10 mobile:pt-8 mb-[104px] w-[1312px] mobile:w-full mx-auto mobile:py-4 mobile:flex-col-reverse"
      :class="{ hidden: !isBackGround }"
    >
      <div class="w-[296px] mobile:w-full flex-shrink-0 flex flex-col">
        <EmployerSummaryCard
          class="pb-10 mobile:hidden border-b border-color-border"
          :employer-id="id"
          :title="title"
          :about-us="profileEmployerStore.aboutUs"
          :src-avatar="srcAvatar"
          :social-links="profileEmployerStore.socialLinks"
        ></EmployerSummaryCard>
        <!-- <EmployerNewsCard
          v-if="newsEmployerStore.newsInMyPage.length > 0"
          :news-list="newsEmployerStore.newsInMyPage"
          :role="role"
          :link-news-list="linkNewsList"
          class="pt-10 mobile:pt-16 mobile:mt-16 w-full"
          @click-detail="goToDetailNews"
        ></EmployerNewsCard> -->
        <p class="mt-16 border-b border-gray-third pc:hidden"></p>
        <EmployerGeneralInformationCard
          class="pc:mt-10 mt-16"
        ></EmployerGeneralInformationCard>
      </div>
      <div class="flex-1 pc:pl-[56px]">
        <slot name="content"></slot>
      </div>
    </div>

    <div
      v-else
      class="pc:w-[1312px] mx-auto flex mb-[104px] mobile:flex-col-reverse"
    >
      <div
        class="w-[296px] mobile:w-full flex-shrink-0 flex flex-col mobile:px-6"
      >
        <client-only>
          <EmployerSummaryCard
            :role="role"
            class="pb-10 mobile:hidden border-b border-color-border pt-6"
            :employer-id="id"
            :title="title"
            :about-us="profileEmployerStore.aboutUs"
            :src-avatar="srcAvatar"
            :social-links="profileEmployerStore.socialLinks"
          ></EmployerSummaryCard>
        </client-only>

        <client-only>
          <EmployerNewsCard
            v-if="isShowNewsList && newsEmployerStore.newsInMyPage.length > 0"
            :news-list="newsEmployerStore.newsInMyPage"
            :link-news-list="linkNewsList"
            class="pt-10 mobile:pt-16 mobile:mt-16"
            :role="role"
            @click-detail="goToDetailNews"
          ></EmployerNewsCard>
        </client-only>

        <client-only>
          <EmployerGeneralInformationCard
            class="pc:mt-10 mt-16"
          ></EmployerGeneralInformationCard>
        </client-only>
      </div>
      <p class="mt-16 border-b border-gray-third pc:hidden"></p>
      <div class="flex-1 pc:pl-[56px]">
        <div class="w-full flex">
          <div
            :class="`flex text-gray mb-10 border-b pt-10 border-color-border font-bold mobile:overflow-x-scroll w-full mobile:px-6 ${
              props.isBackGround ? 'mobile:pt-6' : 'mobile:pt-10'
            }`"
          >
            <div
              v-for="(tab, index) in tabs"
              :key="index"
              :class="{ 'tab-current': tab.isActive }"
            >
              <p
                class="hover:cursor-pointer whitespace-nowrap text-sm px-4 py-3"
                @click="routerPush(tab.fullPath)"
              >
                {{ tab.content }}
              </p>
              <div v-if="tab.isActive" class="bg-primary w-full h-1"></div>
            </div>
          </div>
        </div>
        <div class="mobile:px-6 mx-auto"><slot name="content"></slot></div>
      </div>
    </div>

    <UnregisteredAlert
      v-model:dialog-visible="dialogAlert"
      @update-status="updateStatusAlert"
      @event-cancel="dialogAlert = false"
    />
  </div>
</template>

<script setup lang="ts">
import {
  useProfileEmployerStore,
  IEmployerData,
} from '~~/stores/profileEmployer';
import { EMemberType } from '~~/utils/enum';
import { useNewsStore } from '~/stores/useNewsStore';

const props = defineProps({
  role: {
    type: String,
    default: '',
  },
  employerId: {
    type: Number,
    default: 0,
  },
  isBackGround: {
    type: Boolean,
    default: false,
  },
});

const isActiveMobile = ref<boolean>(false);
const isShowMobile = ref<boolean>(false);

onMounted(async () => {
  await nextTick();
  const parent = document.getElementById('parentMobile');

  if (parent && parent.clientHeight < parent?.scrollHeight) {
    isShowMobile.value = true;
  } else {
    isShowMobile.value = false;
  }
});

const handleShowMore = () => {
  isShowMobile.value = false;
  isActiveMobile.value = true;
};
const handleShowLess = () => {
  isShowMobile.value = true;
  isActiveMobile.value = false;
};

const newsEmployerStore = useNewsStore();

const id = ref(props.employerId);
const dialogAlert = ref<boolean>(false);

// data render
const srcAvatar = ref<string>();
const srcBackground = ref<string>();
const title = ref<string>();

// get data employer
const profileEmployerStore = useProfileEmployerStore();
const responseData = ref<IEmployerData>();

if (id.value) {
  if (id.value !== profileEmployerStore.id) {
    responseData.value = await profileEmployerStore.getEmployerData(id.value);
    if (responseData.value) {
      profileEmployerStore.setEmployerData(responseData.value);
    }
  }
  if (!newsEmployerStore.newsInMyPage.length) {
    await newsEmployerStore.fetchNewsInMyPage(id.value);
  }
  // set data render
  srcAvatar.value = profileEmployerStore.avatarURL;
  srcBackground.value = profileEmployerStore.backgroundURL;
  title.value = profileEmployerStore.government.name;
}

// tabs
interface ITab {
  content: string;
  fullPath: string;
  isActive: Boolean;
}
const tabs = ref<ITab[]>([]);

const roleSystem = ref(props.role);
// role === employer
if (roleSystem.value === 'EMPLOYER') {
  const dataStorage = useCookie('auth.system-data');

  if (dataStorage.value) {
    const memberType = handleJWTDecrypt(dataStorage.value).memberType;
    switch (memberType) {
      case EMemberType.MEMBER_BLOGGER:
        tabs.value = [
          {
            content: '官公庁情報',
            fullPath: '/employer/mypage',
            isActive: false,
          },
          {
            content: 'ブログ・動画管理',
            fullPath: '/employer/blog/list',
            isActive: false,
          },
          {
            content: 'お知らせ管理',
            fullPath: '/employer/news/list',
            isActive: false,
          },
        ];
        break;
      case EMemberType.MEMBER_RECRUITMENT:
        tabs.value = [
          {
            content: '官公庁情報',
            fullPath: '/employer/mypage',
            isActive: false,
          },
          {
            content: '求人管理',
            fullPath: '/employer/job/list',
            isActive: false,
          },
          {
            content: '応募者管理',
            fullPath: '/employer/applicant/list',
            isActive: false,
          },
          {
            content: 'ブログ・動画管理',
            fullPath: '/employer/blog/list',
            isActive: false,
          },
          {
            content: 'お知らせ管理',
            fullPath: '/employer/news/list',
            isActive: false,
          },
        ];
        break;
      default:
        tabs.value = [
          {
            content: '官公庁情報',
            fullPath: '/employer/mypage',
            isActive: false,
          },
          {
            content: '求人管理',
            fullPath: '/employer/job/list',
            isActive: false,
          },
          {
            content: '応募者管理',
            fullPath: '/employer/applicant/list',
            isActive: false,
          },
          {
            content: 'ブログ・動画管理',
            fullPath: '/employer/blog/list',
            isActive: false,
          },
          {
            content: 'お知らせ管理',
            fullPath: '/employer/news/list',
            isActive: false,
          },
          {
            content: 'メンバー管理',
            fullPath: '/employer/member/list',
            isActive: false,
          },
          {
            content: 'カレンダー',
            fullPath: '/employer/calendar',
            isActive: false,
          },
        ];
    }
  }
}

// role === user
if (roleSystem.value === 'USER')
  tabs.value = [
    {
      content: 'ホーム',
      fullPath: `/user/employer/${id.value}`,
      isActive: false,
    },
    {
      content: 'PR',
      fullPath: `/user/employer/${id.value}/blog/list`,
      isActive: false,
    },
    {
      content: '求人',
      fullPath: `/user/employer/${id.value}/job/list`,
      isActive: false,
    },
    {
      content: 'お知らせ',
      fullPath: `/user/employer/${id.value}/news/list`,
      isActive: false,
    },
  ];

// role === guest
if (roleSystem.value === 'GUEST')
  tabs.value = [
    {
      content: 'ホーム',
      fullPath: `/employer/${id.value}`,
      isActive: false,
    },
    {
      content: 'PR',
      fullPath: `/employer/${id.value}/blog/list`,
      isActive: false,
    },
    {
      content: '求人',
      fullPath: `/employer/${id.value}/job/list`,
      isActive: false,
    },

    {
      content: 'お知らせ',
      fullPath: `/employer/${id.value}/news/list`,
      isActive: false,
    },
  ];

const isShowNewsList = computed(() => {
  if (roleSystem.value === ERole.USER || roleSystem.value === ERole.GUEST) {
    return false;
  } else {
    return true;
  }
});

const linkNewsList = computed(() => {
  if (roleSystem.value === 'GUEST' || roleSystem.value === 'USER')
    return `${tabs.value[3].fullPath}`;
  return `/employer/news/list`;
});

const goToDetailNews = (id: number) => {
  if (roleSystem.value === 'GUEST' || roleSystem.value === 'USER')
    return routerPush(`${tabs.value[0].fullPath}/news/${id}`);
  return routerPush(`/employer/news/${id}`);
};

const route = useRoute();
tabs.value.forEach((tab) => {
  if (tab.fullPath === route.path) {
    tab.isActive = true;
  }
});

const updateStatusAlert = (val: boolean) => {
  dialogAlert.value = val;
};

onBeforeRouteLeave((to: any) => {
  if (to?.path && !tabs.value.map((t) => t.fullPath).includes(to.path)) {
    profileEmployerStore.$reset();
    newsEmployerStore.$reset();
  }
});
</script>

<style lang="scss" scoped>
.tab-current {
  @apply text-black flex flex-col items-center;
}

.style-image-47 {
  position: absolute;
  transform: translate(24px, -35%);
}

.text-col-mobile {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  animation: all 0.3s ease-in-out;
}

.text-col-mobile.active {
  -webkit-line-clamp: unset;
  overflow: unset;
  animation: all 0.3s ease-in-out;
}
</style>
