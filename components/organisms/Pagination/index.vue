<template>
  <div class="flex items-center justify-center">
    <div
      :class="`pagination-item ${firstPageClass}`"
      @click="setCurrentPage(1)"
    >
      <img
        v-if="firstPageClass === ''"
        src="~/assets/images/first-page-arrow-24.svg"
        alt=""
      />
      <img v-else src="~/assets/images/first-page-arrow-24-gray.svg" alt="" />
    </div>
    <div
      :class="`pagination-item ${prePageClass}`"
      @click="setCurrentPage(current - 1)"
    >
      <img
        v-if="prePageClass === ''"
        src="~/assets/images/arrow-left-blue-24.svg"
        alt=""
      />
      <img v-else src="~/assets/images/arrow-left-gray-24.svg" alt="" />
    </div>
    <div
      v-if="current > 4 && totalPages > 7"
      class="hover:cursor-pointer mx-[6px] mobile:hidden"
      @click="setJumpPagePre(current)"
    >
      <img src="~/assets/images/abbreviation-dots-24.svg" alt="" />
    </div>
    <div
      v-if="current > totalPages - 1 && pre6Page > 0"
      class="pagination-item only-pc"
      @click="setCurrentPage(pre6Page)"
    >
      <p class="text-center">{{ pre6Page }}</p>
    </div>
    <div
      v-if="current > totalPages - 2 && pre5Page > 0"
      class="pagination-item only-pc"
      @click="setCurrentPage(pre5Page)"
    >
      <p class="text-center">{{ pre5Page }}</p>
    </div>
    <div
      v-if="current > totalPages - 3 && pre4Page > 0"
      class="pagination-item only-pc"
      @click="setCurrentPage(pre4Page)"
    >
      <p class="text-center">{{ pre4Page }}</p>
    </div>
    <div
      v-if="pre3Page > 0"
      class="pagination-item only-pc"
      @click="setCurrentPage(pre3Page)"
    >
      <p class="text-center">{{ pre3Page }}</p>
    </div>
    <div
      v-if="pre2Page > 0"
      class="pagination-item only-pc"
      @click="setCurrentPage(pre2Page)"
    >
      <p class="text-center">{{ pre2Page }}</p>
    </div>
    <div
      v-if="pre1Page > 0"
      class="pagination-item only-pc"
      @click="setCurrentPage(pre1Page)"
    >
      <p class="text-center">{{ pre1Page }}</p>
    </div>
    <div class="text-center text-xs whitespace-nowrap mx-[6px]">
      <span>{{ current }}</span>
      <span>/</span>
      <span>{{ totalPages }}</span>
    </div>
    <div
      v-if="current < totalPages && totalPages > 1"
      class="pagination-item only-pc"
      @click="setCurrentPage(next1Page)"
    >
      <p class="text-center">{{ next1Page }}</p>
    </div>
    <div
      v-if="current + 1 < totalPages && totalPages > 2"
      class="pagination-item only-pc"
      @click="setCurrentPage(next2Page)"
    >
      <p class="text-center">{{ next2Page }}</p>
    </div>
    <div
      v-if="current + 2 < totalPages && totalPages > 3"
      class="pagination-item only-pc"
      @click="setCurrentPage(next3Page)"
    >
      <p class="text-center">{{ next3Page }}</p>
    </div>
    <div
      v-if="totalPages > 4 && current < 4 && current + 3 < totalPages"
      class="pagination-item only-pc"
      @click="setCurrentPage(next4Page)"
    >
      <p class="text-center">{{ next4Page }}</p>
    </div>
    <div
      v-if="totalPages > 5 && current < 3 && current + 4 < totalPages"
      class="pagination-item only-pc"
      @click="setCurrentPage(next5Page)"
    >
      <p class="text-center">{{ next5Page }}</p>
    </div>
    <div
      v-if="totalPages > 6 && current < 2"
      class="pagination-item only-pc"
      @click="setCurrentPage(next6Page)"
    >
      <p class="text-center">{{ next6Page }}</p>
    </div>
    <div
      v-if="current + 3 < totalPages && totalPages > 7"
      class="hover:cursor-pointer mx-[6px] mobile:hidden"
      @click="setJumpPageNext(current)"
    >
      <img src="~/assets/images/abbreviation-dots-24.svg" alt="" />
    </div>
    <div
      :class="`pagination-item ${nextPageClass}`"
      @click="setCurrentPage(current + 1)"
    >
      <img
        v-if="nextPageClass === ''"
        src="~/assets/images/arrow-right-blue-24.svg"
        alt=""
      />
      <img v-else src="~/assets/images/arrow-right-gray-24.svg" alt="" />
    </div>
    <div
      :class="`pagination-item ${lastPageClass}`"
      @click="setCurrentPage(totalPages)"
    >
      <img
        v-if="lastPageClass === ''"
        src="~/assets/images/end-page-arrow-24.svg"
        alt=""
      />
      <img v-else src="~/assets/images/end-page-arrow-gray-24.svg" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  totalItems: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
});
const emit = defineEmits(['setCurrentPage']);
const pageSize = ref(props.pageSize);
const totalPages = ref(0);
const firstPageClass = ref('');
const prePageClass = ref('');
const nextPageClass = ref('');
const lastPageClass = ref('');

const pre1Page = ref(0);
const pre2Page = ref(0);
const pre3Page = ref(0);
const pre4Page = ref(0);
const pre5Page = ref(0);
const pre6Page = ref(0);

const next1Page = ref(0);
const next2Page = ref(0);
const next3Page = ref(0);
const next4Page = ref(0);
const next5Page = ref(0);
const next6Page = ref(0);

const total = computed({
  get: () => props.totalItems,
  set: (val: any) => {
    total.value = val;
  },
});

const current = computed({
  get: () => props.currentPage,
  set: (val: any) => {
    current.value = val;
  },
});

onMounted(async () => {
  if (current.value === 1) {
    firstPageClass.value = 'pointer-events-none';
    prePageClass.value = 'pointer-events-none';
  } else {
    firstPageClass.value = '';
    prePageClass.value = '';
  }
  pre1Page.value = current.value - 1;
  pre2Page.value = current.value - 2;
  pre3Page.value = current.value - 3;
  pre4Page.value = current.value - 4;
  pre5Page.value = current.value - 5;
  pre6Page.value = current.value - 6;

  next1Page.value = current.value + 1;
  next2Page.value = current.value + 2;
  next3Page.value = current.value + 3;
  next4Page.value = current.value + 4;
  next5Page.value = current.value + 5;
  next6Page.value = current.value + 6;

  totalPages.value = Math.ceil(total.value / pageSize.value);
  if (current.value === totalPages.value) {
    lastPageClass.value = 'pointer-events-none';
    nextPageClass.value = 'pointer-events-none';
  } else {
    lastPageClass.value = '';
    nextPageClass.value = '';
  }
  await nextTick();
});

watch(total, async (newValue) => {
  totalPages.value = Math.ceil(newValue / pageSize.value);
  await nextTick();
});

watch(current, async (newValue) => {
  if (newValue === 1) {
    firstPageClass.value = 'pointer-events-none';
    prePageClass.value = 'pointer-events-none';
  } else {
    firstPageClass.value = '';
    prePageClass.value = '';
  }
  if (newValue === totalPages.value) {
    lastPageClass.value = 'pointer-events-none';
    nextPageClass.value = 'pointer-events-none';
  } else {
    lastPageClass.value = '';
    nextPageClass.value = '';
  }
  pre1Page.value = newValue - 1;
  pre2Page.value = newValue - 2;
  pre3Page.value = newValue - 3;
  pre4Page.value = newValue - 4;
  pre5Page.value = newValue - 5;
  pre6Page.value = newValue - 6;

  next1Page.value = newValue + 1;
  next2Page.value = newValue + 2;
  next3Page.value = newValue + 3;
  next4Page.value = newValue + 4;
  next5Page.value = newValue + 5;
  next6Page.value = newValue + 6;
  await nextTick();
});

const setCurrentPage = (page: number) => {
  if (page > 0 && page <= totalPages.value) {
    emit('setCurrentPage', page);
  }
};
const setJumpPagePre = (page: number) => {
  if (current.value > 7) emit('setCurrentPage', page - 7);
  else emit('setCurrentPage', 1);
};
const setJumpPageNext = (page: number) => {
  if (current.value + 7 <= totalPages.value) emit('setCurrentPage', page + 7);
  else emit('setCurrentPage', totalPages.value);
};
</script>

<style lang="scss" scoped>
.only-pc {
  @apply text-primary text-sm  mobile:hidden;
}
.pagination-item {
  @apply w-12 h-12 p-3 mx-[6px] rounded-full border-[1px] border-gray-third hover:cursor-pointer;
}
</style>
