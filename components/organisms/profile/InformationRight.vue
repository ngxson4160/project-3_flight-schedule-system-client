<template>
  <div>
    <div
      class="pb-10 pc:w-[232px] rounded-xl shadow-[0px_0px_20px_rgba(0,0,0,0.1)] pc:mt-8"
      :class="{ '!shadow-none': !isShadow, 'mobile:!rounded-none': !isRounded }"
    >
      <h3 class="text-2xl font-bold text-black pc:hidden px-4 pt-[44px]">
        転職希望条件
      </h3>
      <div class="pb-10 rounded-xl pc:pt-10 mobile:pt-6 mobile:px-4 pc:px-4">
        <div>
          <p class="text-gray text-sm font-bold tracking-wider">応募意欲</p>
          <button
            class="bg-color-tag rounded-[5px] items-start px-4 py-2 mt-4 mb-10"
          >
            <p class="text-xs font-bold leading-[17px] tracking-wider">
              {{ profileData.willingnessApplyStatus }}
            </p>
          </button>
        </div>
        <!-- <p class="text-gray text-sm font-bold tracking-wider">希望勤務業種</p> -->

        <!-- <div
          class="flex w-full items-center justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray"
        >
          <div class="w-[100px]">
            <h1 class="text-xs font-bold !text-black">官公庁の種類</h1>
          </div>

          <div class="overflow-hidden break-words ml-4 w-[120px]">
            <h1 class="text-xs !text-black">
              {{ profileData.desiredWorkGovernmentOfficeCategory }}
            </h1>
          </div>
        </div> -->

        <!-- <div
          class="flex w-full items-center justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray"
        >
          <div class="w-[100px]">
            <h1 class="text-xs font-bold !text-black">職種</h1>
          </div>

          <div class="overflow-hidden break-words ml-4 w-[120px]">
            <h1 class="text-xs !text-black">
              {{ jobCategory.join(',') }},
              {{ profileData.additionDesiredJobCategory.toString() }}
            </h1>
          </div>
        </div> -->

        <div>
          <p class="text-gray text-sm font-bold tracking-wider">希望就業形態</p>

          <div
            class="flex w-full items-center justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray"
          >
            <div class="w-[100px]">
              <h1 class="text-xs font-bold !text-black">希望勤務地</h1>
            </div>

            <div class="overflow-hidden break-words ml-4 w-[120px]">
              <h1 class="text-xs !text-black">
                {{ provinces.join(',') }}
              </h1>
            </div>
          </div>

          <div
            class="flex w-full items-center justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray"
          >
            <div class="w-[100px]">
              <h1 class="text-xs font-bold !text-black">希望職種</h1>
            </div>

            <div class="overflow-hidden break-words ml-4 w-[120px]">
              <h1 class="text-xs !text-black">
                {{ jobCategory.join(',') }},
                <!-- {{ profileData.additionDesiredJobCategory.toString() }} -->
              </h1>
            </div>
          </div>

          <div
            class="flex w-full items-center justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray"
          >
            <div class="w-[100px]">
              <h1 class="text-xs font-bold !text-black">勤務形態</h1>
            </div>

            <div class="overflow-hidden break-words ml-4 w-[120px]">
              <h1 class="text-xs !text-black">
                {{ profileData.desiredEmploymentStatus }}
              </h1>
            </div>
          </div>
        </div>

        <!-- <div v-if="profileData.desiredWorkDescription" class="mt-10">
          <p class="text-gray text-sm font-bold tracking-wider">
            興味のある働き方
          </p>
          <p
            class="text-sm font-normal leading-5 tracking-wider mt-4 pc:w-[200px] whitespace-pre-line break-words"
          >
            {{ profileData.desiredWorkDescription?.toString() }}
          </p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEmpJob } from '@/composables/employer/job';
const props = defineProps({
  profileData: {
    type: Object,
    default: () => ({}),
  },
  formRight: {
    type: Object,
    default: () => ({}),
  },
  isShadow: {
    type: Boolean,
    default: true,
  },
  isRounded: {
    type: Boolean,
    default: true,
  },
});

const { getProvince } = useEmpJob();
const response: any = await getProvince();

const provinces = computed(() => {
  const data = props.profileData.desiredWorkLocation;
  if (data && data.length) {
    return data.map(
      (id: number) =>
        response?.data.value.data.find((e: { id: number }) => e.id === id)
          .name ?? '',
    );
  } else {
    return [];
  }
});

const jobCategory = computed(() => {
  return props.profileData.desiredJobCategory.map(
    (i: { jobCategory: { name: string } }) => {
      return i.jobCategory.name;
    },
  );
});
</script>

<style scoped></style>
