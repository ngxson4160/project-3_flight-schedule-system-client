<template>
  <div class="border-gray-third border-2 rounded-lg w-full mt-4">
    <el-table
      ref="multipleTableRef"
      class="table-applicant rounded-lg table-with-padding"
      :data="
        applicantStore.settingInterview ? applicantStore.settingInterview : []
      "
      empty-text="応募者は見つかりませんでした。"
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" class="checkboxs" width="70" />
      <!-- :selectable="handleDisabledApplicant" -->
      <el-table-column label="インポートID" width="104">
        <template #default="scope">
          <p
            v-if="
              scope.row.typeSettingInterview ===
              ETypeSettingInterView.CANDIDATE_ONLINE
            "
            class="font-normal cursor-pointer text-[#333]"
          >
            {{
              scope.row?.applicantEntry?.applicant?.applicantIdentifier ===
              ETypeApplicantIdentifier.ZERO
                ? scope.row?.applicantEntry?.applicant.id
                : scope.row?.applicantEntry?.applicant?.applicantIdentifier
            }}
          </p>
          <p v-else class="font-normal cursor-pointer text-[#333]">
            {{
              scope.row?.applicantEntryInfor?.applicantInfor
                ?.applicantIdentifier === ETypeApplicantIdentifier.ZERO
                ? scope.row?.applicantEntryInfor?.applicantInfor?.id
                : scope.row?.applicantEntryInfor?.applicantInfor
                    ?.applicantIdentifier
            }}
          </p>
        </template>
      </el-table-column>
      <el-table-column property="name" label="名前・応募職種" width="200">
        <template #default="scope">
          <div
            v-if="
              scope.row.typeSettingInterview ===
              ETypeSettingInterView.CANDIDATE_ONLINE
            "
            class=""
          >
            <div
              class="flex items-center gap-x-1 pb-1 underline cursor-pointer w-fit"
              @click="handleGoToApplicantDetail(scope.row.boxId)"
            >
              <p class="font-bold">
                {{ scope?.row?.applicantEntry?.applicant?.firstName }}
                {{ scope?.row?.applicantEntry?.applicant?.lastName }}
              </p>
              <img class="w-4 h-4" src="~/assets/images/icon-link.svg" />
            </div>
            <p class="text-xs tracking-[0.6px]">
              {{ scope?.row?.applicantEntry?.applicant?.job?.position }}
            </p>
          </div>
          <div v-else class="">
            <div
              class="flex items-center gap-x-1 pb-1 underline cursor-pointer w-fit"
              @click="handleGoToApplicantDetail(scope.row.boxId)"
            >
              <p class="font-bold mb-1">
                {{ scope?.row?.applicantEntryInfor?.applicantInfor?.firstName }}
                {{ scope?.row?.applicantEntryInfor?.applicantInfor?.lastName }}
              </p>
              <img class="w-4 h-4" src="~/assets/images/icon-link.svg" />
            </div>

            <p class="text-xs tracking-[0.6px]">
              {{
                scope?.row?.applicantEntryInfor?.applicantInfor?.job?.position
              }}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="エントリー番号" props="entryNumber" width="124">
        <template #default="scope">
          <el-input
            v-if="
              scope.row.typeSettingInterview ===
              ETypeSettingInterView.CANDIDATE_ONLINE
            "
            v-model="scope.row.applicantEntry.applicant.entryNumber"
            @change="
              applicantStore.updateApplicantEntry(
                scope.row.applicantEntry.applicant.entryNumber,
                scope.row.applicantEntry.applicant.id,
                ETypeSettingInterView.CANDIDATE_ONLINE,
                scope.row?.box?.jobId,
              )
            "
          ></el-input>
          <el-input
            v-if="
              scope.row.typeSettingInterview ===
              ETypeSettingInterView.CANDIDATE_OFFLINE
            "
            v-model="scope.row.applicantEntryInfor.applicantInfor.entryNumber"
            @change="
              applicantStore.updateApplicantEntry(
                scope.row.applicantEntryInfor.applicantInfor.entryNumber,
                scope.row.applicantEntryInfor.applicantInfor.id,
                ETypeSettingInterView.CANDIDATE_OFFLINE,
                scope.row?.box?.jobId,
              )
            "
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="応募経路" width="134">
        <template #default="scope">
          <p
            class="py-1 border-[1px] rounded text-center text-xs px-2 bg-white"
            :class="{
              'border-primary text-primary max-w-[110px] ':
                scope.row.typeSettingInterview ===
                ETypeSettingInterView.CANDIDATE_ONLINE,
              'border-gray text-gray max-w-[70px]':
                scope.row.typeSettingInterview ===
                ETypeSettingInterView.CANDIDATE_OFFLINE,
            }"
          >
            {{
              scope.row.typeSettingInterview ===
              ETypeSettingInterView.CANDIDATE_ONLINE
                ? 'オンライン応募'
                : '手動登録'
            }}
          </p>
        </template>
      </el-table-column>
      <el-table-column label="選考ステップ" width="154">
        <template #default="scope">
          <el-select
            v-model="scope.row.selectionStep"
            placeholder="  "
            @change="
              applicantStore.updateSelectionContent(
                ETypeUpdateSelectionContent.SELECTION,
                scope.row.selectionStep,
                scope.row.id,
              )
            "
          >
            <el-option
              v-for="option in optionsSelectionStep"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="選考予定" width="124">
        <template #default="scope">
          <div class="text-xs tracking-[0.6px]">
            <p v-if="scope.row.interviewDate && scope.row.interviewEndDate">
              {{ convertDateMonth(scope.row.interviewDate) }}
            </p>
            <p v-if="scope.row.interviewDate && scope.row.interviewEndDate">
              {{ convertTimeHours(scope.row.interviewDate) }} ~
              {{ convertTimeHours(scope.row.interviewEndDate) }}
            </p>
            <p v-if="scope.row.interviewDate && !scope.row.interviewEndDate">
              {{ convertTimeHours(scope.row.interviewDate) }} ~
              {{
                convertTimeHours(
                  dayjs(scope.row.interviewDate).add(1, 'hour').toISOString(),
                )
              }}
            </p>
            <p
              v-if="scope.row.title && scope.row.title !== EBugProduction.NAME"
              class="mt-1"
            >
              {{ scope.row.title }}
            </p>
            <p
              v-if="
                !(
                  scope.row.interviewDate ||
                  scope.row.interviewEndDate ||
                  scope.row.interviewDate ||
                  scope.row.interviewEndDate ||
                  (scope.row.title && scope.row.title !== EBugProduction.NAME)
                )
              "
              class="text-[#858585]"
            >
              選考予定なし
            </p>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="直近のアクティビティ" width="164">
        <template #default="scope">
          <RecentActivityApplicant :data-recent-activity="scope.row.timeLine" />
        </template>
      </el-table-column>
      <el-table-column label="メモ">
        <template #default="scope">
          <el-input
            v-model="scope.row.content"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 100000000 }"
            :resize="none"
            placeholder="メモを入力"
            @change="
              applicantStore.updateSelectionContent(
                ETypeUpdateSelectionContent.CONTENT,
                scope.row.content,
                scope.row.id,
              )
            "
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div
    v-if="
      applicantStore.totalItems &&
      applicantStore.filterQuery.limit &&
      applicantStore.totalItems > applicantStore.filterQuery.limit
    "
    class="mt-10 mb-[104px]"
  >
    <Pagination
      :current-page="currentPage"
      :total-items="applicantStore.totalItems"
      :page-size="applicantStore.filterQuery.limit"
      @set-current-page="setCurrentPage"
    />
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import { useApplicantListStore } from '~/stores/useApplicantListStore';
import {
  EOptionsSelectionStep,
  ETypeSettingInterView,
  ETypeUpdateSelectionContent,
  EBugProduction,
} from '~/utils/enum';
import { IApplicant } from '~/utils/interface';

enum ETypeApplicantIdentifier {
  ZERO = '0',
}

interface Emits {
  (event: 'applicant-selection', applicant: IApplicant[]): void;
}

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
  enableBoxTable: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits<Emits>();

const applicantStore = useApplicantListStore();

!props.isMobile && (await applicantStore.getAllApplicant());

const convertDateMonth = (time: string | Date) => {
  return dayjs(time).locale(ja).format('MM/DD (ddd)');
};

const currentPage = ref(1);

const convertTimeHours = (time: string | Date | null) => {
  return dayjs(time).format('HH:mm');
};

const optionsSelectionStep = [
  {
    value: EOptionsSelectionStep.FIRST_INTERVIEW,
    label: EOptionsSelectionStep.FIRST_INTERVIEW,
  },
  {
    value: EOptionsSelectionStep.SECOND_INTERVIEW,
    label: EOptionsSelectionStep.SECOND_INTERVIEW,
  },
  {
    value: EOptionsSelectionStep.THIRD_INTERVIEW,
    label: EOptionsSelectionStep.THIRD_INTERVIEW,
  },
  {
    value: EOptionsSelectionStep.FOURTH_INTERVIEW,
    label: EOptionsSelectionStep.FOURTH_INTERVIEW,
  },
  {
    value: EOptionsSelectionStep.ADOPTION,
    label: EOptionsSelectionStep.ADOPTION,
  },
  {
    value: EOptionsSelectionStep.REJECTION,
    label: EOptionsSelectionStep.REJECTION,
  },
  {
    value: EOptionsSelectionStep.ACCEPTANCEOFOFFER,
    label: EOptionsSelectionStep.ACCEPTANCEOFOFFER,
  },
];

const setCurrentPage = async (page: number) => {
  currentPage.value = page;
  await applicantStore.setQuery({
    page,
  });
};

const handleSelectionChange = (val: IApplicant[]) => {
  emit('applicant-selection', val);
};

const enableBoxTable = computed(() => props.enableBoxTable);

// const handleDisabledApplicant = (row: any, _ind: number) => {
//   if (
//     row.typeSettingInterview === ETypeSettingInterView.CANDIDATE_ONLINE ||
//     enableBoxTable.value
//   )
//     return true;
//   return false;
// };

const handleGoToApplicantDetail = (boxId: number) => {
  window.open(`/employer/applicant/${boxId}`, '_blank');
};
</script>

<style lang="scss">
.table-applicant {
  .el-table__header {
    @apply h-14 w-full #{!important};
    .cell {
      @apply text-black text-xs;
    }
  }
  .el-checkbox__inner {
    @apply border-color-border;
  }
  .el-checkbox {
    margin-left: 20px;
  }
  .el-textarea__inner {
    min-height: 80px;
    max-width: 202px;
    resize: none !important;
  }
  .el-table__empty-text {
    @apply text-base;
  }
}
</style>
