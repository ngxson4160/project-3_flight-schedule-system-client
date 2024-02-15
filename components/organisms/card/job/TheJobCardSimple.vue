<template>
  <el-card class="box-card">
    <div class="p-4">
      <div class="relative pr-14">
        <div class="font-bold text-black text-base tracking-wider">
          {{ workExperience?.length ? workExperience.join('、') : '-' }}
        </div>
        <div :class="['absolute', 'top-0', 'right-0', 'flex']">
          <div :class="['rounded-full', 'w-10', 'h-10', 'overflow-hidden']">
            <button
              v-if="props.favoriteJob"
              type="button"
              class="bg-none border-0 p-0 outline-0"
              @click.stop="handDeleteFavoriteEmployer(cardData.id)"
            >
              <span>
                <img src="~/assets/images/book-mark-blue.svg" alt="" />
              </span>
            </button>
            <button
              v-else
              type="button"
              class="bg-none border-0 p-0 outline-0"
              @click.stop="handleAddFavoriteEmployer(cardData.id)"
            >
              <span>
                <img src="~/assets/images/book-mark-gray.svg" alt="" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div>
        <ul>
          <li class="mt-2">
            <p>
              {{ cardData.local?.province?.name ?? '' }}
              {{ cardData.local?.province?.name && age ? '/' : '' }}
              {{ age }}歳
            </p>
          </li>
          <li
            v-for="academic in cardData.academicBackground"
            :key="academic.schoolName"
            class="mt-2"
          >
            <p class="text-black-800 text-sm">
              {{ academic.schoolName + ' ' + academic.academicInfo }}
            </p>
          </li>
          <li
            v-for="lang in cardData.language"
            :key="lang.language"
            class="mt-2"
          >
            <p class="text-black-800 text-sm">
              {{ lang.language }} {{ lang.language && lang.level ? '/' : '' }}
              {{ lang.level }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { PropType } from 'nuxt/dist/app/compat/capi';
import { useDateTime } from '~/composables/useDateTime';
import { useFavoriteStore } from '~/stores/useFavoriteStore';
import { IProvinces } from '~~/utils/interface';

const favoriteStore = useFavoriteStore();

const props = defineProps({
  favoriteJob: {
    type: Boolean,
    default: false,
  },
  cardData: {
    type: Object,
    default: () => {},
  },
  provincesData: {
    type: Array as PropType<IProvinces[]>,
    default: () => [],
  },
});

const emits = defineEmits(['event-delete']);

const isFavorite = ref<boolean>(false);
const cardData = reactive(props.cardData);

const { calculateAge } = useDateTime();

const workExperience = ref();
workExperience.value = cardData.title.map((el: any) => {
  return el.companyName;
});

const age = calculateAge(cardData.dateOfBirth);

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
</script>

<style lang="scss"></style>
