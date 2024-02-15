<template>
  <div
    class="flex flex-col justify-between gap-4 border border-solid border-color-border p-4 rounded-lg h-full cursor-pointer"
    @click.prevent="emit('click-card')"
  >
    <div class="flex justify-between gap-1">
      <div>
        <p
          class="border border-solid border-color-border py-1 px-2 text-xs font-bold rounded h-[25px] truncate inline-block pc:max-w-[200px] max-w-[280px]"
        >
          {{ job?.jobCategory?.name }}
        </p>
        <p class="line-clamp-3 text-overflow text-base font-bold mt-2">
          {{ job?.title }}
        </p>
      </div>
      <Favorite
        v-if="showFavorite"
        :is-favorite="isFavorite"
        @favorite="handleFavorite"
        @un-favorite="handleUnFavorite"
      />
    </div>

    <div v-if="job?.creator?.avatarURL" class="flex items-center gap-1">
      <img
        :src="job?.creator?.avatarURL"
        alt=""
        class="w-10 h-10 rounded-full border border-solid border-color-border object-cover"
      />
      <p class="text-sm">{{ job?.creator?.governmentOffice?.name }}</p>
    </div>

    <div v-else>
      <span class="tag">{{ job?.employmentStatus }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IJobDetail } from 'stores/employerProfileJobs';
import { useFavoriteStore } from '~/stores/useFavoriteStore';

const props = defineProps({
  showFavorite: {
    type: Boolean,
    default: false,
  },
  job: {
    type: Object as () => IJobDetail,
  },
});

interface Emits {
  (event: 'click-card'): void;
}

const emit = defineEmits<Emits>();

const favoriteStore = useFavoriteStore();
const isFavorite = ref<boolean>(isJobFavorite(Number(props.job?.id)));

const handleFavorite = async () => {
  const data = await favoriteStore.addFavoriteJob(Number(props.job?.id));
  if (!data.error.value) {
    isFavorite.value = true;
  }
};

const handleUnFavorite = async () => {
  const data = await favoriteStore.deleteFavoriteJob(Number(props.job?.id));
  if (!data.error.value) {
    isFavorite.value = false;
  }
};
</script>

<style scoped></style>
