<template>
  <div class="w-full slides-top-page">
    <swiper
      ref="swiperRef"
      :effect="'coverflow'"
      :centered-slides="true"
      :slides-per-view="'auto'"
      :coverflow-effect="{
        rotate: 0,
        stretch: 0,
        depth: 80,
        modifier: 1,
        slideShadows: false,
      }"
      :navigation="true"
      :modules="modules"
      :autoplay="{
        delay: 7000,
        disableOnInteraction: false,
      }"
      :loop="true"
      :space-between="spaceBetweenSlide"
      class="mySwiper relative"
    >
      <swiper-slide v-for="(slide, index) in props.slidesData" :key="index">
        <div class="rounded-xl relative">
          <div class="background-item rounded-xl relative">
            <img
              :src="slide.imgUrl"
              class="w-full h-full object-cover rounded-xl"
              :class="{ 'cursor-pointer': slide.url }"
              @click="handleClickImage(slide.url)"
            />
            <!-- <div
              class="absolute pc:top-[48px] top-[16px] w-full flex flex-col items-center !hidden"
            >
              <p class="font-bold text-white pc:text-[24px] text-[10px]">
                日本中の官公庁・自治体の求人に出会える
              </p>
              <p
                class="font-bold text-white pc:text-[56px] text-[24px] pc:mt-2 mt-1"
              >
                行政の仕事で見つける生き方
              </p>
              <el-button
                type="primary"
                class="pc:mt-6 mt-2 pc:w-[256px] w-[164px] mobile:!h-[44px] !hidden"
              >
                <p class="mobile:text-[10px]">詳しい情報をチェック</p>
              </el-button>
            </div> -->
          </div>
          <!-- <div
            class="flex items-center justify-center gap-2 infor-creator rounded-b-xl bg-white !hidden"
          >
            <img
              src="https://public-connect-staging-assets.s3.ap-northeast-1.amazonaws.com/a9281573-0dbc-4162-905f-4e7d3188f690-fcb167c9-bd3b-45cd-9faf-57f6bbf5c6a9-logo_doc%20%281%29.png"
              class="pc:w-[60px] w-[32px] pc:h-[60px] h-[32px] rounded-full border border-gray-third"
            />
            <p class="font-bold mobile:text-[10px]">Public Connect</p>
          </div> -->
        </div>
      </swiper-slide>
      <div
        v-if="props.slidesData.length > 1"
        class="left-button absolute z-[999] translate-x-[-50%] translate-y-[-50%] top-1/2 mobile:w-8 mobile:h-8 bg-[#333333e6] justify-center cursor-pointer w-14 h-14 flex items-center transition-all !duration-500 rounded-full opacity-80 hover:opacity-100"
        @click="goToPrevSlide"
      >
        <img class="" src="~/assets/images/arrow-left-white-40.svg" />
      </div>
      <div
        v-if="props.slidesData.length > 1"
        class="right-button absolute z-[999] translate-x-[50%] translate-y-[-50%] top-1/2 w-14 h-14 mobile:w-8 mobile:h-8 justify-center bg-[#333333e6] flex items-center cursor-pointer transition-all !duration-500 rounded-full opacity-80 hover:opacity-100"
        @click="goToNextSlide"
      >
        <img class="" src="~/assets/images/arrow-right-white-40.svg" />
      </div>
    </swiper>
  </div>
</template>
<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useWindowSize } from '@vueuse/core';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';

import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Navigation,
} from 'swiper/modules';

const props = defineProps({
  slidesData: {
    type: Array as () => { imgUrl: string; url: string }[],
    default: () => [],
  },
});

const modules = [EffectCoverflow, Pagination, Autoplay, Navigation];

const spaceBetweenSlide = ref(72);

const swiperRef = ref();
const goToNextSlide = () => {
  swiperRef.value.$el.swiper.slideNext();
};
const goToPrevSlide = () => {
  swiperRef.value.$el.swiper.slidePrev();
};
onMounted(() => {
  const { width } = useWindowSize();
  if (width.value < 481) spaceBetweenSlide.value = 20;

  window.onresize = function (event) {
    if (width.value < 481) spaceBetweenSlide.value = 20;
    else spaceBetweenSlide.value = 72;
  };
});
const handleClickImage = (url: string) => {
  if (url) window.open(url, '_blank');
};
</script>

<style lang="scss">
.slides-top-page {
  .swiper-slide {
    @apply pc:w-[1024px] w-[358px] rounded-xl;
    .background-item {
      @apply pc:h-[384px] h-[162px];
    }
  }
  .swiper-slide-active {
    .background-item {
      @apply pc:h-[384px] h-[162px];
    }
    .infor-creator {
      @apply pc:h-[76px] h-[40px];
    }
  }
  .swiper-slide-prev,
  .swiper-slide-next {
    @apply pc:mt-4 mt-2 #{!important};
    .background-item {
      @apply pc:h-[316px] h-[141px] #{!important};
    }
    .infor-creator {
      @apply pc:h-[72px] h-[36px] #{!important};
    }
  }
}
.left-button {
  left: calc(50% - 504px);
}

.right-button {
  right: calc(50% - 504px);
}
@media (max-width: 480px) {
  .left-button {
    left: calc(50% - 171px) !important;
  }

  .right-button {
    right: calc(50% - 171px) !important;
  }
}
</style>
