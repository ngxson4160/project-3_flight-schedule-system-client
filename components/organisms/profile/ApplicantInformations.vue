<template>
  <div class="applicant-information">
    <el-form>
      <!-- <div class="flex justify-between mb-5">
        <h1 class="text-2xl font-bold text-black tracking-wider mb-6">
          採用状況
        </h1>
        <el-button
          v-if="isShowButtonEdit"
          class="form-button-entry"
          type="primary"
          @click="onRecruitmentStatusEdit()"
        >
          <div class="flex justify-center items-center">
            <img src="@/assets/images/icon-pen.svg" class="mr-2" />
            採用状況を編集
          </div>
        </el-button>
      </div>

      <el-form-item class="entry-message-employer" label="職種">
        {{ jobs }}
      </el-form-item>
      <el-form-item class="entry-message-employer" label="応募日">
        {{ formatDate(profileData.createdDate, 'YYYY/MM/DD') }}
      </el-form-item>
      <el-form-item class="entry-message-employer" label="最終更新日">
        {{
          informationInterview.updatedTime
            ? formatDate(informationInterview.updatedTime, 'YYYY/MM/DD')
            : informationInterview.createdTime
            ? formatDate(informationInterview.createdTime, 'YYYY/MM/DD')
            : ''
        }}
      </el-form-item>
      <el-form-item class="entry-message-employer" label="選考ステップ">
        {{ informationInterview.selectionStep }}
      </el-form-item>
      <el-form-item class="entry-message-employer" label="面接日時">
        {{
          informationInterview.interviewDate
            ? formatDate(informationInterview.interviewDate, 'YYYY/MM/DD HH:mm')
            : ''
        }}
      </el-form-item>
      <el-form-item
        class="entry-message-employer whitespace-pre-line break-all"
        label="メモ"
      >
        {{ informationInterview.memo }}
      </el-form-item>

      <el-button
        v-if="isShowButtonEdit"
        class="form-button-entry-mobile mobile:mt-14 mobile:w-full"
        type="primary"
        @click="onRecruitmentStatusEdit()"
      >
        <div class="flex justify-center items-center">
          <img src="~/assets/images/icon-edit-57_2.svg" class="mr-2" />
          採用状況を編集
        </div>
      </el-button> -->
      <div class="flex justify-end text-[18px]">
        <p class="mr-6 font-bold">最終更新日</p>
        <p>
          {{ dayjs(profileData.modifiedDate).format('YYYY年MM月DD日') }}
        </p>
      </div>
      <div class="pc:flex pc:items-center pc:justify-between my-16">
        <div class="font-bold max-w-[466px]">
          <p class="text-[18px]">
            {{ profileData.firstNamePhonetic }}&nbsp;{{
              profileData.lastNamePhonetic
            }}
          </p>
          <p class="text-[48px] mt-4 break-words">
            {{ profileData.firstName }}&nbsp;&nbsp;&nbsp;&nbsp;{{
              profileData.lastName
            }}
          </p>
        </div>
        <div
          class="mobile:mt-6 mobile:flex mobile:justify-center pc:w-[150px] pc:h-[200px]"
        >
          <img
            :src="profileData.avatarURL"
            alt=""
            class="pc:w-full pc:h-full w-[150px] h-[200px] object-cover"
          />
        </div>
      </div>
      <!-- <h1 class="entry-message-employer-bold">志望動機</h1>
      <el-form-item>
        <span class="whitespace-pre-line text-base text-black">
          {{ profileData.applicantEntry?.motivation }}
        </span>
      </el-form-item>

      <h1 class="entry-message-employer-bold">自己PR</h1>
      <el-form-item>
        <span class="whitespace-pre-line text-base text-black">
          {{ profileData.applicantEntry?.selfPr }}
        </span>
      </el-form-item> -->

      <!-- <h1
        v-if="profileData.applicantEntry?.otherData?.title"
        class="entry-message-employer-bold"
      >
        {{ profileData.applicantEntry?.otherData?.title }}
      </h1>
      <el-form-item
        v-if="profileData.applicantEntry?.otherData.url"
        class="text-primary cursor-pointer"
      >
        <a
          class="text-base font-normal text-primary tracking-wider"
          @click="handleOpenNewTab(profileData.applicantEntry?.otherData.url)"
        >
          データを確認する［{{ fileSize }}]
        </a>
      </el-form-item> -->

      <div
        v-for="(item, index) in profileData.applicantEntry?.settingQuestions"
        :key="index"
      >
        <div v-if="item.content.trim() !== ''">
          <h1 class="entry-message-employer-bold">
            {{ item.title }}
          </h1>
          <p
            v-if="item.typeQuestion === EFormEntry.FREE_SETTING && item.content"
            class="text-primary cursor-pointer"
            @click="handleOpenNewTab(item.content)"
          >
            {{ item?.fileName ?? 'ファイルを確認する' }} ({{
              getFileExtensionFromUrl(item.content)
            }}:{{ item.fileSize }}KB)
          </p>
          <div v-else>
            <div v-if="item.typeQuestion === EFormEntry.FREE_CHOICE_MUTIPLE">
              <p
                v-for="el in item.content.split(', ')"
                :key="el"
                class="text-base font-normal text-black tracking-wider leading-loose whitespace-pre-line"
              >
                {{ el }}
              </p>
            </div>
            <p
              v-else
              class="text-base font-normal text-black tracking-wider leading-loose whitespace-pre-line break-words"
            >
              {{ item.content }}
            </p>
          </div>
          <div
            v-if="
              item.typeQuestion === EFormEntry.FREE_CHOICE &&
              item?.subFormQuestionRadio
            "
            class="mt-16"
          >
            <div v-if="item.subFormQuestionRadio.content.trim() !== ''">
              <p
                class="label-custom-break-line whitespace-pre-line text-base font-bold leading-[150%]"
              >
                {{ item.subFormQuestionRadio.title }}
              </p>
              <p
                v-if="
                  item.subFormQuestionRadio.typeQuestion ===
                    EFormEntry.FREE_SETTING && item.subFormQuestionRadio.content
                "
                class="text-primary cursor-pointer mt-4 text-sm underline underline-offset-4"
                @click="handleOpenNewTab(item.subFormQuestionRadio.content)"
              >
                {{ item?.fileName ?? 'ファイルを確認する' }} ({{
                  getFileExtensionFromUrl(item.subFormQuestionRadio.content)
                }}:{{ item.subFormQuestionRadio.fileSize }}KB)
              </p>

              <div v-else class="mt-4">
                <ul
                  v-if="
                    item.subFormQuestionRadio.typeQuestion ===
                    EFormEntry.FREE_CHOICE_MUTIPLE
                  "
                >
                  <li
                    v-for="(
                      el, indexEl
                    ) in item.subFormQuestionRadio.content.split(', ')"
                    :key="indexEl"
                    class="whitespace-pre-line break-words label-custom-break-line text-sm"
                    :class="{ 'mt-2': indexEl !== 0 }"
                  >
                    {{ el }}
                  </li>
                </ul>

                <p
                  v-else-if="
                    item.subFormQuestionRadio.typeQuestion ===
                    EFormEntry.DEFAULT
                  "
                  class="whitespace-pre-line break-words label-custom-break-line text-sm"
                >
                  {{ item.subFormQuestionRadio.content }}
                </p>

                <ul v-else>
                  <li
                    v-for="(
                      el, indexEl
                    ) in item.subFormQuestionRadio.content.split(', ')"
                    :key="indexEl"
                    class="whitespace-pre-line break-words label-custom-break-line text-sm"
                    :class="{ 'mt-2': indexEl !== 0 }"
                  >
                    {{ el }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <RecruitmentStatusEdit
      v-if="dialogRecruitmentStatusEdit"
      v-model:status="dialogRecruitmentStatusEdit"
      :profile-data="profileData"
      :information-interview-applicant="informationInterview"
      @edit-message="updateRecruitmentStatusEdit"
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { FormEditMessage } from '@/stores/employerDetail';
const props = defineProps({
  profileData: {
    type: Object,
    default: () => ({}),
  },
  isShowButtonEdit: {
    type: Boolean,
    default: true,
  },
});
interface FormInterview extends FormEditMessage {
  createdTime: string | null;
  updatedTime: string | null;
}

const informationInterview = ref<FormInterview>({
  id: props.profileData.applicantEntry.id,
  selectionStep: props.profileData.applicantEntry?.settingInterview?.title,
  interviewDate:
    props.profileData.applicantEntry?.settingInterview?.interviewDate,
  memo: props.profileData?.applicantEntry?.settingInterview?.content,
  createdTime: props.profileData?.applicantEntry?.settingInterview?.createdTime,
  updatedTime: props.profileData?.applicantEntry?.settingInterview?.updatedTime,
});

const dialogRecruitmentStatusEdit = ref(false);

const updateRecruitmentStatusEdit = (val: FormInterview) => {
  informationInterview.value = val;
};

const onRecruitmentStatusEdit = () => {
  dialogRecruitmentStatusEdit.value = true;
};

watch(
  () => props.profileData.applicantEntry,
  () => {
    informationInterview.value = {
      id: props.profileData.applicantEntry.id,
      selectionStep: props.profileData.applicantEntry?.settingInterview?.title,
      interviewDate:
        props.profileData.applicantEntry?.settingInterview?.interviewDate,
      memo: props.profileData?.applicantEntry?.settingInterview?.content,
      createdTime:
        props.profileData?.applicantEntry?.settingInterview?.createdTime,
      updatedTime:
        props.profileData?.applicantEntry?.settingInterview?.updatedTime,
    };
  },
);

let fileSize = '';
if (props?.profileData.applicantEntry?.otherData?.url) {
  const { data }: any = await useBaseFetch(
    `/upload/size?link=${props?.profileData.applicantEntry?.otherData?.url}`,
    {
      method: 'GET',
    },
  );

  fileSize = formatBytes(data?.value?.data?.size);
}

const jobs = reactive(props?.profileData.job.jobCategory.name);
</script>

<style lang="scss">
.applicant-information {
  .entry-message-employer {
    @apply border-b border-solid border-color-border mb-0 min-h-[70px] items-center;
  }
  .entry-message-employer-bold {
    @apply text-2xl font-bold text-black tracking-wider mt-16 mb-4;
  }
  .form-button-entry {
    @apply mobile:hidden pc:w-[180px] text-base font-bold tracking-wider;
  }
  .form-button-entry-mobile {
    @apply pc:hidden;
  }
  .entry-message-employer .el-form-item__label::after {
    display: none !important;
  }
}
</style>

<style>
.entry-message-employer .el-form-item__label {
  @apply text-sm text-black font-bold tracking-wider justify-start items-center mr-6 p-0 pc:w-[200px] mobile:w-[120px];
}
</style>
