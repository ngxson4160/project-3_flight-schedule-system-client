<template>
  <div class="relative">
    <div
      class="flex pc:mb-8 mobile:py-4 mobile:justify-between mobile:items-center mobile:px-6"
    >
      <p></p>
      <h1 class="text-2xl font-bold mobile:text-sm">求人掲載期間</h1>
      <img
        src="~/assets/images/icon-close-modal.svg"
        alt=""
        class="pc:hidden"
        @click="emit('close-modal')"
      />
    </div>

    <el-form
      label-position="top"
      class="employer-from mobile:p-6 mobile:border-t mobile:border-solid mobile:border-color-border"
    >
      <el-form-item label="開始日" required>
        <div class="flex gap-4">
          <el-select v-model="hiringStartDate.year" placeholder="年">
            <el-option
              v-for="item in OPTION_HIRING_YEAR"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :disabled="+item.value > +hiringEndDate.year"
            />
          </el-select>

          <el-select v-model="hiringStartDate.month" placeholder="月">
            <el-option
              v-for="item in OPTION_HIRING_MONTH"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :disabled="
                hiringStartDate.year === hiringEndDate.year &&
                +item.value > +hiringEndDate.month
              "
            />
          </el-select>

          <el-select
            v-model="hiringStartDate.day"
            placeholder="日"
            @click="handleChooseDayStartDate"
          >
            <el-option
              v-for="item in OPTION_HIRING_DAY"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :disabled="
                hiringStartDate.month === hiringEndDate.month &&
                hiringStartDate.year === hiringEndDate.year &&
                +item.value > +hiringStartDate.day
              "
            />
          </el-select>
        </div>
      </el-form-item>

      <el-form-item label="終了日" :required="!isNotRequiredHiringEndDate">
        <el-checkbox
          v-model="isNotRequiredHiringEndDate"
          class="job-select-box"
          @change="handleRequired"
        >
          設定しない
        </el-checkbox>
        <div class="flex gap-4">
          <el-select
            v-model="hiringEndDate.year"
            placeholder="年"
            :disabled="isNotRequiredHiringEndDate"
          >
            <el-option
              v-for="item in OPTION_HIRING_YEAR"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :disabled="+item.value < +hiringStartDate.year"
            />
          </el-select>

          <el-select
            v-model="hiringEndDate.month"
            placeholder="月"
            :disabled="isNotRequiredHiringEndDate"
          >
            <el-option
              v-for="item in OPTION_HIRING_MONTH"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :disabled="
                hiringStartDate.year === hiringEndDate.year &&
                +hiringStartDate.month > +item.value
              "
            />
          </el-select>

          <el-select
            v-model="hiringEndDate.day"
            placeholder="年"
            :disabled="isNotRequiredHiringEndDate"
            @click="handleChooseDayEndDate"
          >
            <el-option
              v-for="item in OPTION_HIRING_DAY"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :disabled="
                hiringStartDate.month === hiringEndDate.month &&
                hiringStartDate.year === hiringEndDate.year &&
                +hiringStartDate.day > +item.value
              "
            />
          </el-select>
        </div>
      </el-form-item>
      <p
        v-if="!isNotRequiredHiringEndDate && isEmptyEndDate"
        class="text-danger text-xs"
      >
        {{ messageEmptyData }}
      </p>
    </el-form>

    <div
      class="w-full flex pc:flex-col pc:items-center pc:gap-6 justify-center pc:mt-10 mobile:fixed mobile:bottom-0 mobile:px-6 mobile:py-4 mobile:border-t mobile:border-solid mobile:border-color-border mobile:bg-white mobile:shadow-base"
    >
      <el-button
        type="primary"
        class="w-[256px] mobile:w-full"
        @click="handleUpdate"
      >
        設定する
      </el-button>
      <p
        class="text-primary font-bold underline underline-offset-2 cursor-pointer mobile:hidden"
        @click="emit('close-modal')"
      >
        キャンセル
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

interface Props {
  hiringStartDate: string;
  hiringEndDate: string;
}

interface Emits {
  (event: 'close-modal'): void;
  (event: 'update:hiringStartDate', startDate: string): void;
  (event: 'update:hiringEndDate', endDate: string | null): void;
  (event: 'updateData', isNotRequiredHiringEndDate: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleFormatDate = (date: string, format: string) => {
  return date ? dayjs(date).format(format) : '';
};

const dayOfMonth = ref<number>(31);

const hiringStartDate = ref({
  year: handleFormatDate(props.hiringStartDate, 'YYYY'),
  month: handleFormatDate(props.hiringStartDate, 'MM'),
  day: handleFormatDate(props.hiringStartDate, 'DD'),
});

const hiringEndDate = ref({
  year: handleFormatDate(props.hiringEndDate, 'YYYY'),
  month: handleFormatDate(props.hiringEndDate, 'MM'),
  day: handleFormatDate(props.hiringEndDate, 'DD'),
});

const hiringStartDateMerge = computed(() => {
  return `${hiringStartDate.value.year}/${hiringStartDate.value.month}/${hiringStartDate.value.day}`;
});

const hiringEndDateMerge = computed(() => {
  return `${hiringEndDate.value.year}/${hiringEndDate.value.month}/${hiringEndDate.value.day}`;
});

const handleChooseDayStartDate = () => {
  dayOfMonth.value = dayjs(hiringStartDateMerge.value).daysInMonth();
};

const handleChooseDayEndDate = () => {
  dayOfMonth.value = dayjs(hiringEndDateMerge.value).daysInMonth();
};

const OPTION_HIRING_YEAR = [...Array(100)].map((_, i) => ({
  value: `${i + 2000}`,
  label: `${i + 2000}`,
}));

const OPTION_HIRING_MONTH = computed(() => {
  return [...Array(12)].map((_, i) => ({
    value: i < 9 ? `${0}${i + 1}` : `${i + 1}`,
    label: i < 9 ? `${0}${i + 1}` : `${i + 1}`,
  }));
});

const OPTION_HIRING_DAY = computed(() => {
  return [...Array(dayOfMonth.value)].map((_, i) => ({
    value: i < 9 ? `${0}${i + 1}` : `${i + 1}`,
    label: i < 9 ? `${0}${i + 1}` : `${i + 1}`,
  }));
});

const isNotRequiredHiringEndDate = ref<boolean>(false);
const messageEmptyData = ref<string>('必須項目です');

const isEmptyEndDate = computed(() => {
  return Object.values(hiringEndDate.value).some((i) => !i);
});

isNotRequiredHiringEndDate.value = Object.values(hiringEndDate.value).some(
  (i) => !i,
);

const handleUpdate = () => {
  let endDate = null;
  const startDate = `${hiringStartDate.value.year}/${hiringStartDate.value.month}/${hiringStartDate.value.day}`;

  if (isNotRequiredHiringEndDate.value) {
    endDate = null;
  } else if (
    !isNotRequiredHiringEndDate.value &&
    hiringEndDate.value.year &&
    hiringEndDate.value.month &&
    hiringEndDate.value.day
  ) {
    endDate = `${hiringEndDate.value.year}/${hiringEndDate.value.month}/${hiringEndDate.value.day}`;
  }

  if (
    isNotRequiredHiringEndDate.value ||
    (!isNotRequiredHiringEndDate.value &&
      hiringEndDate.value.year &&
      hiringEndDate.value.month &&
      hiringEndDate.value.day)
  ) {
    emit('update:hiringStartDate', startDate);
    emit('update:hiringEndDate', endDate);
    emit('updateData', isNotRequiredHiringEndDate.value);
    isNotRequiredHiringEndDate.value = false;
  }
};

watch(
  () => props.hiringStartDate,
  (newValue) => {
    hiringStartDate.value = {
      year: handleFormatDate(newValue, 'YYYY'),
      month: handleFormatDate(newValue, 'MM'),
      day: handleFormatDate(newValue, 'DD'),
    };
    dayOfMonth.value = dayjs(props.hiringStartDate).daysInMonth();
  },
);

watch(
  () => props.hiringEndDate,
  (newValue) => {
    hiringEndDate.value = {
      year: handleFormatDate(newValue, 'YYYY'),
      month: handleFormatDate(newValue, 'MM'),
      day: handleFormatDate(newValue, 'DD'),
    };
    dayOfMonth.value = dayjs(props.hiringStartDate).daysInMonth();
    isNotRequiredHiringEndDate.value = Object.values(hiringEndDate.value).some(
      (i) => !i,
    );
  },
);

const handleRequired = () => {
  if (isNotRequiredHiringEndDate.value) {
    hiringEndDate.value = {
      year: '',
      month: '',
      day: '',
    };
  }
};
</script>

<style lang="scss">
.job-select-box {
  @apply mt-2 mb-4;
  .el-checkbox__inner {
    @apply border border-solid border-color-border;
  }
  .el-checkbox__label {
    @apply ml-4;
  }
}
</style>
