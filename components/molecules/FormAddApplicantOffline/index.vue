<template>
  <el-form
    ref="ruleFormRef"
    class="pc:px-8 form-applicant-offline"
    label-position="top"
    :model="formAddApplicant"
    :rules="ruleForm"
  >
    <el-text class="font-bold !text-black !text-[22px]" size="large">
      応募者を追加
    </el-text>
    <p class="text-sm font-bold pb-2 form-item-edit mt-6 required">名前</p>
    <el-form-item prop="name">
      <el-input v-model="formAddApplicant.name" class="w-full h-14" clearable />
    </el-form-item>
    <p class="text-sm font-bold pb-2 required">応募職種</p>
    <el-form-item prop="jobId">
      <el-select
        v-model="formAddApplicant.jobId"
        placeholder="選択してください"
        class="w-full"
        clearable
      >
        <el-option
          v-for="item in listJobNames"
          :key="item"
          :label="item.position"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <h3 class="text-sm font-bold pb-2 pt-[6px]">
      エントリー番号
      <span class="text-gray text-xs ml-2">任意</span>
    </h3>
    <el-form-item prop="entryNumber">
      <el-input
        v-model="formAddApplicant.entryNumber"
        class="mobile:!w-full pc:!w-[232px] h-14"
        clearable
      />
    </el-form-item>
    <h3 class="text-sm font-bold pb-2 pt-[6px] required">選考ステップ</h3>
    <el-form-item prop="selectionStep">
      <el-select
        v-model="formAddApplicant.selectionStep"
        placeholder="選択してください"
        class="mobile:!w-full pc:!w-[232px] h-14"
        clearable
      >
        <el-option
          v-for="item in listOptionsSelectionStep"
          :key="item"
          :label="item.label"
          :value="item.label"
        />
      </el-select>
    </el-form-item>
    <h3 class="text-sm font-bold pb-2 pt-[6px] required">応募日</h3>

    <el-form-item
      class="pc:!w-[232px] w-full date-piker-search-bar relative calendar-filter"
      prop="applicantDate"
    >
      <el-date-picker
        v-model="formAddApplicant.applicantDate"
        type="date"
        class="mobile:!w-full pc:!w-[232px] h-14"
        placeholder="選択してください"
        clearable
        format="YYYY-MM-DD"
        :prefix-icon="none"
      ></el-date-picker>
    </el-form-item>
  </el-form>

  <span class="flex justify-center mt-10 mb-[10px]">
    <el-button
      type="primary"
      class="!py-4 !px-28"
      @click="submitForm(ruleFormRef)"
    >
      追加する
    </el-button>
  </span>
  <span class="flex justify-center mt-6 mb-[10px]">
    <button
      class="text-base underline text-primary text-center"
      @click="emits('close')"
    >
      キャンセル
    </button>
  </span>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { useApplicantListStore } from '~/stores/useApplicantListStore';
const emits = defineEmits(['addApplicant', 'close']);

export type FormApplicantSearch = {
  [key: string]: number | string | null | undefined;
  limit?: number;
  textSearch?: string;
  memo?: string;
  jobCategoryId?: string;
  entryNumber?: string;
  name?: string;
  applicationType?: string | null;
  jobId?: string | null;
  selectionStep?: string | null;
  applicantDate?: string;
  scheduled?: string;
};

const applicantStore = useApplicantListStore();
await applicantStore.getListJobNames();

const ruleFormRef = ref<FormInstance>();

const formAddApplicant = reactive<FormApplicantSearch>({
  name: undefined,
  entryNumber: undefined,
  jobId: undefined,
  selectionStep: undefined,
  applicantDate: undefined,
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  formEl.validate((valid) => {
    if (valid) {
      emits('addApplicant', formAddApplicant);
    } else {
      return false;
    }
  });
};

const listOptionsSelectionStep = ref([
  {
    value: EOptionsSelectionStep.FIRST_INTERVIEW,
    label: EOptionsSelectionStep.FIRST_INTERVIEW,
  },
  {
    value: EOptionsSelectionStep.SECOND_INTERVIEW,
    label: EOptionsSelectionStep.SECOND_INTERVIEW,
  },
  {
    value: EOptionsSelectionStep.THIRD_INTERVIEW,
    label: EOptionsSelectionStep.THIRD_INTERVIEW,
  },
  {
    value: EOptionsSelectionStep.FOURTH_INTERVIEW,
    label: EOptionsSelectionStep.FOURTH_INTERVIEW,
  },
  {
    value: EOptionsSelectionStep.ADOPTION,
    label: EOptionsSelectionStep.ADOPTION,
  },
  {
    value: EOptionsSelectionStep.ACCEPTANCEOFOFFER,
    label: EOptionsSelectionStep.ACCEPTANCEOFOFFER,
  },
  {
    value: EOptionsSelectionStep.REJECTION,
    label: EOptionsSelectionStep.REJECTION,
  },
]);

const listJobNames = applicantStore.listJobsName;

const ruleForm = reactive<FormRules<FormApplicantSearch>>({
  name: [
    {
      required: true,
      message: ' 必須項目です',
      trigger: ['trigger', 'blur', 'change'],
    },
  ],
  jobId: [
    {
      required: true,
      message: ' 必須項目です',
      trigger: 'change',
    },
  ],
  selectionStep: [
    {
      required: true,
      message: ' 必須項目です',
      trigger: 'change',
    },
  ],
  applicantDate: [
    {
      required: true,
      message: ' 必須項目です',
      trigger: 'change',
    },
  ],
});
</script>

<style lang="scss">
.form-applicant-offline {
  .required::after {
    content: '*必須';
    @apply absolute text-danger text-xs font-normal mt-[2px] ml-[8px] #{!important};
  }
  .el-select .el-input__inner {
    height: 56px;
  }
}
</style>
