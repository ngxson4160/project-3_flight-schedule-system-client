<template>
  <div>
    <div
      v-if="props.isPreview && blog.typeBlog === ETypeBlog.UPLOAD_VIDEO"
      class="mb-10 pc:w-[320px] w-[342px] mobile:mx-auto"
    >
      <p class="text-sm font-bold">サムネイル画像</p>
      <img
        :src="blog.imgUrl"
        class="w-full h-auto object-cover mt-2 rounded-xl"
      />
    </div>
    <div
      v-if="blog.typeBlog === ETypeBlog.UPLOAD_IMAGE"
      class="blog-cover-image"
    >
      <img
        :src="blog.imgUrl"
        class="w-full pc:max-h-[427px] mobile:max-h-[192px] object-cover"
        alt=""
      />
    </div>

    <div v-else class="relative">
      <BlogVideo
        :video-url="blog.videoUrl"
        :style-video="'w-full h-auto rounded-xl'"
        :preview="true"
      />
    </div>

    <h1 class="blog-title">{{ blog.title }}</h1>

    <div class="mt-4 flex justify-between items-center">
      <Account :account="blog.creator">
        {{
          blog.updatedTime
            ? formatDate(blog.updatedTime, 'YYYY/MM/DD')
            : `${formatDate(blog.createdTime, 'YYYY/MM/DD') ?? ''}`
        }}
      </Account>
      <ShareAndLike
        v-model:count-favorite-data="countFavorite"
        :social-shared="socialShared"
        :is-favorite="isFavorite"
        :is-owner="isOwner"
        @favorite="handleFavorite"
        @un-favorite="handleUnFavorite"
      ></ShareAndLike>
    </div>

    <div class="pc:mt-10 mt-6 mb-16 border-t border-slate-200"></div>

    <!-- <div v-if="blog.typeBlog === ETypeBlog.UPLOAD_VIDEO" class="relative mb-16">
      <BlogVideo
        :video-url="blog.videoUrl"
        :style-video="'w-full pc:h-[427px] mobile:h-[196px] rounded-xl'"
        preview
      />
    </div> -->

    <div
      class="blog-content whitespace-pre-line break-words overflow-hidden ck-content ck-content-view-detail"
      v-html="blog.content"
    ></div>

    <div class="mt-16 flex gap-2 flex-wrap">
      <BlogTag v-for="(tag, i) in blog.tags" :key="i">
        {{ tag }}
      </BlogTag>
    </div>
  </div>
  <UnregisteredAlert
    v-model:dialog-visible="dialogAlert"
    @event-cancel="dialogAlert = false"
    @click.stop
  />
</template>

<script setup lang="ts">
import { useFavoriteStore } from '~/stores/useFavoriteStore';
const props = defineProps({
  blog: {
    type: Object,
    required: true,
  },
  share: {
    type: String,
    default: '',
  },
  countFavoriteBlog: {
    type: Number,
    required: true,
    default: 0,
  },
  isOwner: {
    type: Boolean,
    default: false,
  },
  isPreview: {
    type: Boolean,
    default: false,
  },
});
const dialogAlert = ref(false);
const emits = defineEmits(['update:countFavoriteBlog']);
const favoriteStore = useFavoriteStore();

const countFavorite = ref(props.countFavoriteBlog);
const socialShared = ref({
  id: props.blog.id,
  url: props.share,
  title: props.blog.title,
  type: ETypeShareTools.BLOG,
});
const cookieSessionAuth = useCookie('auth.session-token').value;

watch(countFavorite, (newValue) => {
  countFavorite.value = newValue;
});

const isFavorite = ref<boolean>(isFavoriteBlog(Number(props.blog.id)));
const handleFavorite = async () => {
  if (cookieSessionAuth) {
    countFavorite.value++;
    await favoriteStore.addFavoriteBlog(Number(props.blog.id));
    isFavorite.value = true;
  } else {
    dialogAlert.value = true;
  }
};
const handleUnFavorite = async () => {
  countFavorite.value--;
  await favoriteStore.deleteFavoriteBlog(Number(props.blog.id));
  isFavorite.value = false;
};
</script>

<style scoped lang="scss">
.blog-cover-image {
  img {
    @apply rounded-xl;
  }
}

.blog-title {
  @apply mt-10 font-bold pc:text-[32px] text-[20px] break-words whitespace-pre-line;
}

.blog-content {
  @apply break-words;

  :deep(img) {
    @apply rounded-xl my-16;
  }
}

.favorite-icon {
  @apply flex w-[40px] h-[40px] ml-4 justify-center items-center bg-slate-100 rounded-full cursor-pointer;
}
</style>
