<template>
  <div
    v-if="role !== 'admin'"
    class="font-normal text-sm pc:pt-8 pt-10 pc:px-[208px] px-6"
  >
    <p
      class="text-primary underline whitespace-nowrap inline hover:cursor-pointer"
      @click="routerPush(`/${role}`)"
    >
      ホーム
    </p>
    <img
      src="~/assets/images/icon-keyboard-arrow-right-black.svg"
      alt=""
      class="inline"
    />
    <p
      class="text-primary underline whitespace-nowrap inline hover:cursor-pointer"
      @click="backToCurrentPage()"
    >
      お知らせ
    </p>
    <img
      src="~/assets/images/icon-keyboard-arrow-right-black.svg"
      alt=""
      class="inline"
    />
    <p class="inline">{{ noticeDetail?.title }}</p>
  </div>

  <div class="pc:pt-16 pt-10 pc:w-[760px] w-[342px] mx-auto pb-[104px]">
    <ul
      v-if="role === 'admin'"
      class="flex border-b-[1px] border-gray-third mb-10 items-center"
    >
      <li class="text-sm font-bold mb-6 tracking-[0.7px]">宛先</li>
      <li class="text-base font-normal mb-6 ml-4">
        {{ noticeDetail?.ENoticeType }}
      </li>
    </ul>
    <img
      :src="noticeDetail?.imgUrl"
      alt=""
      class="rounded-xl w-full max-h-[427px] mobile:max-h-[192px] object-cover"
    />
    <p class="font-bold pc:text-[32px] text-[20px] pt-10 tracking-wider">
      {{ noticeDetail?.title }}
    </p>
    <div class="pt-4 flex items-center pb-10 border-b-[1px] border-gray-third">
      <div
        class="w-[60px] h-[60px] rounded-full border-[1px] border-gray-third flex items-center justify-center overflow-hidden"
      >
        <img
          :src="noticeDetail?.creator?.avatarURL"
          alt=""
          class="w-full h-full object-cover"
        />
      </div>
      <div class="pl-4">
        <p class="uppercase pb-2">Public Connect</p>
        <p class="text-sm text-gray">{{ createdTime }}</p>
      </div>
    </div>
    <div
      class="whitespace-pre-line pt-16 ck-content ck-content-view-detail ck-content-notice"
      v-html="noticeDetail?.content"
    ></div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { IResponse, INoticeDetail } from '~~/utils/interface';
const props = defineProps({
  role: {
    type: String,
    default: '',
  },
  dataNoti: {
    type: Object,
    default: () => {},
  },
});
const route = useRoute();
const noticeId = route.params.id;

const noticeDetail = ref<INoticeDetail>();
const createdTime = ref<string>();

const { data, error } = await useBaseFetch(
  props.role === 'admin'
    ? `/admins/notices/${noticeId}`
    : `/${props.role}s/profile/notices/${noticeId}`,
  {},
);
if (error?.value?.data) {
  routerPush('/404');
  throw error?.value?.data;
} else {
  const response = data.value as IResponse;
  noticeDetail.value = response.data;
  if (props.role === 'admin') Object.assign(props.dataNoti, response.data);
  const time = new Date(response.data.publicationDate);
  createdTime.value = dayjs(time).format('YYYY/MM/DD');
}
const pageIndex = route.query.page ? route.query.page : 1;
const router = useRouter();
const backToCurrentPage = () => {
  router.push({
    path: `/${props.role}/notice/list`,
    query: { page: pageIndex },
  });
};
</script>

<style scoped></style>
