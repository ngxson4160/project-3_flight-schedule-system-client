<template>
  <div class="flex gap-4 items-center">
    <el-button
      v-if="jobId"
      class="flex-1 !ml-0 !border-2 !border-gray-third"
      @click="handleEmits"
    >
      <img src="~/assets/images/icon-load-change-blue.svg" />
      <p class="ml-2 !text-sm">選考ステップを一括変更</p>
    </el-button>
    <el-button
      v-else
      class="flex-1 !ml-0 !border-2 !border-gray-third"
      @click="handleEmits"
    >
      <img src="~/assets/images/icon-load-change-gray.svg" />
      <p class="ml-2 !text-sm text-gray-disabled text-opacity-60">
        選考ステップを一括変更
      </p>
    </el-button>
    <!-- <el-button
      class="flex-1 !ml-0 !border-2 !border-gray-third"
      @click="handleEmits('sendNotificationSelection')"
    >
      <img src="~/assets/images/icon-send-message-blue.svg" />
      <p class="ml-2 !text-sm">選考に関するお知らせを送信</p>
    </el-button> -->

    <el-button
      v-if="jobId"
      class="flex-1 !ml-0 !border-2 !border-gray-third"
      :disabled="disabled"
      @click="handleEmitsCreateSchedule"
    >
      <img src="~/assets/images/icon-pen-blue.svg" />
      <p class="ml-2 !text-sm">選考予定を作成</p>
    </el-button>
    <el-button
      v-else
      class="flex-1 !ml-0 !border-2 !border-gray-third"
      :disabled="disabled"
      @click="handleEmitsCreateSchedule"
    >
      <img src="~/assets/images/icon-edit-disable.svg" />
      <p class="ml-2 !text-sm text-gray-disabled text-opacity-60">
        選考予定を作成
      </p>
    </el-button>
    <el-button
      class="flex-1 !ml-0 !border-2 !border-gray-third"
      @click="handleEmitSendMessage()"
    >
      <img src="~/assets/images/icon-send-message-blue-solid.svg" />
      <p class="ml-2 !text-sm">メッセージを送信</p>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useApplicantListStore } from '~/stores/useApplicantListStore';
import { ETypeSettingInterView } from '@/utils/enum';

const props = defineProps({
  applicant: {
    type: Array as () => { typeSettingInterview: ETypeSettingInterView }[],
    default: () => [],
  },
  jobId: {
    type: Number,
    default: undefined,
  },
});

const emits = defineEmits([
  'changeSelectionStepsAll',
  'sendNotificationSelection',
  'sendMessage',
  'createSelectionSchedule',
]);

const applicantListStore = useApplicantListStore();
const isNotOffline = computed(() => {
  if (props.applicant && props.applicant.length) {
    return props.applicant.every(
      (i) => i.typeSettingInterview === ETypeSettingInterView.CANDIDATE_ONLINE,
    );
  }
});

const handleEmitSendMessage = () => {
  if (props.applicant.length && isNotOffline.value) {
    emits('sendMessage');
  } else {
    openNotification(applicantListStore.messageNotEmptyChecked);
  }
};

const handleEmits = () => {
  if (props.applicant.length && props.jobId) {
    emits('changeSelectionStepsAll');
  } else if (!props.jobId) {
    openNotification(applicantListStore.messageSelectJobId);
  } else {
    openNotification(applicantListStore.messageNotEmptyChecked);
  }
};

const handleEmitsCreateSchedule = () => {
  if (props.applicant.length && props.jobId) {
    emits('createSelectionSchedule');
  } else if (!props.jobId) {
    openNotification(applicantListStore.messageSelectJobId);
  } else {
    openNotification(applicantListStore.messageNotEmptyChecked);
  }
};
</script>

<style scoped></style>
