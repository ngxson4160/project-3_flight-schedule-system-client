<template>
  <el-form
    ref="ruleFormRef"
    label-position="top"
    :rules="rules"
    :model="formJobMasterCategory"
    class="mb-16"
  >
    <div class="text-left text-black w-full">
      <p class="text-sm mb-2 font-bold">
        親カテゴリー
        <span class="text-xs text-danger ml-2 font-normal">*必須</span>
      </p>
      <ul class="text-sm mb-2 list-disc ml-5">
        <li>サイト上に表示される名前です</li>
      </ul>
      <el-form-item prop="name">
        <el-input
          v-model="formJobMasterCategory.name"
          clearable
          placeholder=""
          class="relative"
        />
        <h1
          v-if="isShowMessageErr"
          class="text-danger text-xs mt-2 absolute top-12"
        >
          該当カテゴリーが存在しています
        </h1>
      </el-form-item>
      <div class="mt-10">
        <el-button
          v-if="isEdit"
          type="primary"
          class="!w-full"
          @click="handleSave(ruleFormRef)"
        >
          保存する
        </el-button>
        <el-button
          v-else
          type="primary"
          class="w-full"
          @click="handleAdd(ruleFormRef)"
        >
          <img
            src="~/assets/images/icon-plus-white.svg"
            alt="search"
            class="w-6 h-6 mr-2"
          />
          親カテゴリーを追加
        </el-button>
      </div>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { FormInstance } from 'element-plus';
const props = defineProps({
  jobData: {
    type: Object,
    default: () => ({
      id: null,
      name: '',
    }),
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
  isResetForm: {
    type: Boolean,
    default: false,
  },
  isEditOrAddCategoryParentErr: {
    type: Boolean,
    default: false,
  },
});

const ruleFormRef = ref<FormInstance>();
const isShowMessageErr = ref(false);
const resetData = () => ({ name: '' });

const formJobMasterCategory = ref<{
  name: string;
}>({
  name: '',
});

onMounted(() => {
  formJobMasterCategory.value.name = props.jobData.name;
});

watch(
  () => props.isEditOrAddCategoryParentErr,
  (newValue) => {
    if (newValue) {
      isShowMessageErr.value = true;
    }
  },
);

watch(
  () => formJobMasterCategory.value.name,
  (newValue) => {
    if (newValue === '') {
      isShowMessageErr.value = false;
    }
  },
);

watch(
  () => props.isResetForm,
  (newValue) => {
    if (newValue) {
      formJobMasterCategory.value = resetData();
    }
  },
);

const rules = ref({
  name: [{ required: true, message: '必須項目です', trigger: 'blur' }],
});

const emit = defineEmits(['handleConfirmSaveEdit', 'handleConfirmAddJob']);

const handleSave = (formEl: FormInstance | undefined) => {
  isShowMessageErr.value = false;
  if (!formEl) return;
  formEl.validate((valid: any) => {
    if (valid) {
      emit('handleConfirmSaveEdit', formJobMasterCategory);
    } else {
      return false;
    }
  });
};

const handleAdd = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  isShowMessageErr.value = false;
  formEl.validate((valid: any) => {
    if (valid) {
      emit('handleConfirmAddJob', formJobMasterCategory);
    } else {
      return false;
    }
  });
};
</script>

<style lang="scss"></style>
