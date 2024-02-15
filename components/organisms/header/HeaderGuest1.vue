<template>
  <div class="header" :class="classPlus">
    <div>
      <p class="text-[12px] mobile:text-[10px]">
        官公庁・自治体で働くならパブリックコネクト
      </p>
      <div class="hover:cursor-pointer mt-1 mobile:mt-[6px]" @click="gotoHome">
        <img
          src="~/assets/images/logo-service-horizontal-2-mobile.webp"
          alt=""
          class="h-[24px]"
        />
      </div>
    </div>
    <div class="flex font-bold text-sm mobile:hidden gap-x-10">
      <div class="flex items-center">
        <span @click="gotoSearch">求人を探す</span>
      </div>
      <div class="flex items-center">
        <span @click="gotoPublicOffice">官公庁の方</span>
      </div>
      <div class="flex items-center text-primary">
        <span class="hover:cursor-pointer" @click="gotoLogin">ログイン</span>
      </div>
      <div
        class="px-8 py-3 h-[45px] rounded-lg bg-primary text-white hover:cursor-pointer flex items-center"
        @click="gotoSingUp"
      >
        <span>会員登録</span>
      </div>
    </div>
    <div class="pc:hidden" @click="drawer = true">
      <img src="~/assets/images/icon-menu.svg" alt="" />
    </div>
    <client-only>
      <el-drawer v-model="drawer" size="70%" :with-header="false">
        <div class="bg-primary p-6">
          <div class="py-4">
            <img
              src="~/assets/images/icon-close-white.svg"
              alt=""
              @click="drawer = false"
            />
          </div>
          <div
            class="w-full p-4 rounded-lg border-2 border-white flex justify-center text-white"
            @click="gotoSingUp"
          >
            <span class="font-bold">会員登録</span>
          </div>
        </div>
        <div
          class="text-sm py-4 px-6 h-14 flex justify-between items-center border-b-[1px] border-gray-third"
          @click="gotoLogin"
        >
          <span class="font-bold text-primary">ログイン</span>
          <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
        </div>

        <div
          class="text-sm py-4 px-6 h-14 flex justify-between items-center"
          @click="gotoSearch"
        >
          <span>求人を探す</span>
          <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
        </div>

        <div
          class="text-sm py-4 px-6 h-14 flex justify-between items-center border-y-[1px] border-gray-third"
          @click="gotoPublicOffice"
        >
          <span>官公庁の方</span>
          <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
        </div>
      </el-drawer>
    </client-only>
  </div>
</template>
<script lang="ts" setup>
import { EHeaderPath } from '~/utils/enum';

const props = defineProps({
  classPlus: {
    type: String,
    default: null,
  },
});

const route = useRoute();

const gotoHome = () => {
  if (route.fullPath === EHeaderPath.GUEST) window.scrollTo(0, 0);
  else routerPush(EHeaderPath.GUEST);
  useClearFormInquiry();
};
const gotoSearch = () => {
  routerPush('/search');
  useClearFormInquiry();
};
const gotoPublicOffice = () => {
  routerPush('/public-offices');
  useClearFormInquiry();
};
const gotoSingUp = () => {
  routerPush('/user/sign-up');
};
const gotoLogin = () => {
  routerPush('/user/login');
  useClearFormInquiry();
};

const drawer = ref(false);
</script>
<style lang="scss" scoped>
span {
  @apply hover:cursor-pointer;
}
</style>
