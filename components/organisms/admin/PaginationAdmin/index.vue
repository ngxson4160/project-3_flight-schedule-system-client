<template>
  <div v-if="total > 0" class="flex items-center text-sm pagination-admin">
    <p class="text-gray pl-2">{{ total }}項目</p>
    <div v-if="current === 1" class="flex">
      <img
        src="~/assets/images/icon-first-page-mode-admin-gray.svg"
        alt=""
        class="ml-2"
      />
      <img
        src="~/assets/images/icon-pre-page-mode-admin-gray.svg"
        alt=""
        class="ml-2"
      />
    </div>
    <div v-else class="flex">
      <img
        src="~/assets/images/icon-first-page-mode-admin-blue.svg"
        alt=""
        class="ml-2 hover:cursor-pointer"
        @click="setCurrentPage(1)"
      />

      <img
        src="~/assets/images/icon-pre-page-mode-admin-blue.svg"
        alt=""
        class="ml-2 hover:cursor-pointer"
        @click="setCurrentPage(current - 1)"
      />
    </div>
    <div class="ml-2">
      <el-input-number
        id="current-page"
        v-model="currentPageInput"
        class="h-8 !w-14"
        @keyup.enter="setInputValue"
        @blur="setInputValue"
      ></el-input-number>
    </div>
    <p class="ml-2 whitespace-nowrap">/ {{ totalPages }}</p>
    <div v-if="current === totalPages" class="flex">
      <img
        src="~/assets/images/icon-next-page-mode-admin-gray.svg"
        alt=""
        class="ml-2"
      />

      <img
        src="~/assets/images/icon-last-page-mode-admin-gray.svg"
        alt=""
        class="ml-2"
      />
    </div>
    <div v-else class="flex">
      <img
        src="~/assets/images/icon-next-page-mode-admin-blue.svg"
        alt=""
        class="ml-2 hover:cursor-pointer"
        @click="setCurrentPage(current + 1)"
      />
      <img
        src="~/assets/images/icon-last-page-mode-admin-blue.svg"
        alt=""
        class="ml-2 hover:cursor-pointer"
        @click="setCurrentPage(totalPages)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
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
    default: 1,
  },
});
const emit = defineEmits(['setCurrentPage']);
const currentPageInput = ref<number>(props.currentPage);

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

const size = ref<number>(props.pageSize);
const totalPages = ref<number>(0);
watchEffect(async () => {
  totalPages.value = Math.ceil(total.value / size.value);
  currentPageInput.value = props.currentPage;
  await nextTick();
});

const setCurrentPage = (page: number) => {
  if (page > 0 && page <= totalPages.value) {
    emit('setCurrentPage', page);
  }
};

const setInputValue = () => {
  if (currentPageInput.value <= 0 || currentPageInput.value > totalPages.value)
    currentPageInput.value = totalPages.value;
  emit('setCurrentPage', currentPageInput.value);
  const input = document.getElementById('current-page');
  if (input) input.blur();
};
</script>

<style lang="scss"></style>
