<template>
  <el-dialog
    v-model="openDialog"
    class="dialog__change-selection-all pc:!px-14 px-4 pc:!py-10 py-6 !rounded-xl !shadow-base"
    :class="{
      'pc:!w-[760px] !w-[342px]': form.isMessage,
      'pc:!w-[496px] !w-[342px]': !form.isMessage,
    }"
    :show-close="false"
    @close="handleClose"
  >
    <div>
      <h1 class="text-[22px] font-bold">
        {{ isSendMessage ? 'メッセージを送信' : '選考ステップを一括変更' }}
      </h1>

      <p class="text-base leading-[175%] mt-4 mb-6">
        選択した
        <span class="font-bold text-lg">
          {{ props.isMessage ? form.boxIds?.length : form.ids?.length }}
        </span>
        {{
          isSendMessage
            ? '名の応募者についてメッセージを送信します。'
            : '名の応募者について選考ステップを変更します。'
        }}
      </p>

      <el-popover
        popper-class="popper__list-user"
        placement="left"
        :visible="visiblePopper"
        :show-arrow="false"
        :popper-style="{ 'margin-right': '60px', 'margin-top': '150px' }"
      >
        <div class="py-4">
          <div
            class="flex justify-between items-center border-b border-solid border-color-border px-4 pb-4 mb-3"
          >
            <p class="font-bold">選択した応募者</p>
            <img
              class="w-6 h-6 cursor-pointer"
              src="~/assets/images/icon-close-modal.svg"
              @click="visiblePopper = false"
            />
          </div>

          <div class="list-user px-4 custom-scroll-bar">
            <el-checkbox-group v-if="!isMessage" v-model="form.ids">
              <div class="flex flex-col">
                <el-checkbox
                  v-for="user in OPTION_APPLICANT_SELECTED"
                  :key="user.value"
                  class="mb-1"
                  :label="user.value"
                >
                  <p class="text-base leading-[170%]">
                    {{ user.name }}
                  </p>
                </el-checkbox>
              </div>
            </el-checkbox-group>

            <el-checkbox-group v-else v-model="form.boxIds">
              <div class="flex flex-col">
                <el-checkbox
                  v-for="box in OPTION_APPLICANT_SELECTED_IDS_MESSAGE"
                  :key="box.value"
                  class="mb-1"
                  :label="box.value"
                >
                  <p class="text-base leading-[170%]">
                    {{ box.name }}
                  </p>
                </el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
        </div>

        <template #reference>
          <p
            v-if="isSendMessage"
            class="text-primary cursor-pointer"
            @click="visiblePopper = !visiblePopper"
          >
            選択した応募者を確認
          </p>
        </template>
      </el-popover>
    </div>

    <el-form
      ref="formRef"
      label-position="top"
      class="employer-from my-10"
      :model="form"
      :rules="rules"
    >
      <el-form-item
        v-if="!isSendMessage"
        label="変更後の選考ステップ"
        prop="title"
      >
        <el-select
          v-model="form.title"
          :class="`${form.isMessage ? 'w-[232px]' : 'w-full'} mb-6`"
        >
          <el-option
            v-for="item in OPTION_TITLE_CREATE_SCHEDULE"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>

        <el-checkbox v-if="!isSendMessage" v-model="form.isMessage">
          応募者に選考ステップ変更のメッセージを 送信する
        </el-checkbox>
      </el-form-item>

      <el-form-item
        v-if="form.isMessage"
        label="メッセージ"
        prop="titleMessage"
      >
        <div
          class="border border-gray-third rounded template-title-message-editor w-full"
        >
          <MessageEditor
            v-model="form.titleMessage"
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

      <el-form-item v-if="form.isMessage" prop="content">
        <div class="border border-gray-third rounded w-full">
          <MessageEditor
            v-model="form.content"
            v-model:template-text="templateText"
            v-model:is-set-content="isSetContent"
            placeholder="本文を入力してください"
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
                class="text-xs text-gray pc:max-w-[280px] mobile:max-w-[200px] truncate !leading-[14px]"
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

          <div class="flex items-center text-primary text-[14px] p-4">
            <div class="mr-4 cursor-pointer" @click.stop="fileInput?.click()">
              ファイル添付
            </div>

            <input
              ref="fileInput"
              class="hidden"
              type="file"
              @change="uploadBackground"
            />

            <div class="border-x-2 border-gray-third pc:px-4 px-3 h-4">
              <PopoverTemplateMessage
                v-model:status="visibleTemplateText"
                :template-text-list="templateTextList"
                @update-status="updateStatusPopover"
                @handle-click="handleAddText"
              />
            </div>
            <p
              class="pc:ml-4 ml-3 cursor-pointer mobile:text-xs"
              @click="dialogTemplateMessage = true"
            >
              テンプレート挿入
            </p>
          </div>
        </div>
      </el-form-item>
    </el-form>

    <div class="w-full flex flex-col items-center gap-2">
      <el-button
        v-if="!isSendMessage"
        :class="`${form.isMessage ? 'w-full' : 'w-[256px]'}`"
        type="primary"
        @click="handleChangeSelection(formRef)"
      >
        {{ form.isMessage ? '一括変更してメッセージを送信' : '変更する' }}
      </el-button>

      <el-button
        v-else
        class="w-[256px]"
        type="primary"
        @click="handleChangeSelection(formRef)"
      >
        メッセージを送信
      </el-button>

      <p
        class="text-primary font-bold text-base underline mt-6 cursor-pointer"
        @click="openDialog = false"
      >
        キャンセル
      </p>
    </div>
  </el-dialog>
  <DialogTemplateMessage
    v-if="dialogTemplateMessage"
    v-model:status="dialogTemplateMessage"
    :list-applicant="props.listApplicant"
    @update-status="updateStatusDialog"
    @handle-confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
import { Close } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';
import { uploadFileStore } from '@/stores/upload';
import { IChangeAllSchedule } from '~/stores/useApplicantListStore';
import { ICalendarList } from '~/utils/interface';

interface Emits {
  (event: 'update:visible', visible: boolean): void;
  (event: 'change-selection', form: IChangeAllSchedule): void;
}

const props = defineProps({
  visible: {
    type: Boolean,
    default: () => false,
  },
  isSendMessage: {
    type: Boolean,
    default: false,
  },
  totalApplicant: {
    type: Number,
    default: 0,
  },
  isMessage: {
    type: Boolean,
    default: false,
  },
  listApplicant: {
    type: Array as () => ICalendarList[],
    default: () => [],
  },
});

const emit = defineEmits<Emits>();

const openDialog = computed({
  get: () => props.visible,
  set: (visible: boolean) => {
    if (!visible) visiblePopper.value = false;
    emit('update:visible', visible);
  },
});

const OPTION_APPLICANT_SELECTED = computed(() => {
  return props.listApplicant.map((i: ICalendarList) => {
    return {
      value: i.id,
      name: `${i.applicantEntry?.applicant?.firstName} ${i.applicantEntry?.applicant?.lastName}`,
    };
  });
});

const OPTION_APPLICANT_SELECTED_IDS_MESSAGE = computed(() => {
  return props.listApplicant.map((i: ICalendarList) => {
    return {
      value: i.boxId,
      name: `${i.applicantEntry?.applicant?.firstName} ${i.applicantEntry?.applicant?.lastName}`,
    };
  });
});

const form = ref<IChangeAllSchedule>({
  title: OPTION_TITLE_CREATE_SCHEDULE[0],
  ids: [],
  boxIds: [],
  isMessage: props.isSendMessage,
  bulkMessageParams: [
    {
      jobId: 0,
      recipientId: 0,
      boxId: 0,
      messageId: 0,
      messageType: '',
    },
  ],
  titleMessage: '',
  content: '',
  fileUrls: [
    {
      url: '',
      size: 0,
      fileName: '',
    },
  ],
});

const { uploadFiles } = uploadFileStore();

const formRef = ref();
const fileName = ref<string[]>([]);
const fileInput = ref<HTMLInputElement>();
const urlFile = ref<{ url: string; size: number; fileName: string }[]>([]);
const textCheckSizeUpload = ref<string>('');
const visiblePopper = ref<boolean>(false);
const visibleTemplateText = ref<boolean>(false);
const isSetContent = ref<boolean>(false);
const focusEditorCurrent = ref<string>('');
const templateText = ref<string>('');
const templateTextTitle = ref<string>('');
const isSetContentTitle = ref<boolean>(false);
const isShowWarningNotTemplate = ref<boolean>(false);

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

const handleChangeSelection = (formEl: FormInstance | undefined) => {
  if (form.value.titleMessage === '<p></p>') {
    isSetContentTitle.value = true;
    form.value.titleMessage = '';
  }
  if (form.value.content === '<p></p>') {
    isSetContent.value = true;
    form.value.content = '';
  }

  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      form.value.fileUrls = urlFile.value;
      // check variables is undefined ?
      if (isShowWarningNotTemplate.value) {
        openNotification('定義されていない変数があります');
        return;
      }
      const tagEntryNumber = 'template-entry-number';
      const tagSelectionStep = 'template-selection-step';
      const tagSelectionDate = 'template-selection-date';
      const countNotification = ref<number>(0);
      props.listApplicant.forEach((element) => {
        if (
          form.value.titleMessage.includes(tagEntryNumber) &&
          !element.applicantEntry?.applicant?.entryNumber
        ) {
          openNotification('定義されていない変数があります');
          countNotification.value++;
          return;
        }
        if (
          form.value.titleMessage.includes(tagSelectionStep) &&
          !element?.selectionStep
        ) {
          countNotification.value++;
          openNotification('定義されていない変数があります');
          return;
        }
        if (
          form.value.titleMessage.includes(tagSelectionDate) &&
          !element.interviewDate
        ) {
          countNotification.value++;
          openNotification('定義されていない変数があります');
          return;
        }

        if (
          form.value.content.includes(tagEntryNumber) &&
          !element.applicantEntry?.applicant?.entryNumber
        ) {
          countNotification.value++;
          openNotification('定義されていない変数があります');
          return;
        }
        if (
          form.value.content.includes(tagSelectionStep) &&
          !element?.selectionStep
        ) {
          countNotification.value++;
          openNotification('定義されていない変数があります');
          return;
        }
        if (
          form.value.content.includes(tagSelectionDate) &&
          !element.interviewDate
        ) {
          countNotification.value++;
          openNotification('定義されていない変数があります');
          return false;
        }
      });
      if (!countNotification.value) {
        if (props.isMessage && !form.value.boxIds?.length) {
          openNotification('送信する求職者を選択してください');
          return;
        }
        if (!props.isMessage && !form.value.ids?.length) {
          openNotification('送信する求職者を選択してください');
          return;
        }
        emit('change-selection', form.value);
      }
    } else {
      return false;
    }
  });
};

const handleClose = () => {
  visiblePopper.value = false;
  form.value = {
    title: OPTION_TITLE_CREATE_SCHEDULE[0],
    ids: [],
    isMessage: props.isSendMessage,
    bulkMessageParams: [
      {
        jobId: 0,
        recipientId: 0,
        boxId: 0,
        messageId: 0,
        messageType: '',
      },
    ],
    titleMessage: '',
    content: '',
    fileUrls: [
      {
        url: '',
        size: 0,
        fileName: '',
      },
    ],
  };
};

/**
 * handle Upload file
 */

const uploadBackground = async (e: any) => {
  if (!e.target.files?.length) return;
  onLoading();
  try {
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
          urlFile.value.push({
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
  } catch (error) {}
  closeLoading();
};

const handleRemoveFile = (index: number) => {
  fileName.value.splice(index, 1);
  urlFile.value.splice(index, 1);
};

const rules = reactive<FormRules>({
  title: { required: true, message: '必須項目です', trigger: 'change' },
  content: { required: true, message: '必須項目です', trigger: 'change' },
  titleMessage: { required: true, message: '必須項目です', trigger: 'change' },
});

watch(
  () => props.isSendMessage,
  (isMessageNew) => {
    form.value.isMessage = isMessageNew;
  },
);

watchEffect(() => {
  if (props.listApplicant.length) {
    form.value.ids = props.listApplicant.map((i: { id: number }) => i.id);
    form.value.boxIds = props.listApplicant.map((i) => i.boxId);
  }
});

// template message
const dialogTemplateMessage = ref(false);
const updateStatusDialog = (val: boolean) => {
  dialogTemplateMessage.value = val;
};
const handleConfirm = (
  templateMessage: ITemplateMessage,
  isShowWarning?: boolean,
) => {
  isSetContentTitle.value = true;
  form.value.titleMessage = templateMessage.titleMessage ?? '\u00A0';
  isSetContent.value = true;
  form.value.content = templateMessage.content ?? '\u00A0';
  isShowWarningNotTemplate.value = isShowWarning ?? false;
};
</script>

<style lang="scss">
.el-dialog.dialog__change-selection-all {
  .el-dialog__header {
    @apply hidden;
  }
  .el-dialog__body {
    @apply p-0;
  }

  .el-checkbox {
    @apply h-6 py-2 text-black flex items-start;
    .el-checkbox__input {
      @apply block pt-1;
    }
    .el-checkbox__label {
      @apply pl-4 text-base block whitespace-normal h-auto;
    }
  }
}

.list-user {
  @apply h-[540px] overflow-hidden overflow-y-auto;
}

.popper-template-message {
  @apply pc:w-[498px] w-[344px] rounded-xl #{!important};
}

.popper__list-user {
  @apply w-[232px] h-[612px] rounded-xl p-0 #{!important};
}
</style>
