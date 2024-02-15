<template>
  <div>
    <div
      v-if="membersInformationMessageData.length"
      class="border-b border-gray-third pb-8 mb-8"
    >
      <span class="text-sm text-gray">担当メンバー</span>
      <div class="font-bold flex gap-x-6 flex-wrap mt-[2px]">
        <div class="flex gap-2">
          <p>{{ membersInformationMessageData.length }}名</p>
          <img
            v-if="
              applicantInformationData.settingInterview.title ||
              applicantInformationData.settingInterview.interviewDate ||
              applicantInformationData.settingInterview.selectionMethod
            "
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

    <div class="border-b border-gray-third pb-8">
      <div class="p-4 border rounded border-gray-third">
        <div class="flex gap-3 flex-wrap">
          <div
            v-for="(tag, index) in listTag"
            :key="tag.value"
            class="flex flex-col justify-center w-max bg-secondary h-8 relative"
          >
            <div
              class="absolute top-[-4px] right-[-8px] rounded-full border border-solid border-primary bg-white cursor-pointer"
              @click="removeTag(index)"
            >
              <img class="w-3 h-3" src="~/assets/images/icon-close-modal.svg" />
            </div>

            <p class="text-primary text-sm">@{{ tag.label }}</p>
          </div>
        </div>

        <el-input
          v-model="contentTimeline"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 100000000 }"
          :resize="none"
          placeholder="コメントを入力してください"
          class="my-input-custom"
        />

        <span class="flex justify-between">
          <el-popover
            placement="top"
            :visible="visiblePopper"
            :show-arrow="false"
          >
            <div class="flex flex-col gap-1 px-1">
              <p
                v-for="member in applicantListStore.members"
                :key="member.value"
                class="leading-[150%] cursor-pointer"
                :class="{
                  'text-gray pointer-events-none': checkDuplicateTag(
                    member.value,
                  ),
                  'hover:text-primary': !checkDuplicateTag(member.value),
                }"
                @click="handleTagMember(member)"
              >
                {{ member.label }}
              </p>
            </div>

            <template #reference>
              <p class="text-gray cursor-pointer" @click="handleGetListMember">
                @
              </p>
            </template>
          </el-popover>

          <div
            class="grid justify-items-end py-1 px-2 rounded"
            :class="{ 'bg-primary': contentTimeline }"
          >
            <img
              v-if="contentTimeline"
              alt=""
              src="~/assets/images/icon-employer-send-message-solid-white.svg"
              class="cursor-pointer"
              @click="handleCreateTimeline"
            />
            <img
              v-else
              src="~/assets/images/icon-employer-send-message-gray.svg"
              alt=""
            />
          </div>
        </span>
      </div>
    </div>

    <div
      v-for="(timeline, index) in applicantTimelineData"
      :key="index"
      class="border-b border-gray-third py-6 flex gap-4 mt-2"
      :class="{
        hidden:
          timeline.typeData ===
            ETypeApplicantTimeline.EMPLOYER_CHANGE_SELECTION_STEP ||
          timeline.typeData === ETypeApplicantTimeline.EMPLOYER_SEND_MESSAGE,
      }"
    >
      <img
        :src="timeline.creator.avatarURL"
        alt=""
        class="w-10 h-10 rounded-full border border-gray-third object-cover flex-shrink-0"
      />

      <div class="flex-grow text-sm">
        <div class="flex gap-2 items-center mb-2">
          <p
            v-if="
              timeline.typeData ===
                ETypeApplicantTimeline.EMPLOYER_CREATE_TIMELINE ||
              timeline.typeData ===
                ETypeApplicantTimeline.EMPLOYER_NOTICE_REGARDING_SELECTION
            "
            class="font-bold"
          >
            {{ employerName }}
          </p>

          <p class="text-xs">
            <span>{{ formatDate(timeline.createdTime, 'YYYY/MM/DD') }}</span>
            <span class="ml-3">
              {{ formatDate(timeline.createdTime, 'HH:mm') }}
            </span>
          </p>
        </div>

        <div
          v-if="
            timeline.typeData ===
            ETypeApplicantTimeline.EMPLOYER_SETTING_INTERVIEW
          "
        >
          <p class="mt-2">
            {{ timeline.creator.firstName }}
            {{ timeline.creator.lastName }}さんが選考予定を作成しました。
          </p>
          <p class="text-base font-bold mt-4">
            {{ timeline.metaData.selectionStep }}
          </p>
          <div class="mt-2 flex gap-1">
            <p class="text-gray w-20 flex-shrink-0">日時</p>
            <p>
              {{
                dayjs(timeline.metaData.interviewDate)
                  .locale(ja)
                  .format('YYYY年MM月DD日 (ddd)')
              }}
              {{ dayjs(timeline.metaData.interviewDate).format('HH:mm')
              }}{{
                timeline.metaData.interviewEndDate
                  ? `~${dayjs(timeline.metaData.interviewEndDate).format(
                      'HH:mm',
                    )}`
                  : ''
              }}
            </p>
          </div>
          <div class="text-sm font-normal mt-2 flex gap-1">
            <p class="text-gray w-20 flex-shrink-0">選考方法</p>
            <p>{{ timeline.metaData.selectionMethod }}</p>
          </div>
          <div
            v-if="timeline.metaData.location"
            class="text-sm font-normal mt-2 flex gap-1"
          >
            <p class="text-gray w-20 flex-shrink-0">選考場所</p>
            <div
              class="cursor-pointer label-custom-break-line text-sm whitespace-pre-line break-all h-auto"
              v-html="timeline.metaData.location"
            ></div>
          </div>
          <div class="text-sm font-normal mt-2 flex gap-1">
            <p class="text-gray w-20 flex-shrink-0">メモ</p>
            <p class="break-all">
              {{ timeline.metaData.content }}
            </p>
          </div>
        </div>
        <div
          v-if="
            timeline.typeData ===
            ETypeApplicantTimeline.EMPLOYER_CREATE_SCHEDULE
          "
        >
          <p class="mt-2">
            {{ timeline.creator.firstName }}
            {{ timeline.creator.lastName }}さんが
            <span class="font-bold">
              「{{ timeline.metaData.selectionStep }}」
            </span>
            の日程調整リンクを作成しました。
          </p>
          <p class="mt-2">日程調整リンク : {{ timeline.metaData.link }}</p>
          <p>※上記URLを応募者に共有して、選考日程を選んでもらってください。</p>
          <p>--------</p>
          <p>{{ timeline.metaData.memo }}</p>
        </div>
        <div
          v-if="
            timeline.typeData === ETypeApplicantTimeline.USER_REPLY_SCHEDULE
          "
        >
          <p class="mt-2">
            {{ timeline.creator.firstName
            }}{{ timeline.creator.lastName }}さんが
            <span class="font-bold">
              「{{ timeline.metaData.selectionStep }}」
            </span>
            の候補日時を入力しました。
          </p>
          <p
            v-for="(item, ind) in timeline.metaData.dataSchedule"
            :key="ind"
            class="font-bold"
            :class="{ 'mt-2': ind === 0 }"
          >
            {{ ind === 0 ? '第一希望' : ind === 1 ? '第二希望' : '第三希望' }} :
            {{ item }}
          </p>
          <p class="mt-4">
            ※上記の候補日時から選考予定日を確定し、「選考予定を作成」ボタンから予定を入力してください。
          </p>
        </div>
        <div
          v-if="
            timeline.typeData ===
              ETypeApplicantTimeline.EMPLOYER_CREATE_TIMELINE ||
            timeline.typeData ===
              ETypeApplicantTimeline.EMPLOYER_NOTICE_REGARDING_SELECTION
          "
        >
          <div class="flex gap-2 flex-wrap">
            <div
              v-for="tag in timeline.metaData.memberIds"
              :key="tag.id"
              class="w-max bg-secondary"
            >
              <p class="text-primary">@{{ tag.name }}</p>
            </div>
          </div>
          <!-- 
          <p class="text-sm mt-2">
            {{ timeline.creator.firstName }}
            {{
              timeline.creator.lastName
            }}さんが選考に関するお知らせを送信しました。
          </p> -->
          <p class="text-sm mt-2 whitespace-pre-line break-words">
            {{ timeline.metaData.content }}
          </p>
        </div>
        <!-- <div
          v-if="
            timeline.typeData ===
            ETypeApplicantTimeline.EMPLOYER_CHANGE_SELECTION_STEP
          "
        >
          5
        </div> -->
        <!-- <div
          v-if="
            timeline.typeData ===
            ETypeApplicantTimeline.EMPLOYER_NOTICE_REGARDING_SELECTION
          "
        >
          6
        </div> -->
        <!-- <div
          v-if="
            timeline.typeData === ETypeApplicantTimeline.EMPLOYER_SEND_MESSAGE
          "
        >
          7
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import { IApplicantTimeline, IMemberInformation } from '~/utils/interface';
import { useApplicantListStore } from '@/stores/useApplicantListStore';

const props = defineProps({
  applicantTimeline: {
    type: Array as () => IApplicantTimeline[],
    default: () => [],
  },
  membersInformation: {
    type: Array as () => IMemberInformation[],
    default: () => [],
  },
  applicantInformation: {
    type: Object,
    default: () => {},
  },
});

const applicantInformationData = computed(() => {
  return props.applicantInformation;
});

const emits = defineEmits(['createTimeline', 'editSettingInterview']);

const applicantTimelineData = ref(props.applicantTimeline);
watch(
  () => props.applicantTimeline,
  (newValue) => {
    applicantTimelineData.value = newValue;
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

const contentTimeline = ref('');

const employerName = ref<string>('');
const cookieSystemData = useCookie('auth.system-data').value;
if (cookieSystemData) {
  const systemData = handleJWTDecrypt(cookieSystemData);
  employerName.value = `${systemData.firstName || ''} ${
    systemData.lastName || ''
  }`;
}
const openNewTab = (url: string) => {
  if (url && window) window.open(url, '_blank');
};

/**
 * handle Tag Member
 */
const applicantListStore = useApplicantListStore();
const visiblePopper = ref<boolean>(false);
const listTag = ref<{ value: number; label: string }[]>([]);

const handleGetListMember = async () => {
  visiblePopper.value = !visiblePopper.value;
  await applicantListStore.getMemberSettingInterview();
};

const handleTagMember = (member: { value: number; label: string }) => {
  visiblePopper.value = false;
  listTag.value.push(member);
};

const checkDuplicateTag = (id: number) => {
  return listTag.value.some((i) => i.value === id);
};

const removeTag = (index: number) => {
  listTag.value.splice(index, 1);
};

const handleCreateTimeline = () => {
  const members = listTag.value.map((i) => {
    return {
      id: i.value,
      name: i.label,
    };
  });
  emits('createTimeline', { content: contentTimeline.value, members });
  listTag.value = [];
  contentTimeline.value = '';
};
</script>

<style lang="scss">
.my-input-custom .el-textarea__inner {
  box-shadow: unset;
  padding: 0 !important;
  resize: none;
}
.my-input-custom .el-textarea__inner:hover {
  box-shadow: unset;
}
</style>
