<template>
  <div
    class="pc:w-[1024px] pc:mt-16 shadow-[0px_0px_20px_rgba(0,0,0,0.1)] pc:rounded-xl"
  >
    <div class="pc:h-[312px] h-[119px] relative rounded-t-[12px]">
      <img
        :src="jobDetailStore.creator?.backgroundURL.toString()"
        alt=""
        class="w-full h-full object-cover pc:rounded-t-[12px]"
      />
      <img
        :src="jobDetailStore.creator?.avatarURL"
        class="absolute border-[1px] border-gray-third pc:w-[120px] w-[64px] pc:h-[120px] h-[64px] bg-white rounded-full pc:top-[252px] top-[103px] pc:left-[40px] left-[24px] object-cover cursor-pointer"
        alt=""
        @click="routerPush(`/user/employer/${idEmployer}`)"
      />
    </div>
    <div class="">
      <div
        class="flex justify-end w-full pt-6 px-10 mobile:pt-3 mobile:pb-2 mobile:px-6 pc:gap-4 pc:mb-[20px]"
      >
        <SocialShared
          :id="jobDetailStore.id"
          :url="share"
          :title="jobDetailStore.title"
          :type="ETypeShareTools.JOB"
        />
      </div>
      <span
        v-if="data.jobCategoryName"
        class="pc:ml-10 mobile:ml-6 tag-job-category whitespace-pre-line break-words overflow-hidden"
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
        @click="routerPush(`/user/employer/${idEmployer}`)"
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
        class="!whitespace-pre-line break-words overflow-hidden"
      >
        {{ tag.label }}
      </span>
    </div>
    <div
      v-if="size === sizeCard.default"
      class="text-sm text-gray px-10 mobile:px-6 mt-[14px] pb-6"
    >
      【掲載期間】 {{ dateTimeFormat(data.start_date) }}〜{{
        dateTimeFormat(data.end_date)
      }}
    </div>
  </div>
</template>
<script lang="ts" setup>
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
  share: {
    type: String,
    default: '',
  },
});

const idEmployer = ref();

idEmployer.value = props.data.creatorId;

const size = ref<string>(props.size);
</script>
<style></style>
