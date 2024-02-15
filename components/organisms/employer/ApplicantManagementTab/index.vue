<template>
  <div>
    <el-tabs
      v-model="tabPaneActive.name"
      class="tabs-content"
      :class="{ 'tab-content-active': tabPaneActive.id }"
      @tab-click="handleClickTabContent"
    >
      <el-tab-pane
        v-for="tab in tabPanes"
        :key="tab.id"
        :label="tab.label"
        :name="tab.name"
      >
        <div v-if="tab.name === ETypeTabApplicantManagement.PROFILE">
          <div class="pc:px-[92px]">
            <BasicInformationV2
              :profile-data="props.profileUser"
              :is-type-scout="props.isTypeMessageScout"
            />
            <div
              v-if="props.timelineData && props.timelineData.length"
              class="pc:px-10 px-6"
            >
              <NewTimeLine :timeline-data="props.timelineData" />
            </div>
          </div>
        </div>
        <div
          v-if="tab.name === ETypeTabApplicantManagement.ENTRY"
          class="pc:py-16 py-10 pc:px-10 px-6"
        >
          <ApplicantEntry
            v-if="props.applicantEntry"
            class="pc:w-[760px] mx-auto"
            :applicant-entry="props.applicantEntry"
          />
        </div>

        <div
          v-if="tab.name === ETypeTabApplicantManagement.TIMELINE"
          class="pc:px-10 px-6 py-10"
        >
          <ApplicantTimeline
            :applicant-timeline="applicantTimelineData"
            :applicant-information="applicantInformationData"
            :members-information="membersInformationMessageData"
            @create-timeline="handleSendMessageTimeline"
            @edit-setting-interview="emits('editSettingInterview')"
          />
        </div>
        <div
          v-if="tab.name === ETypeTabApplicantManagement.MESSAGE"
          class="pc:px-10 px-4 py-10"
        >
          <MessageBox
            v-if="messages.length"
            :members-information="membersInformationMessageData"
            :data-messages="messages"
            :role="props.role"
            :user-company-name="props.userCompanyName"
            @handle-view-entry-form="handleViewTabEntry"
            @load-more-message="emits('loadMoreMessage')"
            @hanle-create-message="hanleCreateMessage"
            @handle-reply-message="handleReplyMessage"
            @edit-setting-interview="emits('editSettingInterview')"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus';
import {
  ITabPane,
  IApplicantTimeline,
  IMemberInformation,
  IMessageDetail,
  IFormCreateMessage,
  ITimelineItem,
} from '~/utils/interface';
import { ETypeTabApplicantManagement } from '~/utils/enum';

const props = defineProps({
  tabPanesData: {
    type: Array as () => ITabPane[],
    default: () => [],
  },
  tabActive: {
    type: Object as () => ITabPane,
    default: () => {},
  },
  profileUser: {
    type: Object,
    default: () => {},
  },
  timelineData: {
    type: Array as () => ITimelineItem[],
    default: () => [],
  },
  applicantEntry: {
    type: Object,
    default: () => {},
  },
  applicantInformation: {
    type: Object,
    default: () => {},
  },
  applicantTimeline: {
    type: Array as () => IApplicantTimeline[],
    default: () => [],
  },
  membersInformation: {
    type: Array as () => IMemberInformation[],
    default: () => [],
  },
  membersInformationMessage: {
    type: Array as () => IMemberInformation[],
    default: () => [],
  },
  dataMessages: {
    type: Array as () => IMessageDetail[],
    default: () => [],
  },
  role: {
    type: String,
    default: 'employer',
  },
  isTypeMessageScout: {
    type: Boolean,
    default: false,
  },
  userCompanyName: {
    type: String,
    default: '',
  },
});
const emits = defineEmits([
  'updateTabActive',
  'loadMoreMessage',
  'hanleCreateMessage',
  'handleReplyMessage',
  'createTimeline',
  'editSettingInterview',
]);
const tabPanes = ref<ITabPane[]>(props.tabPanesData);

const tabPaneActive = ref<ITabPane>({
  id: props.tabActive.id,
  label: props.tabActive.label,
  name: props.tabActive.name,
});

watch(
  () => props.tabActive,
  (newValue) => {
    tabPaneActive.value = {
      id: newValue.id,
      label: newValue.label,
      name: newValue.name,
    };
  },
);

const applicantTimelineData = ref(props.applicantTimeline);
watch(
  () => props.applicantTimeline,
  (newValue) => {
    applicantTimelineData.value = newValue;
  },
);

const applicantInformationData = computed(() => {
  return props.applicantInformation;
});

const messages = ref<IMessageDetail[]>(props.dataMessages);
watch(
  () => props.dataMessages,
  (newValue) => {
    messages.value = newValue;
  },
);

const membersInformationMessageData = ref<IMemberInformation[]>(
  props.membersInformationMessage,
);
watch(
  () => props.membersInformationMessage,
  (newValue) => {
    membersInformationMessageData.value = newValue;
  },
);

const handleClickTabContent = (tab: TabsPaneContext, event: Event) => {
  emits('updateTabActive', tabPanes.value[Number(tab.index)]);
};
const handleViewTabEntry = () => {
  const tabCurrent = tabPanes.value.find(
    (e) => e.name === ETypeTabApplicantManagement.ENTRY,
  );
  emits('updateTabActive', tabCurrent);
};
const hanleCreateMessage = (form: IFormCreateMessage) => {
  emits('hanleCreateMessage', form);
};
const handleReplyMessage = (messageCurrent: IMessageDetail) => {
  emits('handleReplyMessage', messageCurrent);
};
const handleSendMessageTimeline = (form: {
  content: string;
  members: { name: string; id: number }[];
}) => {
  emits('createTimeline', form);
};
</script>

<style lang="scss">
.tabs-content {
  .el-tabs__item {
    @apply px-6 py-4 h-[50px] #{!important};
  }
  .el-tabs__item {
    @apply text-gray font-bold text-sm border-t-4 border-transparent;
  }
  .el-tabs__item.is-active {
    @apply relative shadow-[0px_0px_20px_rgba(0,0,0,0.1)]  border-primary bg-white text-black;
  }
  .el-tabs__item.is-active::after {
    content: '';
    @apply w-full h-6 top-[40px] absolute z-[999] #{!important};
  }
  .el-tabs__header {
    @apply m-0;
  }
  .el-tabs__content {
    @apply shadow-[0px_0px_20px_rgba(0,0,0,0.1)];
  }
  .el-tabs__nav-wrap::after {
    @apply hidden  #{!important};
  }
  .el-tabs__active-bar {
    @apply hidden #{!important};
  }
}
.tab-content-active {
  .el-tabs__content {
    @apply pc:rounded-xl;
  }
}
</style>
