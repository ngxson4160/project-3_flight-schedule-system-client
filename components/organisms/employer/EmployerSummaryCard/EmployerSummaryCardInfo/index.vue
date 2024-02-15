<template>
  <button
    v-if="role === 'EMPLOYER'"
    class="flex items-center w-full justify-center gap-2 px-4 py-2 bg-primary hover:opacity-80 text-white rounded-lg transition-all"
    @click="routerPush('/employer/mypage/edit')"
  >
    <img src="~/assets/images/icon-edit-57_2.svg" alt="" class="w-6" />
    <span class="text-sm font-bold">官公庁情報を編集</span>
  </button>
  <div v-else-if="role === 'USER'">
    <button
      v-if="isFavorite"
      class="flex items-center w-full justify-center gap-2 px-4 py-2 hover:opacity-80 text-white rounded-lg transition-all bg-black-800"
      @click="handleUnFavoriteEmployer"
    >
      <img src="~/assets/images/icon-save-white.svg" alt="" />
      <span class="text-sm font-bold">お気に入りに登録済み</span>
    </button>
    <button
      v-else
      class="flex items-center w-full justify-center gap-2 px-4 py-2 bg-primary hover:opacity-80 text-white rounded-lg transition-all"
      @click="handleFavoriteEmployer"
    >
      <div class="flex items-center mx-auto">
        <img src="~/assets/images/icon-save-white.svg" alt="" />
        <p class="pl-2 !text-sm font-bold">お気に入りに登録</p>
      </div>
    </button>
    <div
      v-if="!isFavorite"
      class="bg-secondary rounded-lg text-sm text-primary p-4 mt-4 font-bold"
    >
      お気に入り登録して新着求人の通知を受け取りましょう。
    </div>
    <ListSocialIcon :social-links="socialLinks" />
  </div>

  <div v-else-if="role === 'GUEST'">
    <button
      class="flex items-center w-full justify-center gap-2 px-4 py-2 hover:opacity-80 text-white rounded-lg transition-all bg-gray"
      @click="dialogAlert = !dialogAlert"
    >
      <img src="~/assets/images/icon-save-white.svg" alt="" />
      <p class="text-white font-bold pl-2 text-sm">お気に入りに登録</p>
    </button>
    <div
      class="bg-secondary rounded-lg text-sm text-primary p-4 mt-4 font-bold"
    >
      お気に入り登録して新着求人の通知を受け取りましょう。
    </div>
    <ListSocialIcon :social-links="socialLinks" />
    <UnregisteredAlert
      v-model:dialog-visible="dialogAlert"
      @update-status="updateStatusAlert"
      @event-cancel="dialogAlert = false"
    />
  </div>

  <div v-if="role === 'EMPLOYER'" class="w-full mt-4">
    <h3 class="text-[#A3A8AD] text-xs font-bold">
      公開中の自社サイト トップページ
    </h3>
    <client-only>
      <copy-text :employer-id="employerId" />
    </client-only>
    <ListSocialIcon :social-links="socialLinks" />
  </div>
</template>

<script setup lang="ts">
import { useFavoriteStore } from '~/stores/useFavoriteStore';
const props = defineProps({
  role: {
    type: String,
    default: 'EMPLOYER',
  },
  employerId: {
    type: Number,
    default: 0,
  },
  socialLinks: {
    type: Object,
    required: false,
  },
});

const cookieSessionAuth = useCookie('auth.session-token').value;
const dialogAlert = ref<boolean>(false);
const favoriteStore = useFavoriteStore();
const id = ref(props.employerId);

const isFavorite = computed({
  get: () => isFavoriteUser(id.value),
  set: (favorite: boolean) => {
    return favorite;
  },
});

const handleFavoriteEmployer = async () => {
  if (cookieSessionAuth) {
    const { error } = await favoriteStore.addFavoriteEmployer(id.value);
    if (!error.value) {
      isFavorite.value = true;
    } else {
      openNotification(error.value.data.errorMessage);
    }
  } else {
    dialogAlert.value = true;
  }
};

const handleUnFavoriteEmployer = async () => {
  if (cookieSessionAuth) {
    const { error } = await favoriteStore.deleteFavoriteEmployer(id.value);
    if (!error.value) {
      isFavorite.value = false;
    } else {
      openNotification(error.value.data.errorMessage);
    }
  } else {
    dialogAlert.value = true;
  }
};

const updateStatusAlert = (val: boolean) => {
  dialogAlert.value = val;
};
</script>
