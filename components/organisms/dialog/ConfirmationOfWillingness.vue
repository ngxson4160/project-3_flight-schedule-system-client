<template>
  <client-only>
    <el-dialog
      v-model="centerDialogVisible"
      align-center
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      class="dialog-before-logout pc:!w-[496px] !w-[342px]"
    >
      <div class="text-center pc:!w-[384px] mx-auto">
        <div
          class="font-bold text-xl text-black text-left pc:!w-[384px] mobile:!w-[310px] mx-auto"
        >
          <p class="font-bold text-[22px] leading-[170%] text-center">
            現在の応募意欲をお聞かせください
          </p>
        </div>
        <div id="radio" class="flex">
          <el-radio-group v-model="selectMotivation" class="flex pt-4">
            <el-radio
              v-for="(motivation, index) in motivationList"
              :key="motivation + index"
              :label="motivation"
              border
              class="pc:!w-[384px] mobile:!w-[310px] mt-4"
            ></el-radio>
          </el-radio-group>
        </div>
        <div class="pc:w-[256px] w-[310px] mx-auto pc:pt-10 pt-6 pb-6">
          <el-button type="primary" class="!w-full" @click="submitMotivation()">
            更新する
          </el-button>
        </div>
        <p
          class="font-bold text-primary underline mobile:pb-4 hover:cursor-pointer"
          @click="handleLogout()"
        >
          キャンセル
        </p>
      </div>
    </el-dialog>
  </client-only>
</template>

<script setup lang="ts">
import { ECurrentMotivation } from '~~/utils/enum';

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

const selectMotivation = ref<string>(ECurrentMotivation.ACTIVELY_LOOKING);

const motivationList = ref([
  ECurrentMotivation.ACTIVELY_LOOKING,
  ECurrentMotivation.ONLY_GOOD_DEAL,
  ECurrentMotivation.NOT_NOW,
]);

const submitMotivation = async () => {
  try {
    await useBaseFetch('/auth/profile/current-motivation', {
      body: {
        currentMotivation: selectMotivation.value,
      },
      method: 'PUT',
    });
    return routerPush('/user');
  } catch (error) {}
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
#radio .el-radio__input.is-checked + .el-radio__label {
  @apply text-black;
}
</style>
