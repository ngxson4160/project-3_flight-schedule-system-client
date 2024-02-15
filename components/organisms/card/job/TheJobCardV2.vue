<template>
  <el-card
    class="box-card job-card hover:cursor-pointer"
    :class="props.class"
    :body-style="{ padding: '0px' }"
    @click="emit('click-detail')"
  >
    <div class="p-4 card-wrapper relative">
      <div class="mb-5">
        <span
          class="text-xs font-bold border border-gray-third rounded-md px-2 py-1"
        >
          {{ jobData.jobCategory }}
        </span>
      </div>
      <div
        :class="[
          'absolute',
          'top-4 pc:top-6',
          'right-4 pc:right-6',
          'flex',
          'gap-4',
        ]"
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
        <p class="text-overflow line-clamp-2 font-bold text-base">
          {{ jobData.title }}
        </p>
      </div>
      <div
        :class="[
          'card-job-header',
          'flex',
          'gap-4',
          'mobile:items-center',
          'relative',
        ]"
      >
        <div class="circle-logo w-[60px] h-[60px]">
          <span
            class="w-full h-full bg-center bg-cover rounded-full"
            :style="{
              'background-image': `url(${
                jobData ? jobData.image : defaultLogo
              })`,
            }"
          ></span>
        </div>
        <div class="font-bold text-black text-lg tracking-wider w-full">
          <div class="pc:block mobile:hidden">
            <p class="title text-overflow line-clamp-3 text-base">
              {{ jobData.title }}
            </p>
          </div>
          <span
            class="text-black font-normal text-sm mobile:mt-0 mt-2 block whitespace-nowrap text-ellipsis overflow-hidden"
          >
            {{ jobData.governmentName }}
          </span>
        </div>
      </div>

      <div class="flex mt-4 gap-2 flex-wrap">
        <span class="tag">{{ jobData.employmentStatus }}</span>
        <span
          v-for="tag in jobData.appealPoint"
          v-show="size === sizeCard.default"
          :key="tag"
          class="tag active"
        >
          {{ tag }}
        </span>
        <span
          v-for="tag in jobData.tags"
          v-show="size === sizeCard.default || !tag.isActive"
          :key="tag"
          class="tag active"
        >
          {{ tag }}
        </span>
      </div>

      <div class="mt-4 descriptions">
        <div
          class="text-black text-sm tracking-wider text-overflow line-clamp-3"
        >
          【職務内容】 {{ jobData.descriptions }}
        </div>
      </div>

      <div class="text-sm mt-1 text-gray font-normal job-time">
        <span>
          【掲載期間】 {{ dateTimeFormat(jobData.start_date) }}〜
          {{
            jobData.hiringEndDate ? `${dateTimeFormat(jobData.end_date)}` : ''
          }}
        </span>
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

const emit = defineEmits(['event-delete', 'unregister', 'click-detail']);

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
  role: {
    type: String,
    default: () => 'guest',
  },
});

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

const isFavorite = ref<boolean>(props.favoriteJob);
</script>
