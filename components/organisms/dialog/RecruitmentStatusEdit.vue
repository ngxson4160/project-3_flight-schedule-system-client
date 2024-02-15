<template>
  <client-only>
    <el-dialog
      v-model="centerDialogVisible"
      align-center
      class="dialog-before-logout pc:!w-[496px] !w-[342px] pt-10 px-14 pb-14 mobile:pt-4 mobile:px-4 mobile:pb-8"
    >
      <p class="text-black font-bold text-2xl">採用状況を編集</p>
      <el-form
        ref="ruleFromRef"
        :model="recruitmentStatusEditForm"
        label-position="top"
        class="mt-10 mobile:mt-6"
      >
        <el-form-item class="" label="選考ステップ" prop="selectionStep">
          <div class="custom-placeholder">
            <el-select
              v-model="recruitmentStatusEditForm.selectionStep"
              class="w-full bg-gray-secondary"
              size="large"
              placeholder="選択してください"
            >
              <el-option
                v-for="item in selectWorking"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
        </el-form-item>

        <el-form-item class="mt-[24px]" label="面接日時" prop="interviewDate">
          <div class="custom-placeholder">
            <el-config-provider :locale="ja">
              <el-date-picker
                v-model="recruitmentStatusEditForm.interviewDate"
                class="interview-date"
                type="datetime"
                format="YYYY/MM/DD HH:mm"
                placeholder=" 年 / 月 / 日 00:00"
              />
            </el-config-provider>
          </div>
        </el-form-item>

        <el-form-item class="mt-[24px]" label="メモ" prop="memo">
          <el-input
            v-model="recruitmentStatusEditForm.memo"
            type="textarea"
            :rows="7"
          />
        </el-form-item>
      </el-form>

      <div class="text-center mt-10 mobile:mt-6">
        <el-button
          type="primary"
          class="pc:max-w-[256px] w-full text-base font-bold"
          @click="save(ruleFromRef)"
        >
          保存する
        </el-button>
      </div>

      <div class="text-center mt-[24px]">
        <button
          class="text-primary underline text-base font-bold"
          @click="() => (centerDialogVisible = false)"
        >
          キャンセル
        </button>
      </div>
    </el-dialog>
  </client-only>
</template>

<script setup lang="ts">
import ja from 'element-plus/dist/locale/ja.mjs';
import { FormInstance } from 'element-plus';
import {
  employerUseDetailStore,
  FormEditMessage,
} from '@/stores/employerDetail';
import { IResponse } from '~~/utils/interface';
import { useUseApplicantStore } from '~~/stores/detailApplicant';

const { editMessageDetail } = employerUseDetailStore();
const UseApplicantStore = useUseApplicantStore();

const props = defineProps({
  status: {
    type: Boolean,
    default: false,
  },
  profileData: {
    type: Object,
    default: () => ({}),
  },
  formModal: {
    type: Object,
    default: () => ({}),
  },
  informationInterviewApplicant: {
    type: Object as PropType<FormEditMessage>,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:status', 'edit-message']);
const centerDialogVisible = computed({
  get: () => props.status,
  set: (val: boolean) => {
    emit('update:status', val);
  },
});

const selectWorking = ref([
  '一次選考',
  '二次選考',
  '三次選考',
  '四次選考',
  '合格',
]);

const selectionStep = ref();
selectionStep.value = selectWorking.value;

const ruleFromRef = ref<FormInstance>();

const recruitmentStatusEditForm = ref<FormEditMessage>({
  id:
    props.formModal.id ??
    props.informationInterviewApplicant.id ??
    props.profileData.applicantEntry.id,
  selectionStep:
    props.formModal.selectionStep ??
    props.informationInterviewApplicant.selectionStep ??
    props.profileData.applicantEntry?.settingInterview?.title ??
    '',
  interviewDate:
    props.formModal.interviewDate ??
    props.informationInterviewApplicant.interviewDate ??
    props.profileData.applicantEntry?.settingInterview?.interviewDate ??
    '',
  memo:
    props.formModal.memo ??
    props.informationInterviewApplicant.memo ??
    props.profileData.applicantEntry?.settingInterview?.content ??
    '',
});
const errorMessage = ref('');

const save = (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  formEl.validate(async (valid) => {
    if (valid) {
      const dataInterview = Object.assign({}, recruitmentStatusEditForm.value);

      if (!dataInterview.interviewDate) delete dataInterview.interviewDate;

      const { error, data } = await editMessageDetail(dataInterview);
      if (error.value) {
        errorMessage.value = error.value.data.errorMessage;
        return error.value.data.errorMessage;
      } else {
        const response = data.value as IResponse;

        UseApplicantStore.settingInterview.title =
          dataInterview.selectionStep || '';
        UseApplicantStore.settingInterview.interviewDate =
          dataInterview.interviewDate || '';
        UseApplicantStore.settingInterview.content = dataInterview.memo || '';

        emit('edit-message', {
          ...dataInterview,
          createdTime: response.data?.createdTime,
          updatedTime: response.data?.updatedTime,
        });

        openNotification('採用状況を更新しました');

        centerDialogVisible.value = false;
        // recruitmentStatusEditForm.value.selectionStep = '';
        // recruitmentStatusEditForm.value.interviewDate = '';
        // recruitmentStatusEditForm.value.memo = '';
      }
    } else {
      return false;
    }
  });
};
</script>

<style lang="scss" scoped>
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

.custom-placeholder {
  ::placeholder {
    @apply font-normal text-base;
  }
  .el-input__prefix {
    @apply hidden #{!important};
  }
  .el-input__wrapper {
    @apply w-[232px];
  }
}
</style>
<style lang="scss">
.interview-date {
  .el-input__wrapper {
    @apply w-full #{!important};
  }
  .el-input__prefix {
    @apply hidden #{!important};
  }
}
</style>
