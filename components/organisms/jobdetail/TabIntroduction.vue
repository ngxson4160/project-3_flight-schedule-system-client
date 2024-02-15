<template>
  <div
    class="border-t-[1px] border-gray-third h-0 duration-300 transition-all py-3"
  >
    <div
      class="pc:max-w-[1024px] mx-auto flex justify-between gap-4 items-center h-full"
    >
      <div
        class="mobile:hidden overflow-hidden !pc:h-[60px] !h-[60px] !pc:w-[60px] !w-[60px] border border-gray-third rounded-full object-cover"
      >
        <img
          :src="jobDetailStore.creator?.avatarURL"
          alt=""
          class="relative !w-full !h-full object-cover"
        />
      </div>
      <div class="mobile:hidden pc:w-[600px] pr-2">
        <p
          class="mobile:px-6 font-bold text-base leading-[170%] tracking-wider pb-2 w-[520px] truncate"
        >
          {{ jobDetailStore.title }}
        </p>
        <div class="flex gap-2 flex-wrap mobile:px-6">
          <span
            v-for="tag in data.tags"
            v-show="!tag.isActive"
            :key="tag.label"
            :class="['tag', { active: tag.isActive }]"
            class="whitespace-pre-line break-words overflow-hidden"
          >
            {{ tag.label }}
          </span>
        </div>
      </div>
      <div
        class="flex-row-reverse flex mobile:px-6 gap-4 mobile:w-full items-center"
      >
        <div
          class="mobile:flex-grow pc:w-[256px] h-[56px] bg-gray cursor-pointer shadow-[0px_0px_20px_rgba(0,0,0,0.1)] rounded-lg text-center text-white leading-[150%]"
          :class="{ 'pointer-events-none cursor-none': isOutDateEntry }"
          @click="handleOpenDialog()"
        >
          <p class="pt-4 font-bold">
            {{ isOutDateEntry ? '求人が終了しました' : 'エントリー画面に進む' }}
          </p>
        </div>

        <div
          class="w-[56px] h-[56px] bg-color-message cursor-pointer flex text-center items-center rounded-lg"
          @click="handleOpenDialog()"
        >
          <img
            src="~/assets/images/icon-save-gray.svg"
            alt=""
            class="w-4 h-6 mx-auto"
          />
        </div>
        <UnregisteredAlert
          v-model:dialog-visible="showUnregisteredAlert"
          @event-cancel="showUnregisteredAlert = false"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  data: {
    type: Object,
    default: null,
  },
  jobDetailStore: {
    type: Object,
    default: null,
  },
  handleOpenDialog: {
    type: Function,
    default: () => {},
  },
  isOutDateEntry: {
    type: Boolean,
    default: false,
  },
});
</script>
<style></style>
