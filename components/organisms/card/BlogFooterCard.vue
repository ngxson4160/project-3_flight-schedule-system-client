<template>
  <div class="pc:flex rounded-xl overflow-hidden">
    <div
      class="pc:h-[200px] mobile:h-[196px] pc:w-1/2 bg-cover bg-center relative"
      :style="{ backgroundImage: `url(${blog.imgUrl})` }"
    >
      <div class="absolute left-4 bottom-4">
        <SocialShared
          :id="blog.id"
          :url="share"
          :title="blog.title"
          :type="ETypeShareTools.BLOG"
          bordered
          class="mobile:gap-4"
        />
      </div>
    </div>

    <div class="call-to-action flex-1">
      <div class="text-center">
        この記事が気に入ったら
        <br />
        お気に入りしましょう！
        <br />
        <div class="inline-flex items-center mx-auto mt-2">
          <div
            v-if="isFavorite"
            class="favorite-button !bg-primary"
            @click="handleUnFavorite"
          >
            <img src="~/assets/images/icon-heart-white.svg" />
          </div>
          <div v-else class="favorite-button" @click="handleFavorite">
            <img src="~/assets/images/icon-heart-white.svg" />
          </div>
          <h1
            class="ml-2 text-base text-gray"
            :class="{ '!text-primary font-bold': isFavorite }"
          >
            {{ countFavoriteBlog }}
          </h1>
        </div>
      </div>
    </div>

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
  blog: {
    type: Object,
    required: true,
  },
  countFavoriteBlog: {
    type: Number,
    required: true,
  },
  share: {
    type: String,
    default: '',
  },
});

const favoriteStore = useFavoriteStore();

const emit = defineEmits(['like', 'unlike', 'update:countFavoriteBlog']);
const cookieSessionAuth = useCookie('auth.session-token').value;
const dialogAlert = ref(false);

const countFavorite = computed({
  get: () => props.countFavoriteBlog,
  set: (val: number) => {
    return emit('update:countFavoriteBlog', val);
  },
});

const isFavorite = ref<boolean>(isFavoriteBlog(Number(props.blog.id)));
const handleFavorite = async () => {
  if (cookieSessionAuth) {
    await favoriteStore.addFavoriteBlog(Number(props.blog.id));
    isFavorite.value = true;
    countFavorite.value++;
    emit('like');
  } else {
    dialogAlert.value = true;
  }
};
const handleUnFavorite = async () => {
  await favoriteStore.deleteFavoriteBlog(Number(props.blog.id));
  isFavorite.value = false;
  countFavorite.value--;

  emit('unlike');
};
</script>

<style scoped lang="scss">
.call-to-action {
  background-color: #e6f1fc;
  @apply pc:w-1/2 min-h-[152px];
}

.call-to-action {
  color: #333333;
  @apply flex justify-center items-center;
}

.favorite-button {
  @apply w-10 h-10 rounded-full flex items-center justify-center cursor-pointer;
  background-color: #dadcde;

  &.activated {
    @apply bg-primary;
  }
}
</style>
