<template>
  <ClientOnly>
    <el-dialog
      v-model="centerDialogVisible"
      class="dialog-confirm pc:!w-[496px] !w-full !rounded-xl mobile:!mx-6"
      :show-close="false"
      align-center
    >
      <div class="p-4 pc:px-14 pc:py-10">
        <div
          class="title text-center text-[22px] font-bold leading-[170%] text-black tracking-wider"
        >
          {{ props.title }}
        </div>
        <slot>
          <div
            class="content text-[22px] font-bold leading-[170%] text-black tracking-wider"
            v-html="props.content"
          ></div>
        </slot>
        <div class="actions mt-6 pc:mt-10 pc:max-w-[256px] mx-auto">
          <div>
            <el-button
              :type="typeButtonConfirm"
              class="!w-full"
              @click="handleConfirm"
            >
              {{ props.textConfirm }}
            </el-button>
          </div>
          <div class="mt-1">
            <el-button
              type="default"
              text
              :class="`${textCancelColor} !w-full !underline`"
              @click="handleCancel"
            >
              {{ props.textCancel }}
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </ClientOnly>
</template>

<script lang="ts" setup>
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: () => '',
  },
  content: {
    type: String,
    default: () => '',
  },
  textConfirm: {
    type: String,
    default: () => '',
  },
  textCancel: {
    type: String,
    default: () => '',
  },
  typeButtonConfirm: {
    ype: String,
    default: () => 'primary',
  },
  textCancelColor: {
    type: String,
    default: () => '!text-primary',
  },
});

const emits = defineEmits([
  'update:dialogVisible',
  'eventConfirm',
  'eventCancel',
]);

const centerDialogVisible = computed({
  get: () => props.dialogVisible,
  set: (val: boolean) => {
    emits('update:dialogVisible', val);
  },
});

const handleConfirm = () => {
  emits('eventConfirm');
};

const handleCancel = () => {
  emits('eventCancel');
};
</script>

<style lang="scss">
.dialog-confirm {
  .el-dialog__body,
  .el-dialog__header {
    @apply p-0 m-0 #{!important};
  }
}
</style>
