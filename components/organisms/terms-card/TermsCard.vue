<template>
  <ClientOnly>
    <div class="mt-[72px]">
      <p class="underlined-before ml-[20px] font-bold text-black text-lg">
        {{ question }}
      </p>
      <p class="text-base font-normal text-black mt-[32px]" v-html="answer"></p>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      question: '',
      answer: '',
    }),
  },
});
const question = ref(props.data.question);
const answer = ref(props.data.answer);
</script>
<style lang="scss" scoped></style>
