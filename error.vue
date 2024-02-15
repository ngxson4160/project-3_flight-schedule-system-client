<template>
  <div>
    <NuxtLayout :name="getLayout">
      <div
        class="flex justify-center items-center flex-col my-16 mobile:mt-10 px-6"
      >
        <img
          class="w-[320px] mb-10"
          src="~/assets/images/icon-error-page.svg"
        />
        <h1 class="text-2xl font-bold mobile:text-center">Not found</h1>
        <el-button
          class="mt-[40px] w-[375px] mobile:w-full"
          type="primary"
          @click="routerPush('/')"
        >
          Go to home page
        </el-button>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useUser } from '~~/composables/auth/useUser';
import { useEmployer } from '~~/composables/auth/useEmployer';

definePageMeta({
  layout: false,
});

const isUser = ref<boolean>(useUser());
const isEmployer = ref<boolean>(useEmployer());

const getLayout = computed(() => {
  if (isEmployer.value) return 'employer';
  if (isUser.value) return 'user';
  return 'guest';
});
defineProps({
  error: {
    type: Object,
    default: () => ({
      statusCode: '',
      message: '',
    }),
  },
});
</script>
