<template>
  <div
    class="border-t-[1px] border-gray-third pc:px-[104px] px-6 pt-16 pc:pb-[45px] pb-16"
  >
    <div class="pc:flex pc:items-start pc:justify-between pc:pb-8 pb-6">
      <img
        src="~/assets/images/logo-service-horizontal-2-pc.webp"
        alt=""
        class="w-[282px] h-[32px]"
      />
      <div class="pc:flex pc:items-start text-sm font-normal mobile:pt-8">
        <p class="pr-6 mobile:py-2 cursor-pointer" @click="handleGotoHelpSeek">
          ヘルプ
        </p>
        <a
          class="pc:px-6 pc:border-l-[1px] mobile:py-2 border-black cursor-pointer"
          href="https://share.hsforms.com/1vKM3HZ9dSTqQ6p7JdNaDHgcy4qt"
          target="_blank"
        >
          お問い合わせ
        </a>
        <p
          class="pc:px-6 pc:border-l-[1px] mobile:py-2 border-black cursor-pointer"
          @click="handleGotoTermsUser"
        >
          ご利用者様向け利用規約
        </p>
        <p
          v-if="isHidden === false"
          class="pc:px-6 pc:border-l-[1px] mobile:py-2 border-black cursor-pointer"
          @click="handleGotoTermsService"
        >
          官公庁様向け利用規約
        </p>
        <p
          class="pc:px-6 pc:border-l-[1px] mobile:py-2 border-black cursor-pointer"
          @click="handleGotoPrivacyPolicy"
        >
          プライバシーポリシー
        </p>

        <p
          class="pc:pl-6 pc:border-l-[1px] mobile:py-2 border-black cursor-pointer"
          @click="navigateToGoogle"
        >
          運営会社
        </p>
      </div>
    </div>
    <div class="pc:flex">
      <div class="text-xs text-gray pc:pl-4 py-4">
        © PUBLIC CONNECT Inc. All rights reserved.
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  isHidden: {
    type: Boolean,
    default: false,
  },
});

const navigateToGoogle = () => {
  window.open('https://public-connect.co.jp/about', '_blank');
  useClearFormInquiry();
};

const handleGotoHelpSeek = () => {
  routerPush('/help-job-seeker');
  useClearFormInquiry();
};

const handleGotoInquiry = () => {
  routerPush('/inquiry');
};

const handleGotoTermsService = () => {
  routerPush('/terms-service');
  useClearFormInquiry();
};

const handleGotoTermsUser = () => {
  window.open('/terms-user', '_blank');
};

const handleGotoPrivacyPolicy = () => {
  window.open('/privacy-policy', '_blank');
};
</script>
