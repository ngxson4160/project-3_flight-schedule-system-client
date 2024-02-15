<template>
  <div
    class="flex justify-between items-center py-4 border-b-[1px] border-gray-third"
  >
    <div class="pr-2">
      <p class="text-primary text-sm pb-1">{{ title }}</p>
      <p class="text-gray text-xs">{{ date }}</p>
    </div>
    <img src="~/assets/images/icon-keyboard-arrow-right.svg" alt="" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  date: {
    type: String,
    default: null,
  },
});
</script>

<style></style>
