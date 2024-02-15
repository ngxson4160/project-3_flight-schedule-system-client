<template>
  <div>
    <div
      v-if="props.role === 'employer' && membersInformationMessageData.length"
      class="border-b border-gray-third pb-8"
    >
      <span class="text-sm text-gray">担当メンバー</span>
      <div class="font-bold flex gap-x-6 flex-wrap mt-[2px]">
        <div class="flex gap-2">
          <p>{{ membersInformationMessageData.length }}名</p>
          <img
            src="~/assets/images/icon-settings.svg"
            alt=""
            class="cursor-pointer"
            @click="emits('editSettingInterview')"
          />
        </div>
        <p v-for="member in membersInformationMessageData" :key="member.id">
          {{ member.firstName }}{{ member.lastName }}
        </p>
      </div>
    </div>
    <div
      class="flex justify-between items-center"
      :class="{
        'pt-8':
          props.role === 'employer' && membersInformationMessageData.length,
      }"
    >
      <div class="flex gap-8 items-center">
        <p class="text-sm">To</p>
        <p
          v-if="
            dataBoxMessageDetail.length === 1 &&
            dataBoxMessageDetail?.[0]?.messageType === EMessageType.SCOUT
          "
        >
          {{ props.userCompanyName }}
        </p>
        <p v-else class="text-sm font-bold">
          <span v-if="props.role === 'employer'">
            {{ userInformation?.firstName }} {{ userInformation?.lastName }}
          </span>
          <span v-else>
            {{ employerInformation?.governmentOffice?.name }}
          </span>
        </p>
      </div>
      <div v-if="props.role === 'employer'" class="flex gap-1 items-center">
        <el-switch
          v-model="isEmployerReply"
          class="el-switch-custom"
          inline-prompt
          style="--el-switch-on-color: #fe4b28; --el-switch-off-color: #a3a8ad"
          active-text="未対応"
          inactive-text="対応不要"
        />
      </div>
    </div>
    <el-form
      ref="formRef"
      label-position="top"
      class="employer-from mt-4 !mb-0 pb-[14px] border-b border-gray-third"
      :model="form"
      :rules="rules"
    >
      <el-form-item prop="title" class="!bg-gray-secondary">
        <div
          class="border border-gray-third rounded template-title-message-editor w-full"
        >
          <MessageEditor
            v-model="form.title"
            v-model:template-text="templateTextTitle"
            v-model:is-set-content="isSetContentTitle"
            :is-disable-enter="true"
            :is-disable-edit="isDisableCreateMessage"
            placeholder="件名"
            @reset-template-text="templateTextTitle = ''"
            @reset-is-set-content="isSetContentTitle = false"
            @on-focus="focusEditorCurrent = 'title'"
          />
        </div>
      </el-form-item>

      <el-form-item prop="content">
        <div class="border border-gray-third rounded w-full">
          <MessageEditor
            v-model="form.content"
            v-model:template-text="templateText"
            v-model:is-set-content="isSetContent"
            :is-disable-edit="isDisableCreateMessage"
            placeholder="本文"
            @reset-template-text="templateText = ''"
            @reset-is-set-content="isSetContent = false"
            @on-focus="focusEditorCurrent = 'content'"
          />

          <div v-if="fileName.length" class="pt-[10px] mobile:w-full px-6">
            <div
              v-for="(item, index) in fileName"
              :key="item"
              class="flex items-center mb-2 gap-1"
            >
              <h1
                class="text-xs text-gray pc:max-w-[280px] mobile:max-w-[200px] truncate"
              >
                {{ item }}
              </h1>

              <el-icon
                :size="15"
                class="cursor-pointer"
                @click="handleRemoveFile(index)"
              >
                <Close />
              </el-icon>
            </div>
          </div>
          <h1 class="text-danger text-xs px-6">
            {{ textCheckSizeUpload }}
          </h1>

          <div
            class="flex justify-between items-center px-4 pb-4"
            :class="{
              'bg-gray-secondary pointer-events-none ': isDisableCreateMessage,
            }"
          >
            <div
              class="flex items-center text-primary text-[14px]"
              :class="{
                '!text-gray': isDisableCreateMessage,
              }"
            >
              <div class="mr-4 cursor-pointer" @click.stop="fileInput?.click()">
                <p class="mobile:hidden">ファイル添付</p>
                <img
                  src="~/assets/images/icon-upload-file-gray.svg"
                  class="pc:hidden"
                />
              </div>

              <input
                ref="fileInput"
                class="hidden"
                type="file"
                @change="uploadBackground"
              />

              <div
                v-if="props.role === 'employer'"
                class="border-x-2 border-gray-third pc:px-4 px-3 h-4"
              >
                <PopoverTemplateMessage
                  v-model:status="visibleTemplateText"
                  :template-text-list="templateTextList"
                  :is-disable="isDisableCreateMessage"
                  @update-status="updateStatusPopover"
                  @handle-click="handleAddText"
                />
              </div>
              <p
                v-if="props.role === 'employer'"
                class="pc:ml-4 ml-3 cursor-pointer mobile:text-xs"
                @click="openDialogTemplateMessage"
              >
                テンプレート挿入
              </p>
            </div>
            <div
              class="py-1 px-2 rounded"
              :class="{
                'bg-primary':
                  form.title &&
                  form.content &&
                  form.title !== '<p></p>' &&
                  form.content !== '<p></p>' &&
                  !isUploadingFile,
              }"
            >
              <img
                v-if="
                  form.title &&
                  form.content &&
                  form.title !== '<p></p>' &&
                  form.content !== '<p></p>' &&
                  !isUploadingFile
                "
                src="~/assets/images/icon-employer-send-message-solid-white.svg"
                class="cursor-pointer"
                @click="hanleCreateMessage"
              />
              <img
                v-else
                src="~/assets/images/icon-employer-send-message-gray.svg"
              />
            </div>
          </div>
        </div>
      </el-form-item>
      <div
        v-if="
          dataBoxMessageDetail.length === 1 &&
          dataBoxMessageDetail?.[0]?.messageType === EMessageType.SCOUT &&
          props.role === 'user'
        "
        class="pt-[14px] pb-[18px]"
      >
        <p
          class="p-6 mobile:text-sm font-bold bg-secondary rounded-xl text-center"
        >
          メッセージするにはエントリーが必須です
        </p>
      </div>
    </el-form>

    <div
      ref="messageList"
      class="pt-2 max-h-[680px] custom-scroll-bar overflow-y-auto"
    >
      <MessageItem
        v-for="(message, index) in dataBoxMessageDetail"
        :key="index"
        class="border-b border-gray-third"
        :data-message="message"
        :is-parent="true"
        :role="props.role"
        :user-company-name="props.userCompanyName"
        @handle-view-entry-form="emits('handleViewEntryForm')"
        @handle-reply-message="handleReplyMessage"
      />
    </div>
  </div>
  <DialogTemplateMessage
    v-if="dialogTemplateMessage"
    v-model:status="dialogTemplateMessage"
    :last-message="props.dataMessages?.[0]"
    @update-status="updateStatusDialog"
    @handle-confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import { useInfiniteScroll } from '@vueuse/core';
import { Close } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';
import {
  IMemberInformation,
  IMessageDetail,
  IFormCreateMessage,
  ISenderMessageInformation,
  ITemplateMessage,
} from '~/utils/interface';
import { EMessageType, ETypeApplicantTimeline } from '~/utils/enum';
import { uploadFileStore } from '@/stores/upload';

const props = defineProps({
  membersInformation: {
    type: Array as () => IMemberInformation[],
    default: () => [],
  },
  role: {
    type: String,
    default: 'employer',
  },
  dataMessages: {
    type: Array as () => IMessageDetail[],
    default: () => [],
  },
  userCompanyName: {
    type: String,
    default: '',
  },
});

const messageList = ref<HTMLElement>(null);

useInfiniteScroll(
  messageList,
  () => {
    loadMoreMessage();
  },
  { distance: 10 },
);

const emits = defineEmits([
  'handleViewEntryForm',
  'loadMoreMessage',
  'hanleCreateMessage',
  'handleReplyMessage',
  'editSettingInterview',
]);

const dataBoxMessageDetail = ref<IMessageDetail[]>(props.dataMessages);
const isEmployerReply = ref<boolean>(!props.dataMessages?.[0]?.box?.isTurnOff);

watch(
  () => props.dataMessages,
  (newValue) => {
    dataBoxMessageDetail.value = newValue;
    if (newValue?.[0]?.box?.isTurnOff === undefined)
      isEmployerReply.value = false;
    else isEmployerReply.value = !newValue?.[0]?.box?.isTurnOff;
  },
);

const membersInformationMessageData = ref<IMemberInformation[]>(
  props.membersInformation,
);
watch(
  () => props.membersInformation,
  (newValue) => {
    membersInformationMessageData.value = newValue;
  },
);

watch(isEmployerReply, async (newValue) => {
  if (dataBoxMessageDetail.value?.[0]?.boxId) {
    const { error } = await useBaseFetch(
      `/box/${dataBoxMessageDetail.value?.[0]?.boxId}`,
      {
        method: 'PUT',
        body: {
          isTurnOff: !newValue,
        },
      },
    );
    if (error.value?.data) {
      throw error.value?.data;
    }
  }
});

const userInformation = ref<ISenderMessageInformation>();
const employerInformation = ref<ISenderMessageInformation>();
if (props.dataMessages[0].senderUser.governmentOffice) {
  employerInformation.value = props.dataMessages[0].senderUser;
  userInformation.value = props.dataMessages[0].recipientUser;
} else {
  employerInformation.value = props.dataMessages[0].recipientUser;
  userInformation.value = props.dataMessages[0].senderUser;
}

const isDisableCreateMessage = ref<boolean>(false);
// employer
if (props.role === 'employer') {
  if (
    dataBoxMessageDetail.value.length === 1 &&
    dataBoxMessageDetail.value?.[0]?.messageType === EMessageType.SCOUT
  )
    isDisableCreateMessage.value = true;
}
// user
else if (
  dataBoxMessageDetail.value.length === 1 &&
  (dataBoxMessageDetail.value?.[0]?.messageType === EMessageType.ENTRY ||
    dataBoxMessageDetail.value?.[0]?.messageType === EMessageType.SCOUT)
)
  isDisableCreateMessage.value = true;

const form = ref<IFormCreateMessage>({
  title: '',
  content: '',
  fileUrls: [],
});
const { uploadFiles } = uploadFileStore();

const formRef = ref();
const fileName = ref<string[]>([]);
const fileInput = ref<HTMLInputElement>();
const urlFile = ref<{ url: string; size: number }[]>([]);
const textCheckSizeUpload = ref<string>('');
const visibleTemplateText = ref<boolean>(false);
const isSetContent = ref<boolean>(false);
const focusEditorCurrent = ref<string>('');
const templateText = ref<string>('');
const isSetContentTitle = ref<boolean>(false);
const templateTextTitle = ref<string>('');

const templateTextList = ref([
  ETemplateTextType.ENTRY_NUMBER,
  ETemplateTextType.USER_NAME,
  ETemplateTextType.JOB_TITLE,
  ETemplateTextType.EMPLOYER_NAME,
  ETemplateTextType.SELECTION_STEP,
  ETemplateTextType.SELECTION_DATE,
]);

const updateStatusPopover = (val: boolean) => {
  visibleTemplateText.value = val;
};

const handleAddText = (text: string) => {
  if (focusEditorCurrent.value === 'title') templateTextTitle.value = text;
  if (focusEditorCurrent.value === 'content') templateText.value = text;
  visibleTemplateText.value = false;
};

/**
 * handle Upload file
 */
const isUploadingFile = ref<boolean>(false);
const uploadBackground = async (e: any) => {
  if (!e.target.files?.length) return;
  isUploadingFile.value = true;
  const formData = new FormData();
  const file = e.target.files[0];

  if (file.size / 1024 / 1024 > 10) {
    textCheckSizeUpload.value = 'ファイルサイズが10MBを超えています';
    setTimeout(() => {
      textCheckSizeUpload.value = '';
    }, 10000);
  } else {
    textCheckSizeUpload.value = '';
    if (fileName.value.length < 4) {
      formData.append('file', file);
      formData.append('isAttachment', 'true');
      if (fileInput.value) {
        fileInput.value.value = '';
      }

      fileName.value.push(file.name);
      const response = await uploadFiles(formData);
      const sizeFile = file.size / 1024;
      if (response) {
        form.value.fileUrls.push({
          url: response,
          size: Math.ceil(sizeFile),
          fileName: file.name.split('.').slice(0, -1).join('.'),
        });
      }
    } else {
      textCheckSizeUpload.value = '最大4個添付できます。';
      setTimeout(() => {
        textCheckSizeUpload.value = '';
      }, 10000);
    }
  }
  isUploadingFile.value = false;
};

const handleRemoveFile = (index: number) => {
  fileName.value.splice(index, 1);
  form.value.fileUrls.splice(index, 1);
};

const rules = reactive<FormRules>({
  title: { required: true, message: '必須項目です', trigger: 'change' },
  content: { required: true, message: '必須項目です', trigger: 'change' },
});

const loadMoreMessage = () => {
  emits('loadMoreMessage');
};

const hanleCreateMessage = () => {
  // check variables is undefined ?
  const tagEntryNumber = 'template-entry-number';
  const tagSelectionStep = 'template-selection-step';
  const tagSelectionDate = 'template-selection-date';
  if (
    (form.value.title.includes(tagEntryNumber) ||
      form.value.content.includes(tagEntryNumber)) &&
    !props.dataMessages?.[0].box?.settingInterview?.applicantEntry?.applicant
      ?.entryNumber
  ) {
    openNotification('定義されていない変数があります');
    return;
  } else if (
    (form.value.title.includes(tagSelectionStep) ||
      form.value.content.includes(tagSelectionStep)) &&
    !props.dataMessages?.[0].box?.settingInterview?.selectionStep
  ) {
    openNotification('定義されていない変数があります');
    return;
  } else if (
    (form.value.title.includes(tagSelectionDate) ||
      form.value.content.includes(tagSelectionDate)) &&
    !props.dataMessages?.[0].box?.settingInterview?.interviewDate
  ) {
    return;
  }
  emits('hanleCreateMessage', form.value);
  isSetContentTitle.value = true;
  isSetContent.value = true;
  form.value.content = '';
  form.value.title = '';
  form.value.fileUrls = [];
  fileName.value = [];
};

const handleReplyMessage = (messageCurrent: IMessageDetail) => {
  if (isDisableCreateMessage.value) return;
  emits('handleReplyMessage', messageCurrent);
  const textReply = 'Re: ';
  isSetContentTitle.value = true;

  if (messageCurrent.messageType === EMessageType.SCOUT)
    messageCurrent.titleEmployer = `スカウト: ${messageCurrent.job.jobCategory.name}`;
  else if (messageCurrent.titleEmployer === EMessageType.ENTRY)
    messageCurrent.titleEmployer = `エントリー: ${messageCurrent.job.jobCategory.name}`;
  else if (
    messageCurrent.typeData !==
    ETypeApplicantTimeline.EMPLOYER_SETTING_INTERVIEW
  )
    messageCurrent.titleEmployer = `選考予定: ${
      messageCurrent.metaData.selectionStep
    } - ${dayjs(messageCurrent.metaData.interviewDate)
      .locale(ja)
      .format('YYYY年MM月DD日 (ddd)')} ${dayjs(
      messageCurrent.metaData.interviewDate,
    ).format('HH:mm')}${
      messageCurrent.metaData.interviewEndDate
        ? `~${dayjs(messageCurrent.metaData.interviewEndDate).format('HH:mm')}`
        : ''
    }`;

  if (messageCurrent.titleEmployer?.includes('<p>')) {
    const position = 3;
    form.value.title = [
      messageCurrent.titleEmployer?.slice(0, position),
      textReply,
      messageCurrent.titleEmployer?.slice(position),
    ].join('');
  } else {
    form.value.title = `${textReply}${messageCurrent.titleEmployer ?? ''}`;
  }
};

// template message
const dialogTemplateMessage = ref(false);
const updateStatusDialog = (val: boolean) => {
  dialogTemplateMessage.value = val;
};
const handleConfirm = (templateMessage: ITemplateMessage) => {
  isSetContentTitle.value = true;
  form.value.title = templateMessage.titleMessage ?? '\u00A0';
  isSetContent.value = true;
  form.value.content = templateMessage.content ?? '\u00A0';
};

const openDialogTemplateMessage = () => {
  dialogTemplateMessage.value = true;
};
</script>

<style lang="scss">
.popper-template-message {
  @apply pc:w-[498px] w-[344px] rounded-xl #{!important};
}
.el-switch-custom {
  .el-switch__core {
    @apply h-[25px] rounded-[20px];
  }
  .is-text {
    @apply leading-[25px];
  }
  .el-switch__inner {
    @apply pl-[30px] pr-[10px];
  }
  .el-switch__action {
    left: 4px;
  }
}
.el-switch-custom.el-switch.is-checked {
  .el-switch__inner {
    @apply pl-[10px] pr-[30px];
  }
  .el-switch__action {
    left: calc(100% - 20px);
  }
}
</style>
