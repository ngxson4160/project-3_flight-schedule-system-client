<template>
  <div
    v-if="blog"
    :class="`card__blog-container w-full max-w-full grid py-8 mobile:py-6 pc:pb-6 border-b border-gray-third cursor-pointer ${props.class}`"
    @click="emit('handleGoToDetail')"
  >
    <p
      class="grid-item__title text-base font-bold text-overflow break-words whitespace-pre-line break-all mobile:h-auto line-clamp-3 pc:text-[20px] pr-4 leading-[150%]"
    >
      {{ props.blog?.title }}
    </p>

    <div class="grid-item__tags flex gap-2 items-center mt-4 pr-4">
      <div
        v-for="(tag, index) in props.blog.tags"
        :key="index"
        :class="{ hidden: index > 1 }"
      >
        <p
          class="border border-primary py-1 px-2 rounded text-primary tracking-[0.5px] text-xs pc:max-w-[122px] max-w-[134px] text-center truncate"
        >
          {{ tag }}
        </p>
      </div>
      <p
        v-if="
          checkIsNew(
            props.blog.updatedTime
              ? props.blog.updatedTime
              : props.blog.createdTime,
          )
        "
        class="text-danger font-bold text-[14px]"
      >
        NEW
      </p>
    </div>
    <div
      v-if="showContent"
      class="h-[48px] content_blog-fist grid-item__content line-clamp-2 text-overflow overflow-hidden pr-4 leading-[170%] mt-4"
      v-html="removeSpaceInPTag(props.blog?.content)"
    ></div>
    <div
      class="grid-item__image justify-self-end pc:!w-[232px] pc:!h-[130px] mobile:w-[116px] mobile:h-[66px] flex-shrink-0 relative"
    >
      <img
        :src="props.blog.imgUrl"
        class="w-full h-full object-cover rounded-xl"
      />
      <div
        v-if="blog.typeBlog === ETypeBlog.UPLOAD_VIDEO"
        class="absolute pc:right-2 right-[6px] pc:bottom-2 bottom-[6px] pc:w-10 pc:h-10 h-6 w-6 rounded-full flex justify-center items-center show-icon-video"
      >
        <img
          class="pc:w-5 w-3 pc:h-5 h-3"
          src="~/assets/images/icon-new-video.svg"
        />
      </div>
    </div>
    <div class="grid-item__account flex gap-x-4 pc:pr-4">
      <div class="mt-4 flex justify-between items-center w-full">
        <div class="flex gap-4 items-center">
          <img
            v-if="isFavorite"
            src="~/assets/images/book-mark-blue.svg"
            alt=""
            class="h-[32px] w-[32px] cursor-pointer"
            @click.stop="handUnfavoriteBlog(props.blog.id)"
          />
          <img
            v-else
            src="~/assets/images/book-mark-gray.svg"
            alt=""
            class="h-[32px] w-[32px] cursor-pointer"
            @click.stop="handleFavoriteBlog(props.blog.id)"
          />
          <div class="flex gap-1 items-center">
            <img
              :src="props.blog.creator.avatarURL"
              class="w-[32px] h-[32px] rounded-full object-cover border border-gray-third"
            />
            <p class="text-xs pc:max-w-[298px] max-w-[176px] truncate">
              {{ props.blog.creator.governmentOffice.name }}
            </p>
          </div>
        </div>
        <p class="text-xs text-gray flex-shrink-0">
          {{
            formatDate(
              props.blog.updatedTime
                ? props.blog.updatedTime
                : props.blog.createdTime,
              'YYYY/MM/DD',
            )
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IBlogOverview } from '~/utils/interface';
import { useFavoriteStore } from '~/stores/useFavoriteStore';

const favoriteStore = useFavoriteStore();
const props = defineProps({
  blog: {
    type: Object as () => IBlogOverview,
    default: () => {},
  },
  class: {
    type: String,
    default: '',
  },
  showContent: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits([
  'handleFavorite',
  'handleGoToDetail',
  'unregister',
  'eventDelete',
]);
const cookieSessionAuth = useCookie('auth.session-token').value;
const isFavorite = ref<boolean>(isFavoriteBlog(props.blog.id));
const handUnfavoriteBlog = async (id: number) => {
  const data = await favoriteStore.deleteFavoriteBlog(id);
  if (!data.error.value) {
    isFavorite.value = false;
    emit('eventDelete');
  } else {
    emit('unregister');
  }
};

const handleFavoriteBlog = async (id: number) => {
  if (!cookieSessionAuth) {
    emit('unregister');
  } else {
    await favoriteStore.addFavoriteBlog(id);
    isFavorite.value = true;
  }
};
</script>

<style lang="scss">
.content_blog-fist {
  @apply text-sm font-normal leading-[170%] #{!important};
  p,
  h1,
  ul,
  li,
  strong {
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical;
    @apply mt-0 overflow-hidden truncate overflow-ellipsis break-all whitespace-pre-line break-words text-sm mobile:hidden leading-[170%] #{!important};
  }
  img,
  video {
    display: none !important;
  }
  strong {
    @apply font-normal #{!important};
  }
  // p:first-child,
  // h1:first-child {
  //   -webkit-line-clamp: 2 !important;
  // }
  // p:not(:first-child),
  // h1:not(:first-child) {
  //   -webkit-line-clamp: 1 !important;
  // }
}

.card__blog-container {
  grid-template-columns: auto auto;
  grid-template-areas:
    'title image'
    'tags image'
    'content image '
    'content image'
    'account image';
  grid-template-columns: calc(100% - 232px) 232px;

  @media screen and (max-width: 391px) {
    grid-template-areas:
      'title image'
      'tags tags'
      'account account';

    grid-template-columns: calc(100% - 116px) 116px;
  }

  .grid-item__title {
    grid-area: title;
  }

  .grid-item__image {
    grid-area: image;
  }

  .grid-item__tags {
    grid-area: tags;
  }

  .grid-item__content {
    grid-area: content;
  }

  .grid-item__account {
    grid-area: account;
  }
}
</style>
