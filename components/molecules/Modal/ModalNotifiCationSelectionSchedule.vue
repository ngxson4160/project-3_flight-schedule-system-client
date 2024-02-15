<template>
  <el-dialog
    v-model="openDialog"
    class="dialog__notification-create-schedule !px-14 !py-10 !rounded-xl !shadow-base"
    :show-close="false"
    @close="handleClose"
  >
    <div class="flex flex-col gap-4">
      <h1 class="text-[22px] font-bold">選考に関するお知らせを送信</h1>

      <p class="text-base text-black-bold">
        送信したメッセージは「選考に関するお知らせ」として、応募者にメール通知されます。さらに受験票にも表示されます。
        <br />
        試験会場の場所や持ち物などの選考に関する案内を送りたい時、返信不要な案内を送りたい時におすすめの機能です。
      </p>
    </div>

    <div class="my-10">
      <p class="font-bold mb-2">メッセージ</p>
      <el-input
        v-model="form.content"
        type="textarea"
        :rows="7"
        placeholder="メッセージを入力してください"
      />
    </div>

    <div class="w-full flex flex-col items-center gap-6">
      <el-button
        :class="`w-[256px] ${!form.content ? '!bg-gray' : '!bg-primary'}`"
        :disabled="!form.content"
        @click="emit('accept-send-mail', form)"
      >
        <p class="text-white font-bold">送信する</p>
      </el-button>

      <p
        class="text-primary font-bold text-base underline cursor-pointer"
        @click="openDialog = false"
      >
        キャンセル
      </p>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
interface Emits {
  (event: 'update:visible', visible: boolean): void;
  (event: 'accept-send-mail', form: { content: string; ids: number[] }): void;
}

const props = defineProps({
  visible: {
    type: Boolean,
    default: () => false,
  },
});

const emit = defineEmits<Emits>();

const openDialog = computed({
  get: () => props.visible,
  set: (visible: boolean) => {
    emit('update:visible', visible);
  },
});

const form = ref({
  content: '',
  ids: [],
});

const handleClose = () => {
  form.value = { content: '', ids: [] };
};
</script>

<style lang="scss">
.el-dialog.dialog__notification-create-schedule {
  @apply w-[760px] mobile:w-full;
  .el-dialog__header {
    @apply hidden;
  }
  .el-dialog__body {
    @apply p-0;
  }
}
</style>
