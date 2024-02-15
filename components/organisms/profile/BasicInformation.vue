<template>
  <div>
    <div class="pb-6 !text-black">
      <div class="pc:px-10 pc:pt-16 mobile:px-6">
        <p class="font-bold text-2xl leading-[35px] mb-10">基本情報</p>
        <div
          class="flex justify-start overflow-hidden mobile:pt-6 pb-6 border-b border-gray"
        >
          <span
            class="font-bold text-sm tracking-wider pc:min-w-[200px] mobile:w-[120px] inline-flex"
          >
            氏名
          </span>
          <span
            class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[220px] mobile:ml-4"
          >
            {{ profileData.firstName }} {{ profileData.lastName }}
          </span>
        </div>
        <div
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray"
        >
          <span
            class="font-bold text-sm tracking-wider pc:min-w-[200px] mobile:w-[120px] inline-flex"
          >
            フリガナ
          </span>
          <span
            class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[220px] mobile:ml-4"
          >
            {{ profileData.firstNamePhonetic }}
            {{ profileData.lastNamePhonetic }}
          </span>
        </div>
        <div
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray !text-black"
        >
          <span
            class="font-bold text-sm tracking-wider pc:min-w-[200px] mobile:w-[120px] inline-flex"
          >
            プロフィール写真
          </span>
          <span
            class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[220px] mobile:ml-4"
          >
            <p class="w-[120px] h-[160px]">
              <img
                :src="profileData.avatarURL"
                alt=""
                class="w-full h-full object-cover"
              />
            </p>
          </span>
        </div>
        <div
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray"
        >
          <span
            class="font-bold text-sm tracking-wider pc:min-w-[200px] mobile:w-[120px] inline-flex"
          >
            生年月日
          </span>
          <span
            class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[220px] mobile:ml-4"
          >
            {{ formatDate(profileData.dateOfBirth, 'YYYY年') }}&nbsp;&nbsp;
            {{ formatDate(profileData.dateOfBirth, 'M月D日') }} &nbsp;（満{{
              age
            }}歳）
          </span>
        </div>
        <div
          v-if="profileData.sex !== 2"
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray"
        >
          <span
            class="font-bold text-sm tracking-wider pc:min-w-[200px] mobile:w-[120px] inline-flex"
          >
            性別
          </span>
          <span
            class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[220px] mobile:ml-4"
          >
            {{ getGenderJa(profileData.sex) }}
          </span>
        </div>
        <div
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray"
        >
          <span
            class="font-bold text-sm tracking-wider pc:min-w-[200px] mobile:w-[120px] inline-flex"
          >
            現住所
          </span>
          <span
            class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[220px] mobile:ml-4 overflow-hidden break-words"
          >
            {{ address }}
          </span>
        </div>
        <div
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray"
        >
          <span
            class="font-bold text-sm tracking-wider pc:min-w-[200px] mobile:w-[120px] inline-flex"
          >
            メールアドレス
          </span>
          <span
            class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[220px] mobile:ml-4"
          >
            {{ profileData.email }}
          </span>
        </div>
        <div
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray"
        >
          <span
            class="font-bold text-sm tracking-wider pc:min-w-[200px] mobile:w-[120px] inline-flex"
          >
            電話番号
          </span>
          <span
            class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[220px] mobile:ml-4"
          >
            {{ profileData.phoneNumber }}
          </span>
        </div>
        <!-- <div
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray"
        >
          <span
            class="font-bold text-sm tracking-wider pc:min-w-[200px] mobile:w-[120px] inline-flex flex-shrink-0"
          >
            経験職種
          </span>

          <span
            class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[220px] overflow-hidden break-words cursor-pointer whitespace-pre-line"
          >
            <h1>
              {{ mergedArray.join('、') }}
            </h1>
          </span>
        </div> -->
        <!-- <div
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray"
        >
          <span
            class="font-bold text-sm tracking-wider pc:min-w-[200px] mobile:w-[120px] inline-flex"
          >
            スキル
          </span>
          <span
            class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[220px] mobile:ml-4"
          >
            {{ profileData.skill }}
          </span>
        </div> -->
        <div v-for="(el, index) in cetifications" :key="index">
          <div
            v-if="el.qualificationContent"
            class="flex items-center overflow-hidden border-b border-solid border-gray min-h-[70px]"
          >
            <h1
              class="font-bold text-sm tracking-wider pc:min-w-[200px] mobile:w-[120px] inline-flex"
            >
              資格 {{ cetifications.length > 1 ? index + 1 : '' }}
            </h1>

            <div
              class="pc:flex pc:justify-between pc:items-center pc:w-full mobile:w-[200px]"
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
              class="flex items-center border-b border-solid border-gray min-h-[70px]"
            >
              <h1
                class="font-bold text-sm tracking-wider pc:min-w-[200px] mobile:w-[120px] inline-flex"
              >
                語学力{{ cetifications.length > 1 ? index + 1 : '' }}
              </h1>

              <div class="flex bb">
                <h1 class="text-sm">{{ el.language }}</h1>
                <h1 v-if="el.level" class="text-sm">({{ el.level }})</h1>
              </div>
            </div>

            <div
              v-if="el.qualificationDetail"
              class="flex items-center border-b border-solid border-gray min-h-[70px]"
            >
              <h1
                class="font-bold text-sm tracking-wider pc:min-w-[200px] mobile:min-w-[120px] inline-flex"
              >
                言語の資格{{ cetifications.length > 1 ? index + 1 : '' }}
              </h1>

              <div
                class="pc:flex items-center justify-between w-full mobile:w-[200px]"
              >
                <h1
                  class="font-normal text-sm tracking-wider overflow-hidden break-words mobile:w-[220px]"
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
    <div class="mobile:px-6">
      <p class="font-bold text-2xl pc:pl-10 mt-10">自己PR</p>
      <p
        class="font-normal text-base leading-[175%] tracking-wider pc:px-10 pt-4 break-words whitespace-pre-line"
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
});

const mergedArray = computed(() => {
  let desiredJobCategory;
  const data = props.profileData.additionExperienceOccupation;
  const jobsCategory = props.profileData.experienceOccupation.map(
    (i: { jobCategory: { name: string } }) => {
      return i.jobCategory.name;
    },
  );
  if (data && data.length) {
    desiredJobCategory = props.profileData.additionExperienceOccupation;
  } else {
    desiredJobCategory = [];
  }
  return jobsCategory
    .concat(desiredJobCategory)
    .filter((i: string) => i !== '');
});

const postCodeVal = ref<string>(props.profileData?.postcode);

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
  const postCodeValue: string = postCodeVal.value ?? '';
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
