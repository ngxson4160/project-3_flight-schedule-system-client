<template>
  <div class="flex justify-end pc:mt-10 mt-6 text-[14px]">
    <div
      class="svg-custom flex items-center justify-center bg-gray-secondary rounded-lg pc:py-4 py-2 pc:px-8 px-6 cursor-pointer hover:text-primary hover:bg-opacity-60"
      :class="{ 'pc:w-[496px]': props.type === 'center' }"
      @click="emit('handleClick')"
    >
      <p class="font-bold">{{ props.label }}</p>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5328 23.5354L11.1328 22.1354L17.2661 16.0021L11.1328 9.86875L12.5328 8.46875L20.0661 16.0021L12.5328 23.5354Z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['handleClick']);
</script>

<style scoped></style>
