<template>
  <client-only>
    <el-dialog
      v-model="centerDialogVisible"
      align-center
      class="dialog-template-message pc:!w-[760px] !w-[342px]"
    >
      <div>
        <p class="text-[22px] font-bold">テンプレートを挿入</p>
        <p
          class="text-[14px] text-primary cursor-pointer mt-10 inline-block"
          @click="
            $router.push({
              path: '/employer/message/template',
            })
          "
        >
          テンプレートを作成する
        </p>
        <el-form :model="formTemplateMessage" label-position="top" class="mt-6">
          <el-form-item label="テンプレート">
            <el-select
              v-model="formTemplateMessage.titleTemplate"
              placeholder="選択してください"
              clearable
              class="!w-full"
              @change="handleSelectTemplateMessage"
            >
              <el-option
                v-for="(item, index) in templateMessagesList"
                :key="index"
                :label="item.titleTemplate"
                :value="item.id"
                class="flex items-center gap-4 !h-auto pc:max-w-[648px] max-w-[310px] border-t border-gray-third !py-3 !px-4 !leading-[170%] !text-sm"
                :class="{
                  'mt-[6px]': index === 0,
                  'border-b mb-[6px]':
                    index === templateMessagesList.length - 1,
                }"
              >
                <p
                  class="flex-grow whitespace-pre-line break-words"
                  style="line-break: anywhere"
                >
                  {{ item.titleTemplate }}
                </p>
                <p
                  class="flex-shrink-0 text-danger underline underline-offset-2"
                  @click.stop="handleDeleteTemplateMessage(item.id, index)"
                >
                  削除する
                </p>
              </el-option>
            </el-select>
          </el-form-item>
          <p class="font-bold">テンプレートプレビュー</p>
          <el-form-item class="mt-4">
            <el-checkbox v-model="isEditing" label="テンプレートを編集する" />
          </el-form-item>
          <el-form-item
            class="mt-4 !mb-0 border border-gray-third rounded"
            :class="{
              'disable-edit-template-message':
                formTemplateMessage.titleTemplate && !isEditing,
            }"
          >
            <div class="template-title-message-editor w-full">
              <MessageEditor
                v-model="formTemplateMessage.titleMessage"
                v-model:template-text="templateTextTitle"
                v-model:is-set-content="isSetContentTitle"
                v-model:editable="editableMessage"
                :is-disable-enter="true"
                placeholder="件名"
                @reset-template-text="templateTextTitle = ''"
                @reset-is-set-content="isSetContentTitle = false"
                @on-focus="focusEditorCurrent = 'title'"
              />
            </div>
          </el-form-item>
          <el-form-item
            class="mt-2 border border-gray-third rounded"
            :class="{
              'disable-edit-template-message':
                formTemplateMessage.titleTemplate && !isEditing,
            }"
          >
            <div class="w-full">
              <MessageEditor
                v-model="formTemplateMessage.content"
                v-model:template-text="templateTextContent"
                v-model:is-set-content="isSetContent"
                v-model:editable="editableMessage"
                :is-custom-placeholder="true"
                placeholder="テンプレートを選択するとプレビューが表示されます"
                @reset-template-text="templateTextContent = ''"
                @reset-is-set-content="isSetContent = false"
                @on-focus="focusEditorCurrent = 'content'"
              />
              <div
                v-if="formTemplateMessage.titleTemplate && isEditing"
                class="flex justify-end w-full p-4"
              >
                <PopoverTemplateMessage
                  v-model:status="visibleTemplateText"
                  :template-text-list="templateTextList"
                  @update-status="updateStatusPopover"
                  @handle-click="handleAddText"
                />
              </div>
            </div>
          </el-form-item>
          <div
            v-if="isShowWarningNotTemplate"
            class="p-4 font-bold text-sm text-center leading-[175%] bg-warning rounded-lg"
          >
            <p>
              定義されていない変数があります
              <span class="pc:hidden">。</span>
            </p>
            <p class="pc:hidden">テンプレートを編集してください。</p>
          </div>
          <div
            class="flex flex-col items-center mt-10 button-confirm-template-message"
          >
            <el-button
              type="primary"
              class="pc:w-[256px] w-[310px]"
              :class="{
                '!bg-gray !border-gray pointer-events-none':
                  !formTemplateMessage.titleTemplate,
              }"
              @click="handleConfirm"
            >
              {{
                isEditing && formTemplateMessage.titleTemplate
                  ? '保存する'
                  : '挿入する'
              }}
            </el-button>
            <p
              class="my-6 text-primary underline underline-offset-2 text-base font-bold cursor-pointer"
              @click="handleCancel"
            >
              {{
                isEditing && formTemplateMessage.titleTemplate
                  ? '編集を破棄する'
                  : 'キャンセル'
              }}
            </p>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </client-only>
</template>

<script setup lang="ts">
import {
  IResponse,
  ITemplateMessage,
  IMessageDetail,
  ICalendarList,
} from 'utils/interface';
import { ETemplateTextType } from '~~/utils/enum';

const props = defineProps({
  status: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  textButtonCofirm: {
    type: String,
    default: '削除する',
  },
  lastMessage: {
    type: Object as () => IMessageDetail,
    default: () => {},
  },
  listApplicant: {
    type: Array as () => ICalendarList[],
    default: () => [],
  },
});
const initFormTemplateMessage = () => ({
  content: '\u00A0',
  createdTime: null,
  creatorId: 0,
  id: 0,
  isDelete: false,
  titleMessage: '',
  titleTemplate: '',
  updatedTime: null,
});
const formTemplateMessage = ref<ITemplateMessage>(initFormTemplateMessage());
const isSetContentTitle = ref<boolean>(false);
const templateTextTitle = ref('');

const isSetContent = ref<boolean>(false);
const templateTextContent = ref('');

const templateMessagesList = ref<ITemplateMessage[]>([]);
const getTemplateMessageList = async () => {
  const { data, error } = await useBaseFetch('/template-messages', {});
  if (error.value?.data) throw error.value?.data;
  else {
    const response = data.value as IResponse;
    templateMessagesList.value = response.data;
  }
};
await getTemplateMessageList();
const isEditing = ref<boolean>(false);
const currentTemplateMessage = ref<ITemplateMessage>();

const emit = defineEmits(['updateStatus', 'handleConfirm']);
const centerDialogVisible = computed({
  get: () => props.status,
  set: (val: boolean) => {
    emit('updateStatus', val);
  },
});

const listApplicantInfomation = ref<ICalendarList[]>(props.listApplicant);
// check variables is undefined ?
const isShowWarningNotTemplate = ref<boolean>(false);

const handleConfirm = async () => {
  if (currentTemplateMessage.value) {
    if (isEditing.value) {
      const { error } = await useBaseFetch(
        `/template-messages/${currentTemplateMessage.value.id}`,
        {
          method: 'PUT',
          body: {
            titleTemplate: currentTemplateMessage.value.titleTemplate,
            titleMessage: formTemplateMessage.value.titleMessage,
            content: formTemplateMessage.value.content,
          },
        },
      );
      if (error.value?.data) throw error.value?.data;
      else {
        const currentIndex = templateMessagesList.value.indexOf(
          currentTemplateMessage.value,
        );
        templateMessagesList.value[currentIndex].titleMessage =
          formTemplateMessage.value.titleMessage;
        templateMessagesList.value[currentIndex].content =
          formTemplateMessage.value.content;
        isEditing.value = false;
      }
    } else {
      if (listApplicantInfomation.value.length)
        emit(
          'handleConfirm',
          currentTemplateMessage.value,
          isShowWarningNotTemplate.value,
        );
      else emit('handleConfirm', currentTemplateMessage.value);
      centerDialogVisible.value = false;
    }
  }
};
const handleCancel = () => {
  if (isEditing.value) {
    if (currentTemplateMessage.value) {
      formTemplateMessage.value.titleMessage =
        currentTemplateMessage.value.titleMessage;
      isSetContent.value = true;
      formTemplateMessage.value.content = currentTemplateMessage.value.content;
    }
    isEditing.value = false;
  } else centerDialogVisible.value = false;
};

const templateTextList = ref([
  ETemplateTextType.ENTRY_NUMBER,
  ETemplateTextType.USER_NAME,
  ETemplateTextType.JOB_TITLE,
  ETemplateTextType.EMPLOYER_NAME,
  ETemplateTextType.SELECTION_STEP,
  ETemplateTextType.SELECTION_DATE,
]);

const focusEditorCurrent = ref('');
const visibleTemplateText = ref<boolean>(false);
const handleAddText = (text: string) => {
  if (focusEditorCurrent.value === 'title') templateTextTitle.value = text;
  if (focusEditorCurrent.value === 'content') templateTextContent.value = text;
  visibleTemplateText.value = false;
};
const updateStatusPopover = (val: boolean) => {
  visibleTemplateText.value = val;
};

const handleSelectTemplateMessage = (currentTemplateMessageId: number) => {
  if (currentTemplateMessageId) {
    currentTemplateMessage.value = templateMessagesList.value.find(
      (element) => {
        return element.id === currentTemplateMessageId;
      },
    );
    if (currentTemplateMessage.value) {
      isSetContentTitle.value = true;
      formTemplateMessage.value.titleMessage =
        currentTemplateMessage.value.titleMessage ?? '\u00A0';
      isSetContent.value = true;
      formTemplateMessage.value.content =
        currentTemplateMessage.value.content ?? '\u00A0';
    }
  } else {
    currentTemplateMessage.value = undefined;
    isSetContentTitle.value = true;
    formTemplateMessage.value.titleMessage = '\u00A0';
    isSetContent.value = true;
    formTemplateMessage.value.content = '\u00A0';
  }
};
const editableMessage = computed(() => {
  if (!formTemplateMessage.value.titleTemplate) return true;
  else if (isEditing.value) return true;
  else return false;
});

// check variables is undefined ?
const tagEntryNumber = 'template-entry-number';
const tagSelectionStep = 'template-selection-step';
const tagSelectionDate = 'template-selection-date';

watchEffect(() => {
  if (!props.lastMessage) return;
  if (
    formTemplateMessage.value.titleMessage.includes(tagEntryNumber) &&
    !props.lastMessage.box.settingInterview.applicantEntry.applicant.entryNumber
  ) {
    isShowWarningNotTemplate.value = true;
    return;
  }
  if (
    formTemplateMessage.value.titleMessage.includes(tagSelectionStep) &&
    !props.lastMessage.box.settingInterview.selectionStep
  ) {
    isShowWarningNotTemplate.value = true;
    return;
  }
  if (
    formTemplateMessage.value.titleMessage.includes(tagSelectionDate) &&
    !props.lastMessage.box.settingInterview.interviewDate
  ) {
    isShowWarningNotTemplate.value = true;
    return;
  }

  if (
    formTemplateMessage.value.content.includes(tagEntryNumber) &&
    !props.lastMessage.box.settingInterview.applicantEntry.applicant.entryNumber
  ) {
    isShowWarningNotTemplate.value = true;
    return;
  }
  if (
    formTemplateMessage.value.content.includes(tagSelectionStep) &&
    !props.lastMessage.box.settingInterview.selectionStep
  ) {
    isShowWarningNotTemplate.value = true;
    return;
  }
  if (
    formTemplateMessage.value.content.includes(tagSelectionDate) &&
    !props.lastMessage.box.settingInterview.interviewDate
  ) {
    isShowWarningNotTemplate.value = true;
    return;
  }
  isShowWarningNotTemplate.value = false;
});

watchEffect(() => {
  if (!listApplicantInfomation.value.length) return;
  listApplicantInfomation.value.forEach((element) => {
    if (
      formTemplateMessage.value.titleMessage.includes(tagEntryNumber) &&
      !element.applicantEntry?.applicant?.entryNumber
    ) {
      isShowWarningNotTemplate.value = true;
      return;
    }
    if (
      formTemplateMessage.value.titleMessage.includes(tagSelectionStep) &&
      !element?.selectionStep
    ) {
      isShowWarningNotTemplate.value = true;
      return;
    }
    if (
      formTemplateMessage.value.titleMessage.includes(tagSelectionDate) &&
      !element.interviewDate
    ) {
      isShowWarningNotTemplate.value = true;
      return;
    }

    if (
      formTemplateMessage.value.content.includes(tagEntryNumber) &&
      !element.applicantEntry?.applicant?.entryNumber
    ) {
      isShowWarningNotTemplate.value = true;
      return;
    }
    if (
      formTemplateMessage.value.content.includes(tagSelectionStep) &&
      !element?.selectionStep
    ) {
      isShowWarningNotTemplate.value = true;
      return;
    }
    if (
      formTemplateMessage.value.content.includes(tagSelectionDate) &&
      !element.interviewDate
    ) {
      isShowWarningNotTemplate.value = true;
      return;
    }
    isShowWarningNotTemplate.value = false;
  });
});
const handleDeleteTemplateMessage = async (id: number, index: number) => {
  const { error } = await useBaseFetch(`/template-messages/${id}`, {
    method: 'DELETE',
  });
  if (error.value?.data) throw error.value?.data;
  else {
    if (Number(formTemplateMessage.value.titleTemplate) === id) {
      isSetContentTitle.value = true;
      isSetContent.value = true;
      formTemplateMessage.value = initFormTemplateMessage();
    }
    templateMessagesList.value.splice(index, 1);
    openNotification('テンプレートを削除しました');
  }
};
</script>

<style lang="scss">
.dialog-template-message {
  .el-dialog__header {
    display: none !important;
  }
  .el-dialog__body {
    @apply pc:px-14 pc:py-10 mobile:p-4;
  }
  .ProseMirror {
    @apply h-[160px];
  }
  .el-input__wrapper {
    @apply px-4 #{!important};
  }
}
.dialog-template-message.el-dialog {
  @apply rounded-xl;
}
.disable-edit-template-message {
  @apply bg-gray-700;
  .el-input__wrapper {
    @apply bg-gray-700;
  }
  .ProseMirror {
    @apply bg-gray-700;
  }
}
.button-confirm-template-message {
  .el-button--primary {
    --el-button-hover-bg-color: var(--color-primary) !important;
  }
}
</style>
