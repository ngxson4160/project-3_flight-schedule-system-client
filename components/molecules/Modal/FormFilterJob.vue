<template>
  <el-dialog
    v-model="dialogFormSearchVisible"
    class="dialog__search-job pc:!rounded-xl mobile:!rounded-lg pc:!w-[560px] mobile:!w-[358px]"
    modal-class="dialog__modal__class-search-job"
    :modal="false"
    :show-close="false"
  >
    <el-form class="pc:px-8" label-position="top">
      <div class="pc:flex gap-8">
        <div class="flex-1">
          <div class="pc:flex !gap-4 !mb-[6px]">
            <el-form-item class="mobile:mr-10">
              <p class="text-sm font-bold pb-2">募集職種</p>
              <el-select
                v-model="form.jobCategories"
                placeholder="選択してください"
                class="!w-[232px]"
                clearable
              >
                <div>
                  <el-option
                    v-for="item in jobCategories"
                    :key="item"
                    :label="item.name"
                    :value="item.id"
                  />
                </div>
              </el-select>
            </el-form-item>
            <el-form-item class="pc:!mr-2 mobile:mr-10">
              <p class="text-sm font-bold pb-2">勤務形態</p>
              <el-select
                v-model="form.employmentStatus"
                placeholder="選択してください"
                class="!w-[232px]"
                clearable
              >
                <div>
                  <el-option
                    v-for="status in dataSearchJobStore.employmentForm"
                    :key="status"
                    :label="status"
                    :value="status"
                  />
                </div>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item>
            <p class="text-sm font-bold pb-2">求人職種名</p>
            <el-input
              v-model="form.searchContent"
              class="mobile:!w-[326px] pc:w-[480px]"
              clearable
            />
          </el-form-item>
          <el-form-item class="pc:w-4/5 mobile:!w-[318px]">
            <p class="font-bold text-sm text-black mb-2">掲載期間</p>
            <date-selector
              v-model:data-date="startDate"
              class="select-time-job"
            ></date-selector>
            <p class="font-bold text-xl text-black mb-2">~</p>
            <date-selector
              v-model:data-date="endDate"
              :start-date="startDate"
              :is-date="true"
              class="select-time-job"
            ></date-selector>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <template #footer>
      <div class="dialog-footer flex flex-col gap-6 items-center mb-5">
        <el-button type="primary" class="!py-4 !px-28" @click="handleFilterJob">
          検索
        </el-button>
        <p
          class="text-primary text-sm font-bold underline underline-offset-2 cursor-pointer"
          @click="dialogFormSearchVisible = false"
        >
          キャンセル
        </p>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { useDataSearchJob } from '@/stores/masterDataSearchJob';

interface FormSearch {
  jobCategories: string;
  employmentStatus: string;
  searchContent: string;
  hiringStartDate: string;
  hiringEndDate: string;
  isPublic: boolean;
  isDraft: boolean;
}

interface Emits {
  (event: 'update:visible', visible: boolean): void;
  (event: 'search-job', form: FormSearch): void;
}

const props = defineProps({
  visible: {
    type: Boolean,
    default: () => false,
  },
  jobCategories: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits<Emits>();

const dialogFormSearchVisible = computed({
  get: () => props.visible,
  set: (visible: boolean) => {
    emit('update:visible', visible);
  },
});

const form = ref<FormSearch>({
  jobCategories: '',
  employmentStatus: '',
  searchContent: '',
  hiringStartDate: '',
  hiringEndDate: '',
  isPublic: true,
  isDraft: false,
});

const startDate = reactive({
  year: null,
  month: null,
  day: null,
});

const endDate = reactive({
  year: null,
  month: null,
  day: null,
});

const handleFilterJob = () => {
  const emptyStartDate = Object.values(startDate).some((i) => !i);
  const emptyEndDate = Object.values(endDate).some((i) => !i);

  if (!emptyStartDate) {
    form.value.hiringStartDate = dayjs(
      `${startDate.year}/${startDate.month}/${startDate.day}`,
    ).format('YYYY/MM/DD');
  }

  if (!emptyEndDate) {
    form.value.hiringEndDate = dayjs(
      `${endDate.year}/${endDate.month}/${endDate.day}`,
    ).format('YYYY/MM/DD');
  }
  emit('search-job', form.value);
};

const dataSearchJobStore = useDataSearchJob();
</script>

<style lang="scss">
.dialog__modal__class-search-job {
  .el-overlay-dialog {
    @apply pc:left-[40%];
  }
}

.dialog__search-job {
  .el-dialog__header {
    @apply mobile:hidden;
  }
  .el-dialog__body {
    @apply mobile:p-4;
  }
}
</style>
