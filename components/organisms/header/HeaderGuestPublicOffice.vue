<template>
  <div
    class="fixed border-b border-color-border bg-white flex justify-between w-full items-center h-[70px] mobile:h-[64px] mobile:px-6 px-8 mobile:py-4 z-[999]"
  >
    <div class="hover:cursor-pointer" @click="routerPush('/')">
      <div class="">
        <div class="text-xs mb-1 mobile:mb-[6px] mobile:text-[10px]">
          官公庁・自治体で働くならパブリックコネクト
        </div>
        <img
          src="~/assets/images/logo-service-horizontal-2-mobile.webp"
          alt=""
          class="h-[24px]"
        />
      </div>
      <!-- <img
        src="~/assets/images/logo-service-horizontal-2-mobile.webp"
        alt=""
        class="pc:hidden w-[211px] h-[24px]"
      /> -->
    </div>
    <div
      class="flex items-center justify-between font-bold text-sm mobile:hidden gap-x-10"
    >
      <a class="cursor-pointer !text-black no-underline" href="#introduction">
        サービス紹介
      </a>
      <a class="!text-black no-underline" href="#feature">３つの特徴</a>
      <a class="!text-black no-underline" href="#usage">ご利用の流れ</a>
      <a class="!text-black no-underline" href="#fee">ご利用料金</a>
      <a class="!text-black no-underline" href="#questions">よくあるご質問</a>
      <a
        class="hover:cursor-pointer no-underline text-primary"
        @click="routerPush('/employer/login')"
      >
        ログイン
      </a>
      <div class="flex">
        <a
          class="flex items-center py-3 px-8 border-2 bg-white border-primary rounded-lg text-primary font-bold cursor-pointer text-sm"
          href="https://share.hsforms.com/14jq4VAsOTjSDbry8fSh_swcy4qt"
          target="_blank"
        >
          お問い合わせ
        </a>
        <div
          class="ml-4 py-3 px-8 rounded-lg bg-primary text-white hover:cursor-pointer text-sm"
          @click="routerPush('/employer/register')"
        >
          <span>登録申請</span>
        </div>
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
            class="w-full py-4 rounded-lg flex justify-center text-primary bg-white text-base mb-4"
            @click="routerPush('/employer/register')"
          >
            <span class="font-bold">登録申請</span>
          </div>
          <a
            class="w-full py-4 rounded-lg border-2 border-white flex justify-center text-white text-base"
            href="https://share.hsforms.com/14jq4VAsOTjSDbry8fSh_swcy4qt"
            target="_blank"
          >
            <span class="font-bold">お問い合わせ</span>
          </a>
        </div>
        <div
          class="py-4 px-6 flex justify-between items-center border-b-[1px] border-gray-third text-sm"
          @click="routerPush('/employer/login')"
        >
          <span class="font-bold text-primary text-sm">ログイン</span>
          <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
        </div>
        <a
          class="py-4 px-6 flex justify-between items-center text-sm !text-black no-underline"
          href="#introduction"
          @click="drawer = false"
        >
          <span>サービス紹介</span>
          <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
        </a>
        <a
          class="py-4 px-6 flex justify-between items-center text-sm !text-black no-underline"
          href="#feature"
          @click="drawer = false"
        >
          <span>３つの特徴</span>
          <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
        </a>
        <a
          class="py-4 px-6 flex justify-between items-center text-sm !text-black no-underline"
          href="#usage"
          @click="drawer = false"
        >
          <span>ご利用の流れ</span>
          <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
        </a>
        <a
          class="py-4 px-6 flex justify-between items-center text-sm !text-black no-underline"
          href="#fee"
          @click="drawer = false"
        >
          <span>ご利用料金</span>
          <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
        </a>
        <a
          class="py-4 px-6 flex justify-between items-center text-sm !text-black no-underline"
          href="#questions"
          @click="drawer = false"
        >
          <span>よくあるご質問</span>
          <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
        </a>
      </el-drawer>
    </client-only>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  header: {
    type: String,
    default: '',
  },
});

const drawer = ref(false);
</script>
<style lang="scss" scoped>
span {
  @apply hover:cursor-pointer;
}
</style>
