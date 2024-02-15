<template>
  <div class="cursor-pointer" @click="handleGoToDetail(dataEmployer.id)">
    <el-card>
      <div class="p-4 relative">
        <div class="flex justify-between">
          <div class="pc:flex pc:items-center">
            <div
              class="h-16 w-16 rounded-full flex justify-center items-center border-[1px] border-gray-third mr-4 bg-cover bg-center"
              :style="{
                'background-image': `url(${
                  dataEmployer.image.length ? dataEmployer.image : defaultLogo
                })`,
              }"
            ></div>
            <div class="mobile:pt-4">
              <p class="text-lg font-bold pb-2 title text-overflow">
                {{ dataEmployer.title }}
              </p>
              <p v-if="dataEmployer.local.length" class="text-sm local">
                {{ dataEmployer.local }}
              </p>
            </div>
          </div>
          <div v-if="isFavorite" @click.stop>
            <div
              class="h-10 w-10 rounded-full bg-secondary flex justify-center items-center absolute top-4 right-4 hover:cursor-pointer"
              @click="handDeleteFavoriteEmployer(dataEmployer.id)"
            >
              <img src="~/assets/images/icon-saved-blue.svg" alt="" />
            </div>
          </div>
          <div v-else @click.stop>
            <div
              class="h-10 w-10 rounded-full bg-secondary flex justify-center items-center absolute top-4 right-4 hover:cursor-pointer"
              @click="handleAddFavoriteEmployer(dataEmployer.id)"
            >
              <img src="~/assets/images/icon-save-gray.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="text-sm pt-4">
          <p class="description text-overflow pc:h-[64px] h-[60px]">
            {{ dataEmployer.description }}
          </p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import defaultLogo from '~/assets/images/avatar-fire-24.png';
import { useFavoriteStore } from '~/stores/useFavoriteStore';
import { useUser } from '~~/composables/auth/useUser';
import { useEmployer } from '~~/composables/auth/useEmployer';

const favoriteStore = useFavoriteStore();

const props = defineProps({
  dataEmployer: {
    type: Object,
    default: () => {},
  },
  isFavorite: {
    type: Boolean,
    default: () => false,
  },
});

const emits = defineEmits(['event-delete']);

const dataEmployer = reactive(props.dataEmployer);
const isFavorite = ref<boolean>(props.isFavorite);

const handDeleteFavoriteEmployer = async (id: number) => {
  const data = await favoriteStore.deleteFavoriteEmployer(id);

  if (!data.error.value) {
    isFavorite.value = false;
    emits('event-delete');
  } else {
    openNotification(data.error.value?.message);
  }
};

const handleAddFavoriteEmployer = async (id: number) => {
  const data = await favoriteStore.addFavoriteEmployer(id);
  if (!data.error.value) {
    isFavorite.value = true;
  } else {
    openNotification(data.error.value?.message);
  }
};
const handleGoToDetail = (id: number) => {
  const cookieSessionAuth = useCookie('auth.session-token').value;
  if (cookieSessionAuth) {
    const isUser = useUser();
    const isEmployer = useEmployer();
    if (isUser) return navigateTo(`/user/employer/${id}`);
    if (isEmployer) return navigateTo(`/employer/${id}`);
  } else return navigateTo(`/employer/${id}`);
};
</script>

<style lang="scss">
.title.text-overflow {
  -webkit-line-clamp: 2;
}
.description.text-overflow {
  -webkit-line-clamp: 3;
}
</style>
