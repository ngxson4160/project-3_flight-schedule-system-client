<template>
  <div>
    <div v-if="data.imgUrl" class="news-cover-image mb-10 mobile:mb-7">
      <img
        :src="data.imgUrl"
        class="w-full h-[420px] mobile:h-[192px] object-cover"
        alt=""
      />
    </div>

    <span class="tag-type-news mr-2">
      {{ typeNewsText[data.typeNews] }}
    </span>

    <h1 class="news-title break-all">{{ data.title }}</h1>

    <div class="mt-4 flex justify-between items-center">
      <Account :account="data.creator" size-title="small">
        <p class="text-xs pc:text-sm">
          {{
            isUpdatedTime && data.updatedTime
              ? formatDate(data.updatedTime, 'YYYY/MM/DD')
              : formatDate(data.createdTime, 'YYYY/MM/DD')
          }}
        </p>
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

    <div
      class="news-content ck-content ck-content-view-detail"
      v-html="data.content"
    ></div>
    <UnregisteredAlert
      v-model:dialog-visible="dialogAlert"
      @event-cancel="dialogAlert = false"
      @click.stop
    />
  </div>
</template>

<script setup lang="ts">
import { useFavoriteStore } from '~/stores/useFavoriteStore';
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  isUpdatedTime: {
    type: Boolean,
    required: false,
  },
  share: {
    type: String,
    default: '',
  },
  isOwner: {
    type: Boolean,
    default: false,
  },
});
const socialShared = ref({
  id: props.data.id,
  url: props.share,
  title: props.data.title,
  type: ETypeShareTools.NEWS,
});

const countFavorite = ref(props.data.countFavoriteNews);

const favoriteStore = useFavoriteStore();
const cookieSessionAuth = useCookie('auth.session-token').value;
const isFavorite = ref<boolean>(isFavoriteNews(Number(props.data.id)));
const dialogAlert = ref(false);

const handleFavorite = async () => {
  if (cookieSessionAuth) {
    await favoriteStore.addFavoriteNews(Number(props.data.id));
    isFavorite.value = true;
    countFavorite.value++;
  } else {
    dialogAlert.value = true;
  }
};
const handleUnFavorite = async () => {
  await favoriteStore.deleteFavoriteNews(Number(props.data.id));
  isFavorite.value = false;
  countFavorite.value--;
};
</script>

<style scoped lang="scss">
.news-cover-image {
  img {
    @apply rounded-xl;
  }
}

.news-title {
  @apply mt-4 font-bold pc:text-[32px] text-[20px];
}

.news-content {
  @apply break-words;

  :deep(img) {
    @apply rounded-xl pc:my-4 mobile:my-10;
  }
}
</style>
