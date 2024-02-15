<template>
  <div
    class="flex items-center gap-4 pc:p-6 p-4 pc:mt-10 mt-6 bg-secondary rounded-lg"
  >
    <div
      class="flex justify-center items-center pc:w-[60px] pc:h-[60px] w-10 h-10 flex-shrink-0 rounded-full bg-white"
    >
      <img
        src="~/assets/images/icon-saved-blue.svg"
        alt=""
        class="pc:w-6 pc:h-6 h-4 w-4"
      />

      <!-- <img
        v-else
        src="~/assets/images/icon-save-gray.svg"
        alt=""
        class="pc:w-6 pc:h-6 h-4 w-4"
      /> -->
    </div>

    <div class="flex flex-col">
      <p
        class="text-base mobile:text-sm leading-[170%] font-normal text-black-bold"
      >
        {{ descriptionSt }}
      </p>
      <p
        class="text-base mobile:text-sm leading-[170%] font-normal text-black-bold"
      >
        {{ creatorName }}{{ descriptionSnd }}
      </p>
    </div>
  </div>

  <UnregisteredAlert
    v-model:dialog-visible="dialogAlert"
    @event-cancel="dialogAlert = false"
  />
</template>

<script setup lang="ts">
import { useProfileEmployerStore } from '~~/stores/profileEmployer';

interface Props {
  descriptionSt: string;
  descriptionSnd: string;
  isFavorite: boolean;
}

// interface Emits {
//   (event: 'favorite'): void;
//   (event: 'un-favorite'): void;
// }

// const emit = defineEmits<Emits>();

defineProps<Props>();

const { params } = useRoute();
const { idEmployer } = params;

const employerId = Number(idEmployer);
const dialogAlert = ref<boolean>(false);

// const cookieSessionAuth = useCookie('auth.session-token').value;

const profileEmployerStore = useProfileEmployerStore();
if (employerId && employerId !== profileEmployerStore.id) {
  profileEmployerStore.setEmployerData(
    await profileEmployerStore.getEmployerData(employerId),
  );
}

const creatorName = computed(() => {
  return profileEmployerStore.government?.name ?? '';
});

// const handleFavorite = () => {
//   if (!cookieSessionAuth) {
//     dialogAlert.value = true;
//   } else {
//     emit('favorite');
//   }
// };

// const handleRemoveFavorite = () => {
//   if (!cookieSessionAuth) {
//     dialogAlert.value = true;
//   } else {
//     emit('un-favorite');
//   }
// };
</script>

<style scoped></style>
