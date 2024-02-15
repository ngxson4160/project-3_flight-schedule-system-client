<template>
  <div class="flex flex-col justify-center items-center">
    <HeaderFavorite class="w-full" />

    <div class="max-w-[1024px] w-full mb-[104px] mobile:px-6">
      <p v-if="!totalItem" class="text-center mt-[64px] mobile:mt-10">
        お気に入り登録しているムービーはありません。
      </p>
      <div class="pc:mt-16 mt-10">
        <div
          class="flex flex-wrap gap-x-8 pc:gap-y-10 gap-y-8 mobile:justify-center"
        >
          <div v-for="data in dataSource" :key="data.id" class="mobile:w-full">
            <CardImagesVideos
              class="!h-full"
              :blog="data.blog"
              :is-video-list="true"
              @click-detail="
                routerPush(
                  `/user/employer/${data.blog.creatorId}/blog/${data.blog.id}`,
                )
              "
            />
          </div>
        </div>
      </div>

      <Pagination
        v-if="showPanigation"
        class="mobile:justify-between mt-10"
        :current-page="currentPage"
        :total-items="totalItem"
        :page-size="pageSize"
        @set-current-page="setCurrentPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IFavoriteBlog } from '@/stores/userFavoriteBlogList';

interface Props {
  dataSource: IFavoriteBlog[];
  totalItem: number;
}

interface Emits {
  (event: 'change-page', page: number): void;
}
const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const { query } = useRoute();
const { page: _page } = query;
const page = Array.isArray(_page) ? _page[0] : _page;

/* Current Page */
const currentPage = ref<number>(page ? Number(page) : 1);
const pageSize = ref<number>(18);

const showPanigation = computed(() => {
  return props.totalItem / pageSize.value > 1;
});

/* Handle When Change Page */
const setCurrentPage = (page: number) => {
  currentPage.value = page;
  emit('change-page', page);
};
</script>

<!-- :router-blog="
            routerBlog({ employerId: data.creator?.id, idBlog: data.id })
          " -->
