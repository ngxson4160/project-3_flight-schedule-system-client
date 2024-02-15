<template>
  <el-form
    ref="ruleFormRef"
    label-position="top"
    :rules="rules"
    :model="formTag"
  >
    <div class="text-left text-black w-full">
      <p class="text-sm mb-2 font-bold">
        タグ名
        <span class="text-xs text-danger ml-2 font-normal">*必須</span>
      </p>
      <ul class="text-sm mb-2 list-disc ml-5">
        <li>サイト上に表示される名前です</li>
      </ul>
      <el-form-item prop="name">
        <el-input v-model="formTag.name" placeholder="" />
        <h1 class="text-danger text-xs mt-2">{{ formErrMessage }}</h1>
      </el-form-item>
      <h3 class="text-sm font-bold mb-2 mt-6 flex items-center">
        説明
        <span class="font-normal text-gray text-xs ml-2">任意</span>
      </h3>
      <el-form-item prop="tagsDescription">
        <el-input
          v-model="formTag.tagsDescription"
          :rows="6"
          type="textarea"
          class="w-full"
        />
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
          class="w-full mt-10"
          @click="handleAdd(ruleFormRef)"
        >
          <img
            src="~/assets/images/icon-plus-white.svg"
            alt="search"
            class="w-6 h-6 mr-2"
          />
          職種を追加
        </el-button>
      </div>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { FormInstance } from 'element-plus';
const props = defineProps({
  status: {
    type: Boolean,
    default: false,
  },
  jobData: {
    type: Object,
    default: () => ({
      id: null,
      name: '',
      jobCategoryDescription: '',
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
});

const ruleFormRef = ref<FormInstance>();

const formTag = ref<{
  name: string;
  tagsDescription: string;
}>({
  name: '',
  tagsDescription: '',
});

watchEffect(() => {
  formTag.value.name = props.jobData.name;
  formTag.value.tagsDescription = props.jobData.tagsDescription;
});

watchEffect(() => {
  if (props.isResetForm) {
    formTag.value = {
      name: '',
      tagsDescription: '',
    };
  }
});

const rules = {
  name: [{ required: true, message: '必須項目です', trigger: 'blur' }],
};

const emit = defineEmits(['handleConfirmAddTag', 'handleConfirmSaveEdit']);

const handleSave = (formEl: any) => {
  if (!formEl) return;
  formEl.validate((valid: any) => {
    if (valid) {
      emit('handleConfirmSaveEdit', formTag);
    } else {
      return false;
    }
  });
};

const handleAdd = (formEl: any) => {
  if (!formEl) return;
  formEl.validate((valid: any) => {
    if (valid) {
      emit('handleConfirmAddTag', formTag);
    } else {
      return false;
    }
  });
};
</script>

<style lang="scss">
.dialog-confirn-edit-tag {
  .el-dialog__header {
    display: none !important;
  }
  .el-dialog__body {
    @apply pc:px-14 pc:pt-10 pc:pb-10 mobile:p-4;
  }
}
.confirm-delete-notice.el-dialog {
  @apply rounded-xl;
}
</style>
