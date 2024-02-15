<template>
  <client-only>
    <el-dialog
      v-model="centerDialogVisible"
      align-center
      class="dialog-applicant-detail pc:!w-[1024px] mobile:!w-[390px] !mt-10"
    >
      <div class="pc:hidden border-b-[1px] border-[#DADCDE]">
        <h1
          class="text-sm !font-bold text-center text-black py-[18px] close relative"
        >
          ユーザー情報
          <img
            src="@/assets/images/icon-close-black.svg"
            alt=""
            class="absolute right-[20px] top-[16px]"
            @click="() => (centerDialogVisible = false)"
          />
        </h1>
      </div>
      <div class="rounded-lg pt-10 px-10 mobile:px-6">
        <p class="font-bold text-2xl leading-[170%] text-black">
          {{ getCompanyName(profileData.workExperience) }}
        </p>
        <p class="font-normal text-base leading-[150%] text-black mt-2">
          {{ profileData.businessCity.province.name }} /
          {{ dayjs().diff(profileData.dateOfBirth, 'year') }}歳
        </p>

        <div
          v-for="item in profileData.academicBackground"
          :key="item.schoolName"
          class="flex flex-col"
        >
          <p class="mt-2 font-normal text-sm text-black tracking-wider">
            {{ item.schoolName }} {{ item.academicInfo }}
          </p>
        </div>
      </div>
      <div
        class="pc:flex-row-reverse flex mx-10 mt-8 mobile:mx-6 mo gap-8 mobile:gap-4 mobile:flex-col"
      >
        <div
          class="flex-1 h-[56px] shadow-[0px_0px_20px_rgba(0,0,0,0.1)] rounded-lg text-center bg-primary text-white leading-[150%] flex items-center justify-center"
          @click="routerPush(`/employer/user/${profileData.id}/scout`)"
        >
          <p class="text-base font-bold">スカウト</p>
        </div>
        <div
          v-if="!statusInterestingDetail"
          class="flex-1 h-[56px] bg-white text-primary shadow-[0px_0px_20px_rgba(0,0,0,0.1)] flex justify-center text-center items-center rounded-lg border-primary border-2"
          @click="likeUser(profileData.id)"
        >
          <img src="~/assets/images/icon-button.svg" alt="" class="w-6 h-6" />
          <p class="text-center text-base font-bold pc:ml-3 mobile:py-4">
            お気に入りに登録
          </p>
        </div>
        <div
          v-else
          class="flex-1 h-[56px] bg-black text-primary shadow-[0px_0px_20px_rgba(0,0,0,0.1)] flex justify-center text-center items-center rounded-lg"
          @click="unLikeUser(profileData.id)"
        >
          <img src="~/assets/images/icon_favorite.svg" alt="" class="w-6 h-6" />
          <p
            class="text-center text-base font-bold pc:ml-3 text-white mobile:py-4"
          >
            お気に入りに登録済み
          </p>
        </div>
      </div>
      <div class="mt-10 pc:border-t border-color-border">
        <div class="tab-message-detail text-black">
          <div class="flex w-full mobile:flex-col">
            <div
              class="pc:w-[760px] mobile:w-full pc:border-r border-color-border px-10 mobile:px-6 pb-10 mobile:pb-0"
            >
              <p class="mt-16 mb-10 text-2xl font-bold">基本情報</p>
              <ul class="pl-0">
                <!-- <li
                  class="flex justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray"
                >
                  <span
                    class="font-bold text-sm leading-[150%] tracking-wider pc:w-[200px] mobile:w-[120px] inline-flex"
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
                    class="font-bold text-sm leading-[150%] tracking-wider pc:w-[200px] mobile:w-[120px] inline-flex"
                  >
                    スキル
                  </span>
                  <span
                    class="font-normal text-sm leading-[150%] tracking-wider pc:w-[456x] mobile:w-[206px] mobile:ml-4"
                  >
                    {{ profileData.skill }}
                  </span>
                </li> -->
                <li
                  v-for="(item, index) in profileData.qualification"
                  :key="index"
                  class="flex justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray relative"
                >
                  <span
                    class="font-bold text-sm leading-[150%] tracking-wider pc:w-[200px] mobile:w-[120px] inline-flex"
                  >
                    資格
                    {{ profileData.qualification.length > 1 ? index + 1 : '' }}
                  </span>
                  <div class="pc:flex">
                    <p
                      class="font-normal text-sm leading-[150%] tracking-wider pc:w-[456x] mobile:w-[206px] mobile:ml-4"
                    >
                      {{ item?.qualificationContent }}
                    </p>
                    <p
                      class="font-normal text-sm leading-[150%] tracking-wider pc:w-[456x] mobile:w-[206px] text-gray-text pc:absolute pc:right-0 mobile:pl-4"
                    >
                      {{ formatDate(item?.qualificationDate, 'YYYY年M月取得') }}
                    </p>
                  </div>
                </li>
                <div v-for="(item, index) in profileData.language" :key="index">
                  <li
                    class="flex justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray"
                  >
                    <span
                      class="font-bold text-sm leading-[150%] tracking-wider pc:w-[200px] mobile:w-[120px] inline-flex"
                    >
                      語学力
                      {{ profileData.language.length > 1 ? index + 1 : '' }}
                    </span>
                    <span
                      class="font-normal text-sm leading-[150%] tracking-wider pc:w-[456x] mobile:w-[206px] mobile:ml-4"
                    >
                      {{ item?.language ? item?.language : '' }}
                      {{ item?.level ? '(' + item?.level + ')' : '' }}
                    </span>
                  </li>
                  <li
                    class="flex justify-start overflow-hidden pt-6 pb-6 border-b-[1px] border-gray relative"
                  >
                    <span
                      class="font-bold text-sm leading-[150%] tracking-wider pc:w-[200px] mobile:w-[120px] inline-flex"
                    >
                      言語の資格
                      {{ profileData.language.length > 1 ? index + 1 : '' }}
                    </span>
                    <div class="pc:flex">
                      <p
                        class="font-normal text-sm leading-[150%] tracking-wider pc:w-[456x] mobile:w-[206px] mobile:ml-4"
                      >
                        {{ item?.qualificationDetail }}
                      </p>
                      <p
                        class="font-normal text-sm leading-[150%] tracking-wider pc:w-[456x] mobile:w-[206px] text-gray-text pc:absolute pc:right-0 mobile:pl-4"
                      >
                        {{ formatDate(item?.certificateTime, 'YYYY年M月取得') }}
                      </p>
                    </div>
                  </li>
                </div>
              </ul>
              <div class="pt-16">
                <p class="font-bold text-2xl">自己PR</p>
                <p
                  class="font-normal text-base leading-[175%] tracking-wider pt-4 whitespace-pre-line break-words"
                >
                  {{ profileData.aboutUs }}
                </p>
              </div>
              <NewTimeLine :timeline-data="timelineData" />
            </div>

            <div class="pc:px-4 px-8 mobile:px-0">
              <InformationRight
                :profile-data="profileData"
                :is-shadow="false"
              />
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </client-only>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { useFavoriteStore } from '~~/stores/useFavoriteStore';
import { ITimelineItem } from '~/utils/interface';

const props = defineProps({
  status: {
    type: Boolean,
    default: false,
  },
  timelineData: {
    type: Array<ITimelineItem>,
    default: () => [],
  },
  profileData: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:status', 'confirm']);

const statusInterestingDetail = ref<boolean>(
  isFavoriteUser(props.profileData.id),
);
const centerDialogVisible = computed({
  get: () => props.status,
  set: (val: boolean) => {
    emit('update:status', val);
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

const favoriteStore = useFavoriteStore();

const likeUser = (id: number) => {
  favoriteStore.addFavoriteEmployer(id);
  statusInterestingDetail.value = true;
};

const unLikeUser = (id: number) => {
  favoriteStore.deleteFavoriteEmployer(id);
  statusInterestingDetail.value = false;
};
</script>

<style lang="scss">
.dialog-applicant-detail {
  .el-dialog__body {
    @apply px-0 pt-0 pc:pb-14;
  }
  .el-icon.el-dialog__close {
    @apply fixed top-4 right-4 text-white text-[22px] mobile:hidden;
  }
}
.dialog-applicant-detail.el-dialog {
  @apply rounded-xl;
}
.tab-message-detail .el-tabs__header {
  @apply mb-0;
}
.tab-message-detail .el-tabs__item.is-top {
  @apply mb-6 text-base text-gray-text font-bold ml-10;
}
.tab-message-detail .el-tabs__item.is-top.is-active {
  @apply mb-6 text-base text-black font-bold;
}
</style>
