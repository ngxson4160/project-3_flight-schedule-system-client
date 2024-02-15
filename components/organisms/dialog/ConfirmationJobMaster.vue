<template>
  <el-form
    ref="ruleFormRef"
    label-position="top"
    :rules="rules"
    :model="formJobMaster"
  >
    <div class="text-left text-black w-full">
      <p class="text-sm mb-2 font-bold">
        職種名
        <span class="text-xs text-danger ml-2 font-normal">*必須</span>
      </p>
      <ul class="text-sm mb-2 list-disc ml-5">
        <li>サイト上に表示される名前です</li>
      </ul>
      <el-form-item prop="name">
        <el-input v-model="formJobMaster.name" placeholder="" clearable />
        <h1 class="text-danger text-xs mt-2">{{ formErrMessage }}</h1>
      </el-form-item>
      <div v-if="showParentCategory">
        <p class="text-sm font-bold mb-2">
          親カテゴリー
          <span class="text-xs text-danger ml-2 font-normal">*必須</span>
        </p>
        <el-form-item prop="parentId">
          <el-select
            v-model="formJobMaster.parentId"
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="選択してください"
          >
            <el-option
              v-for="item in listJobMasterCategory"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </div>

      <h3 class="text-sm font-bold mb-2 mt-6 flex items-center">
        説明
        <span class="font-normal text-gray text-xs ml-2">任意</span>
      </h3>
      <el-form-item prop="jobCategoryDescription">
        <el-input
          v-model="formJobMaster.jobCategoryDescription"
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
          class="w-full"
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
import { IJobCategoryOptions } from '~/pages/admin/job-master/[id].vue';
const props = defineProps({
  jobData: {
    type: Object,
    default: () => ({
      id: null,
      name: '',
      jobCategoryDescription: '',
    }),
  },
  jobCategoryOptions: {
    type: Array<IJobCategoryOptions>,
    default: () => [],
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
  isResetForm: {
    type: Boolean,
    default: false,
  },
  showParentCategory: {
    type: Boolean,
    default: false,
  },
});

const ruleFormRef = ref<FormInstance>();

const formJobMaster = ref<{
  name: string;
  jobCategoryDescription: string;
  parentId: number | null;
}>({
  name: '',
  jobCategoryDescription: '',
  parentId: null,
});

const listJobMasterCategory = ref<IJobCategoryOptions[]>([]);
watchEffect(() => {
  formJobMaster.value.name = props.jobData.name;
  formJobMaster.value.jobCategoryDescription =
    props.jobData.jobCategoryDescription;
  formJobMaster.value.parentId = props.jobData.parentId;
  listJobMasterCategory.value = props.jobCategoryOptions;
});
watchEffect(() => {
  if (props.isResetForm) {
    formJobMaster.value = {
      name: '',
      jobCategoryDescription: '',
      parentId: null,
    };
  }
});

const rules = {
  name: [{ required: true, message: '必須項目です', trigger: 'blur' }],
  parentId: [{ required: true, message: '必須項目です', trigger: 'blur' }],
};

const emit = defineEmits(['handleConfirmSaveEdit', 'handleConfirmAddJob']);

const handleSave = (formEl: any) => {
  if (!formEl) return;
  formEl.validate((valid: any) => {
    if (valid) {
      emit('handleConfirmSaveEdit', formJobMaster);
    } else {
      return false;
    }
  });
};

const handleAdd = (formEl: any) => {
  if (!formEl) return;
  formEl.validate((valid: any) => {
    if (valid) {
      emit('handleConfirmAddJob', formJobMaster);
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
