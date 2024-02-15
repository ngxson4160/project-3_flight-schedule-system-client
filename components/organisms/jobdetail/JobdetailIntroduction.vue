<template>
  <div
    class="pc:w-[1024px] pc:mt-16 shadow-[0px_0px_20px_rgba(0,0,0,0.1)] pc:rounded-xl border-color-border overflow-hidden"
  >
    <div class="h-[312px] relative mobile:h-[119px]">
      <img
        :src="jobDetailStore.creator?.backgroundURL.toString()"
        alt=""
        class="relative w-full h-full object-cover"
      />
      <div
        class="overflow-hidden absolute pc:h-[120px] h-[64px] pc:w-[120px] w-[64px] border border-gray-third rounded-full object-cover pc:top-[252px] top-[103px] pc:left-[40px] left-[24px]"
      >
        <img
          :src="jobDetailStore.creator?.avatarURL"
          alt=""
          class="relative w-full h-full object-cover"
        />
      </div>
    </div>

    <div class="">
      <div
        class="flex justify-end w-full pt-6 px-10 mobile:pt-3 mobile:pb-2 mobile:px-6 pc:gap-4 pc:mb-[20px]"
      >
        <SocialShared
          :id="jobDetailStore.id"
          :url="shareUrl"
          :title="jobDetailStore.title"
          :type="ETypeShareTools.JOB"
        />
      </div>
      <span
        class="pc:ml-10 text-sm mobile:ml-6 tag-job-category whitespace-pre-line break-words overflow-hidden"
      >
        {{ data.jobCategoryName }}
      </span>
      <p
        class="px-10 pb-2 mobile:px-6 pt-2 font-bold pc:text-2xl text-xl leading-normal"
      >
        {{ jobDetailStore.title }}
      </p>
      <p
        class="ml-10 mb-6 underline font-normal leading-[170%] mobile:ml-6 mobile:mr-6 cursor-pointer text-sm"
        @click="routerPush(`/employer/${idEmployer}`)"
      >
        {{ jobDetailStore.creator?.government?.name }}
      </p>
    </div>
    <div class="flex gap-2 flex-wrap px-10 mobile:px-6">
      <span
        v-for="tag in data.tags"
        v-show="size === sizeCard.default || !tag.isActive"
        :key="tag.label"
        :class="['tag', { active: tag.isActive }]"
        class="whitespace-pre-line break-words overflow-hidden"
      >
        {{ tag.label }}
      </span>
    </div>
    <div
      v-if="size === sizeCard.default"
      class="text-sm text-gray px-10 pt-4 pb-6 mobile:px-6 mobile:pb-4"
    >
      【掲載期間】 {{ dateTimeFormat(data.start_date) }}〜{{
        dateTimeFormat(data.end_date)
      }}
    </div>
  </div>
</template>
<script lang="ts" setup>
const shareUrl = ref('');
enum sizeCard {
  default = 'default',
  medium = 'medium',
  small = 'small',
}

const props = defineProps({
  size: {
    type: String,
    default: 'default',
  },
  data: {
    type: Object,
    default: null,
  },
  jobDetailStore: {
    type: Object,
    default: null,
  },
});

const idEmployer = ref();

idEmployer.value = props.data.creatorId;

const size = ref<string>(props.size);
onMounted(() => {
  shareUrl.value = window.location.href;
});
</script>
<style></style>
