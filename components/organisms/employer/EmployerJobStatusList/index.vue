<template>
  <div class="flex font-bold text-2xl items-center pb-6">
    <img
      src="~/assets/images/img-employer-job-status-list-title.webp"
      alt=""
      class="w-[60px]"
    />
    <p class="pl-4">現在の求人状況</p>
  </div>
  <div>
    <the-member-job-item
      v-for="job in jobs"
      :key="job.jobId"
      :data="job"
    ></the-member-job-item>
  </div>
</template>

<script setup lang="ts">
import { IResponse } from '~~/utils/interface';
const memberJobItem = reactive({
  title: 'UIデザイナー　23年度募集',
  jobCategory: '人事',
  employmentStatus: '正社員',
  numberOfApplicants: 30,
  favorites: 80,
  views: 120,
});
const jobs = ref<
  {
    jobId: number;
    title: string;
    jobCategory: string;
    employmentStatus: string;
    numberOfApplicants: number;
    favorites: number;
    views: number;
  }[]
>([]);
const { data, error } = await useBaseFetch('/employers/profile/all-jobs', {});
if (error.value?.data) {
  throw error.value?.data;
} else {
  jobs.value = [];
  const response = data.value as IResponse;
  response.data.forEach((job: any) => {
    jobs.value.push({
      jobId: job?.id,
      title: job?.title,
      jobCategory: job?.jobCategory?.name,
      employmentStatus: job?.employmentStatus,
      numberOfApplicants: job?.countEntry,
      favorites: job?.countFavorite,
      views: job?.viewingQuantity,
    });
  });
}
</script>

<style></style>
