<template>
  <div
    class="pc:w-[1024px] pc:mt-[68px] shadow-[0px_0px_20px_rgba(0,0,0,0.1)] pc:rounded-xl relative"
  >
    <img
      :src="dataJob?.creator?.backgroundURL"
      alt=""
      class="pc:w-[1024px] w-full pc:h-[312px] h-[119px] object-cover pc:rounded-t-xl"
    />
    <img
      :src="dataJob?.creator?.avatarURL"
      class="absolute pc:h-[120px] h-[64px] pc:w-[120px] w-[64px] border border-gray-third rounded-full object-cover pc:top-[252px] top-[103px] pc:left-[40px] left-[24px]"
      alt=""
    />
    <div class="flex flex-col items-start gap-2 order-1">
      <div
        class="w-full my-3 mobile:!my-0 mobile:pt-3 mobile:pb-2 !mt-4 flex justify-end pr-10 mobile:pr-6"
      >
        <SocialShared
          :id="dataJob.id"
          :url="share"
          :title="dataJob?.title"
          :type="ETypeShareTools.JOB"
        />
      </div>
      <span
        v-if="data.jobCategoryName"
        class="pc:ml-10 mobile:ml-6 tag-job-category whitespace-pre-line break-words overflow-hidden"
      >
        {{ data.jobCategoryName }}
      </span>
      <p class="px-10 mobile:px-6 font-bold pc:text-2xl text-xl leading-normal">
        {{ dataJob?.title }}
      </p>
      <p
        class="ml-10 font-normal leading-[170%] mobile:ml-6 mobile:mr-6 cursor-pointer text-sm"
      >
        {{ dataJob?.creator?.government?.name }}
      </p>
    </div>
    <div class="flex gap-2 flex-wrap ml-10 pc:mt-6 mt-4 mobile:mx-6">
      <span
        v-for="tag in data.tags"
        v-show="size === sizeCard.default || !tag.isActive"
        :key="tag.label"
        :class="['tag', { active: tag.isActive, 'hidden ': !tag.label }]"
      >
        {{ tag.label }}
      </span>
    </div>
    <div
      v-if="size === sizeCard.default"
      class="text-sm mt-2 text-gray ml-10 mobile:mx-6"
      :class="{ 'pb-6': !data.isCreator }"
    >
      【掲載期間】 {{ dateTimeFormat(data.start_date) }}〜{{
        dateTimeFormat(data.end_date)
      }}
    </div>

    <ClientOnly>
      <div
        v-if="data.isCreator"
        class="flex mobile:items-start gap-x-4 gap-y-2 pb-6 mt-2 pc:mx-10 mx-6 flex-wrap"
      >
        <ul class="flex gap-2 items-center">
          <li class="mt-[2px]">
            <img src="~/assets/images/icon-vector.svg" alt="" />
          </li>
          <li class="font-normal text-xs leading-[170%]">
            応募者数：{{ dataJob?.countEntry }}
          </li>
        </ul>

        <ul class="flex gap-2 items-center">
          <li class="mt-[2px]">
            <img src="~/assets/images/icon-saves-black.svg" alt="" />
          </li>
          <li class="font-normal text-xs leading-[170%]">
            お気に入り数：{{ dataJob?.countFavorite }}
          </li>
        </ul>

        <ul class="flex gap-2 items-center">
          <li class="mt-[2px]">
            <img src="~/assets/images/icon-yey.svg" alt="" />
          </li>
          <li class="font-normal text-xs leading-[170%]">
            閲覧数：{{ dataJob?.viewingQuantity }}
          </li>
        </ul>
      </div>
    </ClientOnly>
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
  dataJob: {
    type: Object,
    default: null,
  },
  share: {
    type: String,
    default: '',
  },
});

const size = ref<string>(props.size);
</script>
<style></style>
