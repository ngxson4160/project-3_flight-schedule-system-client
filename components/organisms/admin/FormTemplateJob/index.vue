<template>
  <AdminSubHeader
    title="求人テンプレートを作成"
    title-button="確認画面へ"
    @return-event="handleBack"
    @handle-save="handleSaveTemplateJob"
  />

  <div class="flex flex-col w-[728px]">
    <div class="flex justify-center h-full w-full pc:mt-16 mobile:mt-4">
      <!-- option ------------------------------------------------------------>
      <div class="mt-16 w-[232px] fixed left-[5%] mobile:hidden">
        <div v-for="item in textScroll" :key="item.id" class="mb-6">
          <h1
            class="cursor-pointer text-base font-bold"
            :class="{ 'text-primary': item.id === isScrollColor }"
            @click="handleScrollClickItem(item.id)"
          >
            {{ item.label }}
          </h1>
        </div>
      </div>

      <!-- form ------------------------------------------------------------>
      <div>
        <div class="w-full pc:pt-16 pc:max-w-[760px] mobile:p-6 mb-80">
          <div>
            <p class="text-sm font-bold mb-2">テンプレート詳細</p>
            <el-input
              v-model="formTemplateJob.jobTemplateDescription"
              class="mb-[64px]"
            ></el-input>
          </div>

          <el-form
            label-position="top"
            :model="formTemplateJob"
            class="employer-from"
          >
            <el-form-item label="イメージ画像">
              <h1 id="1" ref="refScroll1"></h1>
              <ul>
                <li>
                  JPG、PNGファイルを選択してください。（アップロード推奨サイズ：幅680×高さ453以上）
                </li>
                <li>最大３枚まで設定可能です。</li>
              </ul>

              <div class="flex justify-between w-full mobile:flex-col gap-x-4">
                <FileUpload
                  :data-image="formTemplateJob.images[0]"
                  @data-upload="handleUpload($event, 0)"
                  @clear-image="handleClearImage(0)"
                />
                <FileUpload
                  :data-image="formTemplateJob.images[1]"
                  @data-upload="handleUpload($event, 1)"
                  @clear-image="handleClearImage(1)"
                />
                <FileUpload
                  :data-image="formTemplateJob.images[2]"
                  @data-upload="handleUpload($event, 2)"
                  @clear-image="handleClearImage(2)"
                />
              </div>
            </el-form-item>
          </el-form>

          <div class="pc:hidden mt-12 flex">
            <h1 class="text-gray text-base font-normal tracking-wider">
              基本情報
            </h1>
            <img src="@/assets/images/icon-down.svg" />
          </div>

          <el-form
            ref="ruleFormRef"
            label-position="top"
            class="employer-from pc:mt-20 mobile:mt-6"
            :model="formTemplateJob"
          >
            <div>
              <h1
                id="2"
                ref="refScroll2"
                class="text-[32px] leading-[46px] font-bold text-black tracking-wider mb-6"
              >
                求人内容
              </h1>
            </div>
            <el-form-item class="w-full !mb-6" label="求人職種名">
              <ul class="mb-2 list-disc ml-6">
                <li>
                  <h1 class="text-sm font-normal tracking-wider text-black">
                    30文字以内
                  </h1>
                </li>
                <li>
                  <h1 class="text-sm font-normal tracking-wider text-black">
                    官公庁様が求人を区別するための名称です。ユーザーには表示されません。
                  </h1>
                </li>
                <li>
                  <h1 class="text-sm font-normal tracking-wider text-black">
                    例）UIデザイナー &nbsp; 23年度募集
                  </h1>
                </li>
              </ul>
              <div class="pc:w-2/4 mobile:w-full">
                <el-input v-model="formTemplateJob.position" :maxlength="60" />
              </div>
            </el-form-item>

            <el-form-item label="求人タイトル" class="!mb-6">
              <el-input v-model="formTemplateJob.title" :maxlength="60" />
            </el-form-item>

            <el-form-item label="勤務先名" class="!mb-6">
              <div>
                <p
                  class="font-bold text-sm tracking-widest text-primary mb-2 ml-1"
                >
                  任用または雇用主名を正しく入力してください。配属場所ではありません。
                </p>
                <p
                  class="font-bold text-sm tracking-widest text-primary mb-2 ml-1"
                >
                  ※初期表示は官公庁名が表示されています。
                </p>
              </div>

              <el-input v-model="formTemplateJob.officeName" />
            </el-form-item>

            <el-form-item class="relative !mb-6" label="募集職種">
              <el-select
                v-model="formTemplateJob.jobCategoryParentId"
                placeholder=" "
                :disabled="params.id === undefined"
                @change="handleChangeJob(formTemplateJob.jobCategoryParentId)"
              >
                <el-option
                  v-for="item in OPTION_JOB_CATEGORIES"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <div class="block w-full">
                <p class="my-4 font-bold text-xs tracking-wider">
                  以下から詳細な職種をお選びください。選択した職種が求人に表示されます。
                </p>
                <div class="mt-6 w-full">
                  <el-radio-group v-model="formTemplateJob.jobCategoryId">
                    <div
                      class="flex gap-x-7 gap-y-6 flex-wrap custom-radio-group-job-template"
                    >
                      <div v-for="job in jobCategoriesChild" :key="job.id">
                        <el-radio
                          :label="job.id"
                          class="!h-auto"
                          :disabled="params.id === undefined"
                        >
                          {{ job.name }}
                        </el-radio>
                      </div>
                    </div>
                  </el-radio-group>
                </div>
              </div>
            </el-form-item>

            <div>
              <p class="font-bold text-sm">
                勤務形態
                <span class="ml-1 text-danger text-xs font-normal">*必須</span>
              </p>
              <p class="text-sm mt-2">
                勤務形態の表記は他サイトへの求人情報連携を理由に現在の選択肢となっています。
              </p>
              <p class="text-sm mb-2">実態に近い形態を選択してください。</p>
            </div>
            <el-form-item class="!mb-6">
              <el-select
                v-model="formTemplateJob.employmentStatus"
                placeholder=" "
              >
                <el-option
                  v-for="item in OPTION_EMPLOYMENT_STATUS"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="アピールポイント" class="!mb-6">
              <div class="flex flex-col mt-2">
                <el-checkbox-group
                  v-model="formTemplateJob.appealPoint"
                  class="form-checkbox-group !mb-0 flex flex-wrap gap-y-4"
                >
                  <el-checkbox
                    v-for="item in OPTION_APPEALPOINTS"
                    :key="item"
                    :label="item"
                  >
                    {{ item }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>

            <el-form-item class="!mb-6" label="職務内容">
              <el-input
                v-model="formTemplateJob.duty"
                type="textarea"
                :rows="7"
              />
            </el-form-item>

            <el-form-item class="!mb-6" label="応募資格 / 適性">
              <span class="text-sm mb-2">【必須要件】</span>
              <el-input
                v-model="formTemplateJob.eligibilityAbility.requirement"
                type="textarea"
                :rows="7"
              />
            </el-form-item>

            <el-form-item
              class="form-item-eligibilityAbility !mb-6"
              label="【歓迎要件】"
            >
              <el-input
                v-model="
                  formTemplateJob.eligibilityAbility.wellcome_requirement
                "
                type="textarea"
                :rows="7"
              />
            </el-form-item>

            <el-form-item
              class="form-item-eligibilityAbility"
              label="【求める人物像】"
            >
              <el-input
                v-model="formTemplateJob.eligibilityAbility.wanting_point"
                type="textarea"
                :rows="7"
              />
            </el-form-item>

            <div class="mt-20">
              <h1
                id="3"
                ref="refScroll3"
                class="text-[32px] leading-[46px] font-bold text-black tracking-wider mb-6"
              >
                募集要項
              </h1>
            </div>

            <div
              class="flex items-center border-l-4 h-7 w-28 border-solid border-primary mb-6"
            >
              <h1 class="text-base font-bold tracking-wider ml-4">給与</h1>
            </div>
            <el-form-item class="!mb-6" label="給与タイプ">
              <div class="flex flex-col">
                <el-radio-group v-model="formTemplateJob.salaryType">
                  <el-radio class="!pl-0" label="年棒" size="large">
                    <h1 class="text-radio">年棒</h1>
                  </el-radio>
                </el-radio-group>
                <el-radio-group v-model="formTemplateJob.salaryType">
                  <el-radio label="月給" size="large">
                    <h1 class="text-radio">月給</h1>
                  </el-radio>
                </el-radio-group>
                <el-radio-group v-model="formTemplateJob.salaryType">
                  <el-radio label="日給" size="large">
                    <h1 class="text-radio">日給</h1>
                  </el-radio>
                </el-radio-group>
                <el-radio-group v-model="formTemplateJob.salaryType">
                  <el-radio label="時給" size="large">
                    <h1 class="text-radio">時給</h1>
                  </el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
            <div class="text-sm mb-2 font-bold">給与</div>
            <div class="flex items-center !mb-[6px]">
              <el-form-item>
                <div class="flex items-center pc:max-w-[180px]">
                  <EmployerConverPrice
                    v-model:textField="formTemplateJob.salaryRange.min"
                  ></EmployerConverPrice>
                  <p class="text-black font-bold pc:ml-4 mobile:ml-2 w-20">
                    円
                  </p>
                </div>
              </el-form-item>

              <p class="text-black font-bold mb-[18px] pc:mr-4 mobile:mx-2">
                〜
              </p>

              <el-form-item>
                <div class="flex items-center pc:max-w-[180px]">
                  <EmployerConverPrice
                    v-model:textField="formTemplateJob.salaryRange.max"
                  ></EmployerConverPrice>
                  <p class="text-black font-bold pc:ml-4 mobile:ml-2 w-20">
                    円
                  </p>
                </div>
              </el-form-item>
            </div>

            <el-form-item label="備考">
              <h1>例）経験・能力を考慮して決定します。</h1>
              <el-input
                v-model="formTemplateJob.remark"
                type="textarea"
                :rows="4"
              />
            </el-form-item>

            <div
              class="flex items-center border-l-4 h-7 w-28 border-solid border-primary mb-6 mt-8"
            >
              <h1 class="text-base font-bold tracking-wider ml-4">勤務形態</h1>
            </div>
            <el-form-item label="勤務時間 / 形態" class="!mb-6">
              <p class="font-normal text-sm tracking-widest text-black mb-2">
                例）9:00~18:00（休憩60分） フレックスタイム制（コアタイム無）
              </p>
              <el-input
                v-model="formTemplateJob.workHour"
                type="textarea"
                :maxlength="500"
                :rows="4"
              />
            </el-form-item>

            <el-form-item label="勤務場所" class="!mb-2">
              <el-radio-group v-model="workModeOther">
                <div class="flex flex-col pc:w-[250px]">
                  <el-radio
                    v-for="item in OPTION_WORK_MODE"
                    :key="item"
                    :label="item"
                    size="large"
                    @change="handleChangeWorkMode(item)"
                  >
                    <h1 class="text-radio">
                      {{ item }}
                    </h1>
                  </el-radio>
                </div>
              </el-radio-group>
            </el-form-item>

            <el-form-item>
              <div class="flex flex-col pc:w-[326px]">
                <el-input
                  v-model="formTemplateJob.workMode"
                  :disabled="isWorkMode"
                  placeholder=""
                />
              </div>
            </el-form-item>

            <div
              class="flex items-center border-l-4 h-7 w-28 border-solid border-primary mb-6 mt-10"
            >
              <h1 class="text-base font-bold tracking-wider ml-4">勤務地</h1>
            </div>
            <ul class="list-disc ml-6 mb-6">
              <li class="text-sm">
                勤務地は求職者が仕事の場所を確認する上で利用します
              </li>
              <li class="text-sm">
                複数箇所の配属可能性がある場合は官公庁所在等の代表的な勤務地を入れてください
              </li>
            </ul>

            <el-form-item class="w-[232px] !mb-6" label="郵便番号">
              <el-input
                id="post-code"
                v-model="formTemplateJob.postalCode"
                placeholder="1001234"
                :disabled="EWorkMode.WORK_COMPANY === formTemplateJob.workMode"
                @input="handleChangePostalCode"
                @keyup.enter="setInputValue"
                @blur="setInputValue"
              />
              <h1 v-if="isMessage" class="text-xs text-danger tracking-wider">
                該当の郵便番号がありません
              </h1>
            </el-form-item>

            <el-form-item class="w-[232px] !mb-6" label="都道府県">
              <el-select
                v-model="formTemplateJob.provinceId"
                class="w-full"
                :disabled="
                  isPostalCode ||
                  EWorkMode.WORK_COMPANY === formTemplateJob.workMode
                "
                placeholder="選択してください"
                @change="handleSelectProvince"
              >
                <el-option
                  v-for="item in OPTION_PROVINCE"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item class="!mb-6 w-[232px]" label="市区町村">
              <el-select
                v-model="formTemplateJob.cityId"
                class="w-full"
                placeholder="選択してください"
                :disabled="
                  isProvince ||
                  EWorkMode.WORK_COMPANY === formTemplateJob.workMode
                "
              >
                <el-option
                  v-for="item in OPTION_CITIES"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item class="!mb-6" label="以降の住所">
              <el-input
                v-model="formTemplateJob.workAddress"
                placeholder="梅田1-1-3大阪駅前第3ビル"
                :disabled="EWorkMode.WORK_COMPANY === formTemplateJob.workMode"
                :maxlength="60"
              />
            </el-form-item>

            <el-form-item class="!mb-6" label="アクセス">
              <el-input v-model="formTemplateJob.workAccess" :maxlength="150" />
            </el-form-item>

            <el-form-item label="備考">
              <div>
                <ul class="list-disc ml-6">
                  <li>勤務地に関して情報を補足したい場合に利用してください</li>
                </ul>
              </div>
              <el-input
                v-model="formTemplateJob.remarks"
                type="textarea"
                :rows="7"
              />
            </el-form-item>

            <div
              class="flex items-center border-l-4 h-7 w-28 border-solid border-primary mb-6 mt-10"
            >
              <h1 class="text-base font-bold tracking-wider ml-4">その他</h1>
            </div>
            <el-form-item class="!mb-6" label="採用予定人数">
              <div class="flex items-center gap-4">
                <el-input
                  v-model="formTemplateJob.hiringQuantity"
                  :maxlength="3"
                  class="!w-[116px]"
                />
                <h1 class="text-sm font-bold">名</h1>
              </div>
            </el-form-item>

            <el-form-item class="!mb-6" label="待遇 / 福利厚生">
              <el-input
                v-model="formTemplateJob.benefits"
                type="textarea"
                :maxlength="1000"
                :rows="7"
              />
            </el-form-item>
            <div class="flex mb-2">
              <p class="font-bold text-[14px] pr-2">選考フロー</p>
            </div>
            <el-form-item class="form-item-edit mt-2" prop="selectionFlows">
              <div id="selectFlows" class="flex flex-col w-full">
                <CardSelectFlow v-model="formTemplateJob.selectionFlows" />
                <div class="flex flex-col mt-2">
                  <el-checkbox-group v-model="selectionFlows">
                    <el-checkbox
                      v-for="item in OPTION_SELECTION_FLOWS"
                      :key="item"
                      class="mb-4"
                      :label="item"
                      @change="changeSelectionFlows"
                    >
                      {{ item }}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <p v-if="requiredSelectFlows" class="text-[12px] text-danger">
                必須項目です
              </p>
            </el-form-item>

            <div id="scrolls"></div>

            <div class="flex mt-6">
              <p class="font-bold text-[14px] pr-2">選考に関する添付ファイル</p>
            </div>
            <el-form-item>
              <div class="pc:w-3/4 mobile:w-full">
                <ul class="list-disc ml-6">
                  <li>
                    <p class="text-sm font-normal text-black tracking-wider">
                      PDF/Excel/Word形式でアップロードしてください
                    </p>
                  </li>
                  <li>
                    <p class="text-sm font-normal text-black tracking-wider">
                      ファイル名はアップロード後に編集できます
                    </p>
                  </li>
                </ul>

                <div class="relative pc:!w-[496px] !w-[324px]">
                  <el-input
                    v-model="formTemplateJob.nameAttachment"
                    class="mt-2 !w-full inputNameAttachment"
                    :class="[
                      {
                        'text-black disableInputNameAttachment':
                          !formTemplateJob?.attachment,
                      },
                    ]"
                    placeholder="選択されていません"
                  />
                  <img
                    class="absolute right-4 bottom-4 cursor-pointer"
                    src="~/assets/images/icon-upload-pdf.svg"
                    @click="fileInput?.click()"
                  />
                  <input
                    ref="fileInput"
                    class="hidden"
                    type="file"
                    @change="uploadFileAttachment"
                  />
                </div>

                <h1 class="text-xs font-normal tracking-wider text-danger">
                  {{ textUpload }}
                </h1>
              </div>
            </el-form-item>

            <div class="mt-6">
              <p class="font-bold text-sm">
                受動喫煙防止措置
                <span class="ml-1 text-danger text-xs font-normal">*必須</span>
              </p>
              <p class="text-sm mt-2">
                職業安定法により就業場所での「受動喫煙防止」に関する取り組みの明示義務が課されています。
              </p>
              <p class="text-sm mb-2">
                就業場所の実態に合わせて選択をしてください。
              </p>
            </div>
            <el-form-item class="form-item-edit">
              <div class="flex flex-col">
                <el-radio-group v-model="formTemplateJob.smokingSolution">
                  <el-radio label="敷地内禁煙" size="large"></el-radio>
                </el-radio-group>
                <el-radio-group v-model="formTemplateJob.smokingSolution">
                  <el-radio
                    label="敷地内禁煙（屋外に喫煙場所あり）"
                    size="large"
                  ></el-radio>
                </el-radio-group>
                <el-radio-group v-model="formTemplateJob.smokingSolution">
                  <el-radio label="屋内禁煙" size="large"></el-radio>
                </el-radio-group>
                <el-radio-group v-model="formTemplateJob.smokingSolution">
                  <el-radio
                    label="屋内原則禁煙（喫煙専用室設置）"
                    size="large"
                  ></el-radio>
                </el-radio-group>
              </div>
            </el-form-item>

            <el-form-item
              class="form-item-label-bold pc:mt-[104px] mobile:mt-16"
              label="自由項目"
            >
              <h1 id="4" ref="refScroll4"></h1>
              <el-input
                v-model="formTemplateJob.freeDescription.title"
                class="mb-2 mt-6 break-words"
                placeholder="タイトルを記入してください"
                :maxlength="40"
              />
              <div
                class="free-description-editor border border-gray-third rounded w-full"
              >
                <MessageEditor
                  v-model="formTemplateJob.freeDescription.description"
                  v-model:is-set-content="isSetContent"
                  placeholder="詳細を記入してください"
                  @reset-is-set-content="isSetContent = false"
                />
              </div>
            </el-form-item>

            <el-form-item
              class="form-item-label-bold pc:mt-[104px] mobile:mt-16"
              label="求人掲載期間"
            >
              <h1 id="5" ref="refScroll5"></h1>

              <DateSelect
                v-model:hiring-start-date="hiringStartDate"
                v-model:hiring-end-date="hiringEndDate"
                :is-not-required-hiring-end-date="isNotRequiredHiringEndDate"
                :width="380"
                @update:is-not-required-hiring-end-date="updateHiddenDate"
              />
            </el-form-item>

            <EntryNumberIssuance :entry-number="formTemplateJob.entryNumber" />

            <el-form-item
              class="form-item-label-bold pc:mt-[104px] mobile:mt-16"
              label="受験票に表示する案内"
            >
              <h1 id="7" ref="refScroll7"></h1>
              <ul class="list-disc my-6 ml-4">
                <li>
                  この求人にエントリーした応募者の受験票に、「選考に関するご案内」として表示されます。
                </li>
                <li>
                  受験票を利用しない求人の場合は入力する必要はございません。
                </li>
                <li>この求人公開後に案内文は更新することが可能です。</li>
                <li>例）試験会場の場所や持ち物、選考に関する案内など</li>
              </ul>

              <p class="font-bold mb-2">受験票に表示する案内</p>
              <el-input
                v-model="formTemplateJob.informationJob"
                type="textarea"
                :rows="7"
              />
            </el-form-item>
          </el-form>

          <div class="w-full mt-[104px]">
            <div class="mb-16">
              <h1
                id="8"
                ref="refScroll8"
                class="text-[32px] leading-[46px] font-bold text-black tracking-wider mb-6"
              >
                求人に関連するブログ
              </h1>
              <p class="text-sm font-normal tracking-wider text-black">
                掲載済みのブログ記事を選択すると、
                <br />
                この求人に「この官公庁のブログ」として表示させることができます。
              </p>

              <el-button class="button-radius w-full mt-6" type="primary">
                ブログを選択する
              </el-button>
            </div>

            <div class="w-full flex mobile:flex-col">
              <el-button
                class="button-cancel pc:mr-4 pc:w-3/6 mobile:w-full mobile:mb-2"
                @click="handleBack"
              >
                キャンセル
              </el-button>
              <el-button
                class="button-radius pc:w-3/6 mobile:w-full"
                type="primary"
                @click="handleSaveTemplateJob"
              >
                確認画面へ
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PendingUploadFile
    v-model:status="dialogPendingUpload"
    @update-status="updateStatusDialog"
    @handle-confirm="dialogPendingUpload = false"
  />
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { useMSPostalCode } from '@/stores/masterDataPostalCode';
import { uploadFileStore } from '@/stores/upload';
import {
  IJobBigCategory,
  useDataSearchJob,
  IJobCategory,
} from '@/stores/masterDataSearchJob';
import {
  ESelectionFlows,
  EApppealPoints,
  EWorkMode,
  ETypeStatusMessage,
} from '~/utils/enum';

import { IFormTemplateJob } from '@/stores/adminTemplateJob';

definePageMeta({
  layout: 'employer',
  middleware: ['employer-only'],
});

interface IEmits {
  (event: 'update:formData', form: IFormTemplateJob): void;
  (event: 'save-template'): void;
  (event: 'return-event'): void;
}

interface IProps {
  formData: IFormTemplateJob;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const formTemplateJob = computed({
  get: () => props.formData,
  set: (val) => {
    emit('update:formData', val);
  },
});

const { params } = useRoute();
const { getPostalCode } = useMSPostalCode();
const { uploadFiles } = uploadFileStore();
const dataSearchJobStore = useDataSearchJob();
const dateFormat = (date: string | null, type: string) => {
  return date ? dayjs(date).format(type) : null;
};

const OPTION_CITIES = ref<{ value: number; label: string }[]>([]);
const OPTION_PROVINCE = ref<{ value: number; label: string }[]>([]);
const OPTION_JOB_CATEGORIES = ref<{ value: number; label: string }[]>([]);
const isMessage = ref<boolean>(false);
const isPendingUpload = ref<boolean>(false);
const isPostalCode = ref<boolean>(true);
const isProvince = ref<boolean>(true);
const isWorkMode = ref<boolean>(true);
const jobCategoriesChild = ref<IJobCategory[] | undefined>([]);
const dataJobCategory = ref<IJobBigCategory[]>([]);
const fileName = ref<string>('');
const textUpload = ref<string>('');
const workModeOther = ref<string>('');
const selectionFlows = ref<string[]>([]);
const requiredSelectFlows = ref<boolean>(false);
const governmentName = useLocalStorage('governmentName', '');
const fileInput = ref<HTMLInputElement>();
const hiringStartDate = ref({
  year: dateFormat(formTemplateJob.value.hiringStartDate, 'YYYY'),
  month: dateFormat(formTemplateJob.value.hiringStartDate, 'MM'),
  day: dateFormat(formTemplateJob.value.hiringStartDate, 'DD'),
});

const hiringEndDate = ref({
  year: dateFormat(formTemplateJob.value.hiringEndDate, 'YYYY'),
  month: dateFormat(formTemplateJob.value.hiringEndDate, 'MM'),
  day: dateFormat(formTemplateJob.value.hiringEndDate, 'DD'),
});

const isNotRequiredHiringEndDate = ref<boolean>(true);

if (formTemplateJob.value.workMode !== '') {
  isWorkMode.value = false;
  workModeOther.value = EWorkMode.ORTHER;
} else {
  isWorkMode.value = true;
  workModeOther.value = EWorkMode.WORK_COMPANY;
}

if (formTemplateJob.value.selectionFlows.length > 1) {
  selectionFlows.value = formTemplateJob.value.selectionFlows.map((e) => {
    return e.title;
  });
}

if (formTemplateJob.value.hiringEndDate) {
  isNotRequiredHiringEndDate.value = false;
}

/** Upload Image */
const handleUpload = (image: string, index: number) => {
  formTemplateJob.value.images[index] = image;
};

/** Upload PDF */
const dialogPendingUpload = ref(false);
const updateStatusDialog = (val: boolean) => {
  dialogPendingUpload.value = val;
};

const uploadFileAttachment = async (e: any) => {
  isPendingUpload.value = true;
  try {
    if (!e.target.files?.length) return;
    const formData = new FormData();
    const file = e.target.files[0];
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ];
    if (!allowedTypes.includes(file.type)) {
      textUpload.value = 'PDF/Excel/Word形式のみサポートされています';
    } else if (file.size / 1024 / 1024 > 10) {
      textUpload.value = 'ファイルサイズが10MBを超えています';
    } else {
      textUpload.value = '';
      formData.append('file', file);
      formData.append('isAttachment', 'true');
      if (fileInput.value) {
        fileInput.value.value = '';
      }
      const response = await uploadFiles(formData);
      if (response) {
        fileName.value = file.name;
        formTemplateJob.value.attachment = response;
        formTemplateJob.value.nameAttachment = file.name
          .split('.')
          .slice(0, -1)
          .join('.');
      } else textUpload.value = '無効なファイルアップロードタイプです';
    }
  } catch (error) {
  } finally {
    isPendingUpload.value = false;
  }
};

/** handle Edit Job  */
const handleSaveTemplateJob = () => {
  formTemplateJob.value.hiringStartDate =
    hiringStartDate.value.year &&
    hiringStartDate.value.month &&
    hiringStartDate.value.day
      ? `${hiringStartDate.value.year}/${hiringStartDate.value.month}/${hiringStartDate.value.day}`
      : null;
  formTemplateJob.value.hiringEndDate =
    hiringEndDate.value.year &&
    hiringEndDate.value.month &&
    hiringEndDate.value.day
      ? `${hiringEndDate.value.year}/${hiringEndDate.value.month}/${hiringEndDate.value.day}`
      : null;

  if (formTemplateJob.value.hiringQuantity === '') {
    formTemplateJob.value.hiringQuantity = 0;
  } else {
    formTemplateJob.value.hiringQuantity = Number(
      formTemplateJob.value.hiringQuantity,
    );
  }
  emit('save-template');
};

const handleBack = () => {
  emit('return-event');
  routerPush('/admin/job/template/list');
};

const handlePostCode = async (data: string) => {
  const response = await getPostalCode(data);
  if (response) {
    OPTION_PROVINCE.value = response.postalCodeCities.map(
      (i: { city: { province: { name: string; id: number } } }) => {
        return { value: i.city.province.id, label: i.city.province.name };
      },
    );
    OPTION_CITIES.value = response.postalCodeCities.map(
      (i: { city: { name: string; id: number } }) => {
        return { value: i.city.id, label: i.city.name };
      },
    );
    OPTION_PROVINCE.value = OPTION_PROVINCE.value.reduce(
      (
        unique: { value: number; label: string }[],
        current: { value: number; label: string },
      ) => {
        const exists = unique.some(
          (item: { value: number; label: string }) =>
            item.value === current.value && item.label === current.label,
        );
        if (!exists) {
          unique.push(current);
        }
        return unique;
      },
      [],
    );
    if (response.postalCodeCities) {
      if (response.postalCodeCities.length) {
        formTemplateJob.value.provinceId =
          response.postalCodeCities[0].city.province.id;
        formTemplateJob.value.cityId = response.postalCodeCities[0].city.id;
        isPostalCode.value = true;
        isProvince.value = true;
      } else {
        isPostalCode.value = false;
        isProvince.value = false;
      }
      isMessage.value = false;
    }
  } else {
    isMessage.value = true;
    isPostalCode.value = true;
    isProvince.value = true;
    formTemplateJob.value.provinceId = null;
    formTemplateJob.value.cityId = null;
  }
};

const handleChangePostalCode = (data: string) => {
  if (data.length >= 7) {
    handlePostCode(data);
  } else {
    formTemplateJob.value.provinceId = null;
    formTemplateJob.value.cityId = null;
  }
};

const setInputValue = () => {
  const input = document.getElementById('post-code');
  if (input && formTemplateJob.value.postalCode) {
    if (
      formTemplateJob.value.postalCode.length < 7 &&
      formTemplateJob.value.postalCode.length >= 1
    ) {
      formTemplateJob.value.postalCode =
        '0'.repeat(7 - formTemplateJob.value.postalCode.length) +
        formTemplateJob.value.postalCode;
      handlePostCode(formTemplateJob.value.postalCode);
    }
    input.blur();
  }
};

const handleSelectProvince = () => {
  isProvince.value = false;
};

const handleChangeWorkMode = (item: string) => {
  if (item === EWorkMode.WORK_COMPANY) {
    const businessAddress = useLocalStorage('businessAddress', '');
    const postcode = useLocalStorage('postcode', '');
    const provinceId = useLocalStorage('provinceId', '');
    const cityId = useLocalStorage('cityId', '');
    formTemplateJob.value.postalCode = postcode.value;
    handleChangePostalCode(formTemplateJob.value.postalCode);
    formTemplateJob.value.workAddress = businessAddress.value;
    formTemplateJob.value.provinceId = Number(provinceId.value);
    formTemplateJob.value.cityId = Number(cityId.value);
  } else {
    formTemplateJob.value.postalCode = '';
    handleChangePostalCode(formTemplateJob.value.postalCode);
    formTemplateJob.value.workAddress = '';
  }
  formTemplateJob.value.provinceId = null;
  formTemplateJob.value.cityId = null;
  if (EWorkMode.ORTHER === item) {
    isWorkMode.value = false;
  } else if (item === EWorkMode.WORK_COMPANY) {
    // workModeOther.value = governmentName.value;
    isWorkMode.value = true;
    formTemplateJob.value.workMode = '';
  }
};

/** Scroll into View Id */
const isScrollColor = ref<string>('1');
const refScroll1 = ref(null);
const refScroll2 = ref(null);
const refScroll3 = ref(null);
const refScroll4 = ref(null);
const refScroll5 = ref(null);
const refScroll6 = ref(null);
const refScroll7 = ref(null);
const refScroll8 = ref(null);

const textScroll = reactive([
  { id: '1', label: 'イメージ画像' },
  { id: '2', label: '求人内容' },
  { id: '3', label: '募集要項' },
  { id: '4', label: '自由項目' },
  { id: '5', label: '求人掲載期間' },
  { id: '6', label: 'エントリー番号発行' },
  { id: '7', label: '受験票に表示する案内' },
  { id: '8', label: '関連するブログ' },
]);

const elements = [
  refScroll1,
  refScroll2,
  refScroll3,
  refScroll4,
  refScroll5,
  refScroll6,
  refScroll7,
  refScroll8,
];

const handleScroll = () => {
  for (let i = 0; i < elements.length; i++) {
    const element: any = elements[i].value;
    if (element) {
      const rect = element.getBoundingClientRect();
      const top = rect.top;
      const bottom = rect.bottom;

      if (top < window.innerHeight && bottom >= 0) {
        isScrollColor.value = element.id;
        break;
      }
    }
  }
};

const handleScrollClickItem = (id: string) => {
  const e = document.getElementById(id);
  isScrollColor.value = id;
  if (e) {
    e.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
      inline: 'center',
    });
  }
};

const handleChangeJob = (id: number) => {
  jobCategoriesChild.value = dataJobCategory.value.find(
    (item: { id: number }) => item.id === id,
  )?.jobCategories;
};

const OPTION_WORK_MODE = computed(() => {
  return [EWorkMode.WORK_COMPANY, EWorkMode.ORTHER];
});

const OPTION_EMPLOYMENT_STATUS = computed(() => {
  const options = [];
  const objectFilter = Object.values(EGoverment_status).filter((item) => {
    return isNaN(Number(item));
  });
  for (const type of objectFilter) {
    options.push(type);
  }
  return options;
});

const OPTION_APPEALPOINTS = computed(() => {
  const options = [];
  const objectFilter = Object.values(EApppealPoints).filter((item) => {
    return isNaN(Number(item));
  });
  for (const type of objectFilter) {
    options.push(type);
  }
  return options;
});

const OPTION_SELECTION_FLOWS = computed(() => {
  const options = [];
  const objectFilter = Object.values(ESelectionFlows).filter((item) => {
    return isNaN(Number(item));
  });
  for (const type of objectFilter) {
    options.push(type);
  }
  return options;
});

watch(
  () => formTemplateJob.value.salaryRange.min,
  (newVal) => {
    const regex = /^[0-9]+$/;
    const isNumber = regex.test(newVal);
    if (!isNumber && newVal) {
      formTemplateJob.value.salaryRange.min = newVal.replace(/[^0-9]/g, '');
    }
  },
);

watch(
  () => formTemplateJob.value.salaryRange.max,
  (newVal) => {
    const regex = /^[0-9]+$/;
    const isNumber = regex.test(newVal);
    if (!isNumber && newVal) {
      formTemplateJob.value.salaryRange.max = newVal.replace(/[^0-9]/g, '');
    }
  },
);

watch(
  () => formTemplateJob.value.postalCode,
  (newVal) => {
    const regex = /^[0-9]+$/;
    const isNumber = regex.test(newVal);
    if (!isNumber && newVal) {
      formTemplateJob.value.postalCode = newVal.replace(/[^0-9]/g, '');
    }
    if (!newVal) {
      formTemplateJob.value.provinceId = null;
      formTemplateJob.value.cityId = null;
    }
  },
);

watch(
  () => formTemplateJob.value.hiringQuantity,
  (newVal) => {
    const regex = /^[0-9]+$/;
    const isNumber = regex.test(newVal);
    if (!isNumber && newVal) {
      formTemplateJob.value.hiringQuantity = newVal.replace(/[^0-9]/g, '');
    }
  },
);

const updateHiddenDate = (data: boolean) => {
  if (data) {
    hiringEndDate.value = {
      year: null,
      month: null,
      day: null,
    };
  }
};

const changeSelectionFlows = () => {
  const selectionFlowsOld = formTemplateJob.value.selectionFlows.map((e) => {
    return e.title;
  });

  if (selectionFlowsOld.length < selectionFlows.value.length + 1) {
    formTemplateJob.value.selectionFlows.pop();
    selectionFlows.value.forEach((e) => {
      if (!selectionFlowsOld.includes(e))
        formTemplateJob.value.selectionFlows.push({ title: e, content: '' });
    });
    formTemplateJob.value.selectionFlows.push({
      title: ETypeStatusMessage.ADOPTION,
      content: '',
    });
  } else {
    selectionFlowsOld.forEach((e, index) => {
      if (
        !selectionFlows.value.includes(e) &&
        e !== ETypeStatusMessage.ADOPTION
      )
        formTemplateJob.value.selectionFlows.splice(index, 1);
    });
  }
  if (formTemplateJob.value.selectionFlows.length > 1)
    requiredSelectFlows.value = false;
};

const handleClearImage = (index: number) => {
  formTemplateJob.value.images[index] = '';
};

onMounted(async () => {
  window.addEventListener('scroll', handleScroll);
  const response = await dataSearchJobStore.getJobBigCategoriesData();
  if (response && response.length) {
    dataJobCategory.value = response;
    OPTION_JOB_CATEGORIES.value = response.map((item: any) => {
      return { value: item.id, label: item.name };
    });

    jobCategoriesChild.value = dataJobCategory.value.find(
      (item: { id: number }) =>
        item.id === formTemplateJob.value.jobCategoryParentId,
    )?.jobCategories;
  }
  if (formTemplateJob.value.selectionFlows.length === 0) {
    formTemplateJob.value.selectionFlows.push({
      title: ETypeStatusMessage.ADOPTION,
      content: '',
    });
  }

  if (formTemplateJob.value.hiringQuantity === 0) {
    formTemplateJob.value.hiringQuantity = '';
  }
});
</script>

<style lang="scss" scoped>
.button-cancel {
  @apply border-2 border-solid border-primary rounded-lg text-primary text-base font-bold;
}

.button-radius {
  margin-left: 0px !important;
  @apply rounded-lg text-base font-bold;
}

.text-radio {
  @apply text-base ml-2;
}
</style>

<style lang="scss">
.form-item-eligibilityAbility .el-form-item__label {
  font-weight: 400 !important;
}

.form-item-label-bold .el-form-item__label {
  @apply text-[32px] leading-[46px] font-bold tracking-wider text-black;
}

ul.el-upload-list.el-upload-list--text {
  @apply hidden;
}

.el-radio.el-radio--large .el-radio__inner {
  @apply w-[18px] h-[18px];
}

.input__number-template.el-input-number .el-input__wrapper {
  @apply p-0;
}

.input__number-template {
  .el-input-number__decrease,
  .el-input-number__increase {
    @apply hidden;
  }
}

.custom-radio-group-job-template {
  .el-radio.is-checked {
    .el-radio__inner {
      @apply bg-[#0871e1] border-[#0871e1] after:bg-[#fff];
    }
  }
}
</style>
