<template>
  <el-input v-model="syncTextField" />
</template>
<script setup lang="ts">
import { computed } from 'vue';
// use component
// <the-time-input v-model:textField="var" />

const emit = defineEmits(['update:textField']);

const props = defineProps({
  textField: {
    type: Number,
    default: 0,
  },
});

// const blurField = () => {
//   if (syncTextField?.value?.length && syncTextField?.value?.length < 3) {
//     return (syncTextField.value = syncTextField.value + "00");
//   }
//   return;
// };
const formattedMoney = (money: string) =>
  money.replace(/\D/g, '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');

const formattedNumber = (money: string) => +money.replace(/\D/g, '');

const syncTextField = computed<string | undefined>({
  get: () => formattedMoney(String(props.textField)),
  set: (value: any) => {
    return emit('update:textField', formattedNumber(value));
  },
});
</script>
