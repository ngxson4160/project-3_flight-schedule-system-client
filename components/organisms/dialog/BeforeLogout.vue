<template>
  <client-only>
    <el-dialog
      v-model="centerDialogVisible"
      align-center
      class="dialog-before-logout before-logout-main pc:!w-[496px] !w-[342px]"
    >
      <div class="text-center">
        <p class="font-bold text-xl text-black mobile:text-left">
          ログアウトしてもよろしいですか？
        </p>
        <div class="pc:w-[256px] w-[310px] mx-auto pc:pt-10 pt-6 pb-6">
          <el-button type="primary" class="!w-full" @click="handleLogout()">
            ログアウト
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
const emit = defineEmits(['updateStatus']);
const centerDialogVisible = computed({
  get: () => props.status,
  set: (val: boolean) => {
    emit('updateStatus', val);
  },
});

// const centerDialogVisible = ref(props.status);
</script>

<style lang="scss">
.dialog-before-logout.before-logout-main {
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
