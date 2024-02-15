<template>
  <div>
    <el-card class="cursor-pointer" @click="hanleGoToJobDetail(data.id)">
      <div class="p-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <img
              v-if="data.imgUrl.includes('http')"
              :src="data.imgUrl"
              alt=""
              class="w-10 h-10 rounded-full border-[1px] border-gray-third object-cover"
            />
            <img
              v-else
              src=""
              alt=""
              class="w-10 h-10 rounded-full border-[1px] border-gray-third object-cover"
            />
            <p class="pl-2 max-w-[178px] truncate font-normal text-sm">
              {{ data.governmentOffice }}
            </p>
          </div>
          <div @click.stop>
            <img
              v-if="isFavorite"
              src="~/assets/images/book-mark-blue.svg"
              alt=""
              class="cursor-pointer"
              @click="handleUnFavorite(data.id)"
            />
            <img
              v-else
              src="~/assets/images/book-mark-gray.svg"
              alt=""
              class="cursor-pointer"
              @click="handleFavorite(data.id)"
            />
          </div>
        </div>
        <p
          class="font-bold text-[15px] tracking-wider text-overflow pt-2 break-all h-[56px]"
          style="line-height: 170%"
        >
          {{ data.title }}
        </p>
        <!-- <p v-if="isUser" class="my-2 text-sm leading-[170%] text-black">
          {{ data.governmentOffice }}
        </p> -->
        <div class="flex mt-2">
          <div v-for="(tag, index) in data.tags" :key="index">
            <p
              class="text-primary border-[1px] border-primary px-2 py-1 rounded mr-2 text-sm font-normal max-w-[130px] truncate"
            >
              {{ tag }}
            </p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { IDataCardJobPickUp } from '~~/utils/interface';
import { useFavoriteStore } from '~/stores/useFavoriteStore';
import { useUser } from '~~/composables/auth/useUser';
import { useEmployer } from '~~/composables/auth/useEmployer';

const props = defineProps({
  data: {
    type: Object as PropType<IDataCardJobPickUp>,
    default: () => ({
      id: 0,
      imgUrl: '',
      title: '',
      tags: [],
      governmentOffice: '',
    }),
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['no-register']);

const isFavorite = ref<boolean>(props.isFavorite);
const cookieSessionAuth = useCookie('auth.session-token').value;
const isUser = ref<boolean>(false);

if (cookieSessionAuth) {
  isUser.value = true;
}

const hanleGoToJobDetail = (id: number) => {
  const cookieSessionAuth = useCookie('auth.session-token').value;
  if (cookieSessionAuth) {
    const isUser = useUser();
    const isEmployer = useEmployer();
    if (isUser) return navigateTo(`/user/job/${id}`);
    if (isEmployer) return navigateTo(`/employer/job/${id}`);
  } else return navigateTo(`/job/${id}`);
};

const favoriteStore = useFavoriteStore();

const handleFavorite = async (id: number) => {
  if (cookieSessionAuth) {
    const { error } = await favoriteStore.addFavoriteJob(id);
    if (!error.value) {
      isFavorite.value = true;
    } else {
      openNotification(error.value.data.errorMessage);
    }
  } else {
    emits('no-register');
  }
};

const handleUnFavorite = async (id: number) => {
  const { error } = await favoriteStore.deleteFavoriteJob(id);
  if (!error.value) {
    isFavorite.value = false;
  } else {
    openNotification(error.value.data.errorMessage);
  }
};
</script>

<style lang="scss" scoped>
.text-overflow {
  -webkit-line-clamp: 2;
}
</style>
