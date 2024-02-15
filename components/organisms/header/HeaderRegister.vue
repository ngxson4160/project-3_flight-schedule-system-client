<template>
  <div class="header">
    <div class="hover:cursor-pointer" @click="routerPush('/')">
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
        class="pc:hidden w-8 h-[33px]"
      />
    </div>
    <div
      class="pc:px-10 pc:py-4 text-primary pc:rounded-lg pc:border-2 font-bold text-sm hover:cursor-pointer"
      @click="routerPush(`/${role}/login`)"
    >
      登録済みの方はこちら
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  role: {
    type: String,
    default: null,
  },
});
</script>

<style scoped></style>
