<template>
  <el-dialog
    v-model="openDialog"
    class="dialog__create-schedule pc:!px-14 mobile:!px-4 pc:!py-10 mobile:!py-4 !rounded-xl !shadow-base"
    :show-close="false"
    :modal="false"
  >
    <h1 class="text-[22px] font-bold">
      {{ titleModalCreateSelectionSchedule }}
    </h1>

    <el-form
      ref="formRef"
      label-position="top"
      class="employer-from my-10"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="選考ステップ" prop="title">
        <el-select
          v-model="form.title"
          placeholder="選択してください"
          class="w-full"
        >
          <el-option
            v-for="item in OPTION_TITLE_SCHEDULE_FILTER"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="選考日時" prop="interviewDate">
        <DateTimeRange
          v-model:date-picker="form.interviewDate"
          v-model:time-picker="datePicker"
        />
      </el-form-item>

      <el-form-item
        v-if="props.isInList"
        label="選考対象者"
        prop="applicantSelections"
      >
        <div class="flex flex-col w-full">
          <ul class="list-disc ml-6">
            <li>複数選択可</li>
          </ul>

          <el-select
            v-model="form.applicantSelections"
            placeholder="選択してください"
            class="w-full"
            multiple
          >
            <el-option
              v-for="item in OPTION_APPLICANT_SELECTED"
              :key="item"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-form-item>

      <el-form-item label="選考方法" prop="selectionMethod">
        <el-select
          v-model="form.selectionMethod"
          placeholder="選択してください"
          class="w-full"
        >
          <el-option
            v-for="item in OPTION_SELECTION_METHOD_SCHEDULE"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="選考場所" class="form-item-conditions">
        <div class="flex flex-col w-full">
          <ul class="list-disc ml-6">
            <li>会場となる住所やWEB会議用のURL</li>
          </ul>

          <!-- <el-input v-model="form.location" class="w-full h-14" /> -->
          <div
            ref="contentEdit"
            :innerHTML="inputStr"
            contentEditable="true"
            className=" border-gray contentEdit w-full h-auto  rounded-md mt-0 px-4 py-3   text-black"
            :suppressContentEditableWarning="true"
            :data-is-focusable="true"
            @input="handleInputChange"
            @click.stop="handleClick"
          ></div>
        </div>
      </el-form-item>

      <div v-if="applicantListStore.members.length > 0">
        <el-form-item label="担当メンバー" class="form-item-conditions">
          <div class="flex flex-col w-full">
            <ul class="list-disc ml-6">
              <li>複数選択可</li>
            </ul>

            <el-select
              v-model="form.memberChanges"
              placeholder="選択してください"
              class="w-full"
              multiple
            >
              <el-option
                v-for="item in applicantListStore.members"
                :key="item"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>

          <div
            class="mt-6 cursor-pointer flex gap-2"
            @click="handleRedirectCalendar"
          >
            <p class="text-primary underline">カレンダーを確認する</p>

            <img src="~/assets/images/icon-sharing-schedule.svg" alt="" />
          </div>
        </el-form-item>
      </div>

      <el-form-item label="メモ" class="form-item-conditions">
        <el-input
          v-model="form.content"
          class="w-full"
          type="textarea"
          :rows="7"
          placeholder="自由に記入してください"
        />
      </el-form-item>
    </el-form>

    <el-button
      type="primary"
      class="w-full"
      @click="handleSettingSchedule(formRef)"
    >
      保存する
    </el-button>

    <div v-if="!buttonRemoveSchedule" class="w-full flex justify-center mt-6">
      <p
        class="text-primary font-bold text-base underline cursor-pointer"
        @click="openDialog = false"
      >
        キャンセル
      </p>
    </div>

    <el-button
      v-else
      type="default"
      class="w-full !text-primary !ml-0 !mt-2 !border-2 !border-primary"
      @click="openDialog = false"
    >
      キャンセル
    </el-button>

    <div v-if="buttonRemoveSchedule" class="w-full flex justify-center mt-6">
      <p
        class="text-danger font-bold text-base underline cursor-pointer"
        @click="emit('delete-schedule')"
      >
        削除する
      </p>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import type { FormInstance, FormRules } from 'element-plus';
import _ from 'lodash';
import {
  ICreateSchedule,
  useApplicantListStore,
} from '~/stores/useApplicantListStore';
import { ETypeSettingInterView } from '~/utils/enum';

interface Emits {
  (event: 'update:visible', visible: boolean): void;
  (event: 'setting-schedule', form: ICreateSchedule): void;
  (event: 'delete-schedule'): void;
}

const props = defineProps({
  visible: {
    type: Boolean,
    default: () => false,
  },
  isContinueSetting: {
    type: Boolean,
    default: () => false,
  },
  listApplicant: {
    type: Array<any>,
    default: () => [],
  },
  isInList: {
    type: Boolean,
    default: true,
  },
  formData: {
    type: Object,
    default: () => {},
  },
  titleDialog: {
    type: String,
    default: '選考予定を作成',
  },
  isClick: {
    type: Number,
    default: null,
  },
  isMessageList: {
    type: Boolean,
    default: false,
  },
  optionFilter: {
    type: Boolean,
    default: false,
  },
  buttonRemoveSchedule: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<Emits>();

const contentEdit = ref();
const titleModalCreateSelectionSchedule = ref<string>(props.titleDialog);
watch(
  () => props.titleDialog,
  (newValue) => {
    titleModalCreateSelectionSchedule.value = newValue;
  },
);
const openDialog = computed({
  get: () => props.visible,
  set: (visible: boolean) => {
    emit('update:visible', visible);
  },
});

const OPTION_APPLICANT_SELECTED = computed(() => {
  if (!props.isMessageList) {
    return props.listApplicant.map((i) => {
      if (i.typeSettingInterview === ETypeSettingInterView.CANDIDATE_ONLINE) {
        return {
          value: i.id,
          label: `${
            i.applicantEntry?.applicant?.lastName
              ? `${i.applicantEntry?.applicant?.firstName} ${i.applicantEntry?.applicant?.lastName}`
              : `${i.applicantEntry?.applicant?.firstName}`
          } `,
        };
      }
      return {
        value: i.id,
        label: `${i.applicantEntryInfor?.applicantInfor?.firstName}`,
      };
    });
  } else {
    return props.listApplicant.map((i) => {
      return {
        value: i.id,
        label: `${
          i.applicantEntry?.applicant?.lastName
            ? `${i.applicantEntry?.applicant?.firstName} ${i.applicantEntry?.applicant?.lastName}`
            : `${i.applicantEntry?.applicant?.firstName}`
        }`,
      };
    });
  }
});

const OPTION_TITLE_SCHEDULE_FILTER = computed(() => {
  return props.optionFilter
    ? OPTION_TITLE_CREATE_SCHEDULE.splice(0, 4)
    : OPTION_TITLE_CREATE_SCHEDULE;
});

const formRef = ref();

const datePicker = ref<string[]>(['', '']);
const form = ref<ICreateSchedule>({
  title: '',
  content: '',
  interviewDate: '',
  interviewEndDate: '',
  ids: [],
  applicantIds: [],
  applicantSelections: [],
  location: '',
  memberChanges: [],
  selectionMethod: '',
  bulkMessageParams: [
    {
      jobId: 0,
      recipientId: 0,
      boxId: 0,
      messageId: 0,
      messageType: '',
    },
  ],
});
const inputStr = ref<string>('');

if (!props.isInList) {
  form.value.title = props.formData?.title;
  form.value.interviewDate = dayjs(props.formData?.interviewDate).format(
    'YYYY/MM/DD',
  );
  form.value.selectionMethod = props.formData?.selectionMethod;
  form.value.location = props.formData?.location;
  inputStr.value = props.formData?.location;
  form.value.memberChanges = props.formData?.memberChanges;
  form.value.content = props.formData?.content;
  datePicker.value[0] = props.formData.interviewDate
    ? dayjs(props.formData?.interviewDate).format('HH:mm')
    : '';
  datePicker.value[1] = props.formData?.interviewEndDate
    ? dayjs(props.formData?.interviewEndDate).format('HH:mm')
    : '';
}

watch(
  () => props.formData,
  (newValue) => {
    if (!props.isInList) {
      form.value.title = newValue?.title;
      form.value.interviewDate = dayjs(newValue?.interviewDate).format(
        'YYYY/MM/DD',
      );
      form.value.selectionMethod = newValue?.selectionMethod;
      form.value.location = newValue?.location;
      inputStr.value = newValue?.location;
      form.value.memberChanges = newValue?.memberChanges;
      form.value.content = newValue?.content;
      datePicker.value[0] = newValue.interviewDate
        ? dayjs(newValue?.interviewDate).format('HH:mm')
        : '';
      datePicker.value[1] = newValue?.interviewEndDate
        ? dayjs(newValue?.interviewEndDate).format('HH:mm')
        : '';
    }
  },
);

watch(
  () => props.listApplicant,
  (val) => {
    if (val && val.length) {
      form.value.applicantSelections = val.map((i) => {
        return i.id;
      });
    }
  },
);

const handleSettingSchedule = (formEl: FormInstance | undefined) => {
  const innerHtml = contentEdit.value.innerHTML;
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      const startDate = dayjs(
        `${form.value.interviewDate} ${datePicker.value[0]}`,
      ).format('YYYY-MM-DD HH:mm');

      const endDate = datePicker.value[1]
        ? dayjs(`${form.value.interviewDate} ${datePicker.value[1]}`).format(
            'YYYY-MM-DD HH:mm',
          )
        : null;

      emit('setting-schedule', {
        ...form.value,
        interviewDate: startDate,
        interviewEndDate: endDate,
        location: `${innerHtml}`,
      });
    } else {
      return false;
    }
  });
};

const validateDatePicker = (rule: any, value: string, callback: Function) => {
  if (!datePicker.value[0]) return false;
  return true;
};

const rules: FormRules = {
  title: { required: true, message: '必須項目です', trigger: 'blur' },
  interviewDate: [
    { required: true, message: '必須項目です', trigger: 'blur' },
    {
      validator: validateDatePicker,
      message: '必須項目です',
      trigger: 'change',
    },
  ],
  applicantSelections: {
    required: props.isInList,
    message: '必須項目です',
    trigger: 'blur',
  },

  selectionMethod: {
    required: true,
    message: '必須項目です',
    trigger: 'blur',
  },
};

const applicantListStore = useApplicantListStore();
await applicantListStore.getMemberSettingInterview();

watch(
  () => props.isContinueSetting,
  (val) => {
    if (!val) {
      datePicker.value = ['', ''];
      form.value = {
        title: '',
        content: '',
        interviewDate: '',
        interviewEndDate: '',
        ids: [],
        applicantIds: [],
        applicantSelections: [],
        location: '',
        memberChanges: [],
        selectionMethod: '',
        bulkMessageParams: [
          {
            jobId: 0,
            recipientId: 0,
            boxId: 0,
            messageId: 0,
            messageType: '',
          },
        ],
      };
    }
  },
);

const handleRedirectCalendar = () => {
  return window.open('/employer/calendar');
};

function replaceURLs(message: string): string {
  if (!message) return '';

  const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  if (urlRegex.test(message)) {
    return message.replaceAll(urlRegex, function (url) {
      let hyperlink = url;
      if (!hyperlink.match('^https?:\\//')) {
        hyperlink = 'https://' + hyperlink;
      }
      return (
        '<a class="text-primary underline cursor-pointer break-all whitespace-pre-line" href="' +
        hyperlink +
        '" target="_blank" rel="noopener noreferrer">' +
        url +
        '</a>'
      );
    });
  }
  return '';
}

function extractURLsFromString(inputString: string, htmlContent: string) {
  // Regular expression to match URLs in a string
  const urlRegex = /(https?:\/\/[^\s/$.?#].[^\s]*)/g;

  // Use the `match` method to find all URLs in the input string
  const urls = inputString.match(urlRegex);

  const regex = /<a[^>]+>([^<]+)<\/a>/g;
  const matches: string[] = [];
  let match;

  while ((match = regex.exec(htmlContent)) !== null) {
    matches.push(match[1]);
  }
  const difference = _.difference(urls, matches);

  return difference || [];
}

const handleInputChange = (event: any) => {
  const a: string[] = extractURLsFromString(
    event.target.innerText,
    event.target.innerHTML,
  );

  const checkURL =
    !inputStr.value || a.some((e) => e && !inputStr.value.includes(e));
  if (checkURL) {
    inputStr.value = replaceURLs(event.target.innerText);
  }
};

const handleClick = (event: any) => {
  const target = event.target;
  if (target.tagName === 'A') {
    const link = target.getAttribute('href');
    if (link) {
      window.open(link, '_blank');
    }
  }
};

watch(
  () => props.isClick,
  () => {
    inputStr.value = '';
    form.value = {
      title: '',
      content: '',
      interviewDate: '',
      interviewEndDate: '',
      applicantSelections: props.listApplicant.map((i) => {
        return i.id;
      }),
      ids: [],
      applicantIds: [],
      location: '',
      memberChanges: [],
      selectionMethod: '',
      bulkMessageParams: [
        {
          jobId: 0,
          recipientId: 0,
          boxId: 0,
          messageId: 0,
          messageType: '',
        },
      ],
    };
    datePicker.value = ['', ''];
  },
);
</script>

<style lang="scss">
.el-dialog.dialog__create-schedule {
  @apply w-[496px] mobile:w-[342px];
  .el-dialog__header {
    @apply hidden;
  }
  .el-dialog__body {
    @apply p-0;
  }

  .el-select .el-input__wrapper {
    @apply min-h-[56px];
  }
  .contentEdit {
    @apply outline-none border border-color-border;
  }
  .el-form-item {
    @apply mb-6;
  }
}
</style>
