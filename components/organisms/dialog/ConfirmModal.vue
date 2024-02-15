<template>
  <ClientOnly>
    <el-dialog
      v-model="store.visible"
      width="496px"
      class="delete-job-dialog mobile:!mx-6 !rounded-xl overflow-hidden"
      :show-close="false"
      align-center
      :before-close="beforeCloseDialog"
    >
      <div class="text-center px-14 py-10 mobile:!p-4">
        <h3
          class="font-bold text-[22px] leading-[170%] text-black tracking-wider"
        >
          {{ store.title }}
        </h3>

        <p class="mt-4 text-base text-black" :class="store.classDescription">
          {{ store.description }}
        </p>

        <div class="mt-10 mobile:mt-8">
          <div class="pc:max-w-[256px] mb-2 mx-auto">
            <el-button
              type="primary"
              class="w-full !text-base !rounded-lg"
              @click="store.ok()"
            >
              {{ store.okText || 'OK' }}
            </el-button>
          </div>

          <div class="pc:max-w-[256px] mx-auto">
            <el-button
              type="default"
              class="w-full !ont-bold !text-primary !text-base !leading-5 underline"
              text
              @click="store.cancel()"
            >
              {{ store.cancelText || 'キャンセル' }}
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useConfirmDialogStore } from '~/stores/useConfirmDialogStore';

const store = useConfirmDialogStore();

const beforeCloseDialog = () => {
  return store.cancel();
};
</script>
