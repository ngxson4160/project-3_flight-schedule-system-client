<template>
  <div class="pc:w-[760px]">
    <el-card>
      <div
        class="cursor-pointer relative text-black pc:pr-20 pr-4 pc:pl-6 pl-4 pc:pt-6 pt-4 pc:pb-6 pb-4"
        @click="handleClick"
      >
        <div class="pc:flex pc:justify-between pc:items-center">
          <div class="pc:w-1/2 pc:pr-2">
            <div v-if="isApplicant" class="block mb-2">
              <span
                class="bg-black-800 rounded overflow-hidden px-2 py-1 font-bold text-sm text-white"
              >
                応募
              </span>
            </div>
            <div v-if="isInteresting" class="block mb-2">
              <span
                class="bg-color-message rounded overflow-hidden px-2 py-1 font-bold text-sm text-black"
              >
                気になる
              </span>
            </div>
            <p class="font-bold py-1 text-base mobile:pr-[48px]">
              {{ userData.oldCompanyName ? userData.oldCompanyName : '-' }}
            </p>
            <p class="py-1 text-base">
              <span>{{ userData.prefecture }}</span>
              <span
                v-if="userData.prefecture && userData.age"
                class="whitespace-nowrap"
              >
                /
              </span>
              <span>{{ userData.age }}</span>
              歳
            </p>
            <div class="text-sm py-1 text-black-800 flex">
              {{ userData.oldAcademic }}
            </div>
            <p class="text-sm py-1 text-black-800">
              <span>{{ userData.languageCertificate }}</span>
              <span
                v-if="
                  userData.languageCertificate &&
                  userData.languageCertificateLevel
                "
                class="whitespace-nowrap"
              >
                /
              </span>
              <span>{{ userData.languageCertificateLevel }}</span>
            </p>
          </div>
          <div class="pc:w-1/2 pc:pl-2 text-xs">
            <div
              class="flex items-center border-b-[1px] border-gray-third py-1"
              :class="[{ 'py-2': isApplicant }]"
            >
              <p class="font-bold w-[104px] mr-4">希望雇用形態</p>
              <div class="flex flex-wrap flex-1">
                <p v-if="userData.employermentForms" class="tag">
                  {{ userData.employermentForms }}
                </p>
              </div>
            </div>
            <div
              class="flex items-center border-b-[1px] border-gray-third py-1"
              :class="[{ 'py-2': isApplicant }]"
            >
              <p class="font-bold w-[104px] mr-4">希望勤務地</p>
              <div class="flex flex-wrap flex-1">
                <div v-for="(item, index) in userData.cities" :key="index">
                  <p v-if="index < 5" class="tag">
                    {{ item }}
                  </p>
                  <p v-if="index === 6" class="ml-1 pt-3">...</p>
                </div>
              </div>
            </div>
            <div
              v-if="userData.department"
              class="flex items-center border-b-[1px] border-gray-third py-2"
            >
              <p class="font-bold min-w-[104px] mr-4">部署・役職</p>
              <p class="text-xs">{{ userData.department }}</p>
            </div>
            <div v-if="isApplicant" class="flex justify-end mt-4 pc:-mr-12">
              <el-button
                type="primary"
                class="!shadow-base pc:!h-10 mobile:!w-full"
                @click.stop="handleGoToMessageDetail"
              >
                <span class="mr-2">
                  <img src="~/assets/images/chat-white-small.svg" alt="" />
                </span>
                <span>メッセージ</span>
              </el-button>
            </div>
          </div>
        </div>
        <div v-if="isApplicant">
          <div
            v-if="isFavorite"
            class="absolute pc:top-6 top-4 pc:right-6 right-4 h-10 w-10 rounded-full bg-secondary flex justify-center items-center hover:cursor-pointer"
            @click.stop="handleUnFavoriteApplicant(userData.id)"
          >
            <img src="~/assets/images/icon-saved-blue.svg" alt="" />
          </div>
          <div
            v-else
            class="absolute pc:top-6 top-4 pc:right-6 right-4 h-10 w-10 rounded-full bg-gray-secondary flex justify-center items-center hover:cursor-pointer"
            @click.stop="handleFavoriteApplicant(userData.id)"
          >
            <img src="~/assets/images/icon-save-gray.svg" alt="" />
          </div>
        </div>
        <div v-else>
          <div
            v-if="isFavorite"
            class="absolute pc:top-6 top-4 pc:right-6 right-4 h-10 w-10 rounded-full bg-secondary flex justify-center items-center hover:cursor-pointer"
            @click.stop="
              handleUnFavorite(isCreator ? userData.creatorId : userData.id)
            "
          >
            <img src="~/assets/images/icon-saved-blue.svg" alt="" />
          </div>
          <div
            v-else
            class="absolute pc:top-6 top-4 pc:right-6 right-4 h-10 w-10 rounded-full bg-gray-secondary flex justify-center items-center hover:cursor-pointer"
            @click.stop="
              handleFavorite(isCreator ? userData.creatorId : userData.id)
            "
          >
            <img src="~/assets/images/icon-save-gray.svg" alt="" />
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { IUserData } from '~~/utils/interface';
import { useFavoriteStore } from '~/stores/useFavoriteStore';
import { EMessageType } from '~~/utils/enum';

const props = defineProps({
  userData: {
    type: Object as PropType<IUserData>,
    default: () => {
      return {
        id: '',
        creatorId: '',
        oldCompanyName: '',
        prefecture: '',
        age: 0,
        school: '',
        majors: '',
        languageCertificate: '',
        languageCertificateLevel: '',
        employermentForms: '',
        cities: [],
        department: '',
        resignationDate: '',
        applicantEntry: {
          id: 0,
          motivation: '',
          selfPr: '',
          otherData: '',
          settingQuestions: [
            {
              title: '',
              content: '',
            },
          ],
          applicantId: 0,
          isDraft: false,
          message: {
            box: {
              id: 0,
              boxType: '',
              lastMessageId: 0,
            },
          },
        },
      };
    },
  },
  type: {
    type: String as PropType<'applicant' | 'default' | 'interesting'>,
    default: () => 'default',
  },
  isFavorite: {
    type: Boolean,
    default: () => false,
  },
  isCreator: {
    type: Boolean,
    default: () => false,
  },
});

const favoriteStore = useFavoriteStore();

const emits = defineEmits(['event-click', 'event-delete']);

const type = ref<string>(props.type);
const isFavorite = ref<boolean>(props.isFavorite);
watchEffect(() => {
  isFavorite.value = props.isFavorite;
});
const isApplicant = computed(() => {
  return type.value === 'applicant';
});

const isInteresting = computed(() => {
  return type.value === 'interesting';
});

const handleClick = () => {
  emits('event-click', props.userData.id);
};

const handleFavorite = async (id: number) => {
  const { data, error } = await favoriteStore.addFavoriteEmployer(id);

  if (!error.value) {
    isFavorite.value = true;
  } else {
    openNotification(error.value.data.errorMessage);
  }
};

const handleUnFavorite = async (id: number) => {
  const { data, error } = await favoriteStore.deleteFavoriteEmployer(id);
  if (!error.value) {
    isFavorite.value = false;
    emits('event-delete');
  } else {
    openNotification(error.value.data.errorMessage);
  }
};

const handleFavoriteApplicant = async (id: number) => {
  const { error } = await favoriteStore.addFavoriteApplicant(id);

  if (!error.value) {
    isFavorite.value = true;
  } else {
    openNotification(error.value.data.errorMessage);
  }
};

const handleUnFavoriteApplicant = async (id: number) => {
  const { error } = await favoriteStore.deleteFavoriteApplicant(id);
  if (!error.value) {
    isFavorite.value = false;
    emits('event-delete');
  } else {
    openNotification(error.value.data.errorMessage);
  }
};
const handleGoToMessageDetail = () => {
  if (props.userData.applicantEntry.message.box.boxType === EMessageType.ENTRY)
    routerPush(
      `/employer/message/${props.userData.applicantEntry.message.box.lastMessageId}/entry?box=${props.userData.applicantEntry.message.box.id}`,
    );
  if (
    props.userData.applicantEntry.message.box.boxType === EMessageType.INTERVIEW
  )
    routerPush(
      `/employer/message/${props.userData.applicantEntry.message.box.lastMessageId}/interview?box=${props.userData.applicantEntry.message.box.id}`,
    );
};
</script>

<style lang="scss" scoped>
.tag {
  @apply border-primary text-primary text-center border-[1px] rounded py-1 px-2 my-1 mr-1 whitespace-nowrap;
}
</style>
