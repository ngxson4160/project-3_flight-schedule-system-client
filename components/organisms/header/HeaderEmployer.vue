<template>
  <div class="header !py-4">
    <div class="hover:cursor-pointer" @click="goToEmployer">
      <div class="">
        <div class="text-xs mb-1 mobile:mb-[6px]">
          官公庁・自治体で働くならパブリックコネクト
        </div>
        <img
          src="~/assets/images/logo-service-horizontal-2-mobile.webp"
          alt=""
          class="h-[24px]"
        />
      </div>
    </div>
    <div class="pc:hidden" @click="drawer = true">
      <img src="~/assets/images/icon-menu.svg" alt="" />
    </div>
    <client-only class="relative">
      <span
        v-if="dataMessage > 0"
        class="pc:hidden px-2 rounded-[20px] py-[2px] bg-danger text-xs text-white font-bold absolute top-[12px] mobile:right-[10px]"
      >
        {{ dataMessage }}
      </span>
      <el-drawer
        v-model="drawer"
        direction="rtl"
        size="70%"
        :with-header="false"
      >
        <div class="bg-primary p-6">
          <div class="py-4">
            <img
              src="~/assets/images/icon-close-white.svg"
              alt=""
              @click="drawer = false"
            />
          </div>
          <div
            v-if="!isBlogEmployer"
            class="w-full p-4 rounded-lg border-2 border-white flex justify-center text-white"
            @click="handleSearch()"
          >
            <span class="font-bold">ユーザーを探す</span>
          </div>
        </div>
        <div
          v-if="!isBlogEmployer"
          class="flex justify-between items-center px-6 py-4 border-b-[1px] border-gray-third"
          @click="handleGoToFavorite"
        >
          <div class="flex justify-between items-center">
            <img src="~/assets/images/icon-save-black.svg" alt="" />
            <span class="pl-2 font-bold text-sm">お気に入り</span>
          </div>
          <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
        </div>
        <div
          v-if="!isBlogEmployer"
          class="flex justify-between items-center px-6 py-4 border-b-[1px] border-gray-third"
          @click="handleGoToMessageList"
        >
          <div class="flex justify-between items-center relative">
            <img src="~/assets/images/icon-email.svg" alt="" />
            <span class="pl-2 font-bold text-sm">メッセージ</span>
            <span
              v-if="dataMessage > 0"
              class="px-2 rounded-[20px] py-[2px] bg-danger text-xs text-white font-bold absolute -top-[10px] left-[8px] mobile:left-[10px]"
            >
              {{ dataMessage }}
            </span>
          </div>
          <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
        </div>
        <div
          class="flex justify-between items-center px-6 py-4"
          @click="handleGotoNotice"
        >
          <div class="flex justify-between items-center relative">
            <img src="~/assets/images/icon-notifications.svg" alt="" />
            <span class="pl-2 font-bold text-sm">お知らせ</span>
            <span
              v-if="dataNotifiCation > 0"
              class="px-2 rounded-[20px] py-[2px] bg-danger text-xs text-white font-bold absolute left-[5px] bottom-[12px]"
            >
              {{ dataNotifiCation }}
            </span>
          </div>
          <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
        </div>
        <div
          class="flex justify-between items-center px-6 py-4"
          @click="redirectMyPage()"
        >
          <div class="flex justify-between items-center">
            <img src="~/assets/images/icon-user.svg" alt="" />
            <span class="pl-2 font-bold text-sm">マイページ</span>
          </div>
          <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
        </div>
        <div
          v-if="!isBlogEmployer"
          class="flex justify-between items-center px-6 py-4"
          @click="handleGotoPlanConfirm"
        >
          <div class="flex justify-between items-center">
            <span class="text-sm font-normal">プラン確認/支払い履歴</span>
          </div>
          <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
        </div>
        <div
          v-if="!isBlogEmployer && !isjobEmployer"
          class="flex justify-between items-center px-6 py-4"
          @click="redirectSettingMail()"
        >
          <div class="flex justify-between items-center">
            <span class="text-sm font-normal">設定</span>
          </div>
          <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
        </div>

        <div
          v-if="!isBlogEmployer"
          class="flex justify-between items-center px-6 py-4 border-t-[1px] border-gray-third"
        >
          <div class="flex justify-between items-center">
            <img src="~/assets/images/icon-help-search.svg" alt="" />
            <span class="pl-2 font-bold text-sm">他自治体</span>
          </div>
        </div>

        <div
          v-if="!isBlogEmployer"
          class="flex justify-between items-center px-6 py-4"
          @click="handleGotoSearchOther"
        >
          <div class="flex items-center gap-2">
            <img src="~/assets/images/icon-search.svg" alt="" class="w-6 h-6" />
            <h3 class="text-sm">他自治体の求人を探す</h3>
          </div>
          <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
        </div>

        <div
          v-if="!isBlogEmployer"
          class="flex items-center gap-2 py-4 px-6"
          @click="handleGotoFavoriteJob"
        >
          <div class="flex items-center w-full gap-2">
            <img
              src="~/assets/images/icon-book-black.svg"
              alt=""
              class="w-6 h-6"
            />
            <h3 class="text-sm">お気に入りした求人</h3>
          </div>
          <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
        </div>
        <div
          class="flex justify-between items-center px-6 py-4 border-y-[1px] border-gray-third"
          @click="handleGotoHelp"
        >
          <div class="flex justify-between items-center">
            <img src="~/assets/images/icon-help.svg" alt="" />
            <span class="pl-2 font-bold text-sm">ヘルプ</span>
          </div>
          <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
        </div>
        <div
          class="flex justify-between items-center px-6 py-4 border-b-[1px] border-gray-third"
        >
          <div
            class="flex justify-between items-center"
            @click="onBeforeLogout()"
          >
            <span class="text-primary text-sm">ログアウト</span>
          </div>
        </div>
      </el-drawer>
    </client-only>
    <div
      class="flex justify-between items-center font-bold text-sm mobile:hidden"
    >
      <div
        v-if="!isBlogEmployer"
        class="pc:pr-5 py-4 flex items-center"
        @click="handleGoToFavorite"
      >
        <img src="~/assets/images/icon-save-black.svg" alt="" />
        <span class="pl-2">お気に入り</span>
      </div>

      <div
        v-if="!isBlogEmployer"
        class="pc:px-5 py-4 flex items-center relative"
        @click="handleGoToMessageList"
      >
        <img src="~/assets/images/icon-email.svg" alt="" />
        <span class="pl-2">メッセージ</span>
        <span
          v-if="dataMessage > 0"
          class="px-2 rounded-[20px] py-[2px] bg-danger text-xs text-white font-bold absolute top-[5px] left-[30px] mobile:left-[10px]"
        >
          {{ dataMessage }}
        </span>
      </div>
      <div
        class="px-5 py-4 flex items-center mobile:hidden relative cursor-pointer"
        @click="handleGotoNotice"
      >
        <img src="~/assets/images/icon-notifications.svg" alt="" />
        <h2 class="pl-2 cursor-pointer">お知らせ</h2>
        <span
          v-if="dataNotifiCation > 0"
          class="px-2 rounded-[20px] py-[2px] bg-danger text-xs text-white font-bold absolute top-[5px] left-[23px]"
        >
          {{ dataNotifiCation }}
        </span>
      </div>
      <div class="py-4 flex items-center">
        <el-dropdown trigger="click">
          <div class="px-5 flex items-center">
            <img src="~/assets/images/icon-user.svg" alt="" />
            <span class="pl-2">マイページ</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <div class="pt-[19px] px-4">
                <el-dropdown-item @click="routerPush(`/employer/mypage`)">
                  マイページ
                </el-dropdown-item>
              </div>
              <div v-if="!isBlogEmployer" class="p-4">
                <el-dropdown-item
                  @click="routerPush(`/employer/plan-confirmation`)"
                >
                  プラン確認/支払い履歴
                </el-dropdown-item>
              </div>
              <div v-if="!isBlogEmployer && !isjobEmployer" class="pb-4 px-4">
                <el-dropdown-item
                  @click="routerPush('/employer/setting/email')"
                >
                  設定
                </el-dropdown-item>
              </div>
              <div class="pt-4 pb-[19px] px-4 border-t border-gray-third">
                <el-dropdown-item @click="onBeforeLogout()">
                  <span class="text-primary">ログアウト</span>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div v-if="!isBlogEmployer" class="py-4 flex items-center">
        <el-dropdown trigger="click">
          <div class="px-5 flex items-center">
            <img src="~/assets/images/icon-help-search.svg" alt="" />
            <span class="pl-2">他自治体</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <div class="pt-[19px] px-4">
                <el-dropdown-item
                  @click="routerPush(`/employer/search-other-job`)"
                >
                  <div class="flex items-center gap-2">
                    <img
                      src="~/assets/images/icon-search.svg"
                      alt=""
                      class="w-6 h-6"
                    />
                    <h3 class="text-sm">他自治体の求人を探す</h3>
                  </div>
                </el-dropdown-item>
              </div>
              <div v-if="!isBlogEmployer" class="p-4">
                <el-dropdown-item @click="routerPush(`/employer/favorite-job`)">
                  <div class="flex items-center gap-2">
                    <img
                      src="~/assets/images/icon-book-black.svg"
                      alt=""
                      class="w-6 h-6"
                    />
                    <h3 class="text-sm">お気に入りした求人</h3>
                  </div>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="px-5 py-4 flex items-center" @click="handleGotoHelp">
        <img src="~/assets/images/icon-help.svg" alt="" />
        <span class="pl-2">ヘルプ</span>
      </div>
      <div
        v-if="!isBlogEmployer"
        class="ml-5 px-8 py-3 text-primary rounded-lg border-2 hover:cursor-pointer"
        @click="handleSearch()"
      >
        ユーザーを探す
      </div>
    </div>
    <BeforeLogout
      v-model:status="dialogBeforeLogout"
      @update-status="updateStatusDialog"
    />
  </div>
  <div
    v-if="isAdminLoginProxy"
    class="fixed pc:top-[80px] top-[64px] pc:z-[1000] z-[99] flex items-center justify-center pc:left-1/2 pc:-translate-x-1/2 mobile:inset-x-0"
  >
    <div
      class="button-logout-proxy text-white text-[14px] font-bold flex items-center py-4 pc:px-8 px-6 gap-8 rounded-xl"
    >
      <p>代理ログイン中</p>
      <p
        class="border-2 border-white rounded-lg py-4 px-10 cursor-pointer hover:bg-primary hover:border-primary"
        @click="dialogConfirmLogoutProxy = true"
      >
        ログアウト
      </p>
    </div>
  </div>
  <ConfirmDeleteNotice
    v-model:status="dialogConfirmLogoutProxy"
    content="ログアウトする場合、編集中の内容は破棄されます。"
    title="ログアウトしてもよろしいですか？ "
    text-button-cofirm="ログアウト"
    type-dialog="proxy-logout"
    @update-status="updateStatus"
    @handle-confirm="handleLogoutProxy"
  />
</template>

<script lang="ts" setup>
import { IResponse } from 'utils/interface';
import { useNotification, ICountNotification } from '~~/stores/useNotification';
import { EMemberType, EHeaderPath } from '~/utils/enum';
import { useAuthStore } from '~~/stores/auth';
import { useEmployer } from '~~/composables/auth/useEmployer';

// add Zendesk Widget script
const cookieSessionAuth = useCookie('auth.session-token').value;
const isEmployer = ref<boolean>(false);
if (cookieSessionAuth) {
  isEmployer.value = useEmployer();
}

useHead({
  script: isEmployer.value
    ? [
        {
          src: 'https://static.zdassets.com/ekr/snippet.js?key=8a6de338-6292-408e-98d9-c116556c447d',
          id: 'ze-snippet',
          hid: 'ze-snippet-id',
          async: true,
        },
      ]
    : [],
});

const drawer = ref(false);
const show = ref(false);
const dataNotifiCation = ref();
const dialogBeforeLogout = ref(false);
const showMessage = ref(false);
const dataMessage = ref();
const router = useRouter();
const route = useRoute();

const isBlogEmployer = ref(false);
const isjobEmployer = ref(false);

const dataStorage = useCookie('auth.system-data');
if (dataStorage.value) {
  handleJWTDecrypt(dataStorage.value).memberType === EMemberType.MEMBER_BLOGGER
    ? (isBlogEmployer.value = true)
    : (isBlogEmployer.value = false);

  handleJWTDecrypt(dataStorage.value).memberType ===
  EMemberType.MEMBER_RECRUITMENT
    ? (isjobEmployer.value = true)
    : (isjobEmployer.value = false);
}

const goToEmployer = () => {
  if (route.fullPath === EHeaderPath.EMPLOYER) window.scrollTo(0, 0);
  else routerPush(EHeaderPath.EMPLOYER);
  useClearFormInquiryEmployer();
};

const updateStatusDialog = (val: boolean) => {
  dialogBeforeLogout.value = val;
};
const handleSearch = () => {
  routerPush('/employer/search');
  drawer.value = false;
  useClearFormInquiryEmployer();
};

const handleGoToMessageList = () => {
  routerPush('/employer/message/list');
  drawer.value = false;
  useClearFormInquiryEmployer();
};

const redirectMyPage = () => {
  routerPush(`/employer/mypage`);
  drawer.value = false;
  useClearFormInquiryEmployer();
};

const redirectSettingMail = () => {
  routerPush('/employer/setting/email');
  drawer.value = false;
  useClearFormInquiryEmployer();
};

const handleGoToFavorite = () => {
  routerPush('/employer/favorite');
  drawer.value = false;
  useClearFormInquiryEmployer();
};

const handleGotoHelp = () => {
  routerPush('/help-government-agencies');
  drawer.value = false;
  useClearFormInquiryEmployer();
};

const handleGotoNotice = () => {
  routerPush('/employer/notice/list');
  drawer.value = false;
  useClearFormInquiryEmployer();
};

const handleGotoPlanConfirm = () => {
  routerPush('/employer/plan-confirmation');
  drawer.value = false;
  useClearFormInquiryEmployer();
};

const handleGotoSearchOther = () => {
  routerPush('/employer/search-other-job');
  drawer.value = false;
  useClearFormInquiryEmployer();
};

const handleGotoFavoriteJob = () => {
  routerPush('/employer/favorite-job');
  drawer.value = false;
  useClearFormInquiryEmployer();
};

const onBeforeLogout = () => {
  dialogBeforeLogout.value = true;
};
const notificaiton = useNotification();

const count = ref<ICountNotification>();
const isAdminLoginProxy = ref<boolean>(false);
onMounted(async () => {
  await nextTick();

  const authStore = useAuthStore();
  handleGetProviders();
  if (authStore.proxyAdminId) isAdminLoginProxy.value = true;
  else isAdminLoginProxy.value = false;

  count.value = await notificaiton.setNotification();

  if (count.value) {
    show.value = true;
    dataNotifiCation.value = count.value.employer.countNotice;
  }

  if (count.value) {
    showMessage.value = true;
    dataMessage.value = count.value.employer.countMessage;
  }
});

router.afterEach(async (from, to) => {
  setTimeout(async () => {
    if (!notificaiton.isLoading) {
      count.value = await notificaiton.setNotification();
      if (count.value) {
        show.value = true;
        dataNotifiCation.value = count.value.employer.countNotice;
      }

      if (count.value) {
        showMessage.value = true;
        dataMessage.value = count.value.employer.countMessage;
      }
    }
  }, 6000);
  await nextTick();
});

const dialogConfirmLogoutProxy = ref(false);
const updateStatus = (val: boolean) => {
  dialogConfirmLogoutProxy.value = val;
};

const handleLogoutProxy = async () => {
  const { data, error } = await useBaseFetch(
    '/employers/profile/logout/proxy',
    {
      method: 'POST',
    },
  );
  if (error.value?.data) throw error.value?.data;
  else {
    onLoading();
    const response = data.value as IResponse;

    await setUpAfterLogin(response.data.token);
    await nextTick();
    setTimeout(() => {
      const pathEmployerDetail = useLocalStorage('path.employer-detail', '');
      routerPush(pathEmployerDetail.value);
      pathEmployerDetail.value = null;
    }, 1000);

    closeLoading();
  }
};
</script>

<style lang="scss" scoped>
img,
span {
  @apply hover:cursor-pointer;
}
</style>
<style>
.button-logout-proxy {
  background: rgba(51, 51, 51, 0.8);
}
</style>
