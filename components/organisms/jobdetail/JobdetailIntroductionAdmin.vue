<template>
  <div class="w-full border-color-border">
    <div class="h-[312px] relative">
      <img
        :src="jobDetailStore.creator?.backgroundURL.toString()"
        alt=""
        class="relative w-full h-full object-cover rounded-xl"
      />
      <div
        class="overflow-hidden absolute pc:h-[120px] h-[80px] pc:w-[120px] w-[80px] border border-gray-third rounded-full object-cover bottom-4 left-4"
      >
        <img
          :src="jobDetailStore.creator?.avatarURL"
          alt=""
          class="relative w-full h-full object-cover"
        />
      </div>
      <div
        class="px-6 py-4 bg-[#333333] opacity-80 rounded-lg absolute top-4 right-4"
      >
        <h3 class="text-sm leading-[20px] text-white">
          応募者/{{ jobDetailStore.countEntry }}
        </h3>
      </div>
    </div>
    <div class="pt-4">
      <span
        class="mobile:ml-6 tag-job-category whitespace-pre-line break-words overflow-hidden"
      >
        {{ data.jobCategoryName }}
      </span>
      <p
        class="mt-2 pc:w-[680px] font-bold pc:text-2xl text-xl leading-normal mobile:ml-6 mobile:mr-6"
      >
        {{ jobDetailStore.title }}
      </p>
      <p class="underline font-normal leading-[170%] mb-6 text-sm mt-2">
        {{ jobDetailStore.creator?.government?.name }}
      </p>
    </div>
    <div class="flex gap-2 flex-wrap mobile:px-6">
      <span
        v-for="tag in data.tags"
        v-show="size === sizeCard.default || !tag.isActive"
        :key="tag.label"
        :class="['tag', { active: tag.isActive }]"
      >
        {{ tag.label }}
      </span>
    </div>
    <div
      v-if="size === sizeCard.default"
      class="text-sm text-gray pt-4 pb-6 mobile:px-6 mobile:pb-4"
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
  dataJob: {
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
