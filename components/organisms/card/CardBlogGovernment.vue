<template>
  <div>
    <el-card
      class="cursor-pointer relative"
      @click="handleClick(data.id, data.creatorId)"
    >
      <div class="absolute bottom-4 right-4 flex justify-end items-start">
        <div v-if="props.showFavorite" @click.stop>
          <div
            v-if="isFavorite"
            class="h-10 w-10 rounded-full flex justify-center items-center bg-secondary hover:cursor-pointer"
            @click="handleUnFavorite(data.id)"
          >
            <img src="~/assets/images/icon-saved-blue.svg" alt="" />
          </div>
          <div
            v-else
            class="h-10 w-10 rounded-full flex justify-center items-center bg-secondary hover:cursor-pointer"
            @click="handleFavorite(data.id)"
          >
            <img src="~/assets/images/icon-save-white.svg" alt="" />
          </div>
        </div>
      </div>
      <div>
        <img
          :src="data.imgUrl ? data.imgUrl : defaultImage"
          class="w-full pc:h-[180px] h-[174px] object-cover"
        />
      </div>

      <div class="p-4">
        <div>
          <p class="font-bold text-overflow line-clamp-2 h-[44px]">
            {{ data.title }}
          </p>
        </div>
        <div v-if="data.tags" class="flex mt-2">
          <div v-for="(tag, index) in data.tags" :key="index">
            <div
              v-if="index < 3"
              class="bg-white px-2 py-1 rounded border-[1px] border-primary mr-2"
            >
              <p
                v-if="index < 2"
                class="text-primary text-xs pc:max-w-[84px] max-w-[76px] truncate"
              >
                {{ tag }}
              </p>
              <p v-else class="text-primary text-xs">...</p>
            </div>
          </div>
        </div>
        <div class="py-4">
          <p
            class="text-sm text-overflow line-clamp-2 !h-[40px] ck-content ck-content-overview"
            v-html="sanitizedContent"
          ></p>
        </div>
        <div class="flex">
          <div
            v-if="props.haveAvatar"
            class="rounded-full w-10 h-10 flex justify-center items-center border-[1px] border-gray-third mr-2 overflow-hidden bg-center bg-cover"
            :style="{
              'background-image': `url(${
                data.governmentOfficeAvatar
                  ? data.governmentOfficeAvatar
                  : defaultEmployerAvatar
              })`,
            }"
          ></div>
          <div>
            <p v-if="props.haveAvatar" class="text-xs pb-1">
              {{ data.governmentOfficeName }}
            </p>
            <p v-if="data.createdDate" class="text-gray text-xs">
              {{
                data.updatedTime
                  ? formatDate(data.updatedTime)
                  : formatDate(data.createdDate)
              }}
            </p>
          </div>
        </div>
      </div>
    </el-card>

    <UnregisteredAlert
      v-model:dialog-visible="dialogAlert"
      @update-status="updateStatusAlert"
      @event-cancel="dialogAlert = false"
    />
  </div>
</template>
<script lang="ts" setup>
import defaultImage from '~/assets/images/img-card-blog-government.jpeg';
import defaultEmployerAvatar from '~/assets/images/avatar-fire-24.png';
import { IDataCardBlogPublic } from '~~/utils/interface';
import { useFavoriteStore } from '~/stores/useFavoriteStore';
import { useUser } from '~~/composables/auth/useUser';
import { useEmployer } from '~/composables/auth/useEmployer';
const props = defineProps({
  isFavorite: {
    type: Boolean,
    default: () => false,
  },
  cardData: {
    type: Object as PropType<IDataCardBlogPublic>,
    default: () => ({
      id: '',
      creatorId: '',
      imgUrl: '',
      title: '',
      tags: [],
      description: '',
      governmentOfficeName: '',
      governmentOfficeAvatar: '',
      createdDate: '',
      updateTime: '',
    }),
  },
  haveAvatar: {
    type: Boolean,
    default: () => false,
  },
  showFavorite: {
    type: Boolean,
    default: () => true,
  },
});

const { formatDate } = useDateTime();

const favoriteStore = useFavoriteStore();

const data = ref<IDataCardBlogPublic>(props.cardData);
const isFavorite = ref<boolean>(props.isFavorite);
const dialogAlert = ref<boolean>(false);
const emits = defineEmits(['event-delete']);
const cookieSessionAuth = useCookie('auth.session-token').value;

const handleClick = (blogId: number, creatorId: number) => {
  const cookieSessionAuth = useCookie('auth.session-token').value;
  if (cookieSessionAuth) {
    const isUser = useUser();
    const isEmployer = useEmployer();
    if (isUser) return navigateTo(`/user/employer/${creatorId}/blog/${blogId}`);
    if (isEmployer) return navigateTo(`/employer/blog/${blogId}`);
    return navigateTo(`/employer/${creatorId}/blog/${blogId}`);
  }
  return navigateTo(`/employer/${creatorId}/blog/${blogId}`);
};

const handleFavorite = async (id: number) => {
  if (cookieSessionAuth) {
    const { error } = await favoriteStore.addFavoriteBlog(id);
    if (!error.value) {
      isFavorite.value = true;
    } else {
      openNotification(error.value.data.errorMessage);
    }
  } else {
    dialogAlert.value = true;
  }
};

const handleUnFavorite = async (id: number) => {
  const { error } = await favoriteStore.deleteFavoriteBlog(id);
  if (!error.value) {
    isFavorite.value = false;
    emits('event-delete');
  } else {
    openNotification(error.value.data.errorMessage);
  }
};

const updateStatusAlert = (val: boolean) => {
  dialogAlert.value = val;
};

const sanitizedContent = computed(() => {
  const dummyElement = document.createElement('div');
  dummyElement.innerHTML = props.cardData.description;

  const images = dummyElement.getElementsByTagName('img');
  for (let i = images.length - 1; i >= 0; i--) {
    const image = images[i];
    image.parentNode && image.parentNode.removeChild(image);
  }

  return dummyElement.innerHTML;
});
</script>
<style lang="scss" scoped>
.text-overflow {
  -webkit-line-clamp: 2;
}
</style>
