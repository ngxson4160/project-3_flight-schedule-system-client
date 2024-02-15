<template>
  <el-form class="pc:px-8" label-position="top">
    <el-text class="font-bold !text-black" size="large">絞り込み検索</el-text>
    <div class="pc:flex gap-8 pt-6">
      <div class="flex-1">
        <el-form-item>
          <p class="text-sm font-bold pb-2">名前</p>
          <el-input
            v-model="formApplicant.name"
            class="w-full h-14"
            clearable
          />
        </el-form-item>
        <h3 class="text-sm font-bold pb-2 pt-[6px]">エントリー番号</h3>
        <el-form-item>
          <el-input
            v-model="formApplicant.entryNumber"
            class="mobile:!w-full pc:!w-[232px] h-14"
            clearable
          />
        </el-form-item>

        <h3 class="text-sm font-bold pb-2 pt-[6px]">応募職種</h3>
        <el-form-item class="mobile:mr-10 selection-search">
          <el-select
            v-model="formApplicant.jobId"
            placeholder="選択してください"
            class="w-full !h-14"
            clearable
          >
            <el-option
              v-for="item in listJobNames"
              :key="item"
              :label="item.position"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <p class="font-bold text-sm text-black mb-2 pt-[6px]">
          次の選考予定日時
        </p>

        <el-form-item
          class="pc:!w-[232px] w-full date-piker-search-bar relative calendar-filter"
        >
          <el-date-picker
            v-model="formApplicant.scheduled"
            type="date"
            placeholder="選択してください"
            clearable
            class="h-14"
            format="YYYY-MM-DD"
            :prefix-icon="none"
          ></el-date-picker>
        </el-form-item>
        <p class="font-bold text-sm text-black mb-2 pt-[6px]">メモ</p>
        <el-form-item class="w-full">
          <el-input
            v-model="formApplicant.memo"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 100000000 }"
            :resize="none"
            class="w-full"
            clearable
          />
        </el-form-item>
      </div>
    </div>
  </el-form>
  <span class="flex justify-center mt-[22px] mb-[10px]">
    <el-button
      type="primary"
      class="!py-4 !px-28"
      @click="handleSearchApplicant"
    >
      検索する
    </el-button>
  </span>

  <span class="flex justify-center mt-6 mb-[10px]">
    <button
      class="text-base underline text-primary text-center"
      @click="emits('close')"
    >
      キャンセル
    </button>
  </span>
</template>

<script setup lang="ts">
import { useApplicantListStore } from '~/stores/useApplicantListStore';
const props = defineProps({
  isResetFormSearch: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['search', 'close', 'resetCompleted']);
export type FormApplicantSearch = {
  limit?: number;
  textSearch?: string;
  memo?: string;
  jobCategoryId?: string;
  jobId?: number;
  entryNumber?: string;
  scheduled?: string;
  name?: string;
  title?: string;
};

const initFormApplicant = () => ({
  name: undefined,
  entryNumber: undefined,
  jobId: undefined,
  scheduled: undefined,
  memo: undefined,
});

const formApplicant = ref<FormApplicantSearch>(initFormApplicant());
const applicantStore = useApplicantListStore();
await applicantStore.getListJobNames();
const listJobNames = applicantStore.listJobsName;

const customPrefix = shallowRef({
  render() {
    return h('p', 'pre');
  },
});

const handleSearchApplicant = () => {
  const jobPositionCurrent = listJobNames.find(
    (e) => e.id === formApplicant.value.jobId,
  )?.position;
  emits('search', formApplicant.value, jobPositionCurrent);
};

watch(
  () => props.isResetFormSearch,
  (newValue) => {
    if (newValue) {
      formApplicant.value = initFormApplicant();
      handleSearchApplicant();
      emits('resetCompleted');
    }
  },
);
</script>

<style lang="scss">
.selection-search {
  .el-select .el-input__wrapper {
    @apply h-14;
  }
}
.calendar-filter::after {
  content: url('~/assets/images/icon-calendar.svg');
  display: inline-block;
  position: absolute;
  pointer-events: none;
  top: 15px;
  left: 16px;
  width: 20px;
  height: 20px;
}
.calendar-filter {
  .el-input__wrapper {
    padding-left: 48px !important;
  }
}
</style>
