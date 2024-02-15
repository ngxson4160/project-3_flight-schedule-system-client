<template>
  <div class="flex gap-4 message-item" :class="{ 'py-6': props.isParent }">
    <img
      v-if="props.isParent"
      :src="props.dataMessage.senderUser.avatarURL"
      class="flex-shrink-0 h-10 w-10 rounded-full border border-gray-third"
    />
    <div class="flex-grow">
      <div>
        <div :class="{ 'flex justify-between items-center': props.isParent }">
          <div class="flex items-center pc:gap-4 gap-2">
            <p class="text-sm font-bold">
              {{ props.dataMessage.senderUser.firstName }}
              {{ props.dataMessage.senderUser.lastName }}
            </p>
            <p class="text-xs">
              <span>
                {{ dayjs(props.dataMessage.createdDate).format('YYYY/MM/DD') }}
              </span>
              <span class="ml-3">
                {{ dayjs(props.dataMessage.createdDate).format('HH:mm') }}
              </span>
            </p>
          </div>
          <img
            v-if="props.isParent"
            src="~/assets/images/icon-reply-message.svg"
            class="cursor-pointer"
            @click="handleReplyMessage"
          />
        </div>
        <!-- title -->
        <div class="font-bold mt-4">
          <span v-if="typeMessage === EMessageType.SETTINGS_INTERVIEW">
            選考予定: {{ props.dataMessage.metaData.selectionStep }} -
            {{
              dayjs(props.dataMessage.metaData.interviewDate)
                .locale(ja)
                .format('YYYY年MM月DD日 (ddd)')
            }}
            {{ dayjs(props.dataMessage.metaData.interviewDate).format('HH:mm')
            }}{{
              props.dataMessage.metaData.interviewEndDate
                ? `~${dayjs(props.dataMessage.metaData.interviewEndDate).format(
                    'HH:mm',
                  )}`
                : ''
            }}
          </span>
          <div v-if="typeMessage === EMessageType.INTERVIEW">
            <div
              class="disable-css-template-text-editor break-words"
              v-html="
                props.dataMessage.titleEmployer
                  ?.replaceAll(
                    formatTemplateText(ETemplateTextType.EMPLOYER_NAME),
                    employerName,
                  )
                  ?.replaceAll(
                    formatTemplateText(ETemplateTextType.JOB_TITLE),
                    props.dataMessage.job.jobCategory.name,
                  )
                  ?.replaceAll(
                    formatTemplateText(ETemplateTextType.USER_NAME),
                    userName,
                  )
                  ?.replaceAll(
                    formatTemplateText(ETemplateTextType.SELECTION_STEP),
                    `${props.dataMessage.box.settingInterview?.selectionStep}`,
                  )
                  ?.replaceAll(
                    formatTemplateText(ETemplateTextType.SELECTION_DATE),
                    `${
                      props.dataMessage.box.settingInterview.interviewDate
                        ? `${formatDate(
                            `${props.dataMessage.box.settingInterview.interviewDate}`,
                            'YYYY/MM/DD HH:mm',
                          )}${
                            props.dataMessage.box.settingInterview
                              ?.interviewEndDate
                              ? `~${formatDate(
                                  `${props.dataMessage.box.settingInterview.interviewEndDate}`,
                                  'HH:mm',
                                )}`
                              : ''
                          }`
                        : ''
                    }`,
                  )
                  ?.replaceAll(
                    formatTemplateText(ETemplateTextType.ENTRY_NUMBER),
                    `${
                      props.dataMessage.box.settingInterview.applicantEntry
                        .applicant?.entryNumber ?? ''
                    }`,
                  )
              "
            ></div>
          </div>

          <span v-if="typeMessage === EMessageType.ENTRY">
            エントリー: {{ props.dataMessage.job.jobCategory.name }}
          </span>
          <span v-if="typeMessage === EMessageType.SCOUT">
            スカウト: {{ props.dataMessage.job.jobCategory.name }}
          </span>
        </div>
        <!-- content -->
        <div v-if="typeMessage === EMessageType.SETTINGS_INTERVIEW">
          <p class="text-sm mt-4">
            {{ props.dataMessage.senderUser.firstName }}
            {{
              props.dataMessage.senderUser.lastName
            }}さんが選考予定を作成しました。
          </p>
          <p class="font-bold mt-4">
            {{ props.dataMessage.metaData.selectionStep }}
          </p>
          <div class="flex gap-1 text-sm mt-2">
            <p class="w-20 text-gray flex-shrink-0">日時</p>
            <p>
              {{
                dayjs(props.dataMessage.metaData.interviewDate)
                  .locale(ja)
                  .format('YYYY年MM月DD日 (ddd)')
              }}
              {{
                dayjs(props.dataMessage.metaData.interviewDate).format('HH:mm')
              }}{{
                props.dataMessage.metaData.interviewEndDate
                  ? `~${dayjs(
                      props.dataMessage.metaData.interviewEndDate,
                    ).format('HH:mm')}`
                  : ''
              }}
            </p>
          </div>
          <div class="flex gap-1 text-sm mt-1">
            <p class="w-20 text-gray flex-shrink-0">選考方法</p>
            <p>{{ props.dataMessage.metaData.selectionMethod }}</p>
          </div>
          <div
            v-if="props.dataMessage.metaData.location"
            class="flex gap-1 text-sm mt-1"
          >
            <p class="w-20 text-gray flex-shrink-0">選考場所</p>
            <div
              class="break-all whitespace-pre-line text-sm"
              v-html="props.dataMessage.metaData.location"
            ></div>
          </div>
        </div>
        <div v-if="typeMessage === EMessageType.INTERVIEW">
          <div
            class="mt-4 disable-css-template-text-editor text-sm"
            v-html="
              props.dataMessage.content
                ?.replaceAll(
                  formatTemplateText(ETemplateTextType.EMPLOYER_NAME),
                  employerName,
                )
                ?.replaceAll(
                  formatTemplateText(ETemplateTextType.JOB_TITLE),
                  props.dataMessage.job.jobCategory.name,
                )
                ?.replaceAll(
                  formatTemplateText(ETemplateTextType.USER_NAME),
                  userName,
                )
                ?.replaceAll(
                  formatTemplateText(ETemplateTextType.SELECTION_STEP),
                  `${props.dataMessage.box.settingInterview?.selectionStep}`,
                )
                ?.replaceAll(
                  formatTemplateText(ETemplateTextType.SELECTION_DATE),
                  `${
                    props.dataMessage.box.settingInterview.interviewDate
                      ? `${formatDate(
                          `${props.dataMessage.box.settingInterview.interviewDate}`,
                          'YYYY/MM/DD HH:mm',
                        )}${
                          props.dataMessage.box.settingInterview
                            ?.interviewEndDate
                            ? `~${formatDate(
                                `${props.dataMessage.box.settingInterview.interviewEndDate}`,
                                'HH:mm',
                              )}`
                            : ''
                        }`
                      : ''
                  }`,
                )
                ?.replaceAll(
                  formatTemplateText(ETemplateTextType.ENTRY_NUMBER),
                  `${
                    props.dataMessage.box.settingInterview.applicantEntry
                      .applicant?.entryNumber ?? ''
                  }`,
                )
            "
          ></div>
          <div
            v-if="
              props.dataMessage.fileUrls && props.dataMessage.fileUrls.length
            "
            class="flex flex-col mt-4"
          >
            <a
              v-for="(item, index) in props.dataMessage.fileUrls"
              :key="index"
              class="font-normal pc:text-sm mobile:text-xs tracking-wider text-primary cursor-pointer mb-2 underline underline-offset-2"
              @click="downloadFileAttachment(item?.fileName, item.url)"
            >
              {{ item?.fileName ?? 'ファイルを確認する' }} ({{
                getFileExtensionFromUrl(item.url)
              }}:{{ item.size }}KB)
            </a>
          </div>
        </div>
        <div v-if="typeMessage === EMessageType.ENTRY">
          <div
            class="mt-4 border border-gray-third pc:px-6 px-4 py-4 rounded-lg text-sm"
          >
            <div v-if="props.role === 'employer'">
              <p>
                {{ props.dataMessage.senderUser.firstName }}
                {{ props.dataMessage.senderUser.lastName }}さん
                から以下求人のエントリーが届きました。
              </p>
              <p>エントリー内容を確認して、返信しましょう。</p>
            </div>
            <div v-else>
              <p>
                {{
                  props.dataMessage.recipientUser.governmentOffice?.name
                }}の以下求人にエントリーしました。担当者からの連絡をお待ちください。
              </p>
              <p>官公庁・自治体に承認されるまでメッセージは送信できません。</p>
            </div>
            <div
              class="mt-4 flex gap-2 items-center cursor-pointer"
              @click="handleGoToJobDetail"
            >
              <p class="text-primary underline underline-offset-2">
                {{ props.dataMessage.job.title }}
              </p>

              <img
                src="~/assets/images/icon-redirect-to-new-page.svg"
                alt=""
                class="flex-shrink-0"
              />
            </div>
            <el-button
              class="!px-6 !h-[37px] mt-4"
              @click="emits('handleViewEntryForm')"
            >
              <p class="text-sm text-primary">エントリー情報を確認</p>
            </el-button>
          </div>
        </div>
        <div v-if="typeMessage === EMessageType.SCOUT">
          <div
            class="mt-4 border border-gray-third pc:px-6 px-4 py-4 rounded-lg text-sm"
          >
            <div v-if="props.role === 'employer'">
              <p>
                {{
                  props.userCompanyName
                }}を以下の求人でスカウトしました。ユーザーからの連絡をお待ちください。
              </p>
              <p>ユーザーに承認されるまでメッセージは送信できません</p>
            </div>
            <div v-else>
              <p>
                {{
                  props.dataMessage.senderUser.governmentOffice?.name
                }}から以下求人のスカウトが届きました。
              </p>
              <p>求人を確認して、エントリーしましょう。</p>
            </div>
            <div
              class="mt-4 flex gap-2 items-center cursor-pointer"
              @click="handleGoToJobDetail"
            >
              <p class="text-primary underline underline-offset-2">
                {{ props.dataMessage.job.title }}
              </p>

              <img
                src="~/assets/images/icon-redirect-to-new-page.svg"
                alt=""
                class="flex-shrink-0"
              />
            </div>
          </div>
          <div class="mt-4 text-sm whitespace-pre-line break-words">
            {{ props.dataMessage.content }}
          </div>
        </div>
        <div v-if="dataMessage.parentId">
          <div
            v-if="props.isParent"
            class="py-1 px-2 bg-gray-secondary inline-block rounded cursor-pointer mt-4"
            @click="handleShowAllMessageChild"
          >
            <img
              src="~/assets/images/abbreviation-dots-40.svg"
              class="h-[3px] object-cover"
            />
          </div>
          <div
            v-if="isShowMessageChild"
            class="pl-4 border-l border-gray-third mt-8"
          >
            <MessageItem v-if="messageChild" :data-message="messageChild" />
          </div>
          <div
            v-if="props.dataMessage.parent"
            class="pl-4 border-l border-gray-third mt-8"
          >
            <MessageItem
              v-if="props.dataMessage.parent"
              :data-message="props.dataMessage.parent"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import {
  ISenderMessageInformation,
  IMessageDetail,
  IResponse,
} from '~/utils/interface';
import { EMessageType, ETypeApplicantTimeline } from '~/utils/enum';

const props = defineProps({
  dataMessage: {
    type: Object as () => IMessageDetail,
    default: () => {},
  },
  isParent: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: 'employer',
  },
  userCompanyName: {
    type: String,
    default: '',
  },
});
const emits = defineEmits([
  'showReply',
  'handleViewEntryForm',
  'handleReplyMessage',
]);

const userName = ref<string>('');
const employerName = ref<string>('');
if (props.dataMessage.senderUser.governmentOffice) {
  employerName.value = `${props.dataMessage.senderUser.firstName} ${props.dataMessage.senderUser.lastName}`;
  userName.value = `${props.dataMessage.recipientUser.firstName} ${props.dataMessage.recipientUser.lastName}`;
} else {
  employerName.value = `${props.dataMessage.recipientUser.firstName} ${props.dataMessage.recipientUser.lastName}`;
  userName.value = `${props.dataMessage.senderUser.firstName} ${props.dataMessage.senderUser.lastName}`;
}

// setup type message
const typeMessage = ref<EMessageType>();
if (props.dataMessage.messageType === EMessageType.SCOUT)
  typeMessage.value = EMessageType.SCOUT;
else if (props.dataMessage.titleEmployer === EMessageType.ENTRY)
  typeMessage.value = EMessageType.ENTRY;
else if (
  props.dataMessage.typeData !==
  ETypeApplicantTimeline.EMPLOYER_SETTING_INTERVIEW
)
  typeMessage.value = EMessageType.SETTINGS_INTERVIEW;
else typeMessage.value = EMessageType.INTERVIEW;

// setup message reply
const isShowMessageChild = ref<boolean>(true);
if (props.isParent) isShowMessageChild.value = false;

const messageChild = ref<IMessageDetail>();
const isFirstShow = ref<boolean>(true);
const getMessageReply = async () => {
  const { data, error } = await useBaseFetch(
    `/messages/parent/${props.dataMessage.parentId}/box`,
    {
      query: {
        boxId: props.dataMessage.boxId,
      },
    },
  );
  if (error.value?.data) throw error.value.data;
  else {
    const response = data.value as IResponse;
    messageChild.value = response.data;
  }
};
const handleShowAllMessageChild = async () => {
  if (isShowMessageChild.value) {
    if (props.isParent) isShowMessageChild.value = false;
  } else isShowMessageChild.value = true;
  if (isFirstShow.value) {
    await getMessageReply();
    isFirstShow.value = false;
  }
};

const handleReplyMessage = () => {
  emits('handleReplyMessage', props.dataMessage);
};
const handleGoToJobDetail = () => {
  window.open(`/${props.role}/job/${props.dataMessage.job.id}`, '_blank');
};
</script>

<style lang="scss">
.message-item p {
  white-space: break-spaces;
  line-break: anywhere;
}
</style>
