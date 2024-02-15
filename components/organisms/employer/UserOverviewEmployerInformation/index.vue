<template>
  <div
    class="flex py-10 pc:px-10 px-6 shadow-[0px_0px_20px_rgba(0,0,0,0.1)] pc:rounded-xl pc:w-[1024px] mobile:flex-col applicant-information-wrapper"
  >
    <div
      class="pc:border-r mobile:border-b border-gray-third pc:pr-6 mobile:pb-6 pc:w-[256px] flex-shrink-0"
    >
      <img
        :src="employerInformation.avatarURL"
        class="h-14 w-14 rounded-full border border-gray-third"
      />
      <p class="text-2xl font-bold leading-[150%] mt-2">
        {{ employerInformation?.governmentOffice?.name }}
      </p>
      <p class="text-sm mt-2 leading-[170%]">
        {{ employerInformation?.city?.province?.name }}
        {{ employerInformation?.city?.name }}
      </p>

      <div class="mobile:flex mobile:gap-10 mt-6">
        <div>
          <p class="text-gray text-xs">応募職種</p>
          <div class="mt-2 cursor-pointer" @click="handleGoToJobDetail">
            <p
              class="text-primary text-sm h-6 leading-[16px] inline mr-1 underline underline-offset-2"
            >
              {{ applicantInformation.lastMessage.job.jobCategory.name }}
            </p>
            <img
              src="~/assets/images/icon-redirect-to-new-page.svg"
              alt=""
              class="inline"
            />
          </div>
        </div>
        <div class="mobile:flex-shrink-0">
          <p class="pc:mt-6 text-gray text-xs">プロフィール・エントリー情報</p>
          <div class="flex mt-1">
            <DropdownSelectionExportPDF
              size-button="small"
              :is-in-applicant-overview="true"
              @handle-select-export="handleExportPDF"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="pc:pl-6 pc:flex-grow mobile:pt-6">
      <div
        v-if="
          applicantInformation.settingInterview?.title ||
          applicantInformation.settingInterview?.interviewDate ||
          applicantInformation.settingInterview?.selectionMethod
        "
        class="mb-4"
      >
        <p class="text-gray text-xs">選考予定</p>
        <div class="rounded-lg bg-color-bg mt-1 p-4">
          <div>
            <div class="flex text-sm">
              <p class="w-20 flex-shrink-0">
                {{ applicantInformation.settingInterview.title }}
              </p>
              <p
                v-if="applicantInformation.settingInterview.interviewDate"
                class="label-custom-break-line"
              >
                {{
                  dayjs(applicantInformation.settingInterview.interviewDate)
                    .locale(ja)
                    .format('YYYY年MM月DD日 (ddd)')
                }}
                {{
                  dayjs(
                    applicantInformation.settingInterview.interviewDate,
                  ).format('HH:mm')
                }}{{
                  applicantInformation.settingInterview.interviewEndDate
                    ? `~${dayjs(
                        applicantInformation.settingInterview.interviewEndDate,
                      ).format('HH:mm')}`
                    : ''
                }}
              </p>
            </div>
            <div class="flex text-sm mt-4">
              <p class="w-20 flex-shrink-0 text-gray">選考方法</p>
              <p class="label-custom-break-line">
                {{ applicantInformation.settingInterview.selectionMethod }}
              </p>
            </div>
            <div
              v-if="applicantInformation.settingInterview.location"
              class="flex text-sm mt-1"
            >
              <p class="w-20 flex-shrink-0 text-gray">選考場所</p>
              <div
                class="cursor-pointer label-custom-break-line"
                v-html="applicantInformation.settingInterview.location"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p class="text-gray text-xs">メモ</p>
        <el-input
          v-model="textContent"
          :rows="5"
          type="textarea"
          placeholder=" "
          class="mt-1"
          @blur="handleUpdateMemoUser"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';

const props = defineProps({
  applicantInformation: {
    type: Object,
    default: () => {},
  },
  employerInformation: {
    type: Object,
    default: () => {},
  },
  isTypeMessageScout: {
    type: Boolean,
    default: false,
  },
});

const isTypeScout = ref<boolean>(props.isTypeMessageScout);
watch(
  () => props.isTypeMessageScout,
  (newValue) => {
    isTypeScout.value = newValue;
  },
);
const emits = defineEmits(['handleGoToJobDetail']);

const textContent = ref<string>(props.applicantInformation.memoUser ?? '');

const handleGoToJobDetail = () => {
  emits('handleGoToJobDetail');
};
const handleExportPDF = async (type: string) => {
  const urlApiExport = 'users/profile/export-entry-token';

  const { data } = await useBaseFetch(`${urlApiExport}`, {
    method: 'POST',
    body: {
      applicantId:
        props.applicantInformation.settingInterview.applicantEntry.applicant.id,
    },
  });
  handleDownLoadPdf(type, data.value.data);
};
const handleUpdateMemoUser = async () => {
  const { error } = await useBaseFetch(
    `/box/${props.applicantInformation.lastMessage.boxId}/memo`,
    {
      method: 'PUT',
      body: {
        memoUser: textContent.value,
      },
    },
  );
  if (error.value?.data) throw error.value?.data;
  else openNotification('メモを変更しました');
};
</script>
<style lang="scss">
.applicant-information-wrapper {
  p {
    @apply leading-[170%];
  }
}
</style>
