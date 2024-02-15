<template>
  <client-only>
    <el-dialog
      v-model="centerDialogVisible"
      align-center
      class="dialog-before-logout pc:!w-[496px] !w-[342px]"
    >
      <div class="text-center">
        <div class="font-bold text-xl text-black text-left">
          <p class="pb-4 !text-[22px]">編集内容を下書き保存しますか？</p>
          <p class="font-normal text-base leading-[170%]">
            下書き保存しない場合、編集内容は破棄されます。
          </p>
        </div>
        <div class="pc:w-[256px] mx-auto pc:pt-10 pt-6">
          <el-button type="primary" class="!w-full" @click="handleClick">
            保存する
          </el-button>
        </div>
        <div class="pc:w-[256px] mx-auto pc:pt-2 mobile:pt-2 pt-6 pb-6">
          <el-button
            class="!w-full !text-primary !bg-white !border-primary"
            @click="centerDialogVisible = false"
          >
            編集内容を破棄
          </el-button>
        </div>
        <p
          class="font-bold text-primary underline mobile:pb-4 hover:cursor-pointer"
          @click="centerDialogVisible = false"
        >
          キャンセル
        </p>
      </div>
    </el-dialog>
  </client-only>
</template>

<script setup lang="ts">
const props = defineProps({
  status: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:status', 'confirm']);
const centerDialogVisible = computed({
  get: () => props.status,
  set: (val: boolean) => {
    emit('update:status', val);
  },
});
const handleClick = () => {
  emit('confirm');
};
</script>

<style lang="scss">
.dialog-before-logout {
  .el-dialog__header {
    display: none !important;
  }
  .el-dialog__body {
    @apply pc:px-14 pc:pt-10 pc:pb-14 mobile:p-4;
  }
}
.dialog-before-logout.el-dialog {
  @apply rounded-xl;
}
</style>
