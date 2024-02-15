<template>
  <div
    :class="` mt-6 cursor-pointer ${props.class}`"
    @click="emit('clickDetail')"
  >
    <div>
      <div v-if="isShowEmployer" class="flex pc:h-10">
        <el-image
          :src="dataCard.creator.avatarURL"
          alt=""
          class="h-10 w-10 rounded-full border-[1px] border-gray-third object-cover flex-shrink-0"
        />
        <p class="text-sm font-normal my-auto ml-2">
          {{ dataCard.creator?.governmentOffice?.name }}
        </p>
      </div>
      <div class="mt-2">
        <p
          class="text-base mobile:text-sm font-bold text-black truncate-text-2-line"
        >
          {{ dataCard.title }}
        </p>
      </div>
    </div>
    <div class="mt-2 flex items-center flex-wrap">
      <span v-if="props.size !== 'small'" class="tag-type-news mr-2">
        {{ typeNewsText[dataCard.typeNews] }}
      </span>
      <span
        v-for="session in sessionSchedule"
        :key="session"
        class="tag-session-schedule"
      >
        {{ session.replace(/ - /g, '') }}
      </span>

      <span
        v-if="props.size !== 'small'"
        class="text-xs font-normal text-gray mr-2"
      >
        {{ dateTimeFormat(dataCard.publicationDate) }}
      </span>
      <span
        v-if="checkIsNew(dataCard.publicationDate)"
        class="text-sm font-bold text-danger"
      >
        NEW
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IDataCardNews } from '~~/utils/interface';

interface Props {
  dataCard: IDataCardNews;
  class: string;
  size: string;
  type: string;
  isShowEmployer: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isShowEmployer: true,
});

interface Emits {
  (event: 'clickDetail'): void;
}
const emit = defineEmits<Emits>();

const sessionSchedule = computed(() => {
  return props.dataCard.sessionSchedule.filter((session: string) => session);
});
</script>
