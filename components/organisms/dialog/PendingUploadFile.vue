<template>
  <client-only>
    <el-dialog
      v-model="centerDialogVisible"
      align-center
      class="confirm-delete-notice pc:!w-[496px] !w-[342px]"
    >
      <div class="text-center">
        <div class="font-bold text-[22px] text-black">
          <p>選考に関する添付ファイルを</p>
          <p>アップロード中です</p>
        </div>
        <div class="pt-4 text-base text-black">
          <p>アップロードが完了するまでこのページを</p>
          <p>開いたままにしてください。</p>
        </div>
        <div class="pc:w-[256px] w-[310px] mx-auto pc:pt-10 pt-6 pb-6">
          <el-button type="primary" class="!w-full" @click="handleOK">
            OK
          </el-button>
        </div>
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
const emit = defineEmits(['updateStatus', 'handleConfirm']);
const centerDialogVisible = computed({
  get: () => props.status,
  set: (val: boolean) => {
    emit('updateStatus', val);
  },
});
const handleOK = () => {
  emit('handleConfirm');
};
</script>

<style lang="scss">
.confirm-delete-notice {
  .el-dialog__header {
    display: none !important;
  }
  .el-dialog__body {
    @apply pc:px-14 pc:pt-10 pc:pb-10 mobile:p-4;
  }
}
.confirm-delete-notice.el-dialog {
  @apply rounded-xl;
}
</style>
