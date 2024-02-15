<template>
  <div class="page-top">
    <div class="cover">
      <div class="pc:mt-16 mt-10">
        <div class="flex gap-4 items-center">
          <img
            src="~/assets/images/img-employer-blog-status-list-title.webp"
            alt=""
            class="w-[60px]"
          />
          <span
            class="inline-block font-bold text-2xl leading-[35px] tracking-wider text-black"
          >
            {{ props.titleFavorite }}
          </span>
        </div>
      </div>
    </div>
    <div v-if="isMenu" class="pc:pt-10 pt-4 border-b border-color-border">
      <div class="cover mobile:!px-6 w-full mobile:overflow-x-auto">
        <ul class="custom-nav-links flex">
          <li
            v-for="tab in tabLinks"
            :key="tab.url"
            class="inline-block flex-shrink-0"
          >
            <NuxtLink
              class="item cursor-pointer inline-block py-6 px-8 font-bold text-gray text-sm leading-6 tracking-wider mobile:px-3"
              :class="[{ 'is-active': tab.isActive }]"
              :to="tab.url"
            >
              {{ tab.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  titleFavorite: {
    type: String,
    default: 'お気に入り',
  },
  isMenu: {
    type: Boolean,
    default: true,
  },
});

const tabLinks = ref([
  {
    label: '求人',
    url: '/user/favorite/jobs',
    isActive: false,
  },
  {
    label: '官公庁・自治体',
    url: '/user/favorite/employers',
    isActive: false,
  },
  {
    label: 'ブログ',
    url: '/user/favorite/blog-images',
    isActive: false,
  },
  {
    label: 'ムービー',
    url: '/user/favorite/blog-videos',
    isActive: false,
  },
  {
    label: 'お知らせ',
    url: '/user/favorite/like-news',
    isActive: false,
  },
]);
</script>
