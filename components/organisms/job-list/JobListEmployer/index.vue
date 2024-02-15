<template>
  <div class="flex gap-14 pc:pb-16">
    <div class="flex flex-col w-full mobile:w-full gap-10">
      <div class="flex mobile:flex-col gap-4">
        <el-select
          v-model="formSearch.jobCategoryParentId"
          class="select-search-job"
          placeholder="職種"
          clearable
          @change="selectJobCategory"
        >
          <el-option
            v-for="i in OPTION_JOB_CATEGORY"
            :key="i"
            :value="i.jobCategoryParentId"
            :label="i.name"
          />
        </el-select>

        <el-select
          v-model="formSearch.employmentStatus"
          class="select-search-job"
          placeholder="勤務形態"
          clearable
          @change="selectStatus"
        >
          <el-option
            v-for="i in OPTION_EMPLOYER_STATUS"
            :key="i"
            :value="i"
            :label="i"
          />
        </el-select>
      </div>

      <div v-if="totalItems" class="flex flex-col gap-8">
        <div v-for="job in dataSource" :key="job.id">
          <JobFullInformationList
            :job-data="job"
            :show-duty="!isMobile"
            size="small"
            :show-all-appeal-points="true"
            @click-detail="
              role === 'USER'
                ? routerPush(`/user/job/${job.id}`)
                : routerPush(`/job/${job.id}`)
            "
          />
        </div>
      </div>

      <CardEmptyDataList
        v-else
        description-st="表示する求人がありません。"
        description-snd="をお気に入り登録して新着通知を受け取りましょう。"
        :is-favorite="isFavorite"
        @favorite="emit('favorite')"
        @un-favorite="emit('un-favorite')"
      />

      <div
        v-if="totalItems && totalItems > 10"
        class="pc:flex pc:items-center pc:justify-center mt-2"
      >
        <Pagination
          :current-page="formSearch.page"
          :total-items="totalItems"
          @set-current-page="setCurrentPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core';
import { IJobDetail } from 'stores/employerProfileJobs';
import { useDataSearchJob } from '~~/stores/masterDataSearchJob';

interface Props {
  dataSource: IJobDetail[];
  totalItems: number;
  role: string;
  isFavorite: boolean;
}

interface Emits {
  (event: 'change-page', page: number): void;
  (event: 'change-status', status: string): void;
  (event: 'change-jobId', jobId: number): void;
  (event: 'favorite'): void;
  (event: 'un-favorite'): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const breakpoints = useBreakpoints({
  mobile: 0,
  desktop: 391,
});

const isMobile = breakpoints.between('mobile', 'desktop');

/**
 * GET Query - Params
 */
const { query } = useRoute();
const {
  page: _page,
  employmentStatus: _employmentStatus,
  jobCategoryParentId: _jobCategoryParentId,
} = query;

const page = Array.isArray(_page) ? _page[0] : _page;

const employmentStatus = Array.isArray(_employmentStatus)
  ? _employmentStatus[0]
  : _employmentStatus;

const jobCategoryParentId = Array.isArray(_jobCategoryParentId)
  ? _jobCategoryParentId[0]
  : _jobCategoryParentId;

/**
 * Init Form Search
 */
const formSearch = ref({
  page: page ? Number(page) : 1,
  employmentStatus: employmentStatus ?? '',
  jobCategoryParentId: jobCategoryParentId ? Number(jobCategoryParentId) : null,
});

/**
 * GET OPTION by Master Data
 */
const dataSearchJobStore = useDataSearchJob();
const masterData = await dataSearchJobStore.getMasterData();
dataSearchJobStore.setData(masterData);

const OPTION_EMPLOYER_STATUS = ref<string[]>(['']);
OPTION_EMPLOYER_STATUS.value = dataSearchJobStore.employmentForm;

const OPTION_JOB_CATEGORY = ref<
  { jobCategoryParentId: number; name: string }[]
>([]);

OPTION_JOB_CATEGORY.value = dataSearchJobStore.jobBigCategories.map((job) => {
  return { jobCategoryParentId: job.id, name: job.name };
});

/**
 * @param page Call API Job list with page
 */
const setCurrentPage = (page: number) => {
  formSearch.value.page = page;
  emit('change-page', page);
};

/**
 * @param status Call API Job list with status
 */
const selectStatus = (status: string) => {
  formSearch.value.employmentStatus = status;
  emit('change-status', status);
};

/**
 * @param jobId Call API Job list with jobId
 */
const selectJobCategory = (jobId: number) => {
  formSearch.value.jobCategoryParentId = jobId;
  emit('change-jobId', jobId);
};
</script>

<style lang="scss">
.el-select.select-search-job {
  .el-input__wrapper {
    @apply h-10;
  }
}
</style>
