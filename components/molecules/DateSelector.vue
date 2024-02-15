<template>
  <div class="flex gap-4">
    <el-select
      v-model="yearComputed"
      filterable
      placeholder="年"
      clearable
      @clear="
        date.year = null;
        date.month = null;
        date.day = null;
      "
      @change="$emit('change')"
    >
      <el-option
        v-for="item in dataYear"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="isDate && +item.value < +startDate?.year"
      />
    </el-select>

    <el-select
      v-model="monthComputed"
      placeholder="月"
      :disabled="!date.year"
      clearable
      @select="getAllDays()"
      @change="getAllDays()"
      @clear="
        date.month = null;
        date.day = null;
      "
    >
      <el-option
        v-for="item in dataMonths"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="
          isDate &&
          +item.value < +startDate?.month &&
          +startDate?.year === +yearComputed
        "
      />
    </el-select>

    <el-select
      v-model="dayComputed"
      placeholder="日"
      clearable
      :disabled="!date.month"
      @change="$emit('change')"
    >
      <el-option
        v-for="item in dataDays"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="
          isDate &&
          +item.value < +startDate?.day &&
          +startDate?.month === +monthComputed &&
          +startDate?.year === +yearComputed
        "
      />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
const { getYear, dataYear, getMonths, dataMonths, getDays } =
  useCompositionMasterData();

const props = defineProps({
  dataDate: {
    type: Object,
    default: () => ({}),
  },
  isDate: {
    type: [Boolean],
  },
  startDate: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:dataDate', 'change']);

const date = reactive(props.dataDate);

watch(
  () => date,
  (newValue) => {
    emit('update:dataDate', newValue);
  },
  { deep: true },
);

onMounted(() => {
  getYear();
  getMonths();
  getAllDays();
});

const dataDays = ref<{ label: string; value: string }[]>([]);

const checkRegexNumber = (val: any): boolean => {
  const regex = /^[0-9]*$/g;
  const checkNumber = regex.test(val);
  return checkNumber;
};

const yearComputed = computed({
  get: () => props.dataDate.year,
  set: (val: any) => {
    return checkRegexNumber(val) ? (date.year = val) : '';
  },
});

const monthComputed = computed({
  get: () => props.dataDate.month,
  set: (val: any) => {
    return checkRegexNumber(val) ? (date.month = val) : '';
  },
});

const dayComputed = computed({
  get: () => props.dataDate.day,
  set: (val: any) => {
    return checkRegexNumber(val) ? (date.day = val) : '';
  },
});

const getAllDays = () => {
  emit('change');
  if (props.dataDate.year && props.dataDate.month) {
    return (dataDays.value = getDays(
      +props.dataDate.year,
      +props.dataDate.month,
    ));
  }
  return (dataDays.value = []);
};

const handleChangeYear = () => {
  monthComputed.value = '';
  dayComputed.value = '';
};
</script>
