<template>
  <client-only>
    <el-dialog
      v-model="centerDialogVisible"
      :show-close="false"
      align-center
      class="dialog-before-logout pc:!w-[496px] !w-[342px]"
    >
      <div class="text-center">
        <div class="font-bold pc:text-[22px] text-xl text-black text-center">
          <p class="pb-2">この機能をご利用いただくには</p>
          <p>会員登録が必要です。</p>
        </div>
        <div
          class="pc:w-[256px] w-[310px] mx-auto pc:pt-10 pt-6 pb-6 flex flex-col gap-2 items-center"
        >
          <el-button type="primary" class="!w-full" @click="handleGoToSignUp">
            会員登録
          </el-button>
          <el-button
            type="primary"
            class="!w-full !m-0 !border-2 !border-primary !bg-white !text-primary"
            @click="handleGoToLogin"
          >
            登録済みの方はこちら
          </el-button>
        </div>
        <p
          class="font-bold text-primary underline mobile:pb-4 hover:cursor-pointer"
          @click="handleCancel"
        >
          閉じる
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
});
const emit = defineEmits(['update:status', 'eventCancel']);
const centerDialogVisible = computed({
  get: () => props.dialogVisible,
  set: (val: boolean) => {
    emit('eventCancel');
  },
});

const handleCancel = () => {
  emit('eventCancel');
};
const handleGoToLogin = () => {
  const route = useRoute();
  const pathBefore = useSessionStorage('pathBefore', '');
  pathBefore.value = `/user${route.fullPath}`;
  routerPush('/user/login');
};
const handleGoToSignUp = () => {
  const route = useRoute();
  const pathBeforeSignUp = useLocalStorage('pathBeforeSignUp', '');
  pathBeforeSignUp.value = `/user${route.fullPath}`;
  routerPush('/user/sign-up');
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
