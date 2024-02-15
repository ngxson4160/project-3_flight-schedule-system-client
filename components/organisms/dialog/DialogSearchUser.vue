<template>
  <client-only>
    <el-dialog
      v-model="centerDialogVisible"
      align-center
      class="admin-search-user !w-[79.44%] !max-w-[1144px] relative"
    >
      <el-form
        :model="userInformation"
        label-position="top"
        class="form-search-user"
      >
        <p class="font-bold !text-black">絞り込み検索</p>
        <div class="flex gap-x-10">
          <div>
            <el-form-item label="名前" class="!w-[496px] mt-6">
              <el-input v-model="userInformation.name" />
            </el-form-item>
            <!-- <el-form-item
              v-if="typeSearch === 'user'"
              label="職種"
              class="!w-[232px] mt-6"
            >
              <el-select
                v-model="userInformation.jobCategoryId"
                class="m-0"
                placeholder="選択してください"
                clearable
                size="large"
              >
                <el-option
                  v-for="item in jobCategoryParents"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item> -->
            <el-form-item label="メールアドレス" class="!w-[496px] mt-6">
              <el-input v-model="userInformation.email" />
            </el-form-item>
            <el-form-item label="電話番号" class="!w-[232px] mt-6">
              <el-input v-model="userInformation.phoneNumber" />
            </el-form-item>
          </div>
          <div class="">
            <p class="mt-6 font-bold text-black">登録日</p>
            <el-form-item class="!my-2 !w-[380px]">
              <date-selector
                v-model:data-date="userInformation.startRegistrationDate"
                @change="handleChangeStartRegistrationDate"
              />
            </el-form-item>
            <p class="font-bold h-[20px]">〜</p>
            <el-form-item class="!my-2 !w-[380px]">
              <date-selector
                v-model:data-date="userInformation.endRegistrationDate"
                v-model:start-date="userInformation.startRegistrationDate"
                :is-date="true"
              />
            </el-form-item>
            <p class="mt-6 font-bold text-black">最終ログイン</p>
            <el-form-item class="!my-2 !w-[380px]">
              <date-selector
                v-model:data-date="userInformation.startLastLoginDate"
                @change="handleChangeStartLastLoginDate"
              />
            </el-form-item>
            <p class="font-bold h-[20px]">〜</p>
            <el-form-item class="!my-2 !w-[380px]">
              <date-selector
                v-model:data-date="userInformation.endLastLoginDate"
                :start-date="userInformation.startLastLoginDate"
                :is-date="true"
              />
            </el-form-item>
          </div>
        </div>
        <div class="flex justify-center">
          <el-button
            type="primary"
            class="!w-[256px] mt-10"
            @click="handleCofirm"
          >
            <p class="text-sm font-bold">検索する</p>
          </el-button>
        </div>
      </el-form>
    </el-dialog>
  </client-only>
</template>

<script setup lang="ts">
import { IResponse, IDate } from '~~/utils/interface';
const props = defineProps({
  status: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  typeSearch: {
    type: String,
    default: 'user',
  },
  data: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(['updateStatus', 'handleConfirm']);
const centerDialogVisible = computed({
  get: () => props.status,
  set: (val: boolean) => {
    emit('updateStatus', val);
  },
});

const jobCategoryParents = ref<{ id: number; name: string }[]>([]);

const { data: dataJob, error } = await useBaseFetch('/job-categories/jobs', {});
if (error.value?.data) {
  throw error.value?.data;
} else {
  const response = dataJob.value as IResponse;
  jobCategoryParents.value = response.data.map((e: any) => {
    return { id: e.id, name: e.name };
  });
}

const userInformation = reactive({
  name: '',
  email: '',
  phoneNumber: '',
  startRegistrationDate: {
    year: null,
    month: null,
    day: null,
  } as IDate,
  endRegistrationDate: {
    year: null,
    month: null,
    day: null,
  } as IDate,
  startLastLoginDate: {
    year: null,
    month: null,
    day: null,
  } as IDate,
  endLastLoginDate: {
    year: null,
    month: null,
    day: null,
  } as IDate,
  jobCategoryId: '' as number | string,
});

watchEffect(() => {
  if (props.data.name) userInformation.name = props.data.name;
  if (props.data.email) userInformation.email = props.data.email;
  if (props.data.phoneNumber)
    userInformation.phoneNumber = props.data.phoneNumber;
  if (props.data.startRegistrationDate)
    userInformation.startRegistrationDate = convertDateToObject(
      props.data.startRegistrationDate,
    );
  if (props.data.endRegistrationDate)
    userInformation.endRegistrationDate = convertDateToObject(
      props.data.endRegistrationDate,
    );
  if (props.data.startLastLoginDate)
    userInformation.startLastLoginDate = convertDateToObject(
      props.data.startLastLoginDate,
    );
  if (props.data.endLastLoginDate)
    userInformation.endLastLoginDate = convertDateToObject(
      props.data.endLastLoginDate,
    );
  if (props.data.jobCategoryId)
    userInformation.jobCategoryId = Number(props.data.jobCategoryId);
});

const handleChangeStartRegistrationDate = () => {
  if (
    userInformation.endRegistrationDate.year &&
    userInformation.startRegistrationDate.year
  ) {
    if (
      userInformation.endRegistrationDate.year <
      userInformation.startRegistrationDate.year
    )
      userInformation.endRegistrationDate.year = null;
    else if (
      userInformation.endRegistrationDate.year >
      userInformation.startRegistrationDate.year
    )
      return;
  }
  if (
    userInformation.endRegistrationDate.month &&
    userInformation.startRegistrationDate.month
  ) {
    if (
      userInformation.endRegistrationDate.month <
      userInformation.startRegistrationDate.month
    )
      userInformation.endRegistrationDate.month = null;
    else if (
      userInformation.endRegistrationDate.month >
      userInformation.startRegistrationDate.month
    )
      return;
  }
  if (
    userInformation.endRegistrationDate.day &&
    userInformation.startRegistrationDate.day
  ) {
    if (
      userInformation.endRegistrationDate.day <
      userInformation.startRegistrationDate.day
    )
      userInformation.endRegistrationDate.day = null;
  }
};

const handleChangeStartLastLoginDate = () => {
  if (
    userInformation.endLastLoginDate.year &&
    userInformation.startLastLoginDate.year
  ) {
    if (
      userInformation.endLastLoginDate.year <
      userInformation.startLastLoginDate.year
    )
      userInformation.endLastLoginDate.year = null;
    else if (
      userInformation.endLastLoginDate.year >
      userInformation.startLastLoginDate.year
    )
      return;
  }
  if (
    userInformation.endLastLoginDate.month &&
    userInformation.startLastLoginDate.month
  ) {
    if (
      userInformation.endLastLoginDate.month <
      userInformation.startLastLoginDate.month
    )
      userInformation.endLastLoginDate.month = null;
    else if (
      userInformation.endLastLoginDate.month >
      userInformation.startLastLoginDate.month
    )
      return;
  }
  if (
    userInformation.endLastLoginDate.day &&
    userInformation.startLastLoginDate.day
  ) {
    if (
      userInformation.endLastLoginDate.day <
      userInformation.startLastLoginDate.day
    )
      userInformation.endLastLoginDate.day = null;
  }
};

export interface IFormSearchUser {
  name?: string;
  email?: string;
  phoneNumber?: string;
  startRegistrationDate?: string;
  endRegistrationDate?: string;
  startLastLoginDate?: string;
  endLastLoginDate?: string;
  jobCategoryId?: string | number;
}

const handleCofirm = () => {
  const formSearch = ref<IFormSearchUser>();
  formSearch.value = {
    name: userInformation.name === '' ? undefined : userInformation.name,
    email: userInformation.email === '' ? undefined : userInformation.email,
    phoneNumber:
      userInformation.phoneNumber === ''
        ? undefined
        : userInformation.phoneNumber,
    startRegistrationDate:
      getDate(userInformation.startRegistrationDate) ?? undefined,
    endRegistrationDate:
      getDate(userInformation.endRegistrationDate) ?? undefined,
    startLastLoginDate:
      getDate(userInformation.startLastLoginDate) ?? undefined,
    endLastLoginDate: getDate(userInformation.endLastLoginDate) ?? undefined,
    jobCategoryId:
      userInformation.jobCategoryId === ''
        ? undefined
        : userInformation.jobCategoryId,
  };
  emit('handleConfirm', formSearch.value);
};
</script>

<style lang="scss">
.admin-search-user {
  .el-dialog__body {
    @apply pt-5 px-14 pb-10;
  }
  .el-dialog__headerbtn {
    @apply fixed top-0 right-0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    @apply text-white text-[24px];
  }
}
.admin-search-user.el-dialog {
  @apply rounded-xl;
}
</style>
