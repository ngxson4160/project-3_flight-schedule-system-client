<template>
  <div
    class="form-free-questions"
    :class="{
      '!pt-[2px] border-2 border-solid border-gray-third rounded-xl p-6 mobile:p-4 ':
        !props.isChild,
    }"
  >
    <!-- Header -->
    <img
      v-if="!props.isChild"
      src="@/assets/images/icon-draggable-entry-item.svg"
      class="mx-auto icon-drag handle"
    />
    <div class="flex flex-col gap-4 relative">
      <div>
        <p class="text-sm font-bold">
          {{
            props.isChild
              ? `条件分岐設問${(props.indexItemParent || 0) + 1}-${
                  indexItem + 1
                } `
              : `自由設定設問${(formQuestions.optionNo || 0) + 1}`
          }}
        </p>
        <div class="flex gap-2 mt-2 mobile:flex-col">
          <el-input
            v-model="formQuestions.title"
            autosize
            type="textarea"
            resize="none"
            placeholder="タイトルを記入してください"
          />
          <el-select
            v-model="formQuestions.type"
            class="select-option-type-question"
            @change="handleChangeTypeQuestion"
          >
            <el-option
              v-for="form in optionSelectForms"
              :key="form.value"
              :value="form.value"
              :label="form.label"
            />
          </el-select>
        </div>
      </div>

      <!-- Form Dynamic -->
      <div>
        <!-- Form 1 -->
        <div
          v-if="checkFormWithType({ index: index, type: EFormEntry.DEFAULT })"
        >
          <p class="font-bold text-sm">回答</p>
          <div class="flex items-center gap-4">
            <p>最大文字数</p>
            <el-select
              v-model="formQuestions.max"
              class="w-40 select-option-type-question"
            >
              <el-option
                v-for="form in optionsLimitText"
                :key="form.value"
                :value="form.value"
                :label="form.label"
              />
            </el-select>
          </div>
        </div>

        <!-- Form 2 -->
        <div
          v-if="
            checkFormWithType({ index: index, type: EFormEntry.FREE_CHOICE })
          "
        >
          <div
            v-for="(label, index) in formQuestions.questionRadio"
            :key="index"
            class="flex gap-4 items-center justify-between pb-4 pc:pt-2 pt-1"
          >
            <el-radio-group class="flex-1 custom-label-max">
              <el-radio label=" " class="!w-full !h-auto !items-start">
                <div
                  class="cursor-pointer ml-4 border-b border-gray-third pb-2 label-custom-break-line text-sm leading-[170%] flex gap-2 items-center"
                  :title="label"
                  @click="
                    handleChangeLabel({
                      label: label,
                      index: index,
                      type: EFormEntry.FREE_CHOICE,
                    })
                  "
                >
                  <p>{{ label }}</p>
                  <p class="text-gray tracking-[-0.05px] flex-shrink-0">
                    - 選択肢{{ index + 1 }}
                  </p>
                </div>
              </el-radio>
            </el-radio-group>

            <img
              src="@/assets/images/icon-remove-form.svg"
              alt=""
              class="cursor-pointer pb-2"
              @click="
                handleRemoveInput({
                  index: index,
                  input: i,
                  type: EFormEntry.FREE_CHOICE,
                })
              "
            />
          </div>
          <div class="flex gap-4 items-center">
            <el-radio-group>
              <el-radio label=" "></el-radio>
            </el-radio-group>
            <el-input
              v-model="formInput.inputValRadio"
              autosize
              type="textarea"
              resize="none"
              placeholder="選択肢"
            />
          </div>
          <p
            v-if="
              (formQuestions.questionRadio.length < 2 &&
                formQuestions.type === EFormEntry.FREE_CHOICE &&
                isCheckedSettingQuestion) ||
              (formQuestions.questionCheckbox.length < 2 &&
                formQuestions.type === EFormEntry.FREE_CHOICE_MUTIPLE &&
                isCheckedSettingQuestion)
            "
            class="text-xs leading-[150%] text-danger ml-10 mt-2 error-message-item"
          >
            ２つ以上選択肢を作成してください
          </p>
          <p
            class="mt-3 ml-10 cursor-pointer text-primary font-bold inline-block text-sm underline underline-offset-2"
            @click="
              handleEnterFormFreeChoice({
                index: index,
                question: formInput.inputValRadio,
              })
            "
          >
            ＋選択肢を追加
          </p>
        </div>
        <!-- Form 3 -->
        <div
          v-if="
            checkFormWithType({
              index: index,
              type: EFormEntry.FREE_CHOICE_MUTIPLE,
            })
          "
          class="flex flex-col"
        >
          <div
            v-for="(label, index) in formQuestions.questionCheckbox"
            :key="index"
            class="flex gap-4 items-start justify-between pb-4 pc:pt-2 pt-1"
          >
            <el-checkbox-group class="flex-1 custom-label-max">
              <el-checkbox label=" " class="!w-full !h-auto !items-start">
                <p
                  class="cursor-pointer ml-4 border-b pb-2 border-gray-third label-custom-break-line text-sm leading-[170%]"
                  :title="label"
                  @click="
                    handleChangeLabel({
                      label: label,
                      index: index,
                      type: EFormEntry.FREE_CHOICE_MUTIPLE,
                    })
                  "
                >
                  {{ label }}
                </p>
              </el-checkbox>
            </el-checkbox-group>

            <img
              src="@/assets/images/icon-remove-form.svg"
              alt=""
              class="cursor-pointer"
              @click="
                handleRemoveInput({
                  index: index,
                  input: i,
                  type: EFormEntry.FREE_CHOICE_MUTIPLE,
                })
              "
            />
          </div>

          <div class="flex gap-4 items-center">
            <el-checkbox-group>
              <el-checkbox label=" "></el-checkbox>
            </el-checkbox-group>
            <el-input
              v-model="formInput.inputValCheckbox"
              autosize
              type="textarea"
              resize="none"
              placeholder="選択肢"
            />
          </div>
          <p
            v-if="
              (formQuestions.questionRadio.length < 2 &&
                formQuestions.type === EFormEntry.FREE_CHOICE &&
                isCheckedSettingQuestion) ||
              (formQuestions.questionCheckbox.length < 2 &&
                formQuestions.type === EFormEntry.FREE_CHOICE_MUTIPLE &&
                isCheckedSettingQuestion)
            "
            class="text-xs leading-[150%] text-danger ml-10 mt-2 error-message-item"
          >
            ２つ以上選択肢を作成してください
          </p>
          <p
            class="mt-3 ml-10 cursor-pointer text-primary font-bold inline-block text-sm underline underline-offset-2"
            @click="
              handleEnterFormFreeChoiceMultiple({
                index: index,
                question: formInput.inputValCheckbox,
              })
            "
          >
            ＋選択肢を追加
          </p>
        </div>

        <!-- Form 4 -->
        <div
          v-if="
            checkFormWithType({
              index: index,
              type: EFormEntry.FREE_SETTING,
            })
          "
        >
          <ul class="list-disc ml-5 text-[14px]">
            <li>求職者がファイルを添付できる項目です</li>
            <li>例）資格証明書、本人確認書類など</li>
          </ul>
        </div>

        <!-- Form 5 -->
        <div
          v-if="
            checkFormWithType({
              index: index,
              type: EFormEntry.OBTAINING_CONSENT,
            })
          "
          class="flex flex-col"
        >
          <ul class="list-disc ml-5 mb-4">
            <li class="text-sm">求職者から同意を獲得するための回答方式です</li>
            <li class="text-sm">
              求職者が同意しない場合、エントリーすることができません
            </li>
          </ul>

          <div
            v-for="(label, index) in formQuestions.questionConsentCheckbox"
            :key="index"
            class="flex gap-4 items-start justify-between pb-4 pc:pt-2 pt-1"
          >
            <el-checkbox-group class="flex-1 custom-label-max">
              <el-checkbox label=" " class="!w-full !h-auto !items-start">
                <p
                  class="cursor-pointer ml-4 border-b pb-2 border-gray-third label-custom-break-line text-sm leading-[170%]"
                  :title="label"
                  @click="
                    handleChangeLabel({
                      label: label,
                      index: index,
                      type: EFormEntry.OBTAINING_CONSENT,
                    })
                  "
                >
                  {{ label }}
                </p>
              </el-checkbox>
            </el-checkbox-group>

            <img
              src="@/assets/images/icon-remove-form.svg"
              alt=""
              class="cursor-pointer"
              @click="
                handleRemoveInput({
                  index: index,
                  input: i,
                  type: EFormEntry.OBTAINING_CONSENT,
                })
              "
            />
          </div>

          <div class="flex gap-4 items-center">
            <el-checkbox-group>
              <el-checkbox label=" "></el-checkbox>
            </el-checkbox-group>
            <el-input
              v-model="formInput.inputValObtainingCheckbox"
              autosize
              type="textarea"
              resize="none"
              placeholder="同意取得内容"
            />
          </div>
          <p
            v-if="
              formQuestions.questionConsentCheckbox?.length < 1 &&
              formQuestions.type === EFormEntry.OBTAINING_CONSENT &&
              isCheckedSettingQuestion
            "
            class="text-xs leading-[150%] text-danger ml-10 mt-2 error-message-item"
          >
            1つ以上選択肢を作成してください
          </p>
          <p
            class="mt-3 ml-10 cursor-pointer text-primary font-bold inline-block text-sm underline underline-offset-2"
            @click="
              handleEnterFormObtainingMultiple({
                index: index,
                question: formInput.inputValObtainingCheckbox,
              })
            "
          >
            ＋同意取得内容を追加
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="flex items-start justify-end"
        :class="{
          'pt-4 border-t border-solid border-color-border': !props.isChild,
        }"
      >
        <div
          class="flex items-center mobile:justify-between gap-6 mobile:w-full"
          :class="{
            'mobile:!justify-end':
              formQuestions.type === EFormEntry.OBTAINING_CONSENT,
          }"
        >
          <el-radio-group
            v-if="
              formQuestions.type !== EFormEntry.OBTAINING_CONSENT &&
              !props.isChild
            "
            v-model="formQuestions.status"
          >
            <div class="flex items-center gap-6">
              <el-radio
                v-for="radio in optionRadioTypeForm"
                :key="radio"
                :label="radio"
                class="!mr-0"
              >
                {{ radio }}
              </el-radio>
            </div>
          </el-radio-group>
          <el-select
            v-if="props.isChild && props.optionsNo?.length"
            v-model="formQuestions.optionNo"
            class="pc:w-[280px] w-[205px] select-option-no-custom select-disable-input"
          >
            <el-option
              v-for="(optionNo, indexNo) in props.optionsNo"
              :key="indexNo"
              :value="indexNo + 1"
            >
              <span class="pc:text-sm text-xs">
                {{ `選択肢${indexNo + 1}を選択した場合に表示` }}
              </span>
            </el-option>
            <template v-if="formQuestions.optionNo" #prefix>
              <div class="mobile:w-[157px] h-[54px] flex items-center">
                <p
                  class="text-black pc:text-sm text-xs tracking-[0.05px] leading-[170%]"
                  style="line-break: anywhere"
                >
                  {{ `選択肢${formQuestions.optionNo}を選択した場合に表示` }}
                </p>
              </div>
            </template>
          </el-select>

          <div
            class="h-[40px] w-[94px] py-2 flex items-center justify-center gap-1 rounded-lg border-[2px] border-gray cursor-pointer"
            @click="emit('removeForm')"
          >
            <img
              src="@/assets/images/icon-remove-form.svg"
              alt=""
              class="h-6 w-6"
            />
            <p class="text-gray whitespace-nowrap tracking-[0.05px]">削除</p>
          </div>
        </div>
      </div>
      <!-- sub form of form 2 -->
      <div
        v-if="!props.isChild && formQuestions.type === EFormEntry.FREE_CHOICE"
      >
        <div
          :class="{
            'mobile:pb-9':
              jobEntry.questionRadio.length &&
              (jobEntry.subFormQuestionRadio?.length || 0) <
                jobEntry.questionRadio.length,
          }"
        >
          <div
            v-for="(
              settingQuestionItem, indexQuestion
            ) in jobEntry.subFormQuestionRadio"
            :key="settingQuestionItem"
          >
            <CardSelectEntryJob
              class="pt-4 border-t-2 border-gray-third mt-4"
              :class="{ '!border-t-4 !mt-0 ': indexQuestion === 0 }"
              :job-entry="settingQuestionItem"
              :is-checked="isCheckedSettingQuestion"
              :index-item="indexQuestion"
              is-child
              :index-item-parent="formQuestions.optionNo"
              :options-no="jobEntry.questionRadio"
              @remove-form="
                emit('handleRemoveSubForm', props.indexItem, indexQuestion)
              "
              @handle-add-sub-form-question-radio="
                handleAddSubFormQuestionRadio
              "
            />
          </div>
          <p
            v-if="isDuplicateOptionNo"
            class="pb-5 text-danger text-xs leading-[150%] pc:text-center pc:pl-[72px] mt-2 error-message-item"
          >
            表示条件が重複しています
          </p>
        </div>
        <div
          v-if="
            jobEntry.questionRadio.length &&
            (jobEntry.subFormQuestionRadio?.length || 0) <
              jobEntry.questionRadio.length
          "
          class="bottom-0 left-0 absolute pc:h-14 flex pc:items-center"
          :class="{
            'pc:!bottom-[16px]': jobEntry.subFormQuestionRadio?.length === 0,
          }"
        >
          <p
            class="cursor-pointer text-primary font-bold inline-block text-sm underline underline-offset-2"
            @click="handleAddSubFormQuestionRadio"
          >
            ＋条件分岐の設問を追加
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EFormEntry } from '~/utils/enum';
import { IJobEntrySetting } from '~/stores/useJobStore';

interface Props {
  jobEntry: IJobEntrySetting;
  isChecked: boolean;
  indexItem: number;
  isChild?: boolean;
  indexItemParent?: number;
  optionsNo?: string[];
}

interface Emits {
  (event: 'removeForm'): void;
  (event: 'handleAddSubFormQuestionRadio', indexItem: number): void;
  (
    event: 'handleRemoveSubForm',
    indexItem: number,
    indexSubForm: number,
    isResetOptionNo?: boolean,
  ): void;
  (
    event: 'handleChangeOptionNoInSubForm',
    indexItem: number,
    optionNo: number,
    indexItemChild: number,
  ): void;
  (event: 'updateForm', index: number, newForm: IJobEntrySetting): void;
}

interface Input {
  inputValCheckbox: string;
  inputValObtainingCheckbox: string;
  inputValRadio: string;
  inputValCheckboxIndex: number | null;
  inputValObtainingCheckboxIndex: number | null;
  inputValRadioIndex: number | null;
}

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const formQuestions = ref<IJobEntrySetting>(props.jobEntry);
const isCheckedSettingQuestion = ref(props.isChecked);
watchEffect(() => {
  isCheckedSettingQuestion.value = props.isChecked;
});

const optionSelectForms = ref([
  { value: EFormEntry.DEFAULT, label: '記述式' },
  { value: EFormEntry.FREE_CHOICE, label: '選択方式' },
  { value: EFormEntry.FREE_CHOICE_MUTIPLE, label: '複数選択方式' },
  { value: EFormEntry.FREE_SETTING, label: 'データ添付' },
  { value: EFormEntry.OBTAINING_CONSENT, label: '同意取得' },
]);

const formInput = ref<Input>({
  inputValCheckbox: '',
  inputValObtainingCheckbox: '',
  inputValRadio: '',
  inputValCheckboxIndex: null,
  inputValObtainingCheckboxIndex: null,
  inputValRadioIndex: null,
});

const optionRadioTypeForm = ref([
  EntryInputStatus.REQUIRED,
  EntryInputStatus.ANY,
]);

const isDuplicateOptionNo = ref(false);

const optionsLimitText = computed(() => {
  const options = [...Array(21)].map((_, i) => {
    return { value: i * 100, label: `${i * 100}文字` };
  });
  return options.filter((i: { value: number }) => i.value);
});

const checkFormWithType = (data: { index: number; type: EFormEntry }) => {
  return formQuestions.value.type === data.type;
};

const handleChangeTypeQuestion = (typeQuestion: number) => {
  if (typeQuestion === EFormEntry.FREE_CHOICE)
    formQuestions.value.questionRadio = [];
  if (typeQuestion === EFormEntry.FREE_CHOICE_MUTIPLE)
    formQuestions.value.questionCheckbox = [];
  if (typeQuestion === EFormEntry.OBTAINING_CONSENT)
    formQuestions.value.questionConsentCheckbox = [];
};

/**
 *  Method
 */
const handleEnterFormFreeChoice = (data: {
  index: number;
  question: string;
}) => {
  // countKeyupEnter.value++;
  // if (countKeyupEnter.value < 2) return;
  if (data.question && formQuestions.value.questionRadio.length <= 50) {
    if (formInput.value.inputValRadioIndex) {
      formQuestions.value.questionRadio[
        formInput.value.inputValRadioIndex - 1
      ] = data.question;
    } else {
      formQuestions.value.questionRadio.push(data.question);
    }
    formInput.value.inputValRadio = '';
    formInput.value.inputValRadioIndex = null;
  }
};

const handleEnterFormFreeChoiceMultiple = (data: {
  index: number;
  question: string;
}) => {
  // countKeyupEnter.value++;
  // if (countKeyupEnter.value < 2) return;
  if (data.question && formQuestions.value.questionCheckbox.length <= 50) {
    if (formInput.value.inputValCheckboxIndex) {
      formQuestions.value.questionCheckbox[
        formInput.value.inputValCheckboxIndex - 1
      ] = data.question;
    } else {
      formQuestions.value.questionCheckbox.push(data.question);
    }
    formInput.value.inputValCheckbox = '';
    formInput.value.inputValCheckboxIndex = null;
  }
};

const handleEnterFormObtainingMultiple = (data: {
  index: number;
  question: string;
}) => {
  // countKeyupEnter.value++;
  // if (countKeyupEnter.value < 2) return;
  const uniqueVal = formQuestions.value.questionConsentCheckbox.includes(
    data.question,
  );

  if (
    data.question &&
    formQuestions.value.questionConsentCheckbox.length <= 50 &&
    !uniqueVal
  ) {
    if (formInput.value.inputValObtainingCheckboxIndex) {
      formQuestions.value.questionConsentCheckbox[
        formInput.value.inputValObtainingCheckboxIndex - 1
      ] = data.question;
    } else {
      formQuestions.value.questionConsentCheckbox.push(data.question);
    }
    formInput.value.inputValObtainingCheckbox = '';
    formInput.value.inputValObtainingCheckboxIndex = null;
  }
};

const handleChangeLabel = (data: {
  label: string;
  index: number;
  type: EFormEntry;
}) => {
  switch (data.type) {
    case EFormEntry.FREE_CHOICE:
      formInput.value.inputValRadioIndex = data.index + 1;
      formInput.value.inputValRadio = data.label;
      break;
    case EFormEntry.FREE_CHOICE_MUTIPLE:
      formInput.value.inputValCheckboxIndex = data.index + 1;
      formInput.value.inputValCheckbox = data.label;
      break;
    default:
      formInput.value.inputValObtainingCheckboxIndex = data.index + 1;
      formInput.value.inputValObtainingCheckbox = data.label;
      break;
  }
};

const handleRemoveInput = (data: {
  index: number;
  input: number;
  type: EFormEntry;
}) => {
  switch (data.type) {
    case EFormEntry.FREE_CHOICE:
      // eslint-disable-next-line no-case-declarations
      const indexQuestion = props.jobEntry.subFormQuestionRadio?.findIndex(
        (e) => e.optionNo === data.index + 1,
      );
      if (indexQuestion !== undefined && indexQuestion >= 0)
        emit('handleRemoveSubForm', props.indexItem, indexQuestion, true);
      formQuestions.value.questionRadio.splice(data.index, 1);

      break;
    case EFormEntry.FREE_CHOICE_MUTIPLE:
      formQuestions.value.questionCheckbox.splice(data.index, 1);
      break;
    default:
      formQuestions.value.questionConsentCheckbox.splice(data.index, 1);
      break;
  }
};

const handleAddSubFormQuestionRadio = () => {
  emit('handleAddSubFormQuestionRadio', props.indexItem);
};
watch(
  () => props.jobEntry.subFormQuestionRadio,
  (newVal) => {
    if (!newVal) return false;
    for (let i = 0; i < newVal.length; i++) {
      let count = 0;
      for (let j = 0; j < newVal.length; j++) {
        if (newVal[i].optionNo === newVal[j].optionNo) {
          count++;
        }
      }
      if (count > 1) {
        isDuplicateOptionNo.value = true;
        break;
      } else {
        isDuplicateOptionNo.value = false;
      }
    }
  },
  { deep: true, immediate: true },
);
watch(
  formQuestions,
  (newVale) => {
    emit('updateForm', props.indexItem, newVale);
  },
  { deep: true },
);
</script>

<style lang="scss">
.custom-label-max {
  .el-radio__label {
    flex: 1;
  }
  .el-checkbox__label {
    flex: 1;
  }
  .el-radio__input,
  .el-checkbox__input {
    @apply mt-[6px];
  }
}
.form-free-questions {
  .el-textarea__inner {
    @apply p-4 #{!important};
  }
}
.select-option-no-custom {
  .el-input__wrapper {
    @apply px-4;
  }
  .el-input__inner {
    @apply pc:text-sm text-xs #{!important};
  }
}
.select-option-type-question {
  .el-input__wrapper {
    @apply px-4;
  }
  .el-input__inner {
    @apply text-sm  #{!important};
  }
}
.select-disable-input {
  .el-input__inner {
    @apply hidden #{!important};
  }
  .el-input__prefix {
    @apply flex-grow;
  }
}
</style>
