<template>
  <div>
    <el-dialog
      v-model="centerDialogVisible"
      align-center
      class="dialog-confirn-edit-tag pc:!w-[496px] !w-[342px] !rounded-xl"
    >
      <slot></slot>
      <div class="w-full flex justify-center mt-10">
        <button
          class="bg-primary rounded-xl text-white py-4 w-[256px] text-base font-bold"
          @click="handleConfirm"
        >
          OK
        </button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:dialogVisible', 'eventConfirm']);

const centerDialogVisible = computed({
  get: () => props.dialogVisible,
  set: (val: boolean) => {
    emits('update:dialogVisible', val);
  },
});

const handleConfirm = () => {
  emits('eventConfirm');
};
</script>

<style scoped></style>
