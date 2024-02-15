<template>
  <div
    class="flex flex-col items-center gap-2 w-full border border-gray-third rounded-xl py-6 relative cursor-pointer"
    @click="emit('handleClick')"
  >
    <img
      :src="props.employer.avatarURL"
      class="w-[60px] h-[60px] rounded-full border border-gray-third object-cover"
    />
    <p class="pc:text-[18px] text-[16px] font-bold text-center">
      {{ props.employer.governmentOffice.name }}
    </p>
    <p
      v-if="props.employer.createdJobs"
      class="text-[12px] text-primary py-1 px-2 rounded border border-primary absolute left-[8px] -top-[8px] bg-white"
    >
      求人募集中
    </p>
  </div>
</template>

<script setup lang="ts">
import { IEmployerOverview } from '~/utils/interface';
const props = defineProps({
  employer: {
    type: Object as () => IEmployerOverview,
    default: () => {},
  },
});
const emit = defineEmits(['handleClick']);
</script>

<style scoped></style>
