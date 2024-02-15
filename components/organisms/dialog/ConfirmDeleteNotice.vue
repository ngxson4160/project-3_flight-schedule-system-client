<template>
  <client-only>
    <el-dialog
      v-model="centerDialogVisible"
      align-center
      class="confirm-delete-notice pc:!w-[496px] !w-[342px]"
    >
      <div class="text-center">
        <p
          class="font-bold text-[22px] text-black mobile:text-left"
          :class="{ '!text-left': typeDialog === 'proxy-logout' }"
        >
          {{ title }}
        </p>
        <p
          class="pt-4 text-base text-black"
          :class="{
            '!text-[14px]': textButtonCofirm === '送信する',
            '!text-left': typeDialog === 'proxy-logout',
          }"
        >
          {{ content }}
        </p>
        <div class="pc:w-[256px] w-[310px] mx-auto pc:pt-10 pt-6 pb-6">
          <el-button type="primary" class="!w-full" @click="handleOK">
            {{ textButtonCofirm }}
          </el-button>
        </div>
        <p
          class="text-base font-bold text-primary underline mobile:pb-4 hover:cursor-pointer"
          @click="handleCancel"
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
  content: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  textButtonCofirm: {
    type: String,
    default: '削除する',
  },
  typeDialog: {
    type: String,
    default: '',
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
  centerDialogVisible.value = false;
};
const handleCancel = () => {
  centerDialogVisible.value = false;
};
</script>

<style lang="scss">
.confirm-delete-notice {
  .el-dialog__header {
    display: none !important;
  }
  .el-dialog__body {
    @apply pc:px-14 pc:pt-10 pc:pb-14 mobile:p-4;
  }
}
.confirm-delete-notice.el-dialog {
  @apply rounded-xl;
}
</style>
