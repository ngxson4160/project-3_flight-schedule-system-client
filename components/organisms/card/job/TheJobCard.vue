<template>
  <el-card
    class="box-card job-card hover:cursor-pointer"
    :class="props.class"
    :body-style="{ padding: '0px' }"
    @click="handleGoToJobDetail(data.id)"
  >
    <div
      class="mobile:p-4 card-wrapper"
      :class="[
        size === sizeCard.default ? 'p-6' : 'p-4',
        { 'flex flex-col justify-between h-full gap-2': props.typeJobRelate },
      ]"
    >
      <div>
        <p
          v-if="size === sizeCard.small || props.typeJobRelate"
          class="text-xs font-bold px-2 py-1 border border-gray-third rounded inline-block mb-2 break-words"
          :class="{ 'max-w-[240px] truncate': props.typeJobRelate }"
          :title="props.typeJobRelate ? categoryName : undefined"
        >
          {{ categoryName }}
        </p>
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
            v-if="!hideLogo && size !== sizeCard.small && !props.typeJobRelate"
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
              class="text-overflow text-base break-words"
              :class="[
                { ' pc:pr-14': size === sizeCard.default && !isFavorite },
                {
                  'h-[54px]': size === sizeCard.medium && !props.typeJobRelate,
                  '!text-sm': size === sizeCard.small,
                  'title ': size !== sizeCard.small && !props.typeJobRelate,
                  'max-w-[240px]': props.typeJobRelate,
                },
              ]"
            >
              {{ data.title }}
            </p>
            <span
              v-if="size !== sizeCard.small && !props.typeJobRelate"
              class="text-black font-normal text-sm mt-2 block whitespace-nowrap text-ellipsis overflow-hidden"
            >
              {{ cityName }}
            </span>
          </div>
          <div
            v-if="size !== sizeCard.small"
            :class="[
              'absolute',
              'top-0',
              'right-0',
              'flex',
              'gap-4',
              { '!-top-[40px]': props.typeJobRelate },
            ]"
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
                class="border-gray border-2 text-gray flex items-center px-4 rounded-lg font-bold"
                @click.stop
                @click="handleDeleteEntry"
              >
                <img src="~/assets/images/icon-delete-gray.svg" alt="" />
                削除
              </button>
              <button
                type="button"
                class="bg-primary text-sm leading-4 border-0 px-4 py-2 rounded-lg outline-0 flex gap-2 items-center text-white font-bold"
                @click.stop
                @click="handleEditEntry"
              >
                <img src="~/assets/images/pen-small-white.svg" alt="" />
                エントリーフォーム
              </button>
            </div>
          </div>
        </div>
        <!-- FOR TAGS -->
        <div
          v-if="!props.typeJobRelate"
          class="flex my-4 gap-2 flex-wrap"
          :class="{ '!mt-2 !mb-0': props.size === 'small' }"
        >
          <span
            v-if="
              categoryName && size !== sizeCard.small && !props.typeJobRelate
            "
            class="tag"
            :class="[
              {
                'pc:max-w-[128px] max-w-[108px] truncate':
                  size === sizeCard.medium,
              },
            ]"
          >
            {{ categoryName }}
          </span>
          <span
            v-if="data.employmentStatus && !props.typeJobRelate"
            class="tag"
            :class="[
              {
                'pc:max-w-[120px] max-w-[100px] truncate':
                  size === sizeCard.medium,
                'w-auto line-clamp-1 text-overflow !leading-[18px]':
                  size === sizeCard.small,
              },
            ]"
          >
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
        <div
          v-if="size === sizeCard.default && data.descriptions !== ''"
          class="flex"
        >
          <div class="w-full truncate-text text-sm break-all">
            【職務内容】 {{ data.descriptions }}
          </div>
        </div>
        <div
          v-if="size === sizeCard.default"
          class="text-sm mt-1 text-gray font-normal job-time"
        >
          <h1 v-if="data.end_date !== '--'">
            【掲載期間】 {{ dateTimeFormat(data.start_date) }}〜{{
              dateTimeFormat(data.end_date)
            }}
          </h1>
          <h1 v-else>【掲載期間】 {{ dateTimeFormat(data.start_date) }}</h1>
        </div>
        <div v-if="active" class="pc:hidden mt-4">
          <button
            type="button"
            class="bg-primary text-sm leading-4 border-0 px-4 py-[20px] rounded-lg outline-0 flex gap-2 items-center justify-center text-white w-full font-bold"
            @click.stop
            @click="handleEditEntry"
          >
            <img src="~/assets/images/pen-small-white.svg" alt="" />
            エントリーフォーム
          </button>
          <button
            type="button"
            class="border-gray border-2 text-gray flex items-center px-4 py-4 rounded-lg w-full mt-2 justify-center font-bold"
            @click.stop
            @click="handleDeleteEntry"
          >
            <img src="~/assets/images/icon-delete-gray.svg" alt="" />
            削除
          </button>
        </div>
      </div>
      <div v-if="props.typeJobRelate" class="flex items-center gap-1">
        <img
          :src="data.image"
          class="h-10 w-10 object-cover rounded-full border border-gray-third"
        />
        <p class="text-sm leading-[170%]">
          {{ data?.governmentOffice?.name }}
        </p>
      </div>
    </div>
  </el-card>
  <UnregisteredAlert
    v-model:dialog-visible="dialogAlert"
    @event-cancel="dialogAlert = false"
  />
</template>

<script setup lang="ts">
import defaultLogo from '~/assets/images/default-logo-employer.svg';
import { useFavoriteStore } from '~/stores/useFavoriteStore';
import { ICity, IJobCategories } from '~~/utils/interface';
import { useUser } from '~~/composables/auth/useUser';
import { useEmployer } from '~~/composables/auth/useEmployer';

const favoriteStore = useFavoriteStore();
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

  isGuest: {
    type: Boolean,
    default: false,
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
  typeJobRelate: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  'editEntry',
  'event-delete',
  'unregister',
  'deleteEntry',
]);

const dialogAlert = ref(false);
const data = ref(props.jobData);

watchEffect(() => {
  Object.assign(data.value, props.jobData);
});
watch(
  () => props.jobData,
  (newVal) => {
    if (newVal) {
      data.value = newVal;
    }
  },
);

const size = ref<string>(props.size);
const hideLogo = ref<boolean>(props.hiddenLogo);
const active = ref<boolean>(props.active);
const isFavorite = ref<boolean>(props.favoriteJob);

const handDeleteFavoriteJob = async (id: number) => {
  const data = await favoriteStore.deleteFavoriteJob(id);
  if (!data.error.value) {
    isFavorite.value = false;
    emit('event-delete');
  } else {
    emit('unregister');
  }
};

const isUser = ref<boolean>(useUser());
const isEmployer = ref<boolean>(useEmployer());

const role = computed(() => {
  if (isEmployer.value) return 'employer';
  if (isUser.value) return 'user';
  return 'guest';
});

const handleAddFavoriteJob = async (id: number) => {
  if (role.value === 'guest') {
    dialogAlert.value = true;
    emit('unregister');
  } else {
    isFavorite.value = true;
    await favoriteStore.addFavoriteJob(id);
  }
};

const cityName = computed(() => {
  return typeof data.value.location === 'number'
    ? props.cities.find((el: ICity) => el.id === data.value.location)?.name
    : data.value.location;
});

const categoryName = computed(() => {
  let jobNameCurrent;
  let jobName;
  if (typeof data.value.jobCategory === 'number') {
    props.categories.forEach((el: IJobCategories) => {
      jobNameCurrent = el.jobCategories.find(
        (el: any) => data.value.jobCategory === el.id,
      )?.name;
      if (jobNameCurrent) {
        jobName = jobNameCurrent;
      }
    });
  }
  if (jobName) return jobName;
  else return data.value.jobCategory;
});

const handleEditEntry = () => {
  emit('editEntry');
};
const handleDeleteEntry = () => {
  emit('deleteEntry');
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

.truncate-text {
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<style lang="scss">
.type-job-relate {
  height: 100% !important;
  .el-card__body {
    height: 100% !important;
  }
}
</style>
