<template>
  <div class="flex items-center gap-2 mobile:gap-1">
    <img
      class="w-[60px] h-[60px] mobile:w-10 mobile:h-10 rounded-full border border-gray-third object-cover cursor-pointer"
      :src="account.avatarURL || ''"
      @click="handleGoToEmployerDetail(Number(account.id))"
    />

    <div class="flex flex-col justify-center gap-[2px] h-14 mobile:h-[46px]">
      <div
        class="cursor-pointer"
        @click="handleGoToEmployerDetail(Number(account.id))"
      >
        <p class="text-sm pc:text-base">
          {{ account?.governmentOffice?.name ?? account.government.name }}
        </p>
      </div>

      <div v-if="slots.default" class="pc:text-sm text-xs text-gray">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUser } from '~~/composables/auth/useUser';
import { useEmployer } from '~/composables/auth/useEmployer';

const props = defineProps({
  account: {
    type: Object,
    required: true,
  },
  sizeTitle: {
    type: String,
    default: 'medium',
  },
});

const slots = useSlots();
const handleGoToEmployerDetail = (employerId: number) => {
  const isUser = useUser();
  const isEmployer = useEmployer();
  if (isUser) return navigateTo(`/user/employer/${employerId}`);
  if (isEmployer) return navigateTo('/employer/mypage');
  return navigateTo(`/employer/${employerId}`);
};
</script>
