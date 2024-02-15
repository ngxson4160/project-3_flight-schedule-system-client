<template>
  <div class="w-full">
    <div>
      <ul class="px-10 py-16">
        <p class="font-bold text-2xl leading-[35px] mb-10">基本情報</p>
        <li
          class="flex justify-start overflow-hidden mobile:pt-6 pb-6 border-b-[1px] border-gray"
        >
          <span
            class="font-bold text-sm tracking-wider pc:w-[200px] mobile:w-[120px]"
          >
            氏名
          </span>

          <span
            class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[206px] mobile:ml-4"
          >
            {{ profileData.firstName }} {{ profileData.lastName }}
          </span>
        </li>
        <li
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray"
        >
          <span
            class="font-bold text-sm tracking-wider pc:w-[200px] mobile:w-[120px]"
          >
            フリガナ
          </span>
          <span
            class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[206px] mobile:ml-4"
          >
            {{ profileData.firstNamePhonetic }}
            {{ profileData.lastNamePhonetic }}
          </span>
        </li>
        <li class="flex py-6 border-b-[1px] border-gray">
          <div
            class="font-bold text-sm tracking-wider !w-[200px] pr-20px flex-shrink-0"
          >
            プロフィール写真
          </div>
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
        </li>
        <li
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray"
        >
          <span
            class="font-bold text-sm tracking-wider pc:w-[200px] mobile:w-[120px] inline-flex"
          >
            生年月日
          </span>
          <span
            class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[206px] mobile:ml-4"
          >
            {{ formatDate(profileData.dateOfBirth, 'YYYY年') }}&nbsp;&nbsp;
            {{ formatDate(profileData.dateOfBirth, 'M月D日') }} &nbsp;（満{{
              dayjs().diff(profileData?.dateOfBirth, 'year')
            }}歳）
          </span>
        </li>
        <li
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray"
        >
          <span
            v-if="profileData.sex !== 2"
            class="font-bold text-sm tracking-wider pc:w-[200px] mobile:w-[120px] inline-flex"
          >
            性別
          </span>
          <span
            class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[206px] mobile:ml-4"
          >
            {{ getGenderJa(profileData.sex) }}
          </span>
        </li>
        <li
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray"
        >
          <span
            class="font-bold text-sm tracking-wider pc:w-[200px] mobile:w-[120px] inline-flex"
          >
            現住所
          </span>
          <span
            class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[206px] mobile:ml-4"
          >
            {{ address }}
          </span>
        </li>
        <li
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray"
        >
          <span
            class="font-bold text-sm tracking-wider pc:w-[200px] mobile:w-[120px] inline-flex"
          >
            メールアドレス
          </span>
          <span
            class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[206px] mobile:ml-4"
          >
            {{ profileData.email }}
          </span>
        </li>
        <li
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray"
        >
          <span
            class="font-bold text-sm tracking-wider pc:w-[200px] mobile:w-[120px] inline-flex"
          >
            電話番号
          </span>
          <span
            class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[206px] mobile:ml-4"
          >
            {{ profileData.phoneNumber }}
          </span>
        </li>
        <!-- <li
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray"
        >
          <span
            class="font-bold text-sm tracking-wider pc:w-[200px] mobile:w-[120px] inline-flex"
          >
            経験職種
          </span>
          <content
            class="font-normal text-sm tracking-wider pc:w-[450px] mobile:w-[220px] overflow-hidden break-words"
          >
            <h1>{{ mergedArray.join('、') }}</h1>
          </content>
        </li> -->
        <!-- <li
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray"
        >
          <span
            class="font-bold text-sm tracking-wider pc:w-[200px] mobile:w-[120px] inline-flex"
          >
            スキル
          </span>
          <span
            class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[206px] mobile:ml-4"
          >
            {{ profileData.skill }}
          </span>
        </li> -->
        <div v-for="(item, index) in profileData.qualification" :key="index">
          <li
            v-if="item?.qualificationContent && item?.qualificationDate"
            class="flex justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray relative"
          >
            <span
              class="font-bold text-sm tracking-wider pc:w-[200px] mobile:w-[120px] inline-flex"
            >
              資格
              {{ profileData.qualification.length > 1 ? index + 1 : '' }}
            </span>
            <div class="pc:flex">
              <p
                class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[206px] mobile:ml-4"
              >
                {{ item?.qualificationContent }}
              </p>
              <p
                class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[206px] text-gray-text pc:absolute pc:right-0 mobile:pl-4"
              >
                {{ formatDate(item?.qualificationDate, 'YYYY年M月取得') }}
              </p>
            </div>
          </li>
        </div>
        <div v-for="(item, index) in profileData.language" :key="index">
          <li
            class="flex justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray"
          >
            <span
              class="font-bold text-sm tracking-wider pc:w-[200px] mobile:w-[120px] inline-flex"
            >
              語学力
              {{ profileData.language.length > 1 ? index + 1 : '' }}
            </span>
            <span
              class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[206px] mobile:ml-4"
            >
              {{ item?.language ? item?.language : '' }}
              {{ item?.level ? '(' + item?.level + ')' : '' }}
            </span>
          </li>
          <li
            class="flex justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray relative"
          >
            <span
              class="font-bold text-sm tracking-wider pc:w-[200px] mobile:w-[120px] inline-flex"
            >
              言語の資格
              {{ profileData.language.length > 1 ? index + 1 : '' }}
            </span>
            <div class="pc:flex">
              <p
                class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[206px] mobile:ml-4"
              >
                {{ item?.qualificationDetail }}
              </p>
              <p
                class="font-normal text-sm tracking-wider pc:w-[456x] mobile:w-[206px] text-gray-text pc:absolute pc:right-0 mobile:pl-4"
              >
                {{ formatDate(item?.certificateTime, 'YYYY年M月取得') }}
              </p>
            </div>
          </li>
        </div>
      </ul>
    </div>
    <div v-if="profileData.aboutUs">
      <p class="font-bold text-2xl pc:pl-10">自己PR</p>
      <p
        class="font-normal text-base leading-[175%] tracking-wider pc:px-10 pt-4 whitespace-pre-line break-words"
      >
        {{ profileData.aboutUs }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
const { getGenderJa } = useCompositionMasterData();

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

const address = computed(() => {
  return `${
    props.profileData.postcode
      ? `〒${props.profileData.postcode.substring(0, 3)}-`
      : ''
  }${
    props.profileData.postcode ? props.profileData.postcode.substring(3) : ''
  } ${props.profileData?.businessCity?.province?.name ?? ''}${
    props.profileData?.businessCity?.name ?? ''
  } ${props.profileData.businessAddress ?? ''}`;
});
</script>

<style scoped></style>
