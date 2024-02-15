<template>
  <div v-if="props.dataRecentActivity.length > 0">
    <div v-if="props.dataRecentActivity.length === 1" class="text-xs mb-2">
      <p class="text-gray">{{ dateFirst }}</p>
      <p>
        {{ props.dataRecentActivity[0]?.metaData?.title }}
      </p>
    </div>
    <div v-if="props.dataRecentActivity.length === 2">
      <div class="text-xs mb-2">
        <p class="text-gray">{{ dateFirst }}</p>
        <p v-if="props.dataRecentActivity[0]?.metaData?.title">
          {{ props.dataRecentActivity[0]?.metaData?.title }}
        </p>
      </div>
      <div class="text-xs mb-2">
        <p class="text-gray">{{ dateSecond }}</p>
        <p v-if="props.dataRecentActivity[1]?.metaData?.title">
          {{ props.dataRecentActivity[1]?.metaData?.title }}
        </p>
      </div>
    </div>
  </div>
  <div v-else class=""></div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';

const props = defineProps({
  dataRecentActivity: {
    type: Array as () => any[],
    default: () => [],
  },
});

const dateFirst = ref<string>('');
const dateSecond = ref<string>('');
const currentDate = dayjs();

const handleConvertDate = (timeConvert: dayjs.Dayjs) => {
  if (timeConvert.isSame(currentDate, 'day')) {
    return timeConvert.format('HH:mm');
  }
  if (timeConvert.isSame(currentDate.subtract(1, 'day'), 'day')) {
    return '昨日';
  }
  return dayjs(timeConvert).locale(ja).format('dddd');
};

const handleCheckDate = () => {
  if (!props.dataRecentActivity) return;

  if (props.dataRecentActivity.length === 1) {
    const createTimeLineFirst = dayjs(props.dataRecentActivity[0].createdTime);
    return (dateFirst.value = handleConvertDate(createTimeLineFirst));
  }

  if (props.dataRecentActivity.length === 2) {
    const createTimeLineFirst = dayjs(props.dataRecentActivity[0].createdTime);
    const createTimeLineSecond = dayjs(props.dataRecentActivity[1].createdTime);
    dateFirst.value = handleConvertDate(createTimeLineFirst);
    dateSecond.value = handleConvertDate(createTimeLineSecond);
  }
};
onMounted(() => {
  handleCheckDate();
});
</script>

<style scoped lang="scss"></style>
