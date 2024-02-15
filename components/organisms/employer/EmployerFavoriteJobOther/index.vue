<template>
  <div class="flex flex-col gap-8 w-[1056px]">
    <HeaderFavorite :title-favorite="headerFavorite" :is-menu="isMenu" />
    <div
      class="flex pc:flex-wrap mobile:flex-col mobile:justify-center gap-8 pc:px-4 px-6"
    >
      <div
        v-for="(data, index) in dataSource"
        :key="index"
        class="pc:w-[320px] w-full"
      >
        <CardJobEmployer
          :job="data.job"
          show-favorite
          @click-card="routerPush(`/employer/job/${data.job?.id}`)"
        />
      </div>
    </div>

    <Pagination
      v-if="showPagination"
      class="mobile:justify-between pc:px-4 px-6"
      :current-page="currentPage"
      :total-items="totalItem"
      :page-size="pageSize"
      @set-current-page="setCurrentPage"
    />
  </div>
</template>

<script setup lang="ts">
import { IJobDetail } from '@/stores/employerProfileJobs';

interface Props {
  totalItem: number;
  dataSource: { job: IJobDetail }[];
}

interface Emits {
  (event: 'change-page', page: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const headerFavorite = ref<string>('お気に入り求人');
const isMenu = ref<boolean>(false);
const pageSize = ref<number>(18);

const { query } = useRoute();
const { page: _page } = query;
const page = Array.isArray(_page) ? _page[0] : _page;
const currentPage = ref<number>(page ? Number(page) : 1);

const showPagination = computed(() => {
  return props.totalItem / pageSize.value > 1;
});

const setCurrentPage = (page: number) => {
  currentPage.value = page;
  emit('change-page', page);
};
</script>
