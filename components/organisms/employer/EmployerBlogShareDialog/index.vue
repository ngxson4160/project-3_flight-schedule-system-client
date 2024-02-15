<template>
  <ClientOnly>
    <el-dialog
      v-model="visible"
      width="496px"
      class="delete-job-dialog mobile:!mx-6 !rounded-xl overflow-hidden px-14 py-10"
      :show-close="false"
      align-center
    >
      <div>
        <h3
          class="font-bold text-[22px] leading-[170%] text-black tracking-wider"
        >
          共有用リンクを取得
        </h3>
        <p class="mt-4 text-base text-black">{{ url }}</p>
        <div class="mt-10 mobile:mt-8">
          <div class="pc:max-w-[256px] mb-2 mx-auto">
            <el-button
              type="primary"
              class="w-full !text-base !rounded-lg"
              @click="copy"
            >
              リンクをコピーする
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
import { useBlogCreateStore } from '~~/stores/useBlogCreateStore';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const store = useBlogCreateStore();

const emit = defineEmits(['update:modelValue']);

const visible = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

const id = store.confirmData ? store.confirmData.id || null : null;
const url = `${window.location.origin}/employer/blog/${id}`;

const copy = () => {
  const body: any = document.body;
  const el = document.createElement('textarea');
  el.value = url;
  body.appendChild(el);
  el.select();
  document.execCommand('copy');
  body.removeChild(el);

  openNotification('コピーしました');
};

const handleCancel = () => {
  visible.value = false;
};
</script>

<style lang="scss">
.delete-job-dialog {
  .el-dialog__body {
    @apply p-0;
  }
  .el-dialog__header {
    @apply p-0;
  }
}
</style>
