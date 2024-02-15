<template>
  <div class="">
    <div class="flex justify-between pc:gap-4 gap-2 w-full">
      <div v-for="button in blogFilters" :key="button.value" class="w-full">
        <el-button
          :type="activeButton === button.value ? 'primary' : ''"
          class="flex-1 w-full"
          @click="handleActive(button.value)"
        >
          <p class="text-sm">{{ button.label }}</p>
        </el-button>
      </div>
    </div>

    <div v-if="totalItem">
      <div v-for="(blog, indexBlog) in dataSource" :key="blog.id">
        <CardBlogsEmployer
          class="mobile:hidden"
          :class="{
            'pc:pt-10 mobile:pt-8 mobile:pb-6': indexBlog === 0,
          }"
          :blog="blog"
          :show-content="!isMobile"
          @unregister="dialogUnregister = true"
          @handle-go-to-detail="
            routerPush(`/employer/${blog.creator.id}/blog/${blog.id}`)
          "
        />
        <CardBlogV2
          class="pc:hidden"
          :blog="blog"
          :show-new-icon-video="blog.typeBlog === EBlogFilter.VIDEO"
          @unregister="dialogUnregister = true"
          @handle-go-to-detail="
            routerPush(`/employer/${blog.creator.id}/blog/${blog.id}`)
          "
        />
      </div>
    </div>

    <CardEmptyDataList
      v-else
      :description-st="
        activeButton === EBlogFilter.ALL
          ? '表示するPRがありません。'
          : activeButton === EBlogFilter.IMAGE
          ? '表示するブログがありません。'
          : '表示するムービーがありません。'
      "
      description-snd="をお気に入り登録して新着通知を受け取りましょう。"
      :is-favorite="isFavorite"
      @favorite="emit('favorite')"
      @un-favorite="emit('un-favorite')"
    />

    <div v-if="totalItem && totalItem > 10" class="pc:my-10 mt-8">
      <Pagination
        :current-page="currentPage"
        :total-items="totalItem"
        :page-size="10"
        @set-current-page="setCurrentPage"
      />
    </div>
  </div>

  <UnregisteredAlert
    v-model:dialog-visible="dialogUnregister"
    @event-cancel="dialogUnregister = false"
  />
</template>

<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core';
import { EBlogFilter } from '@/utils/enum';

interface Props {
  dataSource: any;
  totalItem: number;
  isFavorite: boolean;
}

interface Emits {
  (event: 'change-page', page: number): void;
  (event: 'filter-type', typeId: number): void;
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

const { query } = useRoute();
const { page: _page, type: _type } = query;

const page = Array.isArray(_page) ? _page[0] : _page;
const active = Array.isArray(_type) ? _type[0] : _type;
const currentPage = ref<number>(page ? Number(page) : 1);
const activeButton = ref<number>(active ? Number(active) : 0);
const dialogUnregister = ref<boolean>(false);

const blogFilters = ref([
  { value: EBlogFilter.ALL, label: typeBlogFilter[EBlogFilter.ALL] },
  { value: EBlogFilter.IMAGE, label: typeBlogFilter[EBlogFilter.IMAGE] },
  { value: EBlogFilter.VIDEO, label: typeBlogFilter[EBlogFilter.VIDEO] },
]);

const setCurrentPage = (page: number) => {
  currentPage.value = page;
  emit('change-page', page);
};

const handleActive = (typeId: EBlogFilter) => {
  activeButton.value = typeId;
  emit('filter-type', typeId);
};
</script>

<style scoped></style>
