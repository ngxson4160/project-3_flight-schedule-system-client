<template>
  <ClientOnly>
    <el-dialog
      v-model="centerDialogVisible"
      width="496px"
      class="delete-job-dialog mobile:!mx-6 !rounded-xl overflow-hidden"
      :show-close="false"
      align-center
    >
      <div class="text-center px-14 py-10 mobile:!p-4">
        <h3
          class="font-bold text-[22px] leading-[170%] text-black tracking-wider"
        >
          この求人を削除しますか？
        </h3>
        <p class="mt-4 text-base text-black">{{ title }}</p>
        <div class="mt-10 mobile:mt-8">
          <div class="pc:max-w-[256px] mb-2 mx-auto">
            <el-button
              type="primary"
              class="w-full !text-base !rounded-lg"
              @click="emits('delete', jobId)"
            >
              削除する
            </el-button>
          </div>
          <div class="pc:max-w-[256px] mx-auto">
            <el-button
              type="default"
              class="w-full !ont-bold !text-primary !text-base !leading-5 underline"
              text
              @click="handleCancel"
            >
              キャンセル
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { useJobStore } from '~/stores/useJobListStore';

const props = defineProps({
  visibleDialog: {
    type: Boolean,
    default: false,
  },
  jobId: {
    type: Number,
    default: () => 0,
  },
  title: {
    type: String,
    default: '',
  },
});

const jobId = ref(props.jobId);

const emits = defineEmits(['update:visibleDialog', 'delete']);

const { removeJob, getListJob } = useJobStore();

const centerDialogVisible = computed({
  get: () => props.visibleDialog,
  set: (val: boolean) => {
    emits('update:visibleDialog', val);
  },
});

const handleCancel = () => {
  centerDialogVisible.value = false;
};
</script>

<style lang="scss">
.delete-job-dialog {
  .el-dialog__header,
  .el-dialog__body {
    @apply p-0 m-0 #{!important};
  }
}
</style>
