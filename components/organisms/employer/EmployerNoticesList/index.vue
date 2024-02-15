<template>
  <div v-if="notices.length !== 0">
    <div class="flex justify-between items-center pb-6">
      <div class="flex items-center">
        <img
          src="~/assets/images/img-employer-news-title.webp"
          alt=""
          class="mr-4 !w-[60px]"
        />
        <p class="font-bold text-2xl">お知らせ</p>
      </div>
      <p
        class="font-bold text-sm underline text-primary cursor-pointer"
        @click="routerPush('/employer/notice/list')"
      >
        すべて見る
      </p>
    </div>
    <div v-for="notice in notices" :key="notice.id">
      <div
        class="flex justify-between items-center py-4 border-b-[1px] border-gray-third cursor-pointer"
        @click="routerPush(`/employer/notice/${notice.id}`)"
      >
        <div class="pr-2">
          <p class="text-primary text-sm pb-1" style="line-height: 170%">
            {{ notice.title }}
          </p>
          <p class="text-gray text-xs">{{ notice.createdTime }}</p>
        </div>
        <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { IResponse } from '~~/utils/interface';

const notices = ref<{ id: number; title: string; createdTime: string }[]>([]);
const { data, error } = await useBaseFetch('/employers/profile/notices', {
  query: {
    page: 1,
    limit: 3,
  },
});
if (error.value?.data) {
  throw error.value?.data;
} else {
  notices.value = [];
  const response = data.value as IResponse;
  if (response.data.length !== 0) {
    response.data.notices.forEach((notice: any) => {
      const createdTime = new Date(notice.publicationDate);
      notices.value.push({
        id: notice.id,
        title: notice.title,
        createdTime: dayjs(createdTime).format('YYYY/MM/DD'),
      });
    });
  }
}
</script>

<style scoped></style>
