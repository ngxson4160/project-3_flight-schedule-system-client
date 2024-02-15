<template>
  <div
    class="flex py-10 pc:px-10 px-6 shadow-[0px_0px_20px_rgba(0,0,0,0.1)] pc:rounded-xl pc:w-[1024px] mobile:flex-col applicant-information-wrapper"
  >
    <div
      class="pc:border-r mobile:border-b border-gray-third pc:pr-6 mobile:pb-6 pc:w-[256px] flex-shrink-0"
    >
      <div class="flex items-center gap-1">
        <p class="text-2xl font-bold leading-[150%]">
          <span v-if="props.isTypeMessageScout">
            {{ getCompanyName(props.profileUser.workExperience) }}
          </span>
          <span v-else>
            {{
              typeSetting === ETypeSettingInterView.CANDIDATE_ONLINE
                ? props.profileUser?.firstName
                : props.applicantInformation.settingInterview
                    ?.applicantEntryInfor?.applicantInfor.firstName
            }}
            {{
              typeSetting === ETypeSettingInterView.CANDIDATE_ONLINE
                ? props.profileUser?.lastName
                : ''
            }}
          </span>
        </p>
      </div>

      <p
        v-if="
          typeSetting === ETypeSettingInterView.CANDIDATE_ONLINE ||
          props.isTypeMessageScout
        "
        class="text-sm mt-2 leading-[170%]"
      >
        {{ props.profileUser.businessCity?.province?.name }} /
        {{
          dayjs(current).diff(
            dayjs(new Date(props.profileUser.dateOfBirth)),
            'year',
          )
        }}歳
      </p>
      <p
        v-if="
          typeSetting === ETypeSettingInterView.CANDIDATE_ONLINE ||
          props.isTypeMessageScout
        "
        class="text-sm mt-[2px]"
      >
        {{ getAcademic(props.profileUser.academicBackground, 'normal') }}
      </p>
      <p
        v-if="
          !props.isTypeMessageScout &&
          (props.applicantInformation.settingInterview?.applicantEntry
            ?.applicant?.entryNumber ||
            props.applicantInformation.settingInterview?.applicantEntryInfor
              ?.applicantInfor.entryNumber)
        "
        class="mt-6 text-gray text-xs"
      >
        エントリー番号
      </p>
      <p v-if="!props.isTypeMessageScout" class="text-sm mt-1">
        {{
          typeSetting === ETypeSettingInterView.CANDIDATE_ONLINE
            ? props.applicantInformation.settingInterview.applicantEntry
                ?.applicant?.entryNumber
            : props.applicantInformation.settingInterview?.applicantEntryInfor
                ?.applicantInfor.entryNumber
        }}
      </p>
      <div class="mobile:mt-6">
        <div>
          <p class="text-gray text-xs pc:mt-6">応募職種</p>
          <div class="mt-1 cursor-pointer" @click="handleGoToJobDetail">
            <p
              class="text-primary text-sm h-6 leading-[16px] inline mr-1 underline underline-offset-2"
            >
              <span v-if="props.isTypeMessageScout">
                {{ props.dataJob?.position }}
              </span>
              <span v-else>
                {{
                  typeSetting === ETypeSettingInterView.CANDIDATE_ONLINE
                    ? props.applicantInformation.lastMessage?.job?.position
                    : props.applicantInformation.settingInterview
                        ?.applicantEntryInfor?.applicantInfor?.job?.position
                }}
              </span>
            </p>
            <img
              src="~/assets/images/icon-redirect-to-new-page.svg"
              alt=""
              class="inline"
            />
          </div>
        </div>
        <div v-if="!props.isTypeMessageScout" class="flex-shrink-0">
          <p class="mt-6 text-gray text-xs">応募者情報</p>
          <div
            v-if="typeSetting === ETypeSettingInterView.CANDIDATE_ONLINE"
            class="mt-1 bg-color-bg p-4 rounded-lg"
          >
            <div class="pb-4">
              <DropdownSelectionExportPDF
                size-button="small"
                :is-in-applicant-overview="true"
                @handle-select-export="handleExportPDF"
              />
            </div>
            <div
              ref="buttonShowMenuExportFileAndImage"
              class="relative inline pt-4"
              @click="handleShowExportAvatarAndEntryFiles"
            >
              <div class="inline-flex cursor-pointer gap-1 items-center">
                <p
                  class="text-primary roundedflex items-center underline underline-offset-2 text-sm leading-[170%]"
                >
                  顔写真/添付ファイル
                </p>
                <img
                  src="~/assets/images/icon-download-blue.svg"
                  alt=""
                  class=""
                />
              </div>
              <MenuExportFileAndImage
                :visible-menu="visibleMenuExportFileAndImage"
                @handle-select-export="handleSelectExportFileAndImage"
              />
            </div>
          </div>

          <div v-else class="mt-1 bg-color-bg p-4 rounded-lg">
            <ul
              v-if="
                !props.isTypeMessageScout &&
                typeSetting !== ETypeSettingInterView.CANDIDATE_ONLINE
              "
              class="list-none"
            >
              <li
                v-for="(item, index) in pdfApplcaintInfor"
                :key="index"
                class="text-sm text-primary underline underline-offset-2 cursor-pointer leading-[170%] break-words"
                :class="{
                  'mb-6': index === pdfApplcaintInfor.length - 1,
                  'mb-4': index !== pdfApplcaintInfor.length - 1,
                }"
                @click="downloadFileAttachment(item.fileName, item.url)"
              >
                {{ item.fileName }}（{{ getFileExtensionFromUrl(item.url) }}:
                {{ item.size }}KB）
                <img
                  src="~/assets/images/icon-download-blue.svg"
                  alt=""
                  class="inline"
                />
              </li>
            </ul>
            <input
              ref="fileInput"
              class="hidden"
              type="file"
              @change="handleUploadPDFApplcaintInfor"
            />
            <el-button
              class="!h-10 !bg-color-bg !border-gray-third hover:!bg-secondary !px-2"
              @click="fileInput?.click()"
            >
              <img src="~/assets/images/icon-upload-pdf-black.svg" />
              <p class="text-xs font-normal pl-1 text-black tracking-[-0.5px]">
                インポート
              </p>
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="pc:pl-6 pc:flex-grow mobile:pt-6">
      <div class="pc:flex pc:gap-4 pc:items-stretch">
        <div
          v-if="
            applicantInformationData.settingInterview?.title ||
            applicantInformationData.settingInterview?.interviewDate ||
            applicantInformationData.settingInterview?.selectionMethod
          "
          class="flex-grow mb-4"
        >
          <div class="flex items-center gap-1">
            <p class="text-gray text-xs">選考予定</p>
            <img
              src="~/assets/images/icon-settings.svg"
              alt=""
              class="cursor-pointer"
              @click="emits('editSettingInterview')"
            />
          </div>
          <div class="rounded-lg bg-color-bg mt-1 p-4">
            <div>
              <div class="flex text-sm">
                <p
                  :class="`${
                    applicantInformationData.settingInterview.title &&
                    applicantInformationData.settingInterview.title !==
                      EBugProduction.NAME
                      ? 'w-[72px] flex-shrink-0'
                      : 'flex-shrink-0 w-full'
                  } `"
                >
                  {{
                    applicantInformationData.settingInterview.title &&
                    applicantInformationData.settingInterview.title !==
                      EBugProduction.NAME
                      ? applicantInformationData.settingInterview.title
                      : '選考予定はありません'
                  }}
                </p>
                <p
                  v-if="applicantInformationData.settingInterview.interviewDate"
                  class="label-custom-break-line"
                >
                  {{
                    dayjs(
                      applicantInformationData.settingInterview.interviewDate,
                    )
                      .locale(ja)
                      .format('YYYY年MM月DD日 (ddd)')
                  }}
                  {{
                    dayjs(
                      applicantInformationData.settingInterview.interviewDate,
                    ).format('HH:mm')
                  }}{{
                    applicantInformationData.settingInterview.interviewEndDate
                      ? `~${dayjs(
                          applicantInformationData.settingInterview
                            .interviewEndDate,
                        ).format('HH:mm')}`
                      : ''
                  }}
                </p>
              </div>
              <div class="flex text-sm mt-4 gap-1">
                <p class="w-20 flex-shrink-0 text-gray">選考方法</p>
                <p class="label-custom-break-line">
                  {{
                    applicantInformationData.settingInterview.selectionMethod
                  }}
                </p>
              </div>
              <div
                v-if="applicantInformationData?.settingInterview?.location"
                class="flex text-sm mt-1 gap-1"
              >
                <p class="w-20 flex-shrink-0 text-gray">選考場所</p>
                <div
                  class="cursor-pointer label-custom-break-line text-sm whitespace-pre-line break-all h-auto"
                  v-html="applicantInformationData?.settingInterview?.location"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="!props.isTypeMessageScout"
          class="flex pc:flex-col gap-2 flex-shrink-0 pc:mb-4 mb-6"
        >
          <!-- <el-button
            v-if="typeSetting === ETypeSettingInterView.CANDIDATE_ONLINE"
            class="pc:!w-[188px] mobile:flex-1 mobile:!px-0"
            @click="emits('handleGoToSettingInterviewSchedule')"
          >
            <p class="text-sm !font-normal">日程調整リンクを作成</p>
          </el-button> -->
          <el-button
            class="pc:!w-[188px] !ml-0 mobile:flex-1 mobile:!px-0"
            @click="emits('handleCreateSelectionSchedule')"
          >
            <p class="text-sm !font-normal">選考予定を作成</p>
          </el-button>
        </div>
      </div>
      <div class="pc:flex pc:gap-4">
        <div v-if="!props.isTypeMessageScout" class="mobile:mb-4">
          <p class="text-gray text-xs">選考ステップ</p>
          <el-select
            v-model="selectApplicant"
            clearable
            size="large"
            class="pc:w-[160px] w-[167px] mt-1"
            placeholder=" "
            @change="handleChangeSelectionStep"
          >
            <el-option
              v-for="item in OPTION_TITLE_CREATE_SCHEDULE"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div class="pc:flex-grow">
          <p class="text-gray text-xs">メモ</p>
          <el-input
            v-model="textContent"
            :rows="5"
            type="textarea"
            placeholder=" "
            class="mt-1"
            @change="handleUpdateMemoEmployer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import {
  ETypeSettingInterView,
  ETypeUpdateSelectionContent,
  EBugProduction,
  ETypeExportFileAndImage,
} from '~/utils/enum';
import { uploadFileStore } from '@/stores/upload';
import { useApplicantListStore } from '~/stores/useApplicantListStore';

const props = defineProps({
  profileUser: {
    type: Object,
    default: () => {},
  },
  applicantInformation: {
    type: Object,
    default: () => {},
  },
  typeSettingInterView: {
    type: String,
    default: '',
  },
  isTypeMessageScout: {
    type: Boolean,
    default: false,
  },
  dataJob: {
    type: Object,
    default: () => {},
  },
});

const emits = defineEmits([
  'handleGoToJobDetail',
  'handleCreateSelectionSchedule',
  'handleGoToSettingInterviewSchedule',
  'editSettingInterview',
  'exportAvatarAndEntryFiles',
]);
const applicantInformationData = ref(props.applicantInformation);
const current = new Date();

watch(
  () => props.applicantInformation,
  (newVal) => {
    applicantInformationData.value = newVal;
  },
);
const textContent = ref<string>('');
const selectApplicant = ref<string>('');
if (!props.isTypeMessageScout) {
  textContent.value = props.applicantInformation.settingInterview?.content;
  selectApplicant.value =
    props.applicantInformation.settingInterview?.selectionStep;
} else textContent.value = props.applicantInformation.memoEmployer ?? '';
const typeSetting = ref<string>(props.typeSettingInterView);
watch(
  () => props.typeSettingInterView,
  (newValue) => {
    typeSetting.value = newValue;
  },
);

const handleGoToJobDetail = () => {
  emits('handleGoToJobDetail');
};

const handleExportPDF = async (type: string) => {
  const urlApiExport = 'employers/profile/export-apllicant-token';

  const { data } = await useBaseFetch(`${urlApiExport}`, {
    method: 'POST',
    body: {
      applicantId:
        props.applicantInformation.settingInterview.applicantEntry.applicant.id,
    },
  });
  handleDownLoadPdf(type, data.value.data);
};

const { uploadFiles } = uploadFileStore();
const fileInput = ref<HTMLInputElement>();
const pdfApplcaintInfor = ref<
  { size: number; url: string; fileName: string }[]
>([]);
pdfApplcaintInfor.value =
  props.applicantInformation.settingInterview?.applicantEntryInfor?.applicantInfor.pdfApplcaintInfor;
const handleUploadPDFApplcaintInfor = async (e: any) => {
  if (!e.target.files?.length) return;
  const formData = new FormData();
  const file = e.target.files[0];

  if (file.size / 1024 / 1024 > 100) {
    openNotificationError('ファイルサイズが100MBを超えています');
  } else {
    formData.append('file', file);
    formData.append('isAttachment', 'true');

    const fileUrl = await uploadFiles(formData);
    pdfApplcaintInfor.value.push({
      size: Math.ceil(file.size / 1024),
      fileName: file.name.split('.').slice(0, -1).join('.'),
      url: fileUrl,
    });

    const { error } = await useBaseFetch(
      `/applicants/infor/update-pdf/${props.applicantInformation.settingInterview?.applicantEntryInfor?.applicantInfor.id}`,
      {
        method: 'PUT',
        body: {
          pdfApplcaintInfor: pdfApplcaintInfor.value,
        },
      },
    );
    if (error.value?.data) pdfApplcaintInfor.value.pop();
  }
};
const applicantStore = useApplicantListStore();

const handleChangeSelectionStep = async () => {
  await applicantStore.updateSelectionContent(
    ETypeUpdateSelectionContent.SELECTION,
    selectApplicant.value,
    props.applicantInformation?.settingInterview?.id,
  );
};

const handleUpdateMemoEmployer = async () => {
  if (props.isTypeMessageScout) {
    const { error } = await useBaseFetch(
      `/box/${props.applicantInformation.lastMessage.boxId}/memo`,
      {
        method: 'PUT',
        body: {
          memoEmployer: textContent.value,
        },
      },
    );
    if (error.value?.data) throw error.value?.data;
    else openNotification('メモを変更しました');
  } else
    await applicantStore.updateSelectionContent(
      ETypeUpdateSelectionContent.CONTENT,
      textContent.value,
      props.applicantInformation?.settingInterview?.id,
    );
};

const visibleMenuExportFileAndImage = ref(false);

const handleShowExportAvatarAndEntryFiles = () => {
  visibleMenuExportFileAndImage.value = !visibleMenuExportFileAndImage.value;
};
const buttonShowMenuExportFileAndImage = ref(null);
onClickOutside(buttonShowMenuExportFileAndImage, (event) => {
  if (visibleMenuExportFileAndImage.value)
    visibleMenuExportFileAndImage.value = false;
});
const handleSelectExportFileAndImage = (type: ETypeExportFileAndImage) => {
  emits('exportAvatarAndEntryFiles', type);
};
</script>
<style lang="scss">
.input-title .el-textarea__inner {
  box-shadow: unset;
}
.input-title .el-textarea__inner:hover {
  box-shadow: unset;
}
.applicant-information-wrapper {
  p {
    @apply leading-[170%];
  }
}
</style>
