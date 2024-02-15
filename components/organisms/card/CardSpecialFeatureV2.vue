<template>
  <div
    class="cursor-pointer"
    :class="
      isList
        ? '!w-full'
        : 'pc:w-[304px] mobile:w-[342px] mobile:pb-6 mobile:border-b mobile:border-gray-third'
    "
    @click="emit('handleClick')"
  >
    <img
      :src="props.specialFeature.imgUrl"
      class="w-full object-cover rounded-lg"
      :class="isList ? 'h-[180px] mobile:h-[192px]' : 'h-[171px] mobile:hidden'"
    />
    <div class="flex justify-between items-center mt-4 mobile:hidden">
      <div class="flex items-center">
        <div class="flex items-center gap-x-2 max-w-[200px]">
          <div
            v-for="(tag, index) in specialFeatureTag"
            :key="index"
            :class="{ 'flex-shrink-0 ': index === 0 }"
          >
            <p
              class="border border-primary text-primary rounded py-1 px-2 text-[12px] tracking-[0.1px]"
              :class="{
                'text-overflow line-clamp-1': index !== 0,
                'max-w-[168px] truncate': index === 0,
              }"
              style="line-break: anywhere"
            >
              {{ tag }}
            </p>
          </div>
        </div>

        <p
          v-if="checkIsNew(props.specialFeature.publicationDate)"
          class="text-[14px] text-danger font-bold flex-shrink-0 tracking-[0.1px] ml-2"
        >
          NEW
        </p>
      </div>
      <p class="text-[12px] text-gray flex-shrink-0 pl-1">
        {{ formatDate(props.specialFeature.publicationDate, 'YYYY/MM/DD') }}
      </p>
    </div>
    <div :class="isList ? 'mobile:hidden' : 'mobile:flex mobile:gap-4'">
      <p
        class="text-[16px] font-bold line-clamp-3 text-overflow pc:mt-4 mobile:leading-[170%]"
        :class="isList ? '  mobile:hidden' : ' mobile:flex-grow'"
      >
        {{ props.specialFeature.title }}
      </p>
      <img
        :src="props.specialFeature.imgUrl"
        :class="
          isList
            ? 'hidden'
            : 'w-[116px] h-[66px] object-cover rounded-lg pc:hidden flex-shrink-0'
        "
      />
    </div>
    <div class="mt-4 pc:hidden">
      <div
        class="flex gap-2 items-center"
        :class="isList ? 'justify-between' : ''"
      >
        <div class="flex items-center gap-x-2 max-w-[220px]">
          <div
            v-for="(tag, index) in specialFeatureTag"
            :key="index"
            :class="{ 'flex-shrink-0': index === 0 }"
          >
            <p
              class="border border-primary text-primary rounded py-1 px-2 text-[12px] tracking-[0.1px]"
              :class="{
                'text-overflow line-clamp-1': index !== 0,
                'max-w-[188px] truncate': index === 0,
              }"
              style="line-break: anywhere"
            >
              {{ tag }}
            </p>
          </div>
          <span
            v-if="checkIsNew(props.specialFeature.publicationDate) && isList"
            class="text-[14px] text-danger font-bold flex-shrink-0 tracking-[0.1px]"
          >
            NEW
          </span>
        </div>

        <p class="text-[12px] text-gray flex-shrink-0 pl-1">
          {{ formatDate(props.specialFeature.publicationDate, 'YYYY/MM/DD') }}
        </p>
        <p
          v-if="checkIsNew(props.specialFeature.publicationDate) && !isList"
          class="text-[14px] text-danger font-bold flex-shrink-0 tracking-[0.1px]"
        >
          NEW
        </p>
      </div>
      <p
        :class="
          isList
            ? 'text-[16px] font-bold line-clamp-3 text-overflow mt-4  mobile:leading-[170%] mobile:flex-grow'
            : 'hidden'
        "
      >
        {{ props.specialFeature.title }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ISpecialFeatureOverview } from '~/utils/interface';
const props = defineProps({
  specialFeature: {
    type: Object as () => ISpecialFeatureOverview,
    default: () => {},
  },
  isList: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['handleClick']);

const specialFeatureTag = computed(() => {
  const data = props.specialFeature.tags;
  if (data.length > 2) {
    return data.splice(0, 2);
  }
  return data;
});
</script>

<style scoped></style>
