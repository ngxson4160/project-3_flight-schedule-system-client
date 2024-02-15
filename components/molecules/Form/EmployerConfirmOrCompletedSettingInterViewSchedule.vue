<template>
  <div class="pc:w-[760px] w-full mobile:p-6">
    <div class="flex flex-col items-center gap-16 mobile:gap-10">
      <div class="flex flex-col items-center gap-5">
        <h1 class="text-[32px] font-bold">
          {{ isCompleted ? 'リンク作成完了' : '内容確認' }}
        </h1>
        <div class="bg-primary h-1 w-10"></div>
      </div>

      <p v-if="!isCompleted" class="text-base leading-[175%] tracking-widest">
        以下の内容で作成します。
      </p>

      <p v-else class="text-base text-center leading-[175%] tracking-widest">
        日程調整リンクの作成が完了しました。
        <br />
        日程調整リンクを応募者に共有して、選考日程を選んでもらってください。
      </p>

      <div
        v-if="!isCompleted"
        class="w-full shadow-base p-10 rounded-xl mobile:px-6"
      >
        <div
          class="flex items-start gap-6 py-6 mobile:flex-col border-b border-solid border-gray-third"
        >
          <p class="text-sm min-w-[232px] font-bold">選考ステップ</p>
          <p class="text-sm">{{ formSettingInterview.selectionStep }}</p>
        </div>

        <div
          class="flex items-start gap-6 py-6 mobile:flex-col border-b border-solid border-gray-third"
        >
          <p class="text-sm min-w-[232px] font-bold">選考対象者</p>
          <div class="flex flex-col gap-4">
            <p
              v-for="item in formSettingInterview.bulkMessageParams"
              :key="item.boxId"
              class="text-sm"
            >
              {{ item.userName }}
            </p>
          </div>
        </div>

        <div
          class="flex items-start gap-6 py-6 mobile:flex-col border-b border-solid border-gray-third"
        >
          <p class="text-sm min-w-[232px] font-bold">候補日時</p>
          <div class="flex flex-col gap-4">
            <p
              v-for="date in formSettingInterview.dateSetting"
              :key="date"
              class="text-sm"
            >
              {{ date }}
            </p>
          </div>
        </div>

        <div
          class="flex items-start gap-6 py-6 mobile:flex-col border-b border-solid border-gray-third"
        >
          <p class="text-sm min-w-[232px] font-bold">選考の詳細メモ</p>
          <p class="text-sm overflow-hidden break-words whitespace-pre-line">
            {{ formSettingInterview.memo }}
          </p>
        </div>
      </div>

      <CardLinkSettingSchedule
        v-else
        :form-setting-interview="formSettingInterview"
      />

      <el-button
        class="w-[256px] mobile:w-full"
        type="primary"
        @click="emit('accept-confirm')"
      >
        {{ isCompleted ? 'メッセージ画面へ' : '作成する' }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Emits {
  (event: 'accept-confirm'): void;
}

const emit = defineEmits<Emits>();

const props = defineProps({
  isCompleted: {
    type: Boolean,
    default: false,
  },
  formSettingInterview: {
    type: Object,
    default: () => {},
  },
});
</script>

<style scoped></style>
