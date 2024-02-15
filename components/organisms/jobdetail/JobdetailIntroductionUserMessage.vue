<template>
  <div class="pc:w-full pc:mt-5 mobile:w-full rounded-xl">
    <div class="relative">
      <img
        :src="formData.creator?.backgroundURL"
        alt=""
        class="pc:rounded-xl object-cover w-full pc:h-[208px] mobile:h-[120px]"
      />

      <img
        :src="formData.creator?.avatarURL"
        alt=""
        class="absolute rounded-full object-cover left-4 pc:bottom-4 pc:h-[100px] pc:w-[100px] mobile:h-20 mobile:w-20 mobile:-bottom-9"
      />
    </div>

    <div class="flex flex-col items-start gap-2 order-1 pc:mt-4 mt-14">
      <p
        class="font-normal text-black text-base cursor-pointer mobile:mt-[-10px]"
        @click="routerPush(`/user/employer/${idEmployer}`)"
      >
        {{ formData.creator?.government?.name }}
      </p>
      <p
        class="pc:w-[680px] text-black font-bold text-2xl tracking-wider overflow-hidden break-words pc:my-4 mobile:my-2"
      >
        {{ formData.title }}
      </p>
    </div>

    <div class="flex mt-2 gap-2 flex-wrap mobile:ml-4">
      <span v-if="formDetailTag.jobCategory" class="tag">
        {{ data.jobCategory }}
      </span>
      <span v-if="formDetailTag.employmentStatus" class="tag">
        {{ data.employmentStatus }}
      </span>

      <span
        v-for="tag in formDetailTag.tags"
        v-show="size === sizeCard.default || !tag.isActive"
        :key="tag.label"
        :class="['tag active', { active: tag.isActive }]"
      >
        {{ tag.label }}
      </span>
    </div>

    <div
      v-if="size === sizeCard.default"
      class="text-sm text-gray mt-5 border-b-[1px] border-gray-third pb-6"
    >
      【掲載期間】 {{ dateTimeFormat(formDetailTag.start_date) }}〜{{
        dateTimeFormat(formDetailTag.end_date)
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
});

const formData = ref(props.jobDetailStore);
const formDetailTag = ref(props.data);
const idEmployer = ref(props.data.creatorId);

const size = ref<string>(props.size);

watch(
  () => props.jobDetailStore,
  (newVal) => {
    if (newVal) {
      formData.value = newVal;
    }
  },
);

watch(
  () => props.data,
  (newVal) => {
    if (newVal) {
      formDetailTag.value = newVal;
    }
  },
);
</script>
<style></style>
