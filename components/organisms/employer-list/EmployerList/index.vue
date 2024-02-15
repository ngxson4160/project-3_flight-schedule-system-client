<template>
  <div class="flex flex-col justify-center items-center">
    <div class="max-w-[1024px] w-full mt-8 mb-[104px] mobile:px-6">
      <SearchEmployerList
        :screen-name="screenName"
        :page-name="pageName"
        @selected-city="handleSelectCity"
        @selected-name="handleSearchName"
      />

      <div class="my-10">
        <p v-if="totalItems" class="text-sm text-end">
          <span>全</span>
          <span class="font-bold">{{ totalItems }}</span>
          <span class="mr-2">件中</span>
          <span class="font-bold">{{ startItem }}</span>
          <span>-</span>
          <span class="font-bold">{{ endItem }}</span>
          <span>件</span>
        </p>
        <div
          class="flex flex-wrap gap-x-8 pc:gap-y-10 gap-y-8 mobile:justify-center mt-4"
          :class="{ 'mt-8': pageName === EPageName.EMPLOYER_LIST }"
        >
          <div v-for="data in dataSource" :key="data.id" class="mobile:w-full">
            <CardEmployerList
              v-if="pageName === EPageName.EMPLOYER_LIST"
              :employer="data"
              @click-detail="goToDetailEmployer(data.id)"
              @click-detail-item="goToDetailItem"
            />

            <CardImagesVideos
              v-else
              class="!h-full"
              :blog="data"
              :is-video-list="true"
              @click-detail="goToDetailBlog(data.creatorId, data.id)"
            />
          </div>
        </div>
      </div>

      <Pagination
        v-if="showPanigation"
        class="mobile:justify-between"
        :current-page="currentPage"
        :total-items="totalItem"
        :page-size="pageSize"
        @set-current-page="setCurrentPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { EPageName } from '~~/utils/enum';
import { IEmployerList } from '~/stores/employerList';
import { useUser } from '~~/composables/auth/useUser';

interface Props {
  screenName: string;
  pageName: EPageName;
  dataSource: IEmployerList[];
  totalItem: number;
}

interface Emits {
  (event: 'change-page', page: number): void;
  (event: 'selected-city', selected: string): void;
  (event: 'selected-name', name: string): void;
}
const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const { query } = useRoute();
const { page: _page } = query;
const page = Array.isArray(_page) ? _page[0] : _page;

/* Current Page */
const currentPage = ref<number>(page ? Number(page) : 1);
const pageSize = ref<number>(18);
const totalItems = ref(props.totalItem);
const startItem = computed(() => {
  return currentPage.value !== 1
    ? pageSize.value * (currentPage.value - 1) + 1
    : 1;
});
const endItem = computed(() => {
  return totalPage.value === currentPage.value
    ? totalItems.value
    : startItem.value + pageSize.value - 1;
});

const totalPage = ref<number>(Math.ceil(props.totalItem / pageSize.value));
watch(
  () => props.totalItem,
  (newValue) => {
    totalItems.value = newValue;
    totalPage.value = Math.ceil(newValue / pageSize.value);
  },
);

const goToDetailBlog = (employerId: number, blogId: number) => {
  if (useUser())
    return routerPush(`/user/employer/${employerId}/blog/${blogId}`);
  return routerPush(`/employer/${employerId}/blog/${blogId}`);
};

const goToDetailEmployer = (employerId: number) => {
  if (useUser()) return routerPush(`/user/employer/${employerId}`);
  return routerPush(`/employer/${employerId}`);
};

const goToDetailItem = (data: { id: number; lastEndPoint: string }) => {
  if (useUser())
    return routerPush(`/user/employer/${data.id}${data.lastEndPoint}`);
  return routerPush(`/employer/${data.id}${data.lastEndPoint}`);
};

/* Count Element in Range */
// const countItemInRange = (page: number) => {
//   if (props.dataSource && props.dataSource.length) {
//     startItem.value = page !== 1 ? pageSize.value * (page - 1) + 1 : 1;
//     endItem.value =
//       totalPage.value === page
//         ? props.totalItem
//         : startItem.value + pageSize.value - 1;
//   } else {
//     startItem.value = 0;
//     endItem.value = 0;
//   }
// };
// countItemInRange(currentPage.value);

const showPanigation = computed(() => {
  return props.totalItem / pageSize.value > 1;
});

/* Handle When Change Page */
const setCurrentPage = (page: number) => {
  currentPage.value = page;
  emit('change-page', page);
  // countItemInRange(page);
};

const handleSelectCity = (selected: string) => {
  currentPage.value = 1;
  emit('selected-city', selected);
  // countItemInRange(1);
};

const handleSearchName = (name: string) => {
  currentPage.value = 1;
  emit('selected-name', name);
  // countItemInRange(1);
};

// watch(
//   () => props.dataSource.length,
//   () => {
//     countItemInRange(currentPage.value);
//   },
// );
</script>
