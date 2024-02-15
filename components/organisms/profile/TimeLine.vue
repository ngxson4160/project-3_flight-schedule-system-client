<template>
  <div class="overflow-x-hidden overflow-y-auto !text-black pl-1">
    <el-timeline class="time-line-profile">
      <el-timeline-item
        v-for="(timeline, index) in timelineData"
        :key="index"
        :timestamp="
          (convertDate(timeline.entranceDate) || '') +
          ' - ' +
          (timeline.resignationDate && !timeline.isWorking
            ? convertDate(timeline.resignationDate)
            : '現在') +
          ((props.typeTimeline && timeline.statusGraduation) || '')
        "
        placement="top"
        class="!text-black"
        :class="{
          '!pb-0 time-line-final': index === timelineData.length - 1,
        }"
      >
        <p
          class="font-bold pc:text-xl text-[18px] leading-[150%] pb-2 !text-black"
        >
          {{ timeline.companyName }}
          &nbsp;
          {{ props.typeTimeline ? `${timeline.department}` : '' }}
        </p>
        <p
          v-if="props.typeTimeline && timeline.schoolDistinction"
          class="text-xs py-1 px-2 text-primary border border-primary inline-block rounded"
        >
          {{ timeline.schoolDistinction }}
        </p>

        <div class="flex items-center">
          <p
            v-if="!props.typeTimeline"
            class="font-bold text-sm leading-[150%] !text-black mr-2"
          >
            {{ timeline.department }}
          </p>
          <p
            v-if="timeline.employmentStatus && timeline.project"
            class="tag h-[25px]"
          >
            {{ timeline.employmentStatus }}
          </p>
        </div>
        <p
          v-if="timeline?.description"
          class="mt-4 text-sm break-words whitespace-pre-line"
        >
          {{ timeline?.description }}
        </p>
        <div
          v-for="(el, i) in timeline.project"
          :key="i"
          class="mt-4 border-[1px] border-gray-third rounded-xl pc:p-6 p-4"
          :class="{ 'hidden ': !el.startTime && !el.title }"
        >
          <p class="font-normal text-sm leading-[20px] text-gray">
            {{ convertDate(el.startTime) }} -
            {{ el.endTime && !el.isProject ? convertDate(el.endTime) : '現在' }}
          </p>
          <p
            class="font-bold pc:text-lg text-base leading-[150%] mt-2 !text-black break-words"
          >
            {{ el.title }}
          </p>
          <p
            class="font-normal text-sm leading-[170%] mt-2 !text-black break-words whitespace-pre-line"
          >
            {{ el.description }}
          </p>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { ITimelineItem } from '~/utils/interface';

const props = defineProps({
  timelineData: {
    type: Array<ITimelineItem>,
    default: () => [],
  },
  typeTimeline: {
    type: String,
    default: '',
  },
});
const convertDate = (date: string) => {
  if (date) {
    return dayjs(date).format('YYYY年MM月');
  }
};
</script>

<style lang="scss">
.time-line-profile .el-timeline-item__tail {
  @apply border-primary;
}

.time-line-profile .el-timeline-item__node {
  @apply border-2 border-solid border-primary bg-white;
}
.time-line-profile .el-timeline-item__timestamp {
  @apply text-sm;
}

.el-timeline.time-line-profile {
  padding-left: 0;
}
.time-line-profile {
  .el-timeline-item__timestamp.is-top {
    @apply mb-4 font-bold;
  }
}
.time-line-final .el-timeline-item__wrapper {
  @apply relative;
  &::after {
    content: '';
    height: calc(100% - 14px);
    @apply absolute top-[14px] left-[4px] border-l-2 border-primary;
  }
}
</style>
