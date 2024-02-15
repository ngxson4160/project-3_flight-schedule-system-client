<template>
  <div
    class="hover:cursor-pointer border border-solid border-color-border rounded-lg p-6 mobile:p-4"
    :class="props.class"
    @click="emit('click-detail')"
  >
    <div class="card-wrapper relative">
      <div class="pc:mb-4 mb-2 pc:pr-12 pr-[44px]">
        <p
          class="text-xs font-bold border border-gray-third rounded px-2 py-1 mobile:max-w-[252px] inline-block"
        >
          {{ jobData.jobCategory.name }}
        </p>
      </div>

      <div
        :class="['absolute', 'top-0', 'right-0', 'flex', 'gap-4']"
        @click.stop
      >
        <div
          v-if="showFavoriteBtn"
          :class="['rounded-full', 'w-10', 'h-10', 'top-0', 'overflow-hidden']"
        >
          <div v-if="isFavorite">
            <button
              type="button"
              class="bg-none border-0 p-0 outline-0"
              @click="handDeleteFavoriteJob(jobData.id)"
            >
              <span>
                <img src="~/assets/images/book-mark-blue.svg" alt="" />
              </span>
            </button>
          </div>
          <div v-else>
            <button
              type="button"
              class="bg-none border-0 p-0 outline-0"
              @click="handleAddFavoriteJob(jobData.id)"
            >
              <img src="~/assets/images/book-mark-gray.svg" alt="" />
            </button>
          </div>
          <button type="button" class="bg-none border-0 p-0 outline-0">
            <span v-if="!props.favoriteJob">
              <img src="~/assets/images/book-mark-gray.svg" alt="" />
            </span>
            <span v-else>
              <img src="~/assets/images/book-mark-blue.svg" alt="" />
            </span>
          </button>
        </div>
      </div>
      <div class="pc:hidden">
        <p
          class="text-overflow line-clamp-3 font-bold text-[18px] label-custom-break-line pc:pr-12 pr-[44px]"
        >
          {{ jobData.title }}
        </p>
      </div>
      <div
        class="mobile:mt-2 pc:pr-12 pr-[44px]"
        :class="[
          'card-job-header',
          'flex',
          'gap-4',
          'mobile:items-center',
          'relative',
          `${pageCreateFinished ? '' : 'mobile:gap-x-1'}`,
        ]"
      >
        <div
          :class="`circle-logo ${
            pageCreateFinished
              ? 'pc:w-[62px] pc:h-[62px] mobile:w-[34px] mobile:h-[34px]'
              : 'w-[62px] h-[62px] mobile:w-[42px] mobile:h-[42px]'
          }`"
        >
          <span
            class="w-full h-full bg-center bg-cover rounded-full"
            :style="{
              'background-image': `url(${
                jobData ? jobData.creator.avatarURL : defaultLogo
              })`,
            }"
          ></span>
        </div>
        <div class="font-bold text-black text-lg tracking-wider w-full">
          <div class="pc:block mobile:hidden">
            <p
              class="title text-overflow line-clamp-3 text-[20px] label-custom-break-line"
            >
              {{ jobData.title }}
            </p>
          </div>
          <span
            class="text-black font-normal pc:text-base text-sm mobile:mt-0 mt-2 block whitespace-nowrap text-ellipsis overflow-hidden leading-[170%]"
          >
            {{
              jobData.creator?.governmentOffice?.name ??
              jobData.creator?.government?.name
            }}
          </span>
        </div>
      </div>

      <div ref="elementParentTagList" class="flex mt-4 gap-2 flex-wrap">
        <span ref="elementStatusTag" class="tag">
          {{ jobData.employmentStatus }}
        </span>
        <span
          v-for="tag in jobData.appealPoint"
          v-show="size === sizeCard.default"
          :key="tag"
          :ref="(el) => itemRefs.push(el)"
          class="tag active"
        >
          {{ tag }}
        </span>
        <span v-if="isShowEllipsis" class="tag active">...</span>
      </div>

      <div v-if="!props.isTypeJobEntryDraft" class="mt-4 descriptions">
        <div
          class="text-black text-sm tracking-wider text-overflow leading-[170%]"
          :class="{ 'line-clamp-3': isMobile, 'line-clamp-2': !isMobile }"
        >
          【職務内容】{{ jobData.duty }}
        </div>
      </div>

      <div
        class="text-sm mt-1 text-[#858585] font-normal job-time leading-[170%]"
        :class="{ '!mt-4': props.isTypeJobEntryDraft }"
      >
        <span v-if="jobData.hiringEndDate">
          【掲載期間】 {{ dateTimeFormat(jobData.hiringStartDate) }}〜{{
            dateTimeFormat(jobData.hiringEndDate)
          }}
        </span>
        <span v-else>
          【掲載期間】 {{ dateTimeFormat(jobData.hiringStartDate) }}〜
        </span>
      </div>
      <div
        v-if="props.isTypeJobEntryDraft"
        class="mt-4 border-t border-gray-third pt-4 flex pc:gap-4 gap-2 mobile:flex-col"
      >
        <button
          type="button"
          class="bg-primary text-sm border-0 px-4 rounded-lg flex pc:gap-1 gap-2 items-center justify-center text-white font-bold pc:h-10 h-[44px] mobile:w-full"
          @click.stop="emit('handleEditEntry')"
        >
          <img src="~/assets/images/pen-small-white.svg" alt="" />
          エントリーフォーム
        </button>
        <button
          type="button"
          class="border-gray border-2 text-gray flex items-center px-4 rounded-lg justify-center font-bold pc:gap-1 gap-2 pc:order-first pc:h-10 h-[44px] mobile:w-full"
          @click.stop="emit('handleDeleteEntry')"
        >
          <img src="~/assets/images/icon-delete-gray.svg" alt="" />
          削除
        </button>
      </div>
    </div>
  </div>
  <UnregisteredAlert
    v-model:dialog-visible="dialogAlert"
    @event-cancel="dialogAlert = false"
  />
</template>

<script setup lang="ts">
import defaultLogo from '~/assets/images/default-logo-employer.svg';
import { useFavoriteStore } from '~/stores/useFavoriteStore';

const emit = defineEmits([
  'event-delete',
  'unregister',
  'click-detail',
  'handleEditEntry',
  'handleDeleteEntry',
]);

enum sizeCard {
  default = 'default',
  medium = 'medium',
  small = 'small',
}
const props = defineProps({
  jobData: {
    type: Object,
    default: () => {},
  },
  size: {
    type: String,
    default: 'default',
  },
  favoriteJob: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: () => '',
  },
  showFavoriteBtn: {
    type: Boolean,
    default: true,
  },
  pageCreateFinished: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: () => 'guest',
  },
  isTypeJobEntryDraft: {
    type: Boolean,
    default: false,
  },
});

const elementParentTagList = ref();
const elementStatusTag = ref();
const itemRefs = ref<any>([]);
const isShowEllipsis = ref(false);

onMounted(() => {
  const line = window.screen.width <= 481 ? 2 : 1;
  const widthParent = elementParentTagList.value.clientWidth + 1;
  let widthChild = elementStatusTag.value.clientWidth + 1;
  itemRefs.value.forEach((item: any, index: number) => {
    if (
      widthChild < widthParent &&
      widthChild + item.clientWidth + 9 > widthParent
    ) {
      widthChild = widthParent + item.clientWidth + 9;
    } else {
      widthChild += item.clientWidth + 9;
    }
    if (widthChild > widthParent * line) {
      item.style.display = 'none';
      isShowEllipsis.value = true;
    }
    if (
      widthParent * line - widthChild - 8 < 29 &&
      index !== itemRefs.value.length
    ) {
      item.style.display = 'none';
      isShowEllipsis.value = true;
    }
  });
});

// Breakpoints Mobile
const breakpoints = useBreakpoints({
  mobile: 0,
  desktop: 481,
});
const isMobile = breakpoints.between('mobile', 'desktop');

const favoriteStore = useFavoriteStore();
const size = ref<string>(props.size);

const jobData = props.jobData;
const dialogAlert = ref(false);

const handDeleteFavoriteJob = async (id: number) => {
  const data = await favoriteStore.deleteFavoriteJob(id);
  if (!data.error.value) {
    isFavorite.value = false;
    emit('event-delete');
  } else {
    emit('unregister');
  }
};

const handleAddFavoriteJob = async (id: number) => {
  if (props.role === 'guest') {
    dialogAlert.value = true;
    emit('unregister');
  } else {
    isFavorite.value = true;
    await favoriteStore.addFavoriteJob(id);
  }
};

const isFavorite = ref<boolean>(isJobFavorite(Number(props.jobData?.id)));
</script>
