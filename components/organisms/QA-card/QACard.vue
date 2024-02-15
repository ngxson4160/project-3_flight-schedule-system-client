<template>
  <div
    class="mb-4 pc:max-w-[1024px] py-6 mobile:w-full shadow-light-box rounded-lg bg-white"
  >
    <div class="rounded-lg px-6 flex justify-between items-start">
      <div class="flex">
        <p class="mr-4 text-primary text-xl font-bold">Q.</p>
        <div>
          <p class="font-bold mt-[3px]">
            {{ question }}
          </p>
        </div>
      </div>
      <img
        v-if="isHidden"
        src="~/assets/images/plus.svg"
        alt=""
        class="hover:cursor-pointer"
        @click="isHidden = false"
      />
      <img
        v-else
        src="~/assets/images/minus.svg"
        class="hover:cursor-pointer"
        @click="isHidden = true"
      />
    </div>
    <div
      v-if="!isHidden"
      class="mt-[14px] pl-[62px] pr-6 text-black font-normal text-base text-left whitespace-pre-line"
      v-html="answer"
    ></div>
  </div>
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
  isShow: {
    type: Boolean,
    default: () => false,
  },
});
const isHidden = ref(false);
props.isShow ? (isHidden.value = true) : (isHidden.value = false);
const question = ref(props.data.question);
const answer = ref(props.data.answer);
</script>
<style lang="scss" scoped>
a {
  color: blue !important;
  text-decoration: underline;
}
</style>
