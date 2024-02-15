<template>
  <div
    class="py-4 border-b border-color-border relative cursor-pointer"
    @click="goToDetail()"
  >
    <h3 class="text-sm font-bold text-black tracking-tighter leading-4">
      {{ data.title }}
    </h3>
    <!-- FOR TAGS -->
    <div class="flex mt-2 gap-2 flex-wrap pr-4">
      <span v-if="data.jobCategory" class="tag">{{ data.jobCategory }}</span>
      <span v-if="data.employmentStatus" class="tag">
        {{ data.employmentStatus }}
      </span>
      <span v-for="tag in data.tags" :key="tag" class="tag active">
        {{ tag }}
      </span>
      <span v-for="tag in data.blogTags" :key="tag" class="tag">{{ tag }}</span>
    </div>
    <div v-if="showDate && !isDraft" class="text-sm mt-1 text-gray">
      【掲載期間】 {{ dateTimeFormat(data.start_date) }}〜{{
        dateTimeFormat(data.end_date)
      }}
    </div>
    <div v-else-if="isDraft" class="text-sm mt-1 text-gray">
      {{ formatDate(data.createdTime) }}
    </div>
    <div v-else class="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
      <div v-if="data.love > -1" class="flex gap-1 items-center">
        <img src="~/assets/images/icon-love.svg" alt="" />
        <span>いいね数：{{ data.love }}</span>
      </div>
      <div v-if="data.numberOfApplicants > -1" class="flex gap-1 items-center">
        <img src="~/assets/images/user-mini-black.svg" alt="" />
        <span>応募者数：{{ data.numberOfApplicants }}</span>
      </div>
      <div v-if="data.favorites > -1" class="flex gap-1 items-center">
        <img src="~/assets/images/bookmark-mini-black.svg" alt="" />
        <span>お気に入り数： {{ data.favorites }}</span>
      </div>
      <div v-if="data.views > -1" class="flex gap-1 items-center">
        <img src="~/assets/images/eyes-mini-black.svg" alt="" />
        <span>閲覧数： {{ data.views }}</span>
      </div>
    </div>
    <div class="absolute top-[50%] right-0 -translate-y-[50%]">
      <button type="button">
        <el-icon><ArrowRight /></el-icon>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue';
import { useDateTime } from '~/composables/useDateTime';

const { formatDate } = useDateTime();

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  showDate: {
    type: Boolean,
    default: () => false,
  },
  isDraft: {
    type: Boolean,
    default: () => false,
  },
});

const data = reactive(props.data);
const showDate = ref<boolean>(props.showDate);
const isDraft = ref<boolean>(props.isDraft);
const goToDetail = () => {
  if (data.blogId) routerPush(`/employer/blog/${data.blogId}`);
  if (data.jobId) routerPush(`/employer/job/${data.jobId}`);
};
</script>
