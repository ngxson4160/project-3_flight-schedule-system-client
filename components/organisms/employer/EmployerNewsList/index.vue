<template>
  <div class="flex justify-between items-center pb-6">
    <div class="flex items-center">
      <img
        src="~/assets/images/img-employer-news-title.webp"
        alt=""
        class="mr-4 w-[60px]"
      />
      <p class="font-bold text-2xl">お知らせ</p>
    </div>
    <p
      class="font-bold text-sm underline text-primary cursor-pointer"
      @click="handleGoToPageList"
    >
      すべて見る
    </p>
  </div>
  <div v-for="item in news" :key="item.id">
    <div
      class="flex justify-between items-center py-4 border-b-[1px] border-gray-third"
    >
      <div class="pr-2">
        <p
          class="text-primary text-sm pb-1 cursor-pointer"
          style="line-height: 170%"
          @click="hanleGoToDetail(item.id)"
        >
          {{ item.title }}
        </p>
        <p class="text-gray text-xs">
          {{ item.updatedTime ? item.updatedTime : item.createdTime }}
        </p>
      </div>
      <img
        src="~/assets/images/icon-keyboard-arrow-right.svg"
        alt=""
        class="cursor-pointer"
        @click="hanleGoToDetail(item.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { IResponse } from '~~/utils/interface';
const props = defineProps({
  idEmployer: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    default: '',
  },
});

const news = ref<
  { id: number; title: string; createdTime: string; updatedTime: string }[]
>([]);
if (props.role === 'employer') {
  const { data, error } = await useBaseFetch(
    `/employers/profile/${props.idEmployer}/news`,
    {
      query: {
        isPublic: true,
        isDraft: false,
        limit: 3,
      },
    },
  );
  if (error.value?.data) {
    throw error.value?.data;
  } else {
    news.value = [];
    const response = data.value as IResponse;
    response.data.news.forEach((item: any) => {
      const createdTime = new Date(item.createdTime);
      const updatedTime = item.updatedTime && new Date(item.updatedTime);
      news.value.push({
        id: item.id,
        title: item.title,
        createdTime: dayjs(createdTime).format('YYYY/MM/DD'),
        updatedTime: updatedTime && dayjs(updatedTime).format('YYYY/MM/DD'),
      });
    });
  }
} else {
  const { data, error } = await useBaseFetch(
    `/news/employers/${props.idEmployer}`,
    {
      query: {
        limit: 3,
      },
    },
  );
  if (error.value?.data) {
    throw error.value?.data;
  } else {
    news.value = [];
    const response = data.value as IResponse;
    response.data.news.forEach((notice: any) => {
      const createdTime = new Date(notice.createdTime);
      const updatedTime = notice.updatedTime && new Date(notice.updatedTime);
      news.value.push({
        id: notice.id,
        title: notice.title,
        createdTime: dayjs(createdTime).format('YYYY/MM/DD'),
        updatedTime: updatedTime && dayjs(updatedTime).format('YYYY/MM/DD'),
      });
    });
  }
}
const handleGoToPageList = () => {
  switch (props.role) {
    case 'employer':
      routerPush('/employer/news/list');
      break;
    case 'user':
      routerPush(`/user/employer/${props.idEmployer}/news/list`);
      break;
    case 'guest':
      routerPush(`/employer/${props.idEmployer}/news/list`);
      break;
    default:
      break;
  }
};
const hanleGoToDetail = (id: number) => {
  switch (props.role) {
    case 'employer':
      routerPush(`/employer/news/${id}`);
      break;
    case 'user':
      routerPush(`/user/employer/${props.idEmployer}/news/${id}`);
      break;
    case 'guest':
      routerPush(`/employer/${props.idEmployer}/news/${id}`);
      break;
    default:
      break;
  }
};
</script>

<style scoped></style>
