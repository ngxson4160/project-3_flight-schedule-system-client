<template>
  <div
    :class="`pc:w-[460px] w-full pb-6 border-b border-gray-third cursor-pointer pc:flex pc:flex-col pc:justify-between ${props.class}`"
    @click="emit('handleGoToDetail')"
  >
    <div>
      <p
        class="px-2 py-1 text-[12px] font-bold border border-gray-third rounded inline-block pc:max-w-[440px] max-w-[310px] truncate"
      >
        {{ props.job.jobCategory.name }}
      </p>
      <p
        class="pc:text-[18px] text-[16px] font-bold line-clamp-2 text-overflow mt-2 tracking-[0.2px]"
      >
        {{ props.job.title }}
      </p>
      <div class="flex gap-2 mt-4 items-center">
        <p
          class="text-primary border border-primary rounded py-1 px-2 text-[12px] tracking-[0.5px] flex-shrink-0 truncate"
        >
          {{ props.job.employmentStatus }}
        </p>
        <div
          v-for="(appealPoint, index) in props.job.appealPoint"
          :key="index"
          :class="{ hidden: index > 1 }"
        >
          <p
            v-if="index < 2"
            class="bg-secondary rounded py-1 px-2 text-[12px] tracking-[0.5px]"
            :class="{
              'flex-shrink-0  truncate': index === 0,
              'line-clamp-1 text-overflow': index !== 0,
            }"
          >
            {{ appealPoint }}
          </p>
        </div>

        <p
          v-if="props.job.appealPoint.length > 2"
          class="bg-secondary rounded py-1 px-2 text-[12px] tracking-[0.5px] flex-shrink-0"
        >
          ...
        </p>
        <p
          v-if="checkIsNew(props.job.updatedTime)"
          class="font-bold text-danger text-[12px] flex-shrink-0"
        >
          NEW
        </p>
      </div>
    </div>
    <div class="flex gap-4 items-center mt-4">
      <img
        v-if="isFavorite && role !== 'guest'"
        src="~/assets/images/book-mark-blue.svg"
        alt=""
        class="h-[32px] w-[32px] cursor-pointer"
        @click.stop="handUnfavoriteJob(props.job.id)"
      />
      <img
        v-else
        src="~/assets/images/book-mark-gray.svg"
        alt=""
        class="h-[32px] w-[32px] cursor-pointer"
        @click.stop="handleFavoriteJob(props.job.id)"
      />
      <div class="flex gap-1 items-center">
        <img
          :src="props.job.creator.avatarURL"
          class="w-[32px] h-[32px] object-cover rounded-full border border-gray-third"
        />
        <p class="text-[12px]">{{ props.job.creator.government.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IJobOverview } from '~/utils/interface';
import { useFavoriteStore } from '~/stores/useFavoriteStore';
import { useUser } from '~~/composables/auth/useUser';
import { useEmployer } from '~~/composables/auth/useEmployer';
const favoriteStore = useFavoriteStore();

const props = defineProps({
  job: {
    type: Object as () => IJobOverview,
    default: () => {},
  },
  class: {
    type: String,
    default: '',
  },
});
const emit = defineEmits([
  'handleFavorite',
  'handleGoToDetail',
  'unregister',
  'eventDelete',
]);

const isFavorite = ref<boolean>(isJobFavorite(props.job.id));

const handUnfavoriteJob = async (id: number) => {
  const data = await favoriteStore.deleteFavoriteJob(id);
  if (!data.error.value) {
    isFavorite.value = false;
    emit('eventDelete');
  } else {
    emit('unregister');
  }
};

const isUser = ref<boolean>(useUser());
const isEmployer = ref<boolean>(useEmployer());

const role = computed(() => {
  if (isEmployer.value) return 'employer';
  if (isUser.value) return 'user';
  return 'guest';
});

const handleFavoriteJob = async (id: number) => {
  if (role.value === 'guest') {
    emit('unregister');
  } else {
    await favoriteStore.addFavoriteJob(id);
    isFavorite.value = true;
  }
};
</script>

<style scoped></style>
