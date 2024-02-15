<template>
  <div class="relative mobile:w-full">
    <div
      v-if="employer.createdJobs"
      class="border border-solid border-primary bg-white rounded absolute transform translate-x-5 -translate-y-[16px]"
    >
      <p class="text-primary text-xs py-1 px-2">求人募集中</p>
    </div>
    <div
      class="w-full h-[240px] border border-solid border-gray-third rounded-xl p-4 pc:w-[320px] cursor-pointer"
      @click="emits('clickDetail')"
    >
      <div class="h-full flex flex-col justify-between">
        <div class="flex justify-between">
          <div class="flex items-center gap-2">
            <div
              class="bg-cover bg-white h-14 w-14 rounded-full bg-no-repeat bg-center border border-solid border-gray-third"
              :style="{
                'background-image': 'url(' + employer.avatarURL + ')',
              }"
            ></div>

            <p class="text-[18px] font-bold">
              {{ employer.governmentOffice.name }}
            </p>
          </div>

          <Favorite
            :is-favorite="isFavorite"
            :favorite-type="EFavoriteType.FAVORITE_EMPLOYER"
            @un-login="handleRequsetLogin"
            @favorite="handleFavorite"
            @un-favorite="handleUnFavorite"
          />
        </div>

        <div class="flex gap-2">
          <div
            v-for="tag in tags"
            :key="tag.data"
            class="bg-gray-third rounded px-2 py-1 flex items-center cursor-pointer"
            @click.stop
            @click="
              emits('clickDetailItem', {
                lastEndPoint: tag.lastEndPoint,
                id: employer.id,
              })
            "
          >
            <img v-if="tag.icon" :src="tag.icon" alt="" />
            <p class="text-xs">
              {{ tag.label }}
            </p>
          </div>
        </div>

        <div>
          <img
            :src="employer.backgroundURL"
            class="w-full h-[108px] rounded-lg object-cover"
          />
        </div>
      </div>
    </div>

    <UnregisteredAlert
      v-model:dialog-visible="dialogAlert"
      @event-cancel="dialogAlert = false"
    />
  </div>
</template>

<script setup lang="ts">
import IVideo from 'assets/images/icon-video.svg';
import IIMages from 'assets/images/icon-image.svg';
import INotice from 'assets/images/icon-notice.svg';
import { IEmployerList } from '~/stores/employerList';
import { useFavoriteStore } from '~/stores/useFavoriteStore';

interface Props {
  employer: IEmployerList;
}

const props = defineProps<Props>();

const initTags = [
  {
    label: 'お知らせ',
    data: props.employer.createdNewsList,
    icon: INotice,
    lastEndPoint: '/news/list',
  },
  {
    label: 'ブログ',
    data: props.employer.blogImage,
    icon: IIMages,
    lastEndPoint: '/blog/list?type=1',
  },
  {
    label: 'ムービー',
    data: props.employer.blogVideo,
    icon: IVideo,
    lastEndPoint: '/blog/list?type=2',
  },
];

const emits = defineEmits([
  'clickDetail',
  'clickDetailItem',
  'handleDeleteFavorite',
]);
const isFavorite = ref<boolean>(isFavoriteUser(Number(props.employer.id)));
const favoriteStore = useFavoriteStore();
const dialogAlert = ref<boolean>(false);
const tags = computed(() => {
  return initTags.filter((i) => i.data);
});

const handleRequsetLogin = () => {
  dialogAlert.value = true;
};

const handleFavorite = async () => {
  const { error } = await favoriteStore.addFavoriteEmployer(
    Number(props.employer.id),
  );
  if (!error.value) {
    isFavorite.value = true;
  } else {
    openNotification(error.value.data.errorMessage);
  }
};

const handleUnFavorite = async () => {
  const { error } = await favoriteStore.deleteFavoriteEmployer(
    Number(props.employer.id),
  );
  if (!error.value) {
    emits('handleDeleteFavorite');
    isFavorite.value = false;
  } else {
    openNotification(error.value.data.errorMessage);
  }
};
</script>
