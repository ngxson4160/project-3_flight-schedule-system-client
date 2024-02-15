<template>
  <div
    class="pc:w-[460px] w-[342px] pb-6 border-b border-gray-third pc:h-[160px] cursor-pointer"
    @click="emit('handleClick')"
  >
    <div class="flex items-center gap-2">
      <img
        :src="props.new.creator.avatarURL"
        class="w-[40px] h-[40px] object-cover rounded-full border border-gray-third"
      />
      <p class="text-[14px]">{{ props.new.creator.governmentOffice.name }}</p>
    </div>
    <p
      class="pc:text-[16px] text-[14px] font-bold line-clamp-2 text-overflow mt-2 tracking-[0.1px]"
    >
      {{ props.new.title }}
    </p>
    <div
      v-if="props.new.typeNews === 3"
      class="flex gap-2 mt-2 mobile:flex-wrap items-center"
    >
      <div v-for="(item, index) in props.new.sessionSchedule" :key="index">
        <p
          v-if="item"
          class="text-[12px] border border-gray-third py-1 px-2 rounded tracking-[0.2px] line-clamp-1 text-overflow"
        >
          {{ item.replace(/ - /g, '') }}
        </p>
      </div>
      <p
        v-if="checkIsNew(props.new.createdTime)"
        class="text-[14px] text-danger font-bold"
      >
        NEW
      </p>
    </div>
    <div v-else class="mt-2 flex items-center gap-2">
      <p
        class="border border-primary rounded text-primary text-[12px] inline-block py-1 px-2 pc:max-w-[300px] max-w-[210px] truncate"
      >
        職員募集情報
      </p>
      <p class="text-gray text-[12px]">
        {{ formatDate(props.new.publicationDate, 'YYYY/MM/DD') }}
      </p>
      <p
        v-if="checkIsNew(props.new.createdTime)"
        class="text-danger font-bold text-[14px]"
      >
        NEW
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { INewBriefingOverview } from '~/utils/interface';
const props = defineProps({
  new: {
    type: Object as () => INewBriefingOverview,
    default: () => {},
  },
});
const emit = defineEmits(['handleClick']);
</script>

<style scoped></style>
