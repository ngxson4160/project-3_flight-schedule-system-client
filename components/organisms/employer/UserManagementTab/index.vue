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
        <div v-if="tabPaneActive.name === ETypeTabApplicantManagement.PROFILE">
          <div class="pc:px-[92px]">
            <BasicInformationV2 :profile-data="props.profileUser" />
            <div
              v-if="props.timelineData && props.timelineData.length"
              class="pc:px-10 px-6"
            >
              <NewTimeLine :timeline-data="props.timelineData" />
            </div>
          </div>
        </div>
        <div
          v-else-if="
            tabPaneActive.name === ETypeTabApplicantManagement.CALENDAR
          "
          class="pc:px-10 px-2 py-10"
        >
          <UserCalendar :is-hidden-header-calendar="hiddenHeaderCalendar" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus';

import { ITabPane, ITimelineItem } from '~/utils/interface';

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
  isHiddenHeaderCalendar: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['updateTabActive']);
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

const hiddenHeaderCalendar = ref<boolean>(props.isHiddenHeaderCalendar);
watch(
  () => props.isHiddenHeaderCalendar,
  (newValue) => {
    hiddenHeaderCalendar.value = newValue;
  },
);

const handleClickTabContent = (tab: TabsPaneContext, event: Event) => {
  emits('updateTabActive', tabPanes.value[Number(tab.index)]);
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
