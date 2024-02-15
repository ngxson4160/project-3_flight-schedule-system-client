<template>
  <div class="relative w-full overflow-hidden">
    <div
      class="flex justify-between items-center max-w-[1024px] mx-auto mobile:pl-6"
    >
      <div>
        <p class="text-[24px] font-bold">
          {{
            type === 'jobs-pickup'
              ? 'ピックアップ求人'
              : type === 'special-feature'
              ? '特集'
              : type === 'government-blog'
              ? '官公庁ブログ'
              : type === 'jobs-desired'
              ? '希望条件の求人'
              : type === 'jobs-latest'
              ? '新着求人'
              : ''
          }}
        </p>
        <p class="text-[14px] pt-1 mobile:hidden">
          {{
            type === 'jobs-pickup'
              ? 'パブリックコネクト編集部がピックアップした求人です。'
              : type === 'special-feature'
              ? 'まだ知らない官公庁の魅力を届けるパブリックコネクト編集部の記事です。'
              : type === 'government-blog'
              ? '官公庁の仕事や人、地域の魅力が詰まった官公庁が作成した記事です。'
              : type === 'jobs-desired'
              ? 'あなたが設定した希望条件に一致する求人です。'
              : type === 'jobs-latest'
              ? '新着求人情報をお届けします。'
              : ''
          }}
        </p>
      </div>
      <div class="flex items-center">
        <h1
          v-if="type === 'special-feature'"
          class="text-sm font-bold underline underline-offset-2 text-primary pr-8 mobile:pr-6 cursor-pointer"
          @click="handleNextPage(role)"
        >
          すべて見る
        </h1>

        <NuxtLink
          v-if="type === 'jobs-desired'"
          class="text-sm font-bold underline underline-offset-2 text-primary pr-8 mobile:pr-6"
          :to="{ path: '/user/search', query: { tab: 2 } }"
        >
          すべて見る
        </NuxtLink>
        <NuxtLink
          v-if="type === 'jobs-latest'"
          class="text-sm font-bold underline underline-offset-2 text-primary pr-8 mobile:pr-6"
          to="/search"
        >
          すべて見る
        </NuxtLink>
        <div class="flex mobile:hidden">
          <img
            v-if="slider && current > 0"
            src="~/assets/images/btn-circle-arrow-left-blue.svg"
            alt=""
            class="mx-4 hover:cursor-pointer"
            @click="slider.prev()"
          />
          <img
            v-else
            src="~/assets/images/btn-circle-arrow-left-white.svg"
            alt=""
            class="mx-4"
          />
          <img
            v-if="slider && current !== slider.track.details.slides.length - 3"
            src="~/assets/images/btn-circle-arrow-right-blue.svg"
            alt=""
            class="hover:cursor-pointer"
            @click="slider.next()"
          />
          <img
            v-else
            src="~/assets/images/btn-circle-arrow-right-white.svg"
            alt=""
          />
        </div>
      </div>
    </div>
    <div
      v-if="type === 'jobs-pickup' && jobsPickUp.length > 0"
      ref="container"
      class="keen-slider pt-6 pc:max-w-[1024px] max-w-[310px] mobile:pl-6 pc:mx-auto pb-6"
    >
      <div
        v-for="(item, index) in jobsPickUp"
        :key="index"
        class="keen-slider__slide slide-item"
      >
        <CardJobPickup
          :data="item.job"
          :is-favorite="isJobFavorite(Number(item.job.id))"
          @no-register="dialogAlert = true"
        />
      </div>
    </div>
    <div
      v-if="props.type === 'jobs-desired' && jobsDesired.length > 0"
      ref="container"
      class="keen-slider pt-6 pc:max-w-[1024px] max-w-[310px] mobile:pl-6 pc:mx-auto pb-6"
    >
      <div
        v-for="(job, index) in jobsDesired"
        :key="index"
        class="keen-slider__slide slide-item"
      >
        <CardJobPickup
          :data="job"
          :is-favorite="isJobFavorite(Number(job.id))"
          @no-register="dialogAlert = true"
        />
      </div>
    </div>
    <div
      v-if="props.type === 'jobs-latest' && jobsLatest.length > 0"
      ref="container"
      class="keen-slider pt-6 pc:max-w-[1024px] max-w-[310px] mobile:pl-6 pc:mx-auto pb-6"
    >
      <div
        v-for="(item, index) in jobsLatest"
        :key="index"
        class="keen-slider__slide slide-item"
      >
        <CardJobPickup
          :data="item.job"
          :is-favorite="isJobFavorite(Number(item.job.id))"
          @no-register="dialogAlert = true"
        />
      </div>
    </div>
    <div
      v-if="type === 'special-feature' && specialFeatures.length > 0"
      ref="container"
      class="keen-slider pt-6 pc:max-w-[1024px] max-w-[310px] mobile:pl-6 pc:mx-auto pb-6"
    >
      <div
        v-for="(specialFeature, index) in specialFeatures"
        :key="index"
        class="keen-slider__slide slide-item"
      >
        <CardSpecialFeature :data="specialFeature" />
      </div>
    </div>
    <div
      v-if="type === 'government-blog'"
      ref="container"
      class="keen-slider pt-6 pc:max-w-[1024px] max-w-[310px] mobile:pl-6 pc:mx-auto pb-6"
    >
      <div
        v-for="blog in blogPublic"
        :key="blog.id"
        class="keen-slider__slide slide-item"
      >
        <CardBlogGovernment
          :card-data="blog"
          :have-avatar="true"
          :is-favorite="isFavoriteBlog(blog.id)"
        />
      </div>
    </div>
  </div>
  <UnregisteredAlert
    v-model:dialog-visible="dialogAlert"
    @update-status="updateStatusAlert"
    @event-cancel="dialogAlert = false"
  />
</template>

<script lang="ts" setup>
import { useKeenSlider } from 'keen-slider/vue.es';
import 'keen-slider/keen-slider.min.css';
import {
  IDataCardSpecialFeature,
  IDataCardJobPickUp,
  IDataCardBlogPublic,
  IResponse,
  IBlogPubic,
  IBlogPublicResponse,
} from '~~/utils/interface';
import { useSpecialFeature } from '@/stores/specialFeatureAdmin';

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['noData']);
const current = ref<number>(0);
const [container, slider] = useKeenSlider({
  initial: current.value,
  slideChanged: (s) => {
    current.value = s.track.details.rel;
  },
  breakpoints: {
    '(min-width: 481px)': {
      slides: {
        perView: 3,
        spacing: 32,
      },
    },
    '(max-width: 480px)': {
      slides: {
        perView: 1,
        spacing: 16,
      },
    },
  },
});

// slides special feature
const specialFeatures = ref<IDataCardSpecialFeature[]>([]);
if (props.type === 'special-feature') {
  const { data, error } = await useBaseFetch('/special-features', {});
  if (error.value?.data) {
    throw error.value?.data;
  } else {
    const response = data.value as IResponse;
    response.data.specialFeatures.forEach((e: any) => {
      specialFeatures.value.push({
        id: e.id,
        imgUrl: e.imgUrl,
        title: e.title,
        tags: e.tags,
      });
    });
  }
}
// slides jobs pickup
const jobsPickUp = ref<{ job: IDataCardJobPickUp; isFavorite: boolean }[]>([]);
if (props.type === 'jobs-pickup') {
  const { data, error } = await useBaseFetch('/jobs/pickup', {});
  if (error.value?.data) {
    throw error.value?.data;
  } else {
    const response = data.value as IResponse;
    response.data.forEach((e: any) => {
      jobsPickUp.value.push({
        job: {
          id: e.id,
          imgUrl: e.creator.avatarURL,
          title: e.title,
          tags: [e.jobCategory?.name, e.employmentStatus],
          governmentOffice: e.creator?.governmentOffice?.name,
        },
        isFavorite: false,
      });
    });
  }
}

// slides jobs desired
const jobsDesired = ref<IDataCardJobPickUp[]>([]);

if (props.type === 'jobs-desired') {
  const { data: userData } = await useBaseFetch('/users/profile', {});
  const response = userData.value as IResponse;

  const { data: dataJob } = await useBaseFetch('/jobs/search', {
    query: {
      employmentStatus: response.data.desiredEmploymentStatus ?? undefined,
      governmentCategory:
        response.data.desiredWorkGovernmentOfficeCategory ?? undefined,
      'jobCategories[]': response.data.desiredJobCategory?.map((e: any) => {
        return e.jobCategory.id;
      }),
      page: 1,
      limit: 10,
    },
  });
  const responsejob = dataJob.value as IResponse;
  if (responsejob.data.jobs.length > 0) {
    responsejob.data.jobs.forEach((e: any) => {
      jobsDesired.value.push({
        id: e.id,
        imgUrl: e.creator.avatarURL,
        title: e.title,
        tags: [e.jobCategory?.name, e.employmentStatus],
        governmentOffice: e.creator?.government?.name,
      });
    });
  } else emit('noData');
}
// slides blog public

const blogPublic = ref<IDataCardBlogPublic[]>([]);
if (props.type === 'government-blog') {
  const { data, error } = await useBaseFetch('/blogs', {
    method: 'GET',
  });

  if (error.value) {
    openNotification(error.value.data.errorMessage);
  } else {
    const response = data.value as IResponse;
    const dataBlogs = response.data as IBlogPublicResponse;
    blogPublic.value = dataBlogs.blogs.map((e: IBlogPubic) => ({
      id: e.id,
      creatorId: e.creatorId,
      imgUrl: e.imgUrl || '',
      title: e.title || '',
      tags: e.tags || [],
      description: e.content || '',
      governmentOfficeName: e.creator.government?.name || '',
      governmentOfficeAvatar: e.creator.avatarURL,
      createdDate: e.createdTime || '',
      updatedTime: e.updatedTime || '',
    }));
  }
}
// slides jobs latest
const jobsLatest = ref<{ job: IDataCardJobPickUp; isFavorite: boolean }[]>([]);
if (props.type === 'jobs-latest') {
  const { data, error } = await useBaseFetch('/jobs/top', {});
  if (error.value?.data) {
    throw error.value?.data;
  } else {
    const response = data.value as IResponse;
    response.data.forEach((e: any) => {
      jobsLatest.value.push({
        job: {
          id: e.id,
          imgUrl: e.creator.avatarURL,
          title: e.title,
          tags: [e.jobCategory?.name, e.employmentStatus],
          governmentOffice: e.creator?.government?.name,
        },
        isFavorite: false,
      });
    });
  }
}

const dialogAlert = ref<boolean>(false);

const updateStatusAlert = (val: boolean) => {
  dialogAlert.value = val;
};
const { setPage } = useSpecialFeature();
const handleNextPage = (role: string) => {
  setPage(1);
  routerPush(`${role}/special-feature/list`);
};
</script>
<style lang="scss" scoped>
.keen-slider {
  overflow: unset;
}
.slide-item {
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  @apply rounded-xl;
}
.keen-slider:not([data-keen-slider-disabled]) {
  overflow: unset !important;
}
</style>
