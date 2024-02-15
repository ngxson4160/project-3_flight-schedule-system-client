<template>
  <div class="Blog border-b border-solid border-gray-third pc:pb-6 pb-4">
    <el-card>
      <div class="pc:flex pc:justify-between">
        <div
          class="w-full pc:max-w-[400px] pc:flex pc:flex-col pc:gap-4"
          @click="handleRedirect"
        >
          <div class="mobile:flex mobile:justify-between">
            <p
              class="font-bold truncate-text line-clamp-3 break-words mobile:w-[210px]"
            >
              {{ createdJob.title }}
            </p>
            <div class="pc:hidden mobile:w-[116px]">
              <img
                :src="createdJob.imgUrl ? createdJob.imgUrl : defaultImage"
                class="w-full h-[66px] object-cover rounded-lg"
              />
            </div>
          </div>
          <ul class="mobile:hidden">
            <li class="text-sm">
              <div
                class="truncate-text max-w-[400px] break-words"
                :class="{ 'p-tag-inline': checkSafari }"
                v-html="removeSpaceInPTag(createdJob.content)"
              ></div>
            </li>
          </ul>
          <div class="flex justify-between gap-2 items-center mobile:mt-2">
            <div class="flex gap-2 pc:max-w-[400px]">
              <div
                v-for="(tag, index) in createdJob.tags"
                :key="tag.label"
                :class="{
                  'flex-grow': index === 0,
                  'flex-shrink-0': index === 2,
                }"
              >
                <div
                  v-if="index <= 2"
                  class="bg-white px-2 py-1 rounded border-[1px] border-primary h-6"
                >
                  <p
                    class="text-primary text-xs overflow-hidden text-ellipsis line-clamp-1 leading-[12px]"
                    style="line-break: anywhere"
                  >
                    {{ index < 2 ? tag.name : '...' }}
                  </p>
                </div>
              </div>
            </div>
            <div
              v-if="createdJob.updatedTime"
              class="text-gray text-xs flex-shrink-0"
            >
              {{ formatDate(createdJob.updatedTime, 'YYYY/MM/DD') }}
            </div>
            <div v-else class="text-gray text-xs flex-shrink-0">
              {{ formatDate(createdJob.createdTime, 'YYYY/MM/DD') }}
            </div>
          </div>
        </div>

        <div class="relative h-[130px] mobile:hidden">
          <ul
            v-if="showFavorite"
            class="absolute top-4 left-4 right-4 flex justify-between items-start"
          >
            <li
              v-if="haveBtnSaved && isFavorite"
              class="h-10 w-10 rounded-full flex justify-center items-center bg-black/[.8] hover:cursor-pointer"
              @click="handleDeleteFavotite(createdJob.id)"
            >
              <img src="~/assets/images/icon-saved-blue.svg" alt="" />
            </li>
            <li
              v-if="haveBtnSaved && !isFavorite"
              class="h-10 w-10 rounded-full flex justify-center items-center bg-black/[.8] hover:cursor-pointer"
              @click="handleAddFavotite(createdJob.id)"
            >
              <img src="~/assets/images/icon-save-white.svg" alt="" />
            </li>
          </ul>
          <p
            class="pc:w-[232px] mobile:w-[232px] pc:h-[130px] rounded-xl overflow-hidden"
            @click="handleRedirect"
          >
            <img
              :src="createdJob.imgUrl ? createdJob.imgUrl : defaultImage"
              class="w-full h-full object-cover"
            />
          </p>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import defaultImage from '~/assets/images/image-house.svg';
import { useFavoriteStore } from '~/stores/useFavoriteStore';
import { formatDate } from '~/utils/helper';
import { useUser } from '~~/composables/auth/useUser';
import { useEmployer } from '~/composables/auth/useEmployer';
import { useAdmin } from '~~/composables/auth/useAdmin';
const props = defineProps({
  createdJob: {
    type: Object,
    default: null,
  },
  idEmployer: {
    type: Number,
    default: null,
  },
  showFavorite: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['errorFavorite']);
const favoriteStore = useFavoriteStore();
const haveBtnSaved = ref(true);
const id = ref();
const cookieSessionAuth = useCookie('auth.session-token').value;
const isFavorite = ref<boolean>(isFavoriteBlog(props.createdJob.id));
const handleAddFavotite = async (id: number) => {
  if (cookieSessionAuth) {
    await favoriteStore.addFavoriteBlog(id);
    isFavorite.value = true;
  } else {
    emit('errorFavorite');
  }
};

const handleRedirect = () => {
  const cookieSessionAuth = useCookie('auth.session-token').value;
  if (cookieSessionAuth) {
    const isUser = useUser();
    const isEmployer = useEmployer();
    const isAdmin = useAdmin();
    if (isUser)
      return window.open(
        `/user/employer/${props.idEmployer}/blog/${props.createdJob.id}`,
        '_blank',
      );
    if (isEmployer)
      return window.open(`/employer/blog/${props.createdJob.id}`, '_blank');
    if (isAdmin)
      return window.open(`/admin/blog/${props.createdJob.id}/detail`, '_blank');
  }
  return window.open(
    `/employer/${props.idEmployer}/blog/${props.createdJob.id}`,
    '_blank',
  );
};

const handleDeleteFavotite = async (id: number) => {
  await favoriteStore.deleteFavoriteBlog(id);
  isFavorite.value = false;
};

const checkSafari = computed(() => {
  if (process.client) {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }
  return false;
});

const getContent = (data: string) => {
  if (checkSafari.value) return data.replaceAll('</p>', '</p><br>');
  return data;
};

onMounted(async () => {
  id.value = props.createdJob.id;
  await nextTick();
});
</script>
<style lang="scss">
.Blog .el-card.is-always-shadow {
  @apply shadow-none rounded-none #{!important};
}
.blog-description {
  height: 42px;
  -webkit-line-clamp: 2 !important;
}

.truncate-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  img {
    display: none;
  }
}

.p-tag-inline p {
  display: inline !important;
}
</style>
