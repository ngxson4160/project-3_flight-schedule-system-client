<template>
  <div>
    <div class="pb-6 !text-black">
      <div
        class="pc:px-10 pt-16 mobile:px-6"
        :class="{
          'mobile:pt-10': props.isHiddenLastDateLogin,
          '!p-0 !m-0': props.isInPageEntry,
        }"
      >
        <div
          v-if="!props.isHiddenLastDateLogin"
          class="flex justify-end text-sm"
        >
          <p class="mr-6 font-bold">最終更新日</p>
          <p>
            {{ dayjs(profileData.modifiedDate).format('YYYY年MM月DD日') }}
          </p>
        </div>
        <div
          v-if="!props.isTypeScout"
          class="flex pc:items-center mobile:flex-col-reverse mobile:gap-6 pc:justify-between my-16"
          :class="{ '!mt-10': props.isInPageEntry }"
        >
          <div class="font-bold max-w-[466px] mobile:text-center">
            <p class="pc:text-base text-sm">
              {{ profileData.firstNamePhonetic }}&nbsp;{{
                profileData.lastNamePhonetic
              }}
            </p>
            <p class="pc:text-[40px] text-[32px] pc:mt-4 mt-2 break-words">
              {{ profileData.firstName }}&nbsp;&nbsp;&nbsp;&nbsp;{{
                profileData.lastName
              }}
            </p>
          </div>
          <div
            class="mobile:flex mobile:justify-center pc:w-[120px] pc:h-[160px]"
          >
            <img
              :src="profileData.avatarURL"
              alt=""
              class="pc:w-full pc:h-full w-[120px] h-[160px] object-cover"
            />
          </div>
        </div>
        <div
          v-if="!props.isTypeScout"
          class="flex justify-start overflow-hidden pb-6 border-b border-gray-third pc:gap-6 gap-4"
        >
          <span
            class="font-bold text-sm pc:w-[200px] mobile:w-[120px] flex-shrink-0"
          >
            生年月日
          </span>
          <span class="font-normal text-sm flex-grow">
            {{ formatDate(profileData.dateOfBirth, 'YYYY年') }}&nbsp;&nbsp;
            {{ formatDate(profileData.dateOfBirth, 'M月D日') }} &nbsp;（満{{
              age
            }}歳）
          </span>
        </div>
        <div
          v-if="profileData.sex !== 2 && !props.isTypeScout"
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray-third pc:gap-6 gap-4"
        >
          <span
            class="font-bold text-sm pc:w-[200px] mobile:w-[120px] flex-shrink-0"
          >
            性別
          </span>
          <span class="font-normal text-sm flex-grow">
            {{ getGenderJa(profileData.sex) }}
          </span>
        </div>
        <div
          v-if="!props.isTypeScout"
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray-third pc:gap-6 gap-4"
        >
          <span
            class="font-bold text-sm pc:w-[200px] mobile:w-[120px] flex-shrink-0"
          >
            現住所
          </span>
          <span
            class="font-normal text-sm flex-grow overflow-hidden break-words"
          >
            {{ address }}
          </span>
        </div>
        <div
          v-if="!props.isTypeScout"
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray-third pc:gap-6 gap-4"
        >
          <span
            class="font-bold text-sm pc:w-[200px] mobile:w-[120px] flex-shrink-0"
          >
            メールアドレス
          </span>
          <span class="font-normal text-sm flex-grow label-custom-break-line">
            {{ profileData.email }}
          </span>
        </div>
        <div
          v-if="!props.isTypeScout"
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray-third pc:gap-6 gap-4"
        >
          <span
            class="font-bold text-sm pc:w-[200px] mobile:w-[120px] flex-shrink-0"
          >
            電話番号
          </span>
          <span class="font-normal text-sm flex-grow">
            {{ formatPhoneNumber(profileData.phoneNumber) }}
          </span>
        </div>
        <p
          v-if="props.isTypeScout"
          class="text-[24px] font-bold mt-16 mb-4"
          :class="{ '!mt-0': props.isHiddenLastDateLogin }"
        >
          基本情報
        </p>
        <!-- <div
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray-third pc:gap-6 gap-4"
        >
          <span
            class="font-bold text-sm  pc:w-[200px] mobile:w-[120px] flex-shrink-0"
          >
            経験職種
          </span>

          <span
            class="font-normal text-sm  flex-grow overflow-hidden break-words cursor-pointer whitespace-pre-line"
          >
            <h1>
              {{ desiredJobCategories.join('、') }}
            </h1>
          </span>
        </div> -->
        <!-- <div
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray-third pc:gap-6 gap-4"
        >
          <span
            class="font-bold text-sm  pc:w-[200px] mobile:w-[120px] flex-shrink-0"
          >
            スキル
          </span>
          <span
            class="font-normal text-sm  flex-grow"
          >
            {{ profileData.skill }}
          </span>
        </div> -->
        <div v-for="(el, index) in cetifications" :key="index">
          <div
            v-if="el.qualificationContent"
            class="flex overflow-hidden border-b border-solid border-gray-third py-6 pc:gap-6 gap-4"
          >
            <h1
              class="font-bold text-sm pc:w-[200px] mobile:w-[120px] flex-shrink-0"
            >
              資格 {{ cetifications.length > 1 ? index + 1 : '' }}
            </h1>

            <div
              class="flex mobile:flex-col mobile:gap-2 pc:justify-between pc:items-center flex-grow"
            >
              <h1 class="text-sm overflow-hidden break-words">
                {{ el.qualificationContent }}
              </h1>

              <h1
                class="text-sm text-gray-text w-[114px] flex-shrink-0 text-right mobile:text-left"
              >
                {{ formatDate(el.qualificationDate, 'YYYY年M月取得') }}
              </h1>
            </div>
          </div>
        </div>

        <div v-for="(el, index) in cetifications" :key="index">
          <div>
            <div
              v-if="el.language || el.level"
              class="flex border-b border-solid border-gray-third py-6 pc:gap-6 gap-4"
            >
              <h1
                class="font-bold text-sm pc:w-[200px] mobile:w-[120px] flex-shrink-0"
              >
                語学力{{ cetifications.length > 1 ? index + 1 : '' }}
              </h1>

              <div class="flex bb flex-grow">
                <h1 class="text-sm">{{ el.language }}</h1>
                <h1 v-if="el.level" class="text-sm">({{ el.level }})</h1>
              </div>
            </div>

            <div
              v-if="el.qualificationDetail"
              class="flex border-b border-solid border-gray-third py-6 pc:gap-6 gap-4"
            >
              <h1
                class="font-bold text-sm pc:w-[200px] mobile:w-[120px] flex-shrink-0"
              >
                言語の資格{{ cetifications.length > 1 ? index + 1 : '' }}
              </h1>

              <div
                class="flex mobile:flex-col mobile:gap-2 pc:justify-between flex-grow"
              >
                <h1
                  class="font-normal text-sm overflow-hidden break-words mobile:w-[220px]"
                >
                  {{ el.qualificationDetail }}
                </h1>

                <h1
                  class="text-sm text-gray-text w-[114px] flex-shrink-0 text-right mobile:text-left"
                >
                  {{ formatDate(el.certificateTime, 'YYYY年M月取得') }}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="profileData.aboutUs"
      class="mobile:px-6"
      :class="{ '!px-0': props.isInPageEntry }"
    >
      <p
        class="font-bold pc:text-[24px] text-[20px] pc:pl-10 mt-10"
        :class="{ '!px-0': props.isInPageEntry }"
      >
        自己PR
      </p>
      <p
        class="font-normal text-sm leading-[175%] pc:px-10 pt-4 break-words whitespace-pre-line"
        :class="{ '!px-0': props.isInPageEntry }"
      >
        {{ profileData.aboutUs }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
const { getGenderJa } = useCompositionMasterData();

const age = computed(() => {
  return dayjs().diff(props.profileData.dateOfBirth, 'year');
});

const props = defineProps({
  profileData: {
    type: Object,
    default: () => ({}),
  },
  isTypeScout: {
    type: Boolean,
    default: false,
  },
  isHiddenLastDateLogin: {
    type: Boolean,
    default: false,
  },
  isInPageEntry: {
    type: Boolean,
    default: false,
  },
});

// const desiredJobCategories = computed(() => {
//   let desiredJobCategory;
//   const data = props.profileData.additionExperienceOccupation;
//   const jobsCategory = props.profileData.experienceOccupation.map(
//     (i: { jobCategory: { name: string } }) => {
//       return i.jobCategory.name;
//     },
//   );
//   if (data && data.length) {
//     desiredJobCategory = props.profileData.additionExperienceOccupation;
//   } else {
//     desiredJobCategory = [];
//   }
//   return jobsCategory
//     .concat(desiredJobCategory)
//     .filter((i: string) => i);
// });

const postCode = ref<string>(props.profileData?.postcode);

const cetifications = computed(() => {
  const combined = [];
  const qualification = props.profileData.qualification;
  const language = props.profileData.language;
  if (qualification && language) {
    const maxLength = Math.max(qualification.length, language.length);
    for (let i = 0; i < maxLength; i++) {
      const item = {
        qualificationContent: qualification[i]?.qualificationContent || '',
        qualificationDate: qualification[i]?.qualificationDate || null,
        qualificationDetail: language[i]?.qualificationDetail || '',
        level: language[i]?.level || '',
        language: language[i]?.language || '',
        certificateTime: language[i]?.certificateTime || '',
      };
      combined.push(item);
    }
  }

  return combined;
});

const address = computed(() => {
  const postCodeValue: string = postCode.value ?? '';
  const result = postCodeValue.match(/(\d{0,3})(\d{0,4})/) ?? '';
  const postcode = (result[1] ?? '') + (result[2] ? `-${result[2]}` : '');

  return (
    (postcode ? `〒${postcode}` : '') +
    ' ' +
    (props.profileData?.businessCity?.province?.name || '') +
    ' ' +
    (props.profileData?.businessCity?.name || '') +
    ' ' +
    (props.profileData?.businessAddress || '')
  );
});
</script>

<style scoped>
.truncate-texts {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-tabs__nav-scroll {
  height: 40px !important;
}
</style>
