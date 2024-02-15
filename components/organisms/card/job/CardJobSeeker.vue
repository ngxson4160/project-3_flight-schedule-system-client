<template>
  <div class="pc:w-[760px]">
    <el-card>
      <div class="pc:p-6 p-4 relative">
        <div class="pc:flex pc:justify-between">
          <div class="mobile:pr-12">
            <p class="font-bold py-1 pc:w-[320px]">
              {{ profileData.workExperience?.companyName }}
            </p>
            <p class="py-1 pc:w-[320px]">
              {{ profileData.businessCityId }} / {{ profileData.averageAge }}
            </p>
            <p class="text-sm py-1 pc:w-[320px]">
              {{ getAcademic(profileData.academicBackground) }}
            </p>
            <p class="text-sm py-1 pc:w-[320px]">
              {{ profileData.language?.[0]?.language }} /
              {{ profileData.language?.[0]?.level }}
            </p>
          </div>
          <div class="text-xs pc:pr-[72px]">
            <div
              class="flex items-center border-b-[1px] border-gray-third py-1"
            >
              <p class="font-bold w-[104px] mr-4">希望雇用形態</p>
              <p class="tag">{{ profileData.desiredEmploymentStatus }}</p>
            </div>
            <div
              class="flex items-center border-b-[1px] border-gray-third py-1"
            >
              <p class="font-bold w-[104px] mr-4">希望勤務地</p>
              <div class="flex flex-wrap flex-1">
                <p class="tag">
                  {{ profileData.desiredWorkLocation?.toString() }}
                </p>
              </div>
            </div>
            <div
              class="flex items-center border-b-[1px] border-gray-third py-2"
            >
              <p class="font-bold w-[104px] mr-4">部署・役職</p>
              <p class="text-xs">
                {{ profileData.workExperience?.[0]?.project?.title }} /
                {{ profileData.workExperience?.[0]?.department }}
              </p>
            </div>
          </div>
        </div>
        <div
          v-if="isFavorite"
          class="absolute pc:top-6 top-4 pc:right-6 right-4 h-10 w-10 rounded-full bg-secondary flex justify-center items-center hover:cursor-pointer"
          @click.stop="handleUnFavorite(userData.id)"
        >
          <img src="~/assets/images/icon-saved-blue.svg" alt="" />
        </div>
        <div
          v-else
          class="absolute pc:top-6 top-4 pc:right-6 right-4 h-10 w-10 rounded-full bg-gray-secondary flex justify-center items-center hover:cursor-pointer"
          @click.stop="handleFavorite(userData.id)"
        >
          <img src="~/assets/images/icon-save-gray.svg" alt="" />
        </div>
        <div
          v-if="haveBtnInbox"
          class="flex pc:justify-start justify-center mobile:mt-4 mobile:bg-primary rounded-lg"
        >
          <div
            v-if="mail"
            class="flex pc:justify-between bg-primary rounded-lg items-center h-10 px-4"
          >
            <img src="~/assets/images/icon-message.svg" alt="" />
            <p class="pl-[10px] text-sm text-white">メッセージ</p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useFavoriteStore } from '~/stores/useFavoriteStore';

const favoriteStore = useFavoriteStore();

const props = defineProps({
  profileData: {
    type: Object,
    default: () => ({}),
  },
  favoriteJob: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['event-delete']);

const isFavorite = ref<boolean>(props.favoriteJob);
const haveBtnInbox = ref(true);

const handleFavorite = async (id: number) => {
  const data = await favoriteStore.addFavoriteEmployer(id);
  if (!data.error.value) {
    isFavorite.value = true;
  } else {
    openNotification(data.error.value?.message);
  }
};

const handleUnFavorite = async (id: number) => {
  const data = await favoriteStore.deleteFavoriteEmployer(id);
  if (!data.error.value) {
    isFavorite.value = false;
    emits('event-delete');
  } else {
    openNotification(data.error.value?.message);
  }
};
</script>
<style lang="scss" scoped>
.tag {
  @apply border-primary text-primary text-center border-[1px] rounded py-1 px-2 my-1 ml-1;
}
</style>
