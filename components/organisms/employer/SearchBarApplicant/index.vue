<template>
  <div class="mt-20">
    <div class="max-w-[1312px] mx-auto">
      <div class="flex bg-gray-secondary rounded-xl p-2">
        <div
          v-for="tab in countSettingInterview"
          :key="tab.title"
          class="flex-grow flex flex-col gap-2 items-center p-4 rounded-lg cursor-pointer"
          :class="{
            'bg-white shadow-[0_4px_10px_0_rgba(0,0,0,0.12)]':
              tab.title === tabActive,
            'hover:text-primary': tab.title !== tabActive,
          }"
          @click="handleClickTab(tab.title)"
        >
          <p class="text-sm">{{ tab.title }}</p>
          <p class="text-lg font-bold">{{ tab.count }}</p>
        </div>
      </div>
      <div class="mt-6 flex items-stretch gap-8">
        <div class="flex flex-grow">
          <div
            class="input_content-search border border-gray-third rounded-l !border-r-0 flex-grow"
          >
            <el-input
              v-model="searchContent"
              class="h-14"
              placeholder="キーワードで検索"
              clearable
            >
              <template #prepend>
                <div>
                  <img src="~/assets/images/icon-search-gray.svg" alt="" />
                </div>
              </template>
            </el-input>
          </div>
          <p
            class="px-6 flex-shrink-0 flex items-center justify-center font-bold text-sm bg-primary text-white rounded-r cursor-pointer hover:opacity-80 h-[58px]"
            @click="handleSearchKeyWord"
          >
            検索
          </p>
        </div>
        <div class="flex items-center check-box-step">
          <el-checkbox
            v-model="isCheckDate"
            @change="applicantStore.setQuery({ isDate: isCheckDate })"
          >
            <span class="text-sm">次の選考予定なしのみ表示</span>
          </el-checkbox>
        </div>
        <div
          class="bg-primary flex gap-2 px-8 items-center rounded-lg cursor-pointer hover:opacity-80"
          @click="visibleDialogExtendDate = true"
        >
          <img src="~/assets/images/filter-search-white-24.svg" />
          <p class="text-sm font-bold text-white">絞り込み検索</p>
        </div>
      </div>
      <div
        v-if="searchConditions"
        class="mt-6 px-8 py-6 bg-color-bg text-sm flex gap-4 items-center rounded-xl"
      >
        <p class="flex-grow">
          {{ searchConditions }}
        </p>
        <p
          class="text-primary underline underline-offset-2 font-bold cursor-pointer flex-shrink-0 pr-4"
          @click="handleResetConditions"
        >
          検索条件をリセット
        </p>
      </div>
      <div class="mt-6">
        <slot></slot>
      </div>

      <div class="mt-6 flex justify-between items-stretch">
        <div class="flex gap-4 items-stretch">
          <div
            class="flex gap-2 px-4 bg-primary items-center rounded cursor-pointer hover:opacity-80"
            @click="visibleDialogAddApplicantOffline = true"
          >
            <img src="~/assets/images/icon-plus-white.svg" />
            <p class="text-xs font-bold text-white">応募者を追加</p>
          </div>
          <div class="flex gap-2 items-stretch text-xs font-bold">
            <p
              class="px-4 border-2 border-primary text-primary rounded cursor-pointer hover:bg-secondary flex items-center"
              @click="handleExportPDF"
            >
              PDF出力
            </p>
            <div
              ref="buttonShowMenuExportFileAndImage"
              class="relative"
              @click="handleShowExportAvatarAndEntryFiles"
            >
              <p
                class="px-4 border-2 border-primary text-primary rounded cursor-pointer hover:bg-secondary flex items-center h-full"
              >
                顔写真/添付ファイル出力
              </p>
              <MenuExportFileAndImage
                :visible-menu="visibleMenuExportFileAndImage"
                @handle-select-export="handleSelectExportFileAndImage"
              />
            </div>
            <p
              class="px-4 border-2 border-primary text-primary rounded cursor-pointer hover:bg-secondary flex items-center"
              @click="handleExportCSV"
            >
              CSV出力
            </p>
            <!-- <p
              class="px-4 border-2 border-gray-third text-black rounded cursor-pointer hover:bg-secondary flex items-center"
            >
              CSV更新
            </p> -->
          </div>
          <div>
            <el-select
              v-model="valueSelectSort"
              class="!h-10 pc:w-[300px]"
              clearable
              placeholder="  "
              @change="handleFilterApplicant"
              @clear="clearFilterApplicant"
            >
              <el-option
                v-for="item in optionsSelectionStepUpdateDate"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex gap-2">
            <p
              v-for="size in pageSizes"
              :key="size"
              class="text-sm cursor-pointer hover:text-primary"
              :class="{
                'text-black font-bold':
                  size === applicantStore.filterQuery.limit,
                'text-primary underline underline-offset-1 cursor-pointer':
                  size !== applicantStore.filterQuery.limit,
              }"
              @click="applicantStore.setQuery({ limit: size })"
            >
              {{ size }}件表示
            </p>
          </div>
          <p class="text-sm font-bold">全{{ applicantStore.totalItems }}件</p>
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="visibleDialogExtendDate"
    class="pc:!rounded-xl mobile:!rounded-lg pc:!w-[496px] mobile:!w-[358px] modal-search"
  >
    <FormFilterApplicantList
      :is-reset-form-search="isResetFormSearch"
      @search="handleRefineSearch"
      @close="visibleDialogExtendDate = false"
      @reset-completed="isResetFormSearch = false"
    />
  </el-dialog>

  <el-dialog
    v-if="visibleDialogAddApplicantOffline"
    v-model="visibleDialogAddApplicantOffline"
    class="pc:!rounded-xl mobile:!rounded-lg pc:!w-[496px] mobile:!w-[358px] modal-add"
  >
    <FormAddApplicantOffline
      @add-applicant="handleAddApplicant"
      @close="visibleDialogAddApplicantOffline = false"
    />
  </el-dialog>
  <DialogLoading title="PDFを出力しています" :is-loading="isLoadingCompleted" />
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FormApplicantSearch } from 'components/molecules/FormAddApplicantOffline/index.vue';
import {
  OptionsSelectionStep,
  EOptionsSelectionStep,
  ETypeExportFileAndImage,
} from '~~/utils/enum';
import { useApplicantListStore } from '~/stores/useApplicantListStore';

dayjs.extend(utc);

const props = defineProps({
  isLoadingCompleted: {
    type: Boolean,
    default: false,
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
});

interface Emits {
  (event: 'export-csv'): void;
  (event: 'exportAvatarAndEntryFiles', type: ETypeExportFileAndImage): void;
  (event: 'export-pdf'): void;
  (event: 'filter-applicant', dataForm: FormApplicantSearch): void;
}
const emit = defineEmits<Emits>();

const applicantStore = useApplicantListStore();
!props.isMobile && (await applicantStore.getCountSettingInterview());

const countSettingInterview = computed(
  () => applicantStore.countSettingInterview,
);
const sortDefaultApplicant = {
  isApplicantDate: undefined,
  isSelectionStep: undefined,
  isApplicantEntry: undefined,
  isPass: undefined,
  isInterviewDateFuture: undefined,
  isInterviewDatePast: undefined,
};

const optionsSelectionStepUpdateDate = ref([
  {
    value: JSON.stringify({ isApplicantDate: true }),
    label: '応募日：新↓',
  },
  {
    value: JSON.stringify({ isApplicantDate: false }),
    label: '応募日：旧↓',
  },
  {
    value: JSON.stringify({ isSelectionStep: true }),
    label: '選考ステップ更新日：新↓',
  },
  {
    value: JSON.stringify({ isSelectionStep: false }),
    label: '選考ステップ更新日：旧↓',
  },

  {
    value: JSON.stringify({ isApplicantEntry: true }),
    label: '選考ステップ：エントリー↓',
  },
  {
    value: JSON.stringify({ isPass: true }),
    label: '選考ステップ：合格↓',
  },

  {
    value: JSON.stringify({ isInterviewDateFuture: false }),
    label: '次の選考予定：近↓',
  },
  {
    value: JSON.stringify({ isInterviewDateFuture: true }),
    label: '次の選考予定：遠↓',
  },
  {
    value: JSON.stringify({ isInterviewDatePast: true }),
    label: '前の選考予定：近↓',
  },
  {
    value: JSON.stringify({ isInterviewDatePast: false }),
    label: '前の選考予定：遠↓',
  },
]);

const pageSizes = ref([20, 50, 100]);
const valueSelectSort = ref({
  value: JSON.stringify({ isApplicantDate: true }),
  label: '応募日：新↓',
});
const isCheckDate = ref(undefined);
const searchContent = ref(undefined);
const tabActive = ref<OptionsSelectionStep>(EOptionsSelectionStep.ALL);

// const jobCategories = ref<IGovernmentOffice[]>([]);
const visibleDialogExtendDate = ref(false);
const visibleDialogAddApplicantOffline = ref(false);
const visibleMenuExportFileAndImage = ref(false);

// const responseJobCategories = await getAllJobCategories();

// jobCategories.value = responseJobCategories;

const handleClickTab = (title: OptionsSelectionStep) => {
  tabActive.value = title;
  if (title === EOptionsSelectionStep.ALL) {
    applicantStore.setQuery({
      title: '',
      page: 1,
    });
  } else {
    applicantStore.setQuery({
      title,
      page: 1,
    });
  }
};

const handleSearchKeyWord = async () => {
  await applicantStore.setQuery({
    textSearch: searchContent.value,
    page: 1,
  });
};

const searchConditions = ref<string>('');
const isResetFormSearch = ref<boolean>(false);
const handleRefineSearch = async (
  dataFormSearch: FormApplicantSearch,
  jobPositionCurrent: string,
) => {
  onLoading();
  const arraykey = ref<string[]>([]);
  for (const key in dataFormSearch) {
    if (key && dataFormSearch[key]) {
      if (key !== 'jobId')
        arraykey.value.push(
          key === 'scheduled'
            ? dayjs(dataFormSearch[key]).format('YYYY年MM月DD日')
            : dataFormSearch[key],
        );
      else arraykey.value.push(jobPositionCurrent);
    }
  }
  searchConditions.value = arraykey.value.join('、');
  const dateSearch = dataFormSearch.scheduled;
  if (dateSearch) {
    await applicantStore.setQuery({
      ...dataFormSearch,
      scheduled: dayjs(dateSearch).format('YYYY-MM-DD'),
    });
    await applicantStore.queryGetCountSettingInterview({
      ...dataFormSearch,
      scheduled: dayjs(dateSearch).format('YYYY-MM-DD'),
    });
  } else {
    await applicantStore.setQuery({
      ...dataFormSearch,
    });
    await applicantStore.queryGetCountSettingInterview({
      ...dataFormSearch,
    });
  }
  visibleDialogExtendDate.value = false;
  emit('filter-applicant', dataFormSearch);

  closeLoading();
};

const handleResetConditions = () => {
  isResetFormSearch.value = true;
};

const handleAddApplicant = async (dataFormSearch: FormApplicantSearch) => {
  const { error } = await useBaseFetch(`/applicants/infor/create`, {
    method: 'POST',
    body: {
      ...dataFormSearch,
      applicantDate: dayjs(dataFormSearch.applicantDate).format('YYYY-MM-DD'),
    },
  });
  if (!error.value) {
    visibleDialogAddApplicantOffline.value = false;
    applicantStore.getAllApplicant();
    openNotification('応募者を追加しました');
  } else {
    openNotification(applicantStore.messageErrorUpdateEntryNumber);
  }
};

const handleFilterApplicant = async (option: string | null) => {
  if (option) {
    await applicantStore.setQuery({
      ...sortDefaultApplicant,
      ...JSON.parse(option),
    });
  }
};

const clearFilterApplicant = async () => {
  await applicantStore.setQuery({ ...sortDefaultApplicant });
};

const handleExportCSV = () => {
  emit('export-csv');
};

const handleShowExportAvatarAndEntryFiles = () => {
  visibleMenuExportFileAndImage.value = !visibleMenuExportFileAndImage.value;
};

const buttonShowMenuExportFileAndImage = ref(null);
onClickOutside(buttonShowMenuExportFileAndImage, (event) => {
  if (visibleMenuExportFileAndImage.value)
    visibleMenuExportFileAndImage.value = false;
});

const handleSelectExportFileAndImage = (type: ETypeExportFileAndImage) => {
  emit('exportAvatarAndEntryFiles', type);
};
const handleExportPDF = () => {
  emit('export-pdf');
};
</script>

<style lang="scss">
.input_content-search {
  .el-input__wrapper,
  .el-input-group__prepend {
    @apply shadow-none;
  }
}
.el-input__inner {
  @apply h-10;
}
.date-piker-search-bar {
  .el-input__prefix {
    display: none;
  }
}

.modal-search,
.modal-add {
  .el-dialog__header {
    display: none;
  }
}
</style>
