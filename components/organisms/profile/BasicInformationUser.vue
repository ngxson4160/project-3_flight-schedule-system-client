<template>
  <div>
    <div class="">
      <div class="pc:py-16 px-10">
        <label class="font-bold text-2xl leading-[35px] mb-10">基本情報</label>

        <!-- <section
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray"
        >
          <label
            class="font-bold text-sm tracking-wider pc:w-[200px] mobile:w-[120px] inline-flex"
          >
            経験職種
          </label>

          <content
            class="font-normal text-sm tracking-wider pc:w-[450px] mobile:w-[220px] overflow-hidden break-words"
          >
            <h1>{{ mergedArray.join('、') }}</h1>
          </content>
        </section> -->

        <!-- <section
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray"
        >
          <label
            class="font-bold text-sm tracking-wider pc:w-[200px] mobile:w-[120px] inline-flex"
          >
            スキル
          </label>

          <content
            class="font-normal text-sm tracking-wider mobile:w-[200px] overflow-hidden break-words"
          >
            {{ profileDataApplicant.skill }}
          </content>
        </section> -->

        <section
          v-for="(el, index) in profileDataApplicant.language"
          :key="index"
          class="flex justify-start overflow-hidden pt-6 pb-6 border-b border-gray"
        >
          <label
            class="font-bold text-sm tracking-wider pc:w-[200px] mobile:w-[120px] inline-flex"
          >
            資格 {{ profileDataApplicant.language.length > 1 ? index + 1 : '' }}
          </label>

          <div
            class="flex justify-between overflow-hidden break-words pc:w-[450px] mobile:flex-col mobile:w-[200px]"
          >
            <content
              class="font-normal text-sm tracking-wider overflow-hidden break-words pc:w-[320px]"
            >
              {{ el.level }}
            </content>

            <content class="font-normal text-sm tracking-wider text-gray-text">
              {{ convertDate(el.certificateTime) }}
            </content>
          </div>
        </section>

        <section v-for="(el, index) in cetifications" :key="index">
          <div>
            <div
              v-if="el.language || el.level"
              class="flex items-center border-b border-solid border-gray min-h-[70px]"
            >
              <label
                class="font-bold text-sm tracking-wider pc:min-w-[200px] mobile:w-[120px] inline-flex"
              >
                語学力{{ cetifications.length > 1 ? index + 1 : '' }}
              </label>

              <content class="flex">
                <h1 class="text-sm">{{ el.language }}</h1>
                <h1 v-if="el.level" class="text-sm">({{ el.level }})</h1>
              </content>
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
                class="flex justify-between overflow-hidden break-words pc:w-[450px] mobile:flex-col mobile:w-[200px]"
              >
                <content
                  class="font-normal text-sm tracking-wider overflow-hidden break-words pc:w-[320px]"
                >
                  {{ el.qualificationDetail }}
                </content>

                <content
                  class="font-normal text-sm tracking-wider text-gray-text"
                >
                  {{ convertDate(el.certificateTime) }}
                </content>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div>
      <p class="font-bold text-2xl pc:pl-10">自己PR</p>
      <p
        class="font-normal text-base leading-[175%] tracking-wider pc:px-10 pt-4 overflow-hidden break-words whitespace-pre-line"
      >
        {{ profileDataApplicant.aboutUs }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
const props = defineProps({
  profileDataApplicant: {
    type: Object,
    default: null,
  },
});

const convertDate = (date: string) => {
  if (date) {
    return dayjs(date).format('YYYY年M月D日');
  }
};
const cetifications = computed(() => {
  const combined = [];
  const qualification = props.profileDataApplicant.qualification;
  const language = props.profileDataApplicant.language;
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

  return combined;
});

const mergedArray = computed(() => {
  let desiredJobCategory;
  const data = props.profileDataApplicant.additionExperienceOccupation;
  const jobsCategory = props.profileDataApplicant.experienceOccupation.map(
    (i: { jobCategory: { name: string } }) => {
      return i.jobCategory.name;
    },
  );
  if (data && data.length) {
    desiredJobCategory =
      props.profileDataApplicant.additionExperienceOccupation;
  } else {
    desiredJobCategory = [];
  }
  return jobsCategory
    .concat(desiredJobCategory)
    .filter((i: string) => i !== '');
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
</style>
