<template>
  <div class="font-normal text-sm flex pc:pt-8 pt-10 pc:pl-[208px] pl-6">
    <p
      class="text-primary underline hover:cursor-pointer"
      @click="routerPush(`/${role}`)"
    >
      ホーム
    </p>
    <img src="~/assets/images/icon-keyboard-arrow-right-black.svg" alt="" />
    <p>お知らせ</p>
  </div>
  <div class="pc:pt-16 pt-10 pc:w-[760px] w-[342px] mx-auto pb-[104px]">
    <div class="flex items-center">
      <img
        src="~/assets/images/img-employer-news-title.webp"
        alt=""
        class="w-[60px]"
      />
      <p class="ml-4 font-bold text-2xl">お知らせ</p>
    </div>
    <div
      v-if="notices.length === 0"
      class="pc:w-[760px] w-[342px] mt-16 text-center"
    >
      表示するお知らせがありません。
    </div>
    <div class="pt-6 pb-10">
      <div
        v-for="notice in notices"
        :key="notice.id"
        class="flex items-center pc:gap-4 gap-2 py-4 border-b-[1px] border-gray-third cursor-pointer"
        @click="handleGoToDetail(notice.id)"
      >
        <div class="flex-grow">
          <p class="font-normal text-sm pb-1">
            {{ notice.title }}
          </p>
          <div class="flex items-center gap-2">
            <p class="font-normal text-xs text-gray">
              {{ notice.createdTime }}
            </p>
            <div
              v-if="!notice.isSeen"
              class="text-xs font-bold px-2 py-[2px] rounded-[20px] bg-primary text-white"
            >
              <p class="h-[17px]">NEW</p>
            </div>
          </div>
        </div>
        <div class="flex items-center flex-shrink-0 gap-2">
          <img
            src="~/assets/images/icon-keyboard-arrow-right-black.svg"
            alt=""
            class=""
          />
        </div>
      </div>
    </div>
    <Pagination
      v-if="totalItems > 0"
      :current-page="currentPage"
      :total-items="totalItems"
      @set-current-page="setCurrentPage"
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { IResponse } from '~~/utils/interface';

const props = defineProps({
  role: {
    type: String,
    default: '',
  },
});

interface INotice {
  id: number;
  title: string;
  createdTime: string;
  isSeen: boolean;
}
const route = useRoute();
const notices = ref<INotice[]>([]);
const pageSize = 10;
const currentPage = ref<any>(1);
currentPage.value = route.query.page ? route.query.page : 1;
currentPage.value = parseInt(currentPage.value);

const totalItems = ref<number>(0);
const getDataNotices = async () => {
  onLoading();
  const { data, error } = await useBaseFetch(
    `/${props.role}s/profile/notices`,
    {
      query: {
        page: currentPage.value,
        limit: pageSize,
      },
    },
  );
  if (error.value?.data) {
    throw error.value?.data;
  } else {
    notices.value = [];
    const response = data.value as IResponse;
    if (response.data.length === 0) {
      closeLoading();
      return;
    } else {
      totalItems.value = response.data.totalCount;
      response.data.notices.forEach((notice: any) => {
        const createdTime = new Date(notice.publicationDate);
        notices.value.push({
          id: notice.id,
          title: notice.title,
          createdTime: dayjs(createdTime).format('YYYY/MM/DD'),
          isSeen: notice.isSeen,
        });
      });
    }
  }
  closeLoading();
};
const router = useRouter();
const query = { page: currentPage.value };
await getDataNotices();
const setCurrentPage = async (page: number) => {
  currentPage.value = page;
  query.page = currentPage.value;
  router.replace({ query });
  await getDataNotices();
  window.scrollTo(0, 0);
};

const handleGoToDetail = async (id: number) => {
  onLoading();
  const { error } = await useBaseFetch(
    `/${props.role}s/profile/notices/${id}`,
    {},
  );
  if (error.value?.data) {
    routerPush('/404');
    throw error.value?.data;
  } else {
    router.push({
      path: `/${props.role}/notice/${id}`,
      query: { page: currentPage.value },
    });
  }
  closeLoading();
};
</script>

<style scoped></style>
