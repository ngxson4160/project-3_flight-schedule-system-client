<template>
  <div :class="`flex flex-col gap-y-4 justify-start ${props.class}`">
    <div class="font-bold text-2xl">
      <div
        class="bg-cover h-20 w-20 mobile:h-16 mobile:w-16 rounded-full bg-no-repeat bg-center border border-solid border-gray-third stroke-1 stroke-color-border"
        :style="{
          'background-image': 'url(' + srcAvatar + ')',
        }"
      ></div>
      <p :class="`${srcAvatar ? 'mt-4' : 'mt-14'} text-lg font-bold`">
        {{ title }}
      </p>
    </div>
    <div>
      <div id="parent" class="text-col" :class="{ active: isActive }">
        <div class="text-sm leading-[170%] whitespace-pre-line break-words">
          {{ aboutUs }}
        </div>
      </div>
      <span
        v-if="isShow"
        class="text-gray text-sm leading-[170%] underline cursor-pointer"
        @click="handleShowMore()"
      >
        もっと見る
      </span>
      <span
        v-else
        class="text-gray text-sm leading-[170%] underline cursor-pointer"
        @click="handleShowLess()"
      >
        閉じる
      </span>
    </div>
    <EmployerSummaryCardInfo
      :role="role"
      :employer-id="employerId"
      :social-links="socialLinks"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  role: {
    type: String,
    default: 'EMPLOYER',
  },
  employerId: {
    type: Number,
    default: 0,
  },
  isAvatar: {
    type: Boolean,
    default: true,
  },
  class: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  aboutUs: {
    type: String,
    default: '',
  },
  srcAvatar: {
    type: String,
    default: '',
  },
  socialLinks: {
    type: Object,
    required: false,
  },
});

const isActive = ref<boolean>(false);
const isShow = ref<boolean>(false);

onMounted(async () => {
  await nextTick();
  const parent = document.getElementById('parent');

  if (parent && parent.clientHeight < parent?.scrollHeight) {
    isShow.value = true;
  } else {
    isShow.value = false;
  }
});

const handleShowMore = () => {
  isShow.value = false;
  isActive.value = true;
};
const handleShowLess = () => {
  isShow.value = true;
  isActive.value = false;
};
</script>

<style>
.text-col {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  animation: all 0.3s ease-in-out;
}

.text-col.active {
  -webkit-line-clamp: unset;
  overflow: unset;
  animation: all 0.3s ease-in-out;
}
</style>
