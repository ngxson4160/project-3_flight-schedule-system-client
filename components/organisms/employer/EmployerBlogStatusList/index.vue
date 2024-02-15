<template>
  <div class="flex font-bold text-2xl items-center pb-6">
    <img
      src="~/assets/images/img-employer-blog-status-list-title.webp"
      alt=""
      class="w-[60px]"
    />
    <p class="pl-4">ブログの閲覧状況</p>
  </div>
  <div>
    <the-member-job-item
      v-for="(blog, index) in blogs"
      :key="index"
      :data="blog"
    ></the-member-job-item>
  </div>
</template>

<script setup lang="ts">
import { IResponse } from '~~/utils/interface';
const blogs = ref<
  {
    blogId: number;
    title: string;
    blogTags: string[];
    love: number;
    views: number;
  }[]
>([]);
const { data, error } = await useBaseFetch('/employers/profile/own-blogs', {});
if (error.value?.data) {
  throw error.value?.data;
} else {
  blogs.value = [];
  const response = data.value as IResponse;
  response.data.forEach((blog: any) => {
    blogs.value.push({
      blogId: blog?.id,
      title: blog?.title,
      blogTags: blog?.tags,
      love: blog?.countFavorite,
      views: blog?.view,
    });
  });
}
</script>

<style></style>
