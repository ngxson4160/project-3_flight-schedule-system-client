<template>
  <el-card
    class="box-card job-card hover:cursor-pointer"
    :class="props.class"
    :body-style="{ padding: '0px' }"
    @click="handleGoToJobDetail(data.id)"
  >
    <div
      class="mobile:p-4 card-wrapper"
      :class="[size === sizeCard.default ? 'p-6' : 'p-4']"
    >
      <div
        :class="[
          'card-job-header',
          'flex',
          'pc:gap-4',
          'mobile:gap-2',
          'mobile:flex-col',
          'mobile:flex-wrap',
          'relative',
          { 'mobile:pr-16': hideLogo },
          { 'flex-col': active || size === sizeCard.medium },
        ]"
      >
        <div
          v-if="!hideLogo && size !== sizeCard.small"
          :class="[
            'circle-logo',
            'mobile:w-[80px]',
            'mobile:h-[80px]',
            [size === sizeCard.medium ? 'pc:w-[80px]' : 'pc:w-[100px]'],
            [size === sizeCard.medium ? 'pc:h-[80px]' : 'pc:h-[100px]'],
            [{ 'p-2': !data.image.length }],
          ]"
        >
          <span
            class="w-full h-full bg-center bg-cover"
            :style="{
              'background-image': `url(${
                data.image.length ? data.image : defaultLogo
              })`,
            }"
          ></span>
        </div>
        <div class="font-bold text-black text-lg tracking-wider w-full">
          <p
            class="title text-overflow text-base"
            :class="[{ ' pc:pr-14': size === sizeCard.default && !isFavorite }]"
          >
            {{ data.title }}
          </p>
          <span
            v-if="size !== sizeCard.small"
            class="text-black font-normal text-sm mt-2 block whitespace-nowrap text-ellipsis overflow-hidden"
          >
            {{ jobData.province }}{{ jobData.businessCity }}
          </span>
        </div>
        <div
          v-if="size !== sizeCard.small"
          :class="['absolute', 'top-0', 'right-0', 'flex', 'gap-4']"
          @click.stop
        >
          <div
            v-if="showFavoriteBtn"
            :class="[
              'rounded-full',
              'w-10',
              'h-10',
              'overflow-hidden',
              { 'mobile:absolute': active },
              { 'mobile:top-0': active },
              { 'mobile:right-0': active },
            ]"
          >
            <div v-if="isFavorite">
              <button
                type="button"
                class="bg-none border-0 p-0 outline-0"
                @click="handDeleteFavoriteJob(data.id)"
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
                @click="handleAddFavoriteJob(data.id)"
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

          <div
            v-if="active"
            :class="['flex', 'gap-4', { 'mobile:hidden': active }]"
          >
            <button
              type="button"
              class="bg-primary text-sm leading-4 border-0 px-4 py-2 rounded-lg outline-0 flex gap-2 items-center text-white"
              @click="handleEditEntry"
            >
              <img src="~/assets/images/pen-small-white.svg" alt="" />
              エントリーフォーム
            </button>
          </div>
        </div>
      </div>
      <!-- FOR TAGS -->
      <div class="flex mt-4 gap-2 flex-wrap">
        <span v-if="categoryName" class="tag">{{ categoryName }}</span>
        <span v-if="data.employmentStatus" class="tag">
          {{ data.employmentStatus }}
        </span>
        <span
          v-for="tag in data.tags"
          v-show="size === sizeCard.default || !tag.isActive"
          :key="tag"
          class="tag active"
        >
          {{ tag }}
        </span>
      </div>
      <div v-if="size === sizeCard.default" class="mt-4 descriptions">
        <div class="text-black text-sm tracking-wider text-overflow">
          {{ data.descriptions }}
        </div>
      </div>
      <div
        v-if="size === sizeCard.default"
        class="text-sm mt-1 text-gray font-normal job-time"
      >
        <span v-if="data.end_date">
          【掲載期間】 {{ dateTimeFormat(data.start_date) }}〜{{
            dateTimeFormat(data.end_date)
          }}
        </span>
        <span v-else>【掲載期間】 {{ dateTimeFormat(data.start_date) }}</span>
      </div>
      <div v-if="active" class="pc:hidden mt-4">
        <button
          type="button"
          class="bg-primary text-sm leading-4 border-0 px-4 py-[20px] rounded-lg outline-0 flex gap-2 items-center justify-center text-white w-full"
          @click="handleEditEntry"
        >
          <img src="~/assets/images/pen-small-white.svg" alt="" />
          エントリーフォーム
        </button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import defaultLogo from '~/assets/images/default-logo-employer.svg';
import { useFavoriteStore } from '~/stores/useFavoriteStore';
import { ICity, IJobCategories } from '~~/utils/interface';
import { useUser } from '~~/composables/auth/useUser';
import { useEmployer } from '~~/composables/auth/useEmployer';

const favoriteStore = useFavoriteStore();

const { getJobCategoryById } = useCompositionMasterData();

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
  hiddenLogo: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  favoriteJob: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: () => '',
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  showFavoriteBtn: {
    type: Boolean,
    default: true,
  },
  cities: {
    type: Array as PropType<ICity[]>,
    default: () => [],
  },
  categories: {
    type: Array as PropType<IJobCategories[]>,
    default: () => [],
  },
});

const emits = defineEmits(['editEntry', 'event-delete', 'unregister']);
const data = reactive(props.jobData);
const isFavorite = ref<boolean>(props.favoriteJob);
watchEffect(() => {
  Object.assign(data, props.jobData);
  isFavorite.value = props.favoriteJob;
});
const size = ref<string>(props.size);
const hideLogo = ref<boolean>(props.hiddenLogo);
const active = ref<boolean>(props.active);

const handDeleteFavoriteJob = async (id: number) => {
  const data = await favoriteStore.deleteFavoriteJob(id);
  if (!data.error.value) {
    isFavorite.value = false;
    emits('event-delete');
  } else {
    emits('unregister');
  }
};
const cookieSessionAuth = useCookie('auth.session-token').value;
const handleAddFavoriteJob = async (id: number) => {
  if (cookieSessionAuth) {
    const data = await favoriteStore.addFavoriteJob(id);
    if (!data.error.value) {
      isFavorite.value = true;
    } else {
      console.log('error');
    }
  } else {
    emits('unregister');
  }
};

const cityName =
  typeof data.location === 'number'
    ? props.cities.find((el: ICity) => el.id === data.location)?.name
    : data.location;

const categoryName =
  typeof data.jobCategory === 'number'
    ? props.categories.find((el: IJobCategories) => el.id === data.jobCategory)
        ?.name
    : data.jobCategory;

const handleEditEntry = () => {
  emits('editEntry');
};
const handleGoToJobDetail = (id: number) => {
  const cookieSessionAuth = useCookie('auth.session-token').value;
  if (cookieSessionAuth) {
    const isUser = useUser();
    const isEmployer = useEmployer();
    if (isUser) return navigateTo(`/user/job/${id}`);
    if (isEmployer) return navigateTo(`/employer/job/${id}`);
  } else return navigateTo(`/job/${id}`);
};
</script>

<style lang="scss" scoped>
.text-overflow {
  -webkit-line-clamp: 3;
  &.title {
    -webkit-line-clamp: 2 !important;
  }
}
</style>
