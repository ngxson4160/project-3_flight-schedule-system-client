<template>
  <el-dialog
    v-model="openDialog"
    class="dialog__notification-confirm-schedule pc:!px-14 pc:!py-10 !rounded-xl !shadow-base !px-4 !py-4"
    :show-close="false"
    :close-on-click-modal="false"
    align-center
  >
    <h1 class="text-[22px] font-bold pc:text-center">
      選考予定者に招待メールを
      <br />
      送信しますか？
    </h1>

    <div class="w-full flex flex-col items-center gap-2 mt-10">
      <el-button
        class="pc:w-[256px] w-full"
        type="primary"
        @click="emit('continue-send-mail')"
      >
        送信
      </el-button>

      <el-button
        class="pc:w-[256px] w-full !ml-0"
        :class="{
          '!bg-gray': !isConfirmMessage,
          '!border-[2px] !border-solid !border-primary': isConfirmMessage,
        }"
        @click="emit('not-send-mail')"
      >
        <p
          :class="`font-bold ${
            isConfirmMessage ? 'text-primary' : 'text-white '
          }`"
        >
          送信しない
        </p>
      </el-button>

      <p
        class="text-primary font-bold text-base underline mt-6 mobile:my-4 cursor-pointer"
        @click="emit('continue-editing')"
      >
        編集に戻る
      </p>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
interface Emits {
  (event: 'update:visible', visible: boolean): void;
  (event: 'not-send-mail'): void;
  (event: 'continue-editing'): void;
  (event: 'continue-send-mail'): void;
}

const props = defineProps({
  visible: {
    type: Boolean,
    default: () => false,
  },

  isConfirmMessage: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<Emits>();

const openDialog = computed({
  get: () => props.visible,
  set: (visible: boolean) => {
    emit('update:visible', visible);
  },
});
</script>

<style lang="scss">
.el-dialog.dialog__notification-confirm-schedule {
  @apply w-[496px] mobile:w-[342px];
  .el-dialog__header {
    @apply hidden;
  }
  .el-dialog__body {
    @apply p-0;
  }
}
</style>
