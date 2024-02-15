<template>
  <client-only>
    <el-dialog
      v-model="centerDialogVisible"
      :show-close="false"
      align-center
      class="dialog-confirm-delete-entry pc:!w-[496px] !w-[342px]"
    >
      <div class="text-center">
        <div class="text-xl text-black text-center flex flex-col items-center">
          <p class="font-bold pb-2 tracking-wider leading-[175%] max-w-[256px]">
            このエントリー下書きを 削除しますか？
          </p>
          <p class="pc:max-w-[372px] max-w-[310px]">
            {{ title }}
          </p>
        </div>
        <div class="pc:w-[256px] w-[310px] mx-auto pc:pt-10 pt-6 pb-6">
          <el-button type="primary" class="!w-full" @click="handleConfirm">
            削除する
          </el-button>
        </div>
        <p
          class="font-bold text-primary underline mobile:pb-4 hover:cursor-pointer"
          @click="emit('eventCancel')"
        >
          キャンセル
        </p>
      </div>
    </el-dialog>
  </client-only>
</template>

<script setup lang="ts">
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:status', 'eventCancel', 'eventConfirm']);
const centerDialogVisible = computed({
  get: () => props.dialogVisible,
  set: (val: boolean) => {
    emit('eventCancel');
  },
});
const handleConfirm = () => {
  emit('eventConfirm');
  centerDialogVisible.value = false;
};
</script>

<style lang="scss">
.dialog-confirm-delete-entry {
  .el-dialog__header {
    display: none !important;
  }
  .el-dialog__body {
    @apply pc:px-14 pc:pt-10 pc:pb-14 mobile:p-4;
  }
}
.dialog-confirm-delete-entry.el-dialog {
  @apply rounded-xl;
}
</style>
