<template>
  <div
    :class="`pc:hidden flex justify-between w-full py-4 border-b border-color-border mb-10 px-6`"
  >
    <img
      src="~/assets/images/icon-close-black.svg"
      alt=""
      @click="emits('close')"
    />
    <p
      class="text-primary underline text-sm cursor-pointer"
      @click="handleRemoveItemSearch"
    >
      リセット
    </p>
  </div>
  <div class="mobile:px-6">
    <div
      class="flex justify-between w-full items-center text-gray pc:pt-10 border-b-2 pb-4 mb-6 pc:mb-4 border-color-border"
    >
      <p class="font-bold text-sm">絞り込み条件</p>
      <p
        class="text-xs underline cursor-pointer mobile:hidden"
        @click="handleRemoveItemSearch"
      >
        リセット
      </p>
    </div>
  </div>
  <div class="mobile:pb-10 form-filter-list mobile:px-6">
    <el-form class="w-full">
      <el-form-item>
        <el-select
          v-model="formData.sortOder"
          placeholder="並び順"
          class="w-full"
          clearable
        >
          <el-option
            v-for="item in listSortOrder"
            :key="item"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="formData.category"
          placeholder="カテゴリー"
          class="w-full"
          clearable
        >
          <el-option
            v-for="item in listCategory"
            :key="item"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="formData.selectionStep"
          placeholder="選考ステップ"
          class="w-full"
          clearable
        >
          <el-option
            v-for="item in selectionStepOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="formData.jobId"
          placeholder="職種"
          class="w-full"
          clearable
        >
          <el-option
            v-for="item in jobList"
            :key="item"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <div class="mobile:pt-[6px]">
        <el-button
          type="primary"
          class="w-full"
          @click="emits('search', formData)"
        >
          検索
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ETypeStatusMessage, ETypeStatusMessageSecond } from '~/utils/enum';
const props = defineProps({
  membersInformation: {
    type: Array as () => IMemberInformation[],
    default: () => [],
  },
});

const emits = defineEmits(['search', 'close']);
const formData = ref({
  sortOder: undefined,
  category: undefined,
  selectionStep: undefined,
  jobId: undefined,
});

enum EListSortOrder {
  UPDATEORDER = '1',
  APPLICANTDATEORDER = '2',
}

enum EListCategory {
  ALL = '1',
  APPLICANT = '2',
  SCOUTEDUSER = '3',
}

const listSortOrder = ref([
  {
    name: '更新日順',
    value: EListSortOrder.UPDATEORDER,
  },
  {
    name: '応募日順',
    value: EListSortOrder.APPLICANTDATEORDER,
  },
]);

const listCategory = ref([
  {
    name: 'すべて',
    value: EListCategory.ALL,
  },
  {
    name: '応募者',
    value: EListCategory.APPLICANT,
  },
  {
    name: 'スカウトしたユーザー',
    value: EListCategory.SCOUTEDUSER,
  },
]);

const selectionStepOptions = ref([
  ETypeStatusMessage.FIRST_INTERVIEW,
  ETypeStatusMessage.SECOND_INTERVIEW,
  ETypeStatusMessage.THIRD_INTERVIEW,
  ETypeStatusMessage.FOURTH_INTERVIEW,
  ETypeStatusMessage.ADOPTION,
  ETypeStatusMessageSecond.ACCEPTANCEOFOFFER,
  ETypeStatusMessageSecond.REJECTION,
]);

const jobList = ref<{ id: number; name: string }[]>([]);

const { data: dataJobList, error: errorJobList } = await useBaseFetch(
  '/employers/profile/jobs',
  {
    query: {
      isPublic: true,
      isDraft: false,
    },
  },
);
if (errorJobList.value?.data) {
  throw errorJobList.value?.data;
} else {
  const responseListJobs = dataJobList.value as IResponse;
  if (responseListJobs.data.jobs)
    responseListJobs.data.jobs.forEach((e: any) => {
      jobList.value.push({ id: e.id, name: e.position });
    });
}

const handleRemoveItemSearch = () => {
  formData.value = {
    sortOder: undefined,
    category: undefined,
    selectionStep: undefined,
    jobId: undefined,
  };
};
</script>

<style lang="scss">
.form-filter-list {
  .el-input__wrapper {
    @apply h-12;
  }
  .el-form-item {
    @apply mobile:mb-4 mb-2;
  }
}
</style>
