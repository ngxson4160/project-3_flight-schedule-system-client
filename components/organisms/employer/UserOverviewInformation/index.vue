<template>
  <div
    class="flex py-10 pc:px-10 px-6 shadow-[0px_0px_20px_rgba(0,0,0,0.1)] pc:rounded-xl pc:w-[1024px] mobile:flex-col applicant-information-wrapper"
  >
    <div
      class="pc:border-r mobile:border-b border-gray-third pc:pr-6 mobile:pb-6 pc:w-[256px] flex-shrink-0"
    >
      <p class="text-2xl font-bold leading-[150%]">
        <span v-if="!props.isTypeScout">
          {{ userInformation?.firstName }}{{ userInformation?.lastName }}
        </span>
        <span v-else>{{ getCompanyName(userInformation.workExperience) }}</span>
      </p>
      <p class="text-sm mt-2 leading-[170%]">
        {{ userInformation.businessCity?.province?.name }} /
        {{ dayjs().diff(userInformation?.dateOfBirth, 'year') }}歳
      </p>

      <div class="">
        <p
          v-for="item in userInformation.academicBackground"
          :key="item?.schoolName"
          class="break-words mt-2 text-sm leading-[170%]"
        >
          {{ item?.schoolName }}
        </p>
        <div v-if="!props.isTypeScout" class="mobile:flex-shrink-0">
          <p class="mt-6 text-gray text-xs">プロフィール情報</p>
          <div
            class="flex mt-1 items-center justify-center w-[119px] py-2 border border-color-border rounded-lg cursor-pointer"
            @click="downloadPdf"
          >
            <img src="~/assets/images/icon-download-blu.svg" alt="" />
            <span class="text-primary text-sm">PDF出力</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pc:pl-6 pc:flex-grow mobile:pt-6">
      <div class="pc:flex justify-between">
        <div class="w-full">
          <p class="text-gray text-xs">応募意欲</p>
          <button
            class="bg-color-tag rounded-[5px] items-start w-auto px-4 py-2 mt-1 cursor-default"
          >
            <span class="text-xs font-bold leading-[17px] tracking-wider">
              {{ userInformation?.willingnessApplyStatus }}
            </span>
          </button>
        </div>
        <div
          v-if="!props.isTypeScout"
          class="flex pc:flex-col gap-2 mobile:hidden mobile:mt-4 flex-shrink-0"
        >
          <el-button
            class="!px-6 !h-full !ml-0 mobile:flex-1 mobile:!px-0"
            @click="emits('editProfile')"
          >
            <p class="text-sm !font-normal">プロフィールを編集</p>
          </el-button>
        </div>
      </div>
      <div class="mt-6">
        <p class="text-xs font-normal mb-1 text-gray">希望条件</p>
        <div class="p-4 w-full bg-color-bg rounded-lg">
          <div class="flex items-center gap-x-1 mb-2">
            <p class="w-20 flex-shrink-0 text-sm text-gray">勤務地</p>
            <h1 class="text-sm !text-black">
              {{ provinces?.join(', ') }}
            </h1>
          </div>
          <div class="flex items-center gap-x-1 mb-2">
            <p class="w-20 flex-shrink-0 text-sm text-gray">職種</p>
            <h1 class="text-sm !text-black">
              {{ jobCategory.join(', ') }}
              <!-- {{
                userInformation.additionDesiredJobCategory?.length
                  ? `, ${userInformation.additionDesiredJobCategory.join(', ')}`
                  : ''
              }} -->
            </h1>
          </div>
          <div class="flex items-center gap-x-1">
            <p class="w-20 flex-shrink-0 text-sm text-gray">勤務形態</p>
            <h1 class="text-sm !text-black">
              {{ userInformation.desiredEmploymentStatus }}
            </h1>
          </div>
        </div>
      </div>
      <div
        v-if="!props.isTypeScout"
        class="flex pc:hidden gap-2 mobile:mt-6 flex-shrink-0"
      >
        <el-button
          class="!px-6 !h-14 !ml-0 mobile:flex-1 mobile:!px-0"
          @click="emits('editProfile')"
        >
          <p class="text-sm !font-normal">プロフィールを編集</p>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';

import ja from 'dayjs/locale/ja';
import { useEmpJob } from '@/composables/employer/job';

const props = defineProps({
  userInformation: {
    type: Object,
    default: () => {},
  },

  isTypeScout: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['editProfile']);

const tokenVal = ref('');
const downloadPdf = () => {
  if (tokenVal.value) {
    handleDownLoadPdf('user-profile', tokenVal.value);
  }
};

const { getProvince } = useEmpJob();
const response: any = await getProvince();

const provinces = computed(() => {
  const data = props.userInformation.desiredWorkLocation;
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

onMounted(async () => {
  tokenVal.value = await handleCheckToken();
});

const jobCategory = computed(() => {
  return props.userInformation.desiredJobCategory.map(
    (i: { jobCategory: { name: string } }) => {
      return i.jobCategory.name;
    },
  );
});
</script>
<style lang="scss">
.applicant-information-wrapper {
  p {
    @apply leading-[170%];
  }
}
</style>
