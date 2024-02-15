<template>
  <div class="bg-white border border-solid border-color-message">
    <div class="px-6 py-4 mobile:px-4">
      <div class="flex gap-4 mobile:flex-col relative">
        <div
          class="circle-logo pc:w-[60px] pc:h-[60px] mobile:w-[60px] mobile:h-[60px]"
        >
          <img
            :src="message.image.length ? message.image : defaultLogo"
            class="pc:w-[40px] mobile:w-[40px]"
            alt=""
          />
        </div>
        <div class="mobile:mt-2">
          <div class="flex gap-4 flex-row flex-wrap mobile:gap-2">
            <span class="font-bold text-sm">{{ message.title }}</span>
            <span class="text-xs">{{ message.subTitle }}</span>
            <button
              type="button"
              class="bg-primary px-2 py-1 text-[10px] tracking-wide leading-[14px] text-white"
            >
              スカウト
            </button>
          </div>
          <div class="mt-2">
            <span class="font-bold text-xs leading-4 tracking-wide">
              {{ message.descriptions.title }}
            </span>
            <span class="text-gray ml-1 mr-1">-</span>
            <span class="text-xs text-gray leading-4 tracking-wide">
              {{ message.descriptions.content }}
            </span>
          </div>
        </div>
        <div class="pc:ml-auto mobile:absolute mobile:top-0 mobile:right-0">
          <div class="text-sm text-black leading-4">11:00</div>
          <div class="mt-[14px]">
            <span
              class="w-[22px] h-[18px] rounded-[20px] bg-primary block text-white m-auto text-[10px] leading-4 text-center tracking-wide"
            >
              1
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import defaultLogo from '~/assets/images/small-logo.svg';
const props = defineProps({
  messageSystem: {
    type: Object,
    default: () => ({}),
  },
});
const message = reactive(props.messageSystem);
</script>
