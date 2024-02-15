<template>
  <div class="py-16">
    <div v-if="timelineWorkExperience.length">
      <p class="font-bold pc:text-[24px] text-[20px] mb-4">職歴</p>
      <TimeLine :timeline-data="timelineWorkExperience" />
    </div>
    <div v-if="timelineAcademicBackground.length">
      <p
        class="font-bold pc:text-[24px] text-[20px] mb-4"
        :class="{ 'mt-16': timelineWorkExperience.length }"
      >
        学歴
      </p>
      <TimeLine
        :timeline-data="timelineAcademicBackground"
        type-timeline="timelineAcademicBackground"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ITimelineItem } from '~/utils/interface';

const props = defineProps({
  timelineData: {
    type: Array<ITimelineItem>,
    default: () => [],
  },
});
const timelineAcademicBackground = ref<ITimelineItem[]>([]);
const timelineWorkExperience = ref<ITimelineItem[]>([]);
props.timelineData.forEach((timeline) => {
  if (timeline?.isHiddenCard) {
    if (timeline.entranceDate || timeline.companyName)
      timelineAcademicBackground.value.push(timeline);
  } else timelineWorkExperience.value.push(timeline);
});

timelineAcademicBackground.value.sort(
  (a, b) =>
    new Date(b.entranceDate).getTime() - new Date(a.entranceDate).getTime(),
);

timelineWorkExperience.value.sort(
  (a, b) =>
    new Date(b.entranceDate).getTime() - new Date(a.entranceDate).getTime(),
);

timelineWorkExperience.value.forEach((e) => {
  e.project?.sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
  );
});
</script>

<style scoped></style>
