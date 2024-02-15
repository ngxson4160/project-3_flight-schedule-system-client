<template>
  <div
    class="box-card job-card border border-gray-third rounded-lg cursor-pointer"
    :body-style="{ padding: '0px' }"
    @click="emit('goToDetail')"
  >
    <div
      class="mobile:p-4 card-wrapper relative"
      :class="[size === sizeCard.default ? 'p-6' : 'p-4']"
    >
      <p
        class="text-[12px] font-bold border border-gray-third rounded inline-block px-2 py-1"
      >
        {{ data.job.jobCategory.name }}
      </p>
      <div class="pc:hidden">
        <p
          class="text-overflow line-clamp-3 pc:text-[20px] text-[18px] font-bold mt-2 max-w-[264px]"
          :class="[
            { ' pc:pr-14': size === sizeCard.default && !isFavorite },
            { 'h-[54px]': size === sizeCard.medium },
          ]"
        >
          {{ data.job.title }}
        </p>
        <div class="mt-2 flex gap-1 items-center">
          <div
            v-if="!hideLogo && size !== sizeCard.small"
            :class="[
              'circle-logo',
              'pc:w-[60px] mobile:w-[40px]',
              'pc:h-[60px] mobile:h-[40px]',
              [{ 'p-2': !data.job.creator.avatarURL }],
            ]"
          >
            <span
              class="w-full h-full bg-center bg-cover"
              :style="{
                'background-image': `url(${
                  data.job.creator.avatarURL ?? defaultLogo
                })`,
              }"
            ></span>
          </div>
          <p
            v-if="size !== sizeCard.small"
            class="text-black font-normal text-xs whitespace-nowrap text-ellipsis overflow-hidden"
          >
            {{ data.job.creator.governmentOffice.name }}
          </p>
        </div>
      </div>
      <div
        :class="[
          'card-job-header',
          'flex mt-4 mobile:hidden',
          'pc:gap-4',
          'mobile:gap-2',
          'mobile:flex-col',
          'mobile:flex-wrap',
          'relative',
          { 'mobile:pr-16': hideLogo },
        ]"
      >
        <div
          v-if="!hideLogo && size !== sizeCard.small"
          :class="[
            'circle-logo',
            'pc:w-[60px] mobile:w-[40px]',
            'pc:h-[60px] mobile:h-[40px]',
            [{ 'p-2': !data.job.creator.avatarURL }],
          ]"
        >
          <span
            class="w-full h-full bg-center bg-cover"
            :style="{
              'background-image': `url(${
                data.job.creator.avatarURL ?? defaultLogo
              })`,
            }"
          ></span>
        </div>
        <div class="font-bold text-black text-lg tracking-wider w-full">
          <p
            class="text-overflow line-clamp-1 pc:text-[20px] text-[18px]"
            :class="[
              { ' pc:pr-14': size === sizeCard.default && !isFavorite },
              { 'h-[54px]': size === sizeCard.medium },
            ]"
            :title="data.job.title"
          >
            {{ data.job.title }}
          </p>
          <span
            v-if="size !== sizeCard.small"
            class="text-black font-normal text-sm mt-2 block whitespace-nowrap text-ellipsis overflow-hidden"
          >
            {{ data.job.creator.governmentOffice.name }}
          </span>
        </div>
      </div>
      <div
        v-if="size !== sizeCard.small"
        :class="[
          'absolute',
          'top-6 mobile:top-4',
          'right-6 mobile:right-4',
          'flex',
          'gap-4',
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

        <!-- <div
            v-if="active"
            :class="['flex', 'gap-4', { 'mobile:hidden': active }]"
          >
            <button
              type="button"
              class="border-gray border-2 text-gray flex items-center px-4 rounded-lg font-bold"
              @click.stop
              @click="handleDeleteEntry"
            >
              <img src="~/assets/images/alarm.svg" alt="" />
              <p class="ml-2">選考に関するお知らせがあります</p>
            </button>
            <button
              type="button"
              class="bg-primary text-sm leading-4 border-0 px-4 py-2 rounded-lg outline-0 flex gap-2 items-center text-white font-bold"
              @click.stop
              @click="handleDetailJobApplicant"
            >
              <img src="~/assets/images/icon-download-pdf.svg" alt="" />
              受験票を出力
            </button>
          </div> -->
      </div>
      <!-- FOR TAGS -->
      <div class="flex my-4 gap-2 flex-wrap">
        <span
          v-if="data.job.jobCategory.name"
          class="tag"
          :class="[
            {
              'pc:max-w-[128px] max-w-[108px] truncate':
                size === sizeCard.medium,
            },
          ]"
        >
          {{ data.job.jobCategory.name }}
        </span>
        <span
          v-if="data.job.employmentStatus"
          class="tag"
          :class="[
            {
              'pc:max-w-[120px] max-w-[100px] truncate':
                size === sizeCard.medium,
            },
          ]"
        >
          {{ data.job.employmentStatus }}
        </span>
        <span
          v-for="tag in data.job.appealPoint"
          v-show="size === sizeCard.default || !tag.isActive"
          :key="tag"
          class="tag active"
        >
          {{ tag }}
        </span>
      </div>
      <!-- <div
        v-if="size === sizeCard.default && data.job.duty !== ''"
        class="flex"
      >
        <div class="w-full truncate-text text-sm break-all">
          【職務内容】 {{ data.job.duty }}
        </div>
      </div> -->
      <div
        v-if="size === sizeCard.default"
        class="text-sm text-gray font-normal job-time pb-4 border-b border-color-border"
      >
        <h1 v-if="data.job.hiringEndDate !== '--'">
          【掲載期間】 {{ dateTimeFormat(data.job.hiringStartDate) }}〜{{
            dateTimeFormat(data.job.hiringEndDate)
          }}
        </h1>
        <h1 v-else>
          【掲載期間】 {{ dateTimeFormat(data.job.hiringStartDate) }}
        </h1>
      </div>
      <div v-if="active" class="mt-4 flex pc:gap-4 mobile:flex-col">
        <button
          type="button"
          class="bg-primary text-sm leading-4 border-0 px-4 h-10 rounded-lg outline-0 flex gap-2 items-center justify-center text-white font-bold"
          @click.stop
          @click="
            routerPush(
              `/user/message/${jobData.applicantEntry.settingInterview.boxId}?tabName=entryInformation&&from=entry`,
            )
          "
        >
          エントリー内容
        </button>
        <button
          type="button"
          class="bg-primary text-sm leading-4 border-0 mobile:mt-2 px-4 h-10 rounded-lg outline-0 flex gap-2 items-center justify-center text-white font-bold"
          @click.stop
          @click="routerPush(`/user/job-applicant/${data.id}`)"
        >
          受験票
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
});
const emit = defineEmits([
  'goToDetail',
  'event-delete',
  'unregister',
  'deleteEntry',
]);
const dialogAlert = ref(false);
const data = ref(props.jobData);
watchEffect(() => {
  Object.assign(data.value, props.jobData);
});
// watch(
//   () => props.jobData,
//   (newVal) => {
//     if (newVal) {
//       data.value = newVal;
//     }
//   },
// );
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
// const categoryName = computed(() => {
//   let jobNameCurrent;
//   let jobName;
//   if (typeof data.value.jobCategory === 'number') {
//     props.categories.forEach((el: IJobCategories) => {
//       jobNameCurrent = el.jobCategories.find(
//         (el: any) => data.value.jobCategory === el.id,
//       )?.name;
//       if (jobNameCurrent) {
//         jobName = jobNameCurrent;
//       }
//     });
//   }
//   if (jobName) return jobName;
//   else return data.value.jobCategory;
// });
const handleDetailJobApplicant = () => {
  emit('goToDetail');
};
// const handleDeleteEntry = () => {
//   emit('deleteEntry');
// };
// const handleGoToJobDetail = (id: number) => {
//   const cookieSessionAuth = useCookie('auth.session-token').value;
//   if (cookieSessionAuth) {
//     const isUser = useUser();
//     const isEmployer = useEmployer();
//     if (isUser) return navigateTo(`/user/job/${id}`);
//     if (isEmployer) return navigateTo(`/employer/job/${id}`);
//   } else return navigateTo(`/job/${id}`);
// };
</script>

<style lang="scss" scoped></style>
