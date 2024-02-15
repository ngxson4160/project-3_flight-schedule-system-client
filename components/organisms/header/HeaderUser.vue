<template>
  <div class="header mobile:!py-[6px]">
    <div class="flex justify-between items-center">
      <div class="pc:hidden" @click="drawer = true">
        <img class="w-5 h-5" src="~/assets/images/icon-menu.svg" alt="" />
      </div>
      <client-only class="relative">
        <span
          v-if="dataNotifiCation > 0"
          class="pc:hidden px-2 rounded-[20px] py-[2px] bg-danger text-xs text-white font-bold absolute top-[10px] left-[30px]"
        >
          {{ dataNotifiCation }}
        </span>
        <el-drawer
          v-model="drawer"
          direction="ltr"
          size="70%"
          :with-header="false"
        >
          <div class="bg-primary p-6">
            <div class="py-4 flex justify-end">
              <img
                src="~/assets/images/icon-close-white.svg"
                alt=""
                @click="drawer = false"
              />
            </div>
            <div
              class="w-full p-4 rounded-lg border-2 border-white flex justify-center text-white"
              @click="handleSearch"
            >
              <span class="font-bold">求人を探す</span>
            </div>
          </div>
          <div
            class="flex justify-between items-center px-6 py-4 border-b-[1px] border-gray-third"
            @click="redirectFavorite"
          >
            <div class="flex justify-between items-center">
              <img src="~/assets/images/icon-save-black.svg" alt="" />
              <span class="pl-2 font-bold text-sm">お気に入り</span>
            </div>
            <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
          </div>
          <div
            class="flex justify-between items-center px-6 py-4 border-b-[1px] border-gray-third"
            @click="handleGoToMessageList"
          >
            <div class="flex justify-between items-center">
              <img src="~/assets/images/icon-email.svg" alt="" />
              <span class="pl-2 font-bold text-sm">メッセージ</span>
            </div>
            <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
          </div>
          <div
            class="flex justify-between items-center px-6 py-4 border-b-[1px] border-gray-third"
            @click="handleGotoNotice"
          >
            <div class="flex justify-between items-center relative">
              <img src="~/assets/images/icon-notifications.svg" alt="" />
              <span class="pl-2 font-bold text-sm">お知らせ</span>
              <span
                v-if="dataNotifiCation > 0"
                class="px-2 rounded-[20px] py-[2px] bg-danger text-xs text-white font-bold absolute -top-[10px] left-[5px]"
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
            class="flex justify-between items-center px-6 py-4"
            @click="redirectApplicantList()"
          >
            <div class="flex justify-between items-center">
              <span class="font-normal text-sm">エントリー一覧</span>
            </div>
            <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
          </div>
          <div
            class="flex justify-between items-center px-6 py-4"
            @click="redirectEntryList()"
          >
            <div class="flex justify-between items-center">
              <span class="font-normal text-sm">エントリー下書き一覧</span>
            </div>
            <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
          </div>
          <div
            class="flex justify-between items-center px-6 py-4"
            @click="redirectSettingMail()"
          >
            <div class="flex justify-between items-center">
              <span class="font-normal text-sm">設定</span>
            </div>
            <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
          </div>
          <div
            class="flex justify-between items-center px-6 py-4 border-y-[1px] border-gray-third"
            @click="handleGotoJobSeek"
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
              @click="beforeLogout"
            >
              <span class="text-primary text-sm">ログアウト</span>
            </div>
          </div>
        </el-drawer>
      </client-only>
      <div class="mobile:pl-6 hover:cursor-pointer" @click="gotoUser">
        <div class="mobile:hidden">
          <div class="text-xs mb-1">
            官公庁・自治体で働くならパブリックコネクト
          </div>
          <img
            src="~/assets/images/logo-service-horizontal-2-mobile.webp"
            alt=""
            class="h-[24px]"
          />
        </div>

        <img
          src="~/assets/images/logo-service-vertical-2-mobile.webp"
          alt=""
          class="pc:hidden w-8"
        />
      </div>
    </div>
    <div class="flex justify-between items-center font-bold text-sm">
      <div
        class="px-5 py-4 flex items-center mobile:order-2"
        @click="redirectFavorite"
      >
        <img
          class="w-6 h-6 mobile:hidden mobile:w-8 mobile:h-8"
          src="~/assets/images/icon-save-black.svg"
          alt=""
        />
        <img
          v-if="isPageUserFavorite"
          class="w-6 h-6 mobile:w-7 mobile:h-7 pc:hidden"
          src="~/assets/images/icon-saved-blue.svg"
          alt=""
        />
        <img
          v-else
          class="w-6 h-6 mobile:w-7 mobile:h-7 pc:hidden"
          src="~/assets/images/icon-save-black.svg"
          alt=""
        />
        <span class="pl-2 mobile:hidden">お気に入り</span>
      </div>
      <div
        class="pc:px-5 py-4 flex items-center relative"
        @click="handleGoToMessageList"
      >
        <img
          class="pc:block hidden w-6 h-6"
          src="~/assets/images/icon-email.svg"
          alt=""
        />
        <img
          v-if="isPageUserMessage"
          class="mobile:block hidden w-8 h-8"
          src="~/assets/images/icon-email-active.svg"
          alt=""
        />
        <img
          v-else
          class="mobile:block hidden !w-[28px] !h-[28px]"
          src="~/assets/images/icon-email.svg"
          alt=""
        />

        <span class="pl-2 mobile:hidden">メッセージ</span>
        <span
          v-if="dataMessage > 0"
          class="px-2 rounded-[20px] py-[2px] bg-danger text-xs text-white font-bold absolute top-[5px] left-[30px] mobile:left-[10px]"
        >
          {{ dataMessage }}
        </span>
      </div>
      <div
        class="px-5 py-4 flex items-center mobile:hidden relative"
        @click="handleGotoNotice"
      >
        <img
          class="w-6 h-6"
          src="~/assets/images/icon-notifications.svg"
          alt=""
        />
        <span class="pl-2">お知らせ</span>
        <span
          v-if="dataNotifiCation > 0"
          class="px-2 rounded-[20px] py-[2px] bg-danger text-xs text-white font-bold absolute top-[5px] left-[23px]"
        >
          {{ dataNotifiCation }}
        </span>
      </div>
      <div class="py-4 flex items-center">
        <el-dropdown trigger="click">
          <div class="px-5 flex items-center mobile:hidden">
            <img class="w-5 h-5" src="~/assets/images/icon-user.svg" alt="" />
            <span class="pl-2 !font-bold">マイページ</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <div class="pt-[19px] px-4">
                <el-dropdown-item @click="redirectMyPage">
                  マイページ
                </el-dropdown-item>
              </div>
              <div class="p-4">
                <el-dropdown-item @click="redirectApplicantList">
                  エントリー一覧
                </el-dropdown-item>
              </div>
              <div class="p-4">
                <el-dropdown-item @click="redirectEntryList">
                  エントリー下書き一覧
                </el-dropdown-item>
              </div>
              <div class="pb-4 px-4 border-b-[1px] border-gray-third">
                <el-dropdown-item @click="redirectSettingMail">
                  設定
                </el-dropdown-item>
              </div>
              <div class="pt-4 pb-[19px] px-4">
                <el-dropdown-item @click="beforeLogout">
                  <span class="text-primary">ログアウト</span>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div
        class="px-5 py-4 flex items-center mobile:hidden"
        @click="handleGotoJobSeek"
      >
        <img class="w-6 h-6" src="~/assets/images/icon-help.svg" alt="" />
        <span class="pl-2">ヘルプ</span>
      </div>
      <div
        class="px-8 ml-5 py-3 text-primary rounded-lg border-2 mobile:hidden hover:cursor-pointer"
        @click="handleSearch"
      >
        求人を探す
      </div>
      <div class="pc:hidden order-last" @click="handleSearch">
        <img
          v-if="isPageUserSearch"
          src="~/assets/images/icon-search-blue.png"
          class="h-8"
        />
        <img
          v-else
          class="mobile:w-7 mobile:h-7"
          src="~/assets/images/icon-search.svg"
          alt=""
        />
      </div>
    </div>
    <BeforeLogout
      v-model:status="dialogBeforeLogout"
      @update-status="updateStatusDialog"
    />
  </div>
</template>
<script lang="ts" setup>
import { reloadNuxtApp } from 'nuxt/app';
import { useNotification, ICountNotification } from '~~/stores/useNotification';
import { EHeaderPath } from '~/utils/enum';

const props = defineProps({
  activeMessage: {
    type: Boolean,
    default: false,
  },
});

const dialogBeforeLogout = ref(false);
const drawer = ref(false);
const show = ref(false);
const showMessage = ref(false);
const dataNotifiCation = ref();
const dataMessage = ref();
const handleSearch = () => {
  drawer.value = false;
  routerPush('/user/search');
  useClearFormInquiry();
};
const beforeLogout = () => {
  dialogBeforeLogout.value = true;
};

const updateStatusDialog = (val: boolean) => {
  dialogBeforeLogout.value = val;
};

const router = useRouter();
const route = useRoute();

const isPageUserSearch = computed(() => {
  return route.path === '/user/search';
});
const isPageUserMessage = computed(() => {
  return route.path === '/user/message/list';
});
const isPageUserFavorite = computed(() => {
  return route.path.includes('user/favorite');
});

const gotoUser = () => {
  if (route.fullPath === EHeaderPath.USER) window.scrollTo(0, 0);
  else routerPush(EHeaderPath.USER);
  useClearFormInquiry();
};

const redirectMyPage = () => {
  routerPush(`/user/mypage`);
  drawer.value = false;
  useClearFormInquiry();
};

const redirectFavorite = () => {
  routerPush('/user/favorite/jobs');
  drawer.value = false;
  useClearFormInquiry();
};

const redirectApplicantList = () => {
  routerPush('/user/job-applicant/list');
  drawer.value = false;
  useClearFormInquiry();
};

const redirectEntryList = () => {
  routerPush('/user/entry/list');
  drawer.value = false;
  useClearFormInquiry();
};

const redirectSettingMail = () => {
  routerPush('/user/setting/email');
  drawer.value = false;
  useClearFormInquiry();
};

const handleGoToMessageList = () => {
  routerPush('/user/message/list');
  drawer.value = false;
  useClearFormInquiry();
};

const handleGotoNotice = () => {
  routerPush('/user/notice/list');
  drawer.value = false;
  useClearFormInquiry();
};

const handleGotoJobSeek = () => {
  routerPush('/help-job-seeker');
  drawer.value = false;
  useClearFormInquiry();
};
const notificaiton = useNotification();

const count = ref<ICountNotification>();
onMounted(async () => {
  await nextTick();
  count.value = await notificaiton.setNotification();

  if (count.value) {
    show.value = true;
    dataNotifiCation.value = count.value.user.countNotice;
  }

  if (count.value) {
    showMessage.value = true;
    dataMessage.value = count.value.user.countMessage;
  }
});

router.afterEach(async (from, to) => {
  setTimeout(async () => {
    if (!notificaiton.isLoading) {
      count.value = await notificaiton.setNotification();
      if (count.value) {
        show.value = true;
        dataNotifiCation.value = count.value.user.countNotice;
      }

      if (count.value) {
        showMessage.value = true;
        dataMessage.value = count.value.user.countMessage;
      }
    }
  }, 6000);
  await nextTick();
});
</script>
<style lang="scss" scoped>
img,
span {
  @apply hover:cursor-pointer;
}
</style>
