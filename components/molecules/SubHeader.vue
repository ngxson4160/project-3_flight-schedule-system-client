<template>
  <div
    class="sub-header fixed pc:top-[70px] mobile:top-[64px] left-0 right-0 bg-white z-50 shadow-md"
  >
    <div class="relative text-center">
      <div
        class="back-icon absolute top-1/2 cursor-pointer"
        @click="emits('backClick')"
      >
        <img src="@/assets/images/icon-back-49.6.svg" alt="" />
      </div>
      <h1 class="text-base font-bold tracking-wider subheader-title">
        {{ props.title }}
      </h1>
      <slot name="right-section"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: () => '',
  },
});

const emits = defineEmits(['backClick']);
</script>

<style lang="scss" scoped>
.sub-header {
  @apply pc:px-16 mobile:px-6;
}

.subheader-title {
  line-height: 64px;
}

.back-icon {
  transform: translateY(-50%);
}
</style>
