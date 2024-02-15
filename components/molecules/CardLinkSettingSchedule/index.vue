<template>
  <div class="w-full shadow-base rounded-xl p-6">
    <div class="flex items-start gap-4">
      <img
        v-if="responseData?.avatarURL"
        :src="responseData.avatarURL"
        class="w-10 h-10 rounded-full stroke stroke-color-border"
      />

      <div>
        <span class="flex flex-wrap">
          <p
            v-for="user in formSettingInterview.bulkMessageParams"
            :key="user.recipientId"
            class="text-sm"
          >
            {{ user.userName }}
          </p>
          <p class="font-bold text-sm">
            「{{ formSettingInterview.selectionStep }}」
          </p>
          <p class="text-sm">の日程調整リンクを作成しました。</p>
        </span>

        <p class="leading-[175%] text-sm">
          <!-- 日程調整リンク：
          <span class="text-primary leading-[175%]">{{ linkRedirect }}</span>
          <br /> -->
          ※上記URLを応募者に共有して、選考日程を選んでもらってください。
          <br />
          --------
          <br />
          主にスキル面のチェックをしていただけると助かります。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~~/stores/auth';
import {
  useProfileEmployerStore,
  IEmployerData,
} from '~~/stores/profileEmployer';

const props = defineProps({
  formSettingInterview: {
    type: Object,
    default: () => {},
  },
});

const authStore = useAuthStore();
const profileEmployerStore = useProfileEmployerStore();
const responseData = ref<IEmployerData>();

if (authStore.id) {
  responseData.value = await profileEmployerStore.getEmployerData(authStore.id);
}

const linkRedirect = computed(() => {
  return `${window.location.host}/user/choose-interview-schedule`;
});
</script>

<style scoped></style>
