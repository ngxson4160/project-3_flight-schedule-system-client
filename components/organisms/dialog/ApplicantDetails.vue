<template>
  <client-only>
    <el-dialog
      v-model="centerDialogVisible"
      align-center
      class="dialog-applicant-detail pc:!w-[1024px] mobile:!w-[390px] pc:!mt-10"
    >
      <div class="pc:hidden border-b-[1px] border-[#DADCDE]">
        <h1
          class="text-sm font-bold text-center text-black py-[18px] close relative"
        >
          ユーザー情報
          <img
            src="@/assets/images/icon-close-black.svg"
            alt=""
            class="absolute right-[20px] top-[16px]"
            @click="() => (centerDialogVisible = false)"
          />
        </h1>
      </div>
      <div class="px-10 pt-10 mobile:px-4">
        <p class="font-bold text-2xl leading-[170%] !text-black">
          {{ profileData.firstName }}
          {{ profileData.lastName }}
        </p>
        <p class="font-normal text-base leading-[150%] !text-black mt-2">
          {{ profileData.city.province.name }} /
          {{ dayjs().diff(profileData.dateOfBirth, 'year') }}歳
        </p>
        <div v-for="(el, id) in profileData.academicBackground" :key="id">
          <p class="font-normal text-sm leading-[150%] !text-black mt-2">
            {{ el.schoolName }}
            {{ el.academicInfo }}
          </p>
        </div>
      </div>
      <div
        class="flex-row-reverse flex justify-between items-center mt-8 pc:px-10 mobile:mx-auto pc:gap-8 mobile:gap-4 mobile:px-6"
      >
        <div class="w-1/2 cursor-pointer" @click="handleGoToMessageDetail">
          <div
            class="h-[56px] shadow-[0px_0px_20px_rgba(0,0,0,0.1)] rounded-lg bg-primary text-white leading-[150%] text-base flex items-center justify-center"
          >
            <img
              src="~/assets/images//editor/icon-mess.svg"
              alt=""
              class="w-6 h-6"
            />
            <p class="ml-2">メッセージ</p>
          </div>
        </div>

        <div class="w-1/2">
          <DropdownSelectionExportPDF @handle-select-export="handleExportPDF" />
        </div>
      </div>
      <div class="mt-16 text-black mobile:mt-10">
        <el-tabs v-model="activeName" class="tab-message-detail">
          <el-tab-pane label="プロフィール" name="first">
            <div class="flex w-full mobile:flex-col">
              <div class="pc:w-full pc:px-14 mobile:w-full">
                <BasicInformationV2 :profile-data="profileData" />
                <div>
                  <div class="px-10 mobile:px-6">
                    <NewTimeLine :timeline-data="timelineData" />
                  </div>
                </div>
              </div>

              <!-- <InformationRight
                class="ml-8 mobile:ml-0"
                :profile-data="profileData"
                :is-shadow="false"
              /> -->
            </div>
          </el-tab-pane>

          <el-tab-pane label="エントリー情報" name="second">
            <div class="pc:px-24 pb-10 pt-10 mobile:px-6">
              <ApplicantInformations :profile-data="profileData" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </client-only>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { ITimelineItem } from '~/utils/interface';
import { EMessageType } from '~~/utils/enum';

const props = defineProps({
  status: {
    type: Boolean,
    default: false,
  },
  timelineData: {
    type: Array<ITimelineItem>,
    default: () => [],
  },
  profileData: {
    type: Object,
    default: () => ({}),
  },
});

const token = ref('');

watchEffect(async () => {
  if (props.profileData) {
    if (props.profileData.id) {
      const { data, error } = await useBaseFetch(
        `employers/profile/export-apllicant-token`,
        {
          method: 'POST',
          body: {
            applicantId: props.profileData.id,
          },
        },
      );
      token.value = data.value.data;
    }
  }
});

const activeName = ref<string>('first');
const emit = defineEmits(['update:status', 'confirm']);
const handleClick = () => {
  emit('confirm');
};
const centerDialogVisible = computed({
  get: () => props.status,
  set: (val: boolean) => {
    emit('update:status', val);
  },
});

const downloadPdf = () => {
  if (activeName.value === 'first') {
    handleDownLoadPdf('applicant', token.value);
  } else {
    handleDownLoadPdf('applicant-entry', token.value);
  }
};
const handleGoToMessageDetail = () => {
  if (
    props.profileData.applicantEntry.message.box.boxType === EMessageType.ENTRY
  )
    routerPush(
      `/employer/message/${props.profileData.applicantEntry.message.box.lastMessageId}/entry?box=${props.profileData.applicantEntry.message.box.id}`,
    );
  if (
    props.profileData.applicantEntry.message.box.boxType ===
    EMessageType.INTERVIEW
  )
    routerPush(
      `/employer/message/${props.profileData.applicantEntry.message.box.lastMessageId}/interview?box=${props.userData.applicantEntry.message.box.id}`,
    );
};
const handleExportPDF = async (type: string) => {
  const urlApiExport = 'employers/profile/export-apllicant-token';

  const { data, error } = await useBaseFetch(`${urlApiExport}`, {
    method: 'POST',
    body: {
      applicantId:
        props?.profileData?.createdApplicants?.id ??
        props?.profileData?.applicantEntry?.id,
    },
  });
  handleDownLoadPdf(type, data.value.data);
};
</script>

<style lang="scss">
.dialog-applicant-detail {
  .el-dialog__header {
    @apply hidden;
  }
  .el-dialog__body {
    @apply pc:px-14 pc:pt-10 pc:pb-14 mobile:py-4 mobile:px-0;
  }
}
.dialog-applicant-detail.el-dialog {
  @apply rounded-xl;
}
.tab-message-detail .el-tabs__header {
  @apply mb-0;
}
.tab-message-detail .el-tabs__item.is-top {
  @apply mb-6 text-base text-gray-text font-bold ml-10;
}
.tab-message-detail .el-tabs__item.is-top.is-active {
  @apply mb-6 text-base text-black font-bold;
}
// .close::after {
//   content: url('@/assets/images/icon-close-black.svg');
//   position: absolute;
//   right: 20px;
//   top: 15px;
// }

.el-tabs__item.is-top {
  margin-bottom: 0px !important;
  padding-bottom: 24px;
}
.el-tabs__item.is-top.is-active {
  margin-bottom: 0px !important;
  padding-bottom: 24px;
}
</style>
