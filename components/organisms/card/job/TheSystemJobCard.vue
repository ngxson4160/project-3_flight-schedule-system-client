<template>
  <ClientOnly>
    <div>
      <el-card
        class="box-card system-job-card"
        :body-style="{ padding: '0px' }"
      >
        <div class="p-6 relative">
          <div class="relative pr-14">
            <h3
              class="heading leading-7 text-lg font-bold tracking-wider mobile:text-base text-overflow"
            >
              {{ data.title }}
            </h3>

            <div class="absolute -top-1 right-0">
              <div class="rounded-full w-10 h-10 overflow-hidden">
                <button
                  ref="buttonShowOption"
                  type="button"
                  @click.prevent
                  @click="visibleMenu = !visibleMenu"
                >
                  <img src="~/assets/images/more.svg" alt="" />
                </button>
                <div
                  class="absolute z-10 right-0 min-w-[232px] bg-white rounded-lg shadow-base transition-all duration-300 ease-in-out"
                  :class="[
                    visibleMenu
                      ? 'top-12 opacity-100 visible'
                      : 'top-10 opacity-0 invisible',
                  ]"
                >
                  <ul @click.prevent>
                    <li
                      v-if="props.type !== typeCard.drafts"
                      class="border-b border-color-border"
                    >
                      <NuxtLink
                        class="block text-sm py-4 px-8 text-black"
                        :to="`/employer/job/${jobData.id}/edit`"
                      >
                        求人を編集
                      </NuxtLink>
                    </li>
                    <li
                      v-if="props.type !== typeCard.drafts"
                      class="border-b border-color-border"
                    >
                      <div
                        class="block text-sm py-4 px-8 text-black"
                        @click="handleUpdateStatusPrivate(jobData.id)"
                      >
                        {{
                          props.type === typeCard.private
                            ? '公開中にする'
                            : '非公開にする'
                        }}
                      </div>
                    </li>
                    <li
                      v-if="props.type === typeCard.drafts"
                      class="border-b border-color-border"
                    >
                      <NuxtLink
                        class="block text-sm py-4 px-8 text-black"
                        :to="`/employer/job/${jobData.id}/edit`"
                      >
                        下書きから求人作成
                      </NuxtLink>
                    </li>
                    <li>
                      <div
                        class="block text-sm py-4 px-8 text-danger cursor-pointer"
                        @click="handleDialogDelete(data.id, data.title)"
                      >
                        削除する
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="flex mt-2 gap-2 flex-wrap">
            <span v-if="data.employmentStatus" class="tag">
              {{ data.jobCategory }}
            </span>
            <span v-if="data.employmentStatus" class="tag">
              {{ data.employmentStatus }}
            </span>
          </div>

          <div class="text-sm mt-2 leading-6 text-gray">
            <span v-if="props.type !== typeCard.drafts">【掲載期間】</span>
            <span v-if="props.type !== typeCard.drafts">
              {{ dateTimeFormat(data.start_date) }} 〜{{
                dateTimeFormat(data.end_date)
              }}
            </span>
            <span v-else>{{ dateTimeFormat(data.start_date) }}</span>
          </div>

          <div
            v-if="props.type !== typeCard.drafts"
            class="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs"
          >
            <div
              v-if="data.numberOfApplicants >= 0"
              class="flex gap-1 items-center leading-5"
            >
              <img src="~/assets/images/user-mini-black.svg" alt="" />
              <span>応募者数：{{ data.numberOfApplicants }}</span>
            </div>
            <div
              v-if="data.favorites >= 0"
              class="flex gap-1 items-center leading-5"
            >
              <img src="~/assets/images/bookmark-mini-black.svg" alt="" />
              <span>お気に入り数： {{ data.favorites }}</span>
            </div>
            <div
              v-if="data.views >= 0"
              class="flex gap-1 items-center leading-5"
            >
              <img src="~/assets/images/eyes-mini-black.svg" alt="" />
              <span>閲覧数： {{ data.views }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { useEmployerStore } from '~~/stores/employer';

const props = defineProps({
  jobData: {
    type: Object,
    default: () => ({
      id: Number,
    }),
  },
  type: {
    type: String,
    default: () => 'public',
  },
  dialogVisible: {
    type: Boolean,
    default: () => false,
  },
  jobId: {
    type: Number,
    default: () => 0,
  },
});

const emits = defineEmits([
  'update:dialogVisible',
  'update:jobId',
  'updateStatus',
  'updateTitle',
]);

const dialogVisible = computed({
  get: () => props.dialogVisible,
  set: (val: boolean) => {
    emits('update:dialogVisible', val);
  },
});
const jobId = ref(props.jobId);

const visibleMenu = ref<boolean>(false);

const data = ref(props.jobData);
const typeCard = ref({
  public: 'public',
  private: 'private',
  drafts: 'drafts',
});

const handleDialogDelete = (id: number, title: string) => {
  visibleMenu.value = false;
  dialogVisible.value = true;
  jobId.value = id;
  emits('update:jobId', jobId.value);
  emits('updateTitle', title);
};

const handleUpdateStatusPrivate = (id: number) => {
  emits('updateStatus', id);
};

watch(
  () => props.jobData,
  (newVal) => {
    data.value = newVal;
  },
);

const buttonShowOption = ref(null);
onClickOutside(buttonShowOption, (event) => {
  if (visibleMenu.value) visibleMenu.value = false;
});
</script>

<style lang="scss">
.system-job-card {
  @apply overflow-visible #{!important};
  .heading {
    -webkit-line-clamp: 2;
  }
}
</style>
