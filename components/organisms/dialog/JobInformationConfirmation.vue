<template>
  <client-only>
    <el-dialog
      v-model="centerDialogVisible"
      :show-close="false"
      class="dialog_job"
    >
      <JobdetailIntroductionUserMessage
        :data="jobdetailIntroductionUserData"
        :job-detail-store="jobDetailStore"
      />

      <div class="mt-14">
        <div v-if="images && images.length" class="pc:mb-20 mobile:mb-16">
          <el-carousel
            class="mobile:h-[228px] pc:h-[453px] w-full rounded-xl"
            :autoplay="false"
            :loop="true"
          >
            <el-carousel-item
              v-for="item in images"
              :key="item"
              class="pc:!h-[453px] mobile:!h-[228px]"
            >
              <img :src="item" class="!w-full !h-auto !object-cover" />
            </el-carousel-item>
          </el-carousel>
        </div>

        <div>
          <p class="font-bold text-xl text-black leading-normal">職務内容</p>
          <br />
          <p
            class="font-normal text-base text-black whitespace-pre-line overflow-hidden break-words"
          >
            {{ jobDetailStore.duty }}
          </p>
        </div>

        <div class="pc:mt-[104px] mobile:mt-14">
          <p class="font-bold text-xl text-black leading-normal">
            応募資格/適性
          </p>
          <p class="font-bold text-base text-black mt-6">【必須要件】</p>
          <p
            class="mt-4 font-normal text-base text-black whitespace-pre-line overflow-hidden break-words"
          >
            {{ jobDetailStore.eligibilityAbility.requirement }}
          </p>

          <p
            v-if="jobDetailStore.eligibilityAbility.wellcome_requirement"
            class="font-bold text-base text-black mt-6"
          >
            【歓迎要件】
          </p>
          <p
            v-if="jobDetailStore.eligibilityAbility.wellcome_requirement"
            class="mt-4 font-normal text-base text-black whitespace-pre-line overflow-hidden break-words"
          >
            {{ jobDetailStore.eligibilityAbility.wellcome_requirement }}
          </p>

          <p
            v-if="jobDetailStore.eligibilityAbility.wanting_point"
            class="font-bold text-base text-black mt-6"
          >
            【求める人物像】
          </p>
          <p
            v-if="jobDetailStore.eligibilityAbility.wanting_point"
            class="mt-4 font-normal text-base text-black whitespace-pre-line overflow-hidden break-words"
          >
            {{ jobDetailStore.eligibilityAbility.wanting_point }}
          </p>

          <p class="font-bold text-xl text-black leading-normal mt-16 mb-12">
            募集要項
          </p>
        </div>

        <div>
          <ul>
            <li
              class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray-third"
            >
              <span class="label-detail-job">勤務先名</span>

              <span class="font-normal text-sm mobile:w-[222px]">
                {{ jobDetailStore.creator.government.name }}
              </span>
            </li>

            <li
              class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray-third"
            >
              <span class="label-detail-job">募集職種</span>

              <span class="font-normal text-sm mobile:w-[222px]">
                {{ jobDetailStore.jobCategory.name }}
              </span>
            </li>

            <li
              class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray-third"
            >
              <span class="label-detail-job">勤務形態</span>

              <span class="font-normal text-sm mobile:w-[222px]">
                {{ jobDetailStore.employmentStatus }}
              </span>
            </li>

            <li
              v-if="jobDetailStore.hiringQuantity"
              class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray-third"
            >
              <span class="label-detail-job">採用予定人数</span>

              <span class="font-normal text-sm mobile:w-[222px]">
                {{ jobDetailStore.hiringQuantity }}人
              </span>
            </li>

            <li
              class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray-third"
            >
              <span class="label-detail-job">給与</span>

              <span class="data-detail-job flex-col whitespace-pre-line">
                <h1>{{ salaryJob }}</h1>
                <h1>{{ jobDetailStore.remark }}</h1>
              </span>
            </li>

            <li
              class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray-third"
            >
              <span class="label-detail-job">勤務時間 / 形態</span>

              <span class="data-detail-job">{{ jobDetailStore.workHour }}</span>
            </li>

            <li
              class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray-third"
            >
              <span class="label-detail-job">勤務場所</span>

              <span class="font-normal text-sm mobile:w-[222px]">
                {{ jobDetailStore.workMode }}
              </span>
            </li>

            <li
              class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray-third"
            >
              <span class="label-detail-job">勤務地</span>

              <span class="data-detail-job">
                <p>{{ jobAddress }}</p>
                <p
                  v-if="jobDetailStore.remarks"
                  class="text-sm break-words mt-8 whitespace-pre"
                >
                  {{ jobDetailStore.remarks }}
                </p>
              </span>
            </li>

            <li
              v-if="jobDetailStore.workAccess"
              class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray-third"
            >
              <span class="label-detail-job">アクセス</span>

              <span class="data-detail-job">
                {{ jobDetailStore.workAccess }}
              </span>
            </li>

            <li
              class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray-third"
            >
              <span class="label-detail-job">待遇 / 福利厚生</span>
              <span class="data-detail-job whitespace-pre-line">
                {{ jobDetailStore.benefits }}
              </span>
            </li>

            <li
              class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray-third break-words whitespace-pre-line"
            >
              <span class="label-detail-job">選考フロー</span>
              <span class="data-detail-job">
                <!-- {{
                  jobDetailStore.selectionFlows &&
                  jobDetailStore.selectionFlows.length
                    ? jobDetailStore.selectionFlows.join(' → ')
                    : ''
                }} -->
                <div
                  v-for="(item, index) in sortSelectionFlows(
                    jobDetailStore.selectionFlows,
                  )"
                  :key="index"
                >
                  <p class="font-bold pb-2">{{ item.title }}</p>
                  <p v-if="item.title !== '合格'" class="pb-2">
                    {{ item.content }}
                  </p>
                  <p
                    v-if="index < jobDetailStore.selectionFlows.length - 1"
                    class="pb-2"
                  >
                    ↓
                  </p>
                </div>
              </span>
            </li>

            <li
              class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray-third"
            >
              <span class="label-detail-job">選考に関する添付ファイル</span>
              <span v-if="jobDetailStore.attachment" class="mobile:w-[222px]">
                <a
                  class="font-normal text-sm text-primary cursor-pointer"
                  @click="
                    downloadFileAttachment(
                      jobDetailStore.nameAttachment,
                      jobDetailStore.attachment,
                    )
                  "
                >
                  {{
                    jobDetailStore.nameAttachment ?? '添付ファイルを確認する'
                  }}
                  <span v-if="sizeAttackment">「{{ sizeAttackment }}KB］</span>
                </a>
              </span>
            </li>
          </ul>
        </div>

        <div
          v-if="jobDetailStore.freeDescription"
          class="mt-[104px] flex flex-col gap-6 overflow-hidden break-words"
        >
          <label class="text-xl leading-normal text-black font-bold">
            {{ jobDetailStore?.freeDescription?.title }}
          </label>
          <div
            class="text-base font-normal overflow-hidden break-words whitespace-pre-line free-description-editor"
            v-html="jobDetailStore?.freeDescription?.description"
          ></div>
        </div>
      </div>
    </el-dialog>
  </client-only>
</template>
<script lang="ts" setup>
import { uploadFileStore } from '@/stores/upload';

const props = defineProps({
  status: {
    type: Boolean,
    default: false,
  },
  jobDetailStore: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:status']);
const centerDialogVisible = computed({
  get: () => props.status,
  set: (val: boolean) => {
    emit('update:status', val);
  },
});
const jobdetailIntroductionUserData = computed(() => {
  return {
    tags: props.jobDetailStore.appealPoint.map((e: string) => {
      return { label: e, isActive: false };
    }),
    start_date: props.jobDetailStore.hiringStartDate,
    end_date: props.jobDetailStore?.hiringEndDate ?? null,
    creatorId: props.jobDetailStore.creatorId,
    jobCategory: props.jobDetailStore.jobCategory.name,
    employmentStatus: props.jobDetailStore.employmentStatus,
  };
});

const salaryJob = computed(() => {
  const salary = `${props.jobDetailStore.salaryType}${convertPrice(
    props.jobDetailStore.salaryRange.min,
  )}円  ～  ${convertPrice(props.jobDetailStore.salaryRange.max)}円`;
  return salary;
});

const jobAddress = computed(() => {
  if (props.jobDetailStore.postalCode) {
    const postCode =
      '〒' +
      props.jobDetailStore.postalCode.substring(0, 3) +
      '-' +
      props.jobDetailStore.postalCode.substring(3);

    return (
      postCode +
      ' ' +
      props.jobDetailStore.jobCity.province.name +
      ' ' +
      props.jobDetailStore.jobCity.name +
      ' ' +
      props.jobDetailStore.workAddress
    );
  }
});

const images = computed(() => {
  if (props.jobDetailStore.images && props.jobDetailStore.images.length) {
    return props.jobDetailStore.images.filter((i: string) => i !== '');
  }
});

const { getFileSize } = uploadFileStore();
const sizeAttackment = ref(0);
watchEffect(async () => {
  if (props.jobDetailStore.attachment) {
    const response = await getFileSize(props.jobDetailStore.attachment);
    sizeAttackment.value = Math.ceil(response.size / 1024);
  }
});
</script>

<style lang="scss">
.dialog_job {
  @apply pc:w-[760px] mobile:w-[390px] rounded-xl mobile:mt-4;
  .el-dialog__body {
    @apply px-10 pb-10 pt-0 mobile:px-6;
  }
  .label-detail-job {
    @apply font-bold text-sm text-black w-[120px] pc:min-w-[232px] inline-flex;
  }
  .data-detail-job {
    @apply font-normal text-sm text-black overflow-hidden break-words mobile:w-[222px];
  }
}
</style>
