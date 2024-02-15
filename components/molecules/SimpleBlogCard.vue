<template>
  <div class="cursor-pointer" @click="routerPush(`/employer/blog/${blog.id}`)">
    <el-card>
      <div class="relative">
        <div
          class="h-44 !bg-no-repeat !bg-center !bg-cover"
          :style="{ backgroundImage: `url(${blog.imgUrl})` }"
        ></div>
      </div>

      <div class="p-4">
        <div>
          <p class="font-bold">{{ blog.title }}</p>
        </div>
        <div class="top-4 left-4 right-4 flex justify-between items-start mt-2">
          <div class="flex">
            <div
              v-for="(tag, i) in blog.tags"
              :key="i"
              class="bg-white px-2 py-1 rounded border-[1px] border-primary mr-2"
            >
              <p class="text-primary text-xs">{{ tag }}</p>
            </div>
          </div>
        </div>
        <div
          class="my-4 text-sm truncate-texts ck-content ck-content-overview"
          v-html="blog.content"
        ></div>
        <div class="flex">
          <div
            v-if="blog.creator && blog.creator.avatarURL"
            class="rounded-full w-10 h-10 flex justify-center items-center border-[1px] border-gray-third mr-2"
          >
            <img class="rounded-full" :src="blog.creator.avatarURL" alt="" />
          </div>
          <div>
            <p v-if="blog.creator" class="text-xs pb-1">
              {{ blog.creator.firstName + ' ' + blog.creator.lastName }}
            </p>
            <p class="text-gray text-xs">
              {{ formatDate(new Date(), 'YYYY/MM/DD') }}
            </p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { formatDate } from '~/utils/helper';

const REMOVE_TAG_REGEX = /<\/?[^>]+>/gi;

const props = defineProps({
  blog: {
    type: Object,
    required: true,
  },
});

const description = computed(() => {
  const text = props.blog.content.replace(REMOVE_TAG_REGEX, '');

  if (text.length > 50) {
    return `${text.slice(0, 50)}...`;
  }

  return text;
});
</script>
<style lang="scss">
.truncate-texts {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  img {
    display: none;
  }
}
</style>
