<template>
  <div>
    <h3 class="text-sm font-bold text-gray pb-2">お知らせ</h3>
    <div
      v-for="news in props.newsList"
      :key="news.id"
      class="flex gap-4 items-center border-b border-color-border py-4 cursor-pointer"
      @click="emits('clickDetail', news.id)"
    >
      <div class="flex-grow">
        <div
          class="text-sm line-clamp-2 text-overflow break-all whitespace-pre-line leading-[170%]"
        >
          {{ news.title }}
        </div>
        <div class="flex gap-2 items-center mt-1">
          <h3 class="text-gray text-xs leading-[170%]">
            {{ formatDate(news.updatedTime, 'YYYY/M/D') }}
          </h3>
          <h3
            v-if="checkIsNew(news.updatedTime)"
            class="text-sm font-bold text-danger"
          >
            NEW
          </h3>
        </div>
      </div>
      <img
        src="~/assets/images/arrow_right_black_24.svg"
        alt=""
        class="flex-shrink-0"
      />
    </div>
    <nuxt-link :to="props.linkNewsList">
      <h3
        class="flex justify-end items-center justify-items-end text-primary font-bold text-sm cursor-pointer text-right mt-4 gap-1"
      >
        {{ props.role === 'EMPLOYER' ? 'お知らせ管理へ' : 'お知らせ一覧へ' }}
        <img
          src="~/assets/images/arrow-right-blue-24-large.svg"
          alt=""
          class="w-8 h-8"
        />
      </h3>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { INews } from '~/stores/useNewsStore';
const props = defineProps({
  newsList: {
    type: Array as PropType<INews[]>,
    default: () => [],
  },
  linkNewsList: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['clickDetail']);
</script>

<style></style>
