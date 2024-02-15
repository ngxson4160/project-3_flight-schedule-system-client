<template>
  <div
    class="pc:w-[320px] h-auto w-full rounded-xl !relative shadow-base cursor-pointer"
  >
    <Favorite
      v-if="!isEdit && !isVideoList"
      class="absolute right-4 top-5 z-[1]"
      :is-favorite="isFavorite"
      :is-class="'absolute right-4 top-5 z-[1]'"
      :favorite-type="EFavoriteType.FAVORITE_BLOG"
      @un-login="handleRequsetLogin"
      @favorite="handleFavorite"
      @un-favorite="handleUnFavorite"
    />

    <div class="h-full flex flex-col" @click="emits('clickDetail')">
      <div
        class="w-full h-[180px] rounded-t-xl bg-cover flex justify-center items-center relative"
        :style="{ backgroundImage: `url(${blog.imgUrl})` }"
      >
        <div
          v-if="blog.typeBlog === ETypeBlog.UPLOAD_VIDEO"
          class="absolute right-4 bottom-4 w-10 h-10 rounded-full flex justify-center items-center show-icon-video"
        >
          <img class="w-5 h-5" src="~/assets/images/icon-new-video.svg" />
        </div>
      </div>

      <div class="h-auto p-4 flex flex-col justify-between flex-1">
        <div>
          <p
            class="text-overflow line-clamp-3 font-bold truncate break-words whitespace-pre-line"
          >
            {{ blog.title }}
          </p>

          <div class="flex items-center gap-x-2 mt-4">
            <div
              v-for="(tag, index) in blog.tags"
              :key="index"
              :class="{ 'flex-shrink-0': index === 0, 'hidden ': index > 1 }"
            >
              <p
                v-if="index < 2"
                class="border border-primary text-primary rounded py-1 px-2 text-[12px] tracking-[0.5px]"
                :class="{
                  'flex-shrink-0  truncate': index === 0,
                  'line-clamp-1 text-overflow': index !== 0,
                  'max-w-[232px]': blog.tags.length === 1 && index === 0,
                  'max-w-[178px]': blog.tags.length === 2 && index === 0,
                  'max-w-[148px]': blog.tags.length > 2 && index === 0,
                }"
                style="line-break: anywhere"
              >
                {{ tag }}
              </p>
            </div>
            <p
              v-if="blog.tags?.length > 2"
              class="border border-primary text-primary rounded py-1 px-2 text-[12px] tracking-[0.5px] flex-shrink-0"
            >
              ...
            </p>
            <p
              v-if="checkIsNew(blog.createdTime) && !isNotNew"
              class="text-sm text-danger font-bold"
            >
              NEW
            </p>
          </div>
        </div>

        <div class="flex items-center justify-between mt-4">
          <div class="flex items-center gap-2">
            <img
              v-if="blog.creator?.avatarURL"
              :src="blog.creator.avatarURL"
              alt=""
              class="w-10 h-10 rounded-full border border-solid border-gray-third object-cover"
            />
            <div v-if="blog.creator" class="flex flex-col justify-between">
              <p class="text-xs">
                {{
                  blog.creator.government?.name ??
                  blog.creator.governmentOffice?.name
                }}
              </p>
              <p class="text-xs text-gray mt-[2px]">
                {{
                  formatDate(blog.updatedTime || blog.createdTime, 'YYYY/MM/DD')
                }}
              </p>
            </div>
          </div>

          <Favorite
            v-if="!isEdit && isVideoList"
            :is-favorite="isFavorite"
            :favorite-type="EFavoriteType.FAVORITE_EMPLOYER"
            @un-login="handleRequsetLogin"
            @favorite="handleFavorite"
            @un-favorite="handleUnFavorite"
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
import { TCreateBlogForm } from '~/stores/useBlogCreateStore';
import { useFavoriteStore } from '~/stores/useFavoriteStore';

const { formatDate } = useDateTime();

interface Props {
  blog: TCreateBlogForm;
  isEdit?: boolean;
  isNotNew?: Boolean;
  isVideoList?: Boolean;
}
const props = defineProps<Props>();

const emits = defineEmits(['clickDetail', 'handleUnfavorite']);

const dialogAlert = ref<boolean>(false);
const isFavorite = ref<boolean>(isFavoriteBlog(Number(props.blog.id)));
const favoriteStore = useFavoriteStore();

const handleRequsetLogin = () => {
  dialogAlert.value = true;
};

const handleFavorite = async () => {
  const { error } = await favoriteStore.addFavoriteBlog(Number(props.blog.id));
  if (!error.value) {
    isFavorite.value = true;
  } else {
    openNotification(error.value.data.errorMessage);
  }
};

const handleUnFavorite = async () => {
  const { error } = await favoriteStore.deleteFavoriteBlog(
    Number(props.blog.id),
  );
  if (!error.value) {
    emits('handleUnfavorite');
    isFavorite.value = false;
  } else {
    openNotification(error.value.data.errorMessage);
  }
};
</script>
