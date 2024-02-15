<template>
  <div class="flex justify-between w-full">
    <div class="w-full">
      <div v-if="totalItems">
        <div v-for="news in dataSource" :key="news.id">
          <EmployerNewsListItem
            :data="news"
            :role="role"
            is-not-creator
            is-new
            @detail="routerPush(`/employer/${news.creator.id}/news/${news.id}`)"
          />
        </div>
      </div>

      <CardEmptyDataList
        v-else
        description-st="表示するお知らせがありません。"
        description-snd="をお気に入り登録して新着通知を受け取りましょう。"
        :is-favorite="isFavorite"
        @favorite="emit('favorite')"
        @un-favorite="emit('un-favorite')"
      />

      <div v-if="totalItems && totalItems > 10" class="mt-10">
        <Pagination
          :current-page="currentPage"
          :total-items="totalItems"
          @set-current-page="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  dataSource: any;
  totalItems: number;
  isFavorite: boolean;
  role?: String;
}

interface Emits {
  (event: 'change-page', page: number): void;
  (event: 'favorite'): void;
  (event: 'un-favorite'): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
/*
GET Query
*/
const { query } = useRoute();
const { page: _page } = query;
const page = Array.isArray(_page) ? _page[0] : _page;
const currentPage = ref<number>(page ? Number(page) : 1);

const changePage = (page: number) => {
  currentPage.value = page;
  emit('change-page', page);
};
</script>

<style scoped></style>
