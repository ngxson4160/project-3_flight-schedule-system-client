<template>
  <div
    class="pc:w-[1024px] w-full mobile:mx-6 rounded-xl shadow-[0px_0px_20px_rgba(0,0,0,0.1)] bg-white pc:h-[128px] h-[161px] pc:p-6 p-4"
  >
    <div class="search-bar-jobs flex gap-6 items-center mobile:hidden">
      <div class="border-b border-gray-third flex-grow">
        <p class="text-[14px] font-bold">職種</p>
        <el-select v-model="jobs" placeholder=" " class="w-full">
          <div class="hidden">
            <el-option
              v-for="option in sampleOptions"
              :key="option.id"
              :label="option.name"
              :value="option.id"
            ></el-option>
          </div>
          <div class="px-4 py-2 w-[342px]">
            <el-checkbox-group
              v-model="checkListJob"
              class="options-jobcategory checkbox-group-custom"
            >
              <el-collapse
                v-for="(item, index) in props.jobOptions"
                :key="index"
                class="mb-4 rounded-lg !border-0"
                accordion
              >
                <el-collapse-item>
                  <template #title>
                    <p class="text-[14px] font-bold text-black">
                      {{ item.name }}
                    </p>
                  </template>
                  <div class="pl-4">
                    <el-checkbox
                      :label="{
                        label: `${item.name}すべて`,
                        value: item.jobCategories,
                      }"
                    >
                      <span>{{ item.name }}すべて</span>
                    </el-checkbox>
                    <el-checkbox
                      v-for="option in item.jobCategories"
                      :key="option.id"
                      :label="option.id"
                    >
                      <span>{{ option.name }}</span>
                    </el-checkbox>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-checkbox-group>
          </div>
        </el-select>
      </div>

      <div class="border-b border-gray-third flex-grow">
        <p class="text-[14px] font-bold">勤務地</p>

        <el-select v-model="prefectures" placeholder=" " class="w-full">
          <div class="hidden">
            <el-option
              v-for="option in sampleOptions"
              :key="option.id"
              :label="option.name"
              :value="option.id"
            ></el-option>
          </div>
          <div class="px-4 py-2">
            <el-checkbox-group
              v-model="checkListPrefecture"
              class="checkbox-group-custom options-appeal-points"
              @change="changeCheckListPrefecture"
            >
              <el-checkbox
                v-for="option in props.prefectureOptions"
                :key="option.id"
                :label="option.id"
              >
                <span>{{ option.name }}</span>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-select>
      </div>

      <div class="border-b border-gray-third flex-grow">
        <p class="text-[14px] font-bold">特徴</p>

        <el-select v-model="appealPoints" placeholder=" " class="w-full">
          <div class="hidden">
            <el-option
              v-for="option in sampleOptions"
              :key="option.id"
              :label="option.name"
              :value="option.id"
            ></el-option>
          </div>
          <div class="px-4 py-2">
            <el-checkbox-group
              v-model="checkListAppealPoint"
              class="checkbox-group-custom options-appeal-points"
              @change="changeCheckListAppealPoint"
            >
              <el-checkbox
                v-for="option in props.appealPointOptions"
                :key="option"
                :label="option"
              ></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-select>
      </div>

      <div class="flex-shrink">
        <el-button type="primary" class="w-[104px]" @click="handleSearch">
          検索
        </el-button>
      </div>
    </div>
    <div class="pc:hidden">
      <p class="font-bold text-gray text-center">求人を探す</p>
      <div class="flex gap-1 items-center mt-2">
        <div
          class="flex-grow flex flex-col items-center p-4 gap-1 rounded-lg bg-gray-secondary"
          @click="drawerSearchJob = true"
        >
          <div
            class="h-[40px] w-[40px] rounded-full flex items-center justify-center bg-white"
          >
            <img src="~/assets/images/icon-bag-blue-24.svg" />
          </div>
          <p class="text-[14px] font-bold">職種</p>
        </div>
        <div
          class="flex-grow flex flex-col items-center p-4 gap-1 rounded-lg bg-gray-secondary"
          @click="drawerSearchJob = true"
        >
          <div
            class="h-[40px] w-[40px] rounded-full flex items-center justify-center bg-white"
          >
            <img src="~/assets/images/icon-map-blue-24.svg" />
          </div>
          <p class="text-[14px] font-bold">勤務地</p>
        </div>
        <div
          class="flex-grow flex flex-col items-center p-4 gap-1 rounded-lg bg-gray-secondary"
          @click="drawerSearchJob = true"
        >
          <div
            class="h-[40px] w-[40px] rounded-full flex items-center justify-center bg-white"
          >
            <img src="~/assets/images/icon-star-blue-24.svg" />
          </div>
          <p class="text-[14px] font-bold">特徴</p>
        </div>
      </div>
      <client-only>
        <el-drawer
          v-model="drawerSearchJob"
          :with-header="false"
          direction="ttb"
          size="100%"
        >
          <div
            class="w-full h-[66px] bg-white flex justify-between items-center px-6 border-b-[1px] border-gray-third sticky top-0"
          >
            <img
              src="~/assets/images/icon-close-black.svg"
              alt=""
              @click="drawerSearchJob = false"
            />
            <p
              class="text-primary underline text-sm hover:cursor-pointer"
              @click="resetAllValue"
            >
              リセット
            </p>
          </div>
          <div class="pt-2 px-6 pb-[88px]">
            <div class="py-8 border-b border-gray-third">
              <p class="text-[14px] font-bold">職種</p>
              <div class="mt-2">
                <div
                  v-for="(item, index) in checkListJob"
                  :key="index"
                  class="py-1 px-2 bg-secondary rounded inline-block mr-2 my-1"
                  :class="{ 'hidden ': !getNameJobById(item) }"
                >
                  <p
                    class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
                  >
                    {{ getNameJobById(item) }}
                  </p>
                  <img
                    src="~/assets/images/icon-close-black-16.svg"
                    class="inline mb-[2px] ml-[2px]"
                    @click="removeItemInCheckListJob(item)"
                  />
                </div>
                <div class="inline-block">
                  <div class="flex gap-1 items-center">
                    <p class="text-[14px] font-bold text-gray">追加</p>
                    <el-dropdown trigger="click">
                      <img src="~/assets/images/icon-plus-bg-blue.svg" />
                      <template #dropdown>
                        <div class="px-4 py-2 w-[342px]">
                          <el-checkbox-group
                            v-model="checkListJob"
                            class="options-jobcategory checkbox-group-custom"
                          >
                            <el-collapse
                              v-for="(item, index) in props.jobOptions"
                              :key="index"
                              class="mb-4 rounded-lg !border-0"
                              accordion
                            >
                              <el-collapse-item>
                                <template #title>
                                  <p class="text-[14px] font-bold text-black">
                                    {{ item.name }}
                                  </p>
                                </template>
                                <div class="pl-4">
                                  <el-checkbox
                                    :label="{
                                      label: `${item.name}すべて`,
                                      value: item.jobCategories,
                                    }"
                                  >
                                    <span>{{ item.name }}すべて</span>
                                  </el-checkbox>
                                  <el-checkbox
                                    v-for="option in item.jobCategories"
                                    :key="option.id"
                                    :label="option.id"
                                  >
                                    <span>
                                      {{ option.name }}
                                    </span>
                                  </el-checkbox>
                                </div>
                              </el-collapse-item>
                            </el-collapse>
                          </el-checkbox-group>
                        </div>
                      </template>
                    </el-dropdown>
                  </div>
                </div>
              </div>
            </div>
            <div class="py-8 border-b border-gray-third">
              <p class="text-[14px] font-bold">勤務地</p>
              <div class="mt-2">
                <div
                  v-for="(item, index) in checkListPrefecture"
                  :key="index"
                  class="py-1 px-2 bg-secondary rounded inline-block mr-2 my-1"
                >
                  <p
                    class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
                  >
                    {{ getNamePrefeatureById(item) }}
                  </p>
                  <img
                    src="~/assets/images/icon-close-black-16.svg"
                    class="inline mb-[2px] ml-[2px]"
                    @click="removeItemInCheckListPrefecture(item)"
                  />
                </div>
                <div class="inline-block">
                  <div class="flex gap-1 items-center">
                    <p class="text-[14px] font-bold text-gray">追加</p>
                    <el-dropdown trigger="click">
                      <img src="~/assets/images/icon-plus-bg-blue.svg" />
                      <template #dropdown>
                        <div class="px-4 py-2 w-[342px]">
                          <el-checkbox-group
                            v-model="checkListPrefecture"
                            class="checkbox-group-custom options-appeal-points"
                            @change="changeCheckListPrefecture"
                          >
                            <el-checkbox
                              v-for="option in props.prefectureOptions"
                              :key="option.id"
                              :label="option.id"
                            >
                              <span>
                                {{ option.name }}
                              </span>
                            </el-checkbox>
                          </el-checkbox-group>
                        </div>
                      </template>
                    </el-dropdown>
                  </div>
                </div>
              </div>
            </div>
            <div class="py-8">
              <p class="text-[14px] font-bold">特徴</p>
              <div class="mt-2">
                <div
                  v-for="(item, index) in checkListAppealPoint"
                  :key="index"
                  class="py-1 px-2 bg-secondary rounded inline-block mr-2 my-1"
                >
                  <p
                    class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
                  >
                    {{ item }}
                  </p>
                  <img
                    src="~/assets/images/icon-close-black-16.svg"
                    class="inline mb-[2px] ml-[2px]"
                    @click="removeItemInCheckListAppealPoint(item)"
                  />
                </div>
                <div class="inline-block">
                  <div class="flex gap-1 items-center">
                    <p class="text-[14px] font-bold text-gray">追加</p>
                    <el-dropdown trigger="click">
                      <img src="~/assets/images/icon-plus-bg-blue.svg" />
                      <template #dropdown>
                        <div class="px-4 py-2 w-[342px]">
                          <el-checkbox-group
                            v-model="checkListAppealPoint"
                            class="checkbox-group-custom options-appeal-points"
                            @change="changeCheckListAppealPoint"
                          >
                            <el-checkbox
                              v-for="option in props.appealPointOptions"
                              :key="option"
                              :label="option"
                            ></el-checkbox>
                          </el-checkbox-group>
                        </div>
                      </template>
                    </el-dropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="fixed bottom-0 h-[88px] w-full bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.1)] flex items-center justify-center"
          >
            <el-button type="primary" class="w-[342px]" @click="handleSearch">
              検索
            </el-button>
          </div>
        </el-drawer>
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IJobCategories } from '~/utils/interface';

const props = defineProps({
  jobOptions: {
    type: Array as () => IJobCategories[],
    default: () => [],
  },
  prefectureOptions: {
    type: Array as () => { id: number; name: string }[],
    default: () => [],
  },
  appealPointOptions: {
    type: Array as () => String[],
    default: () => [],
  },
  role: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['handleSearch']);

const sampleOptions = ref([
  {
    id: 1,
    name: 'name',
  },
]);

type TOptionJobCategory = { label: string; value: { id: number }[] } | number;

const jobs = ref<string>('');
const checkListJob = ref<TOptionJobCategory[]>([]);
const allJob = ref<{ id: number; name: string }[]>([]);
props.jobOptions.forEach((e) => {
  e.jobCategories.forEach((el) => {
    allJob.value.push({ id: el.id, name: el.name });
  });
});
const getNameJobById = (param: TOptionJobCategory) => {
  if (typeof param === 'number')
    return allJob.value.find((e) => e.id === param)?.name;
};

watch(checkListJob, (newVal, oldVal) => {
  if (newVal.length > oldVal.length) {
    checkListJob.value.forEach((e: TOptionJobCategory) => {
      if (typeof e === 'object') {
        e.value.forEach((el: { id: number }) => {
          if (!checkListJob.value.includes(el.id))
            checkListJob.value.push(el.id);
        });
      }
    });
  } else if (newVal.length < oldVal.length) {
    checkListJob.value.forEach((e: TOptionJobCategory) => {
      if (typeof e === 'object') {
        const count = ref(0);
        e.value.forEach((el: { id: number }) => {
          if (checkListJob.value.includes(el.id)) count.value++;
        });
        if (e.value.length !== count.value) {
          const indexToRemove = checkListJob.value.findIndex(
            (item) => item === e,
          );
          if (indexToRemove !== -1) {
            checkListJob.value.splice(indexToRemove, 1);
          }
        }
      }
    });
  }
  const checkListJobName = checkListJob.value
    .filter((el) => typeof el !== 'object')
    .map((e) => {
      return getNameJobById(Number(e));
    });
  jobs.value = checkListJobName.join(', ');
});
// const changeCheckListJob = () => {
//   const checkListJobName = checkListJob.value.map((e) => {
//     return getNameJobById(e);
//   });
//   jobs.value = checkListJobName.join(', ');
// };

const prefectures = ref('');
const checkListPrefecture = ref<number[]>([]);
const getNamePrefeatureById = (id: number) => {
  return props.prefectureOptions.find((e) => e.id === id)?.name;
};
const changeCheckListPrefecture = () => {
  const checkListPrefectureName = checkListPrefecture.value.map((e) => {
    return getNamePrefeatureById(e);
  });
  prefectures.value = checkListPrefectureName.join(', ');
};

const appealPoints = ref<string>('');
const checkListAppealPoint = ref<string[]>([]);
const changeCheckListAppealPoint = () => {
  appealPoints.value = checkListAppealPoint.value.join(', ');
};

const drawerSearchJob = ref(false);
const removeItemInCheckListJob = (param: TOptionJobCategory) => {
  if (typeof param === 'number')
    checkListJob.value = checkListJob.value.filter((el) => el !== param);
};
const removeItemInCheckListPrefecture = (item: number) => {
  checkListPrefecture.value = checkListPrefecture.value.filter(
    (el) => el !== item,
  );
};
const removeItemInCheckListAppealPoint = (item: string) => {
  checkListAppealPoint.value = checkListAppealPoint.value.filter(
    (el) => el !== item,
  );
};
const resetAllValue = () => {
  checkListJob.value = [];
  checkListPrefecture.value = [];
  checkListAppealPoint.value = [];
};

const handleSearch = () => {
  const checkListJobFilter = checkListJob.value.filter(
    (e) => typeof e !== 'object',
  );
  const querySearch = {
    checkListJob: checkListJobFilter,
    checkListPrefecture: checkListPrefecture.value,
    checkListAppealPoint: checkListAppealPoint.value,
  };
  emit('handleSearch', querySearch);
  const router = useRouter();
  router.push({
    path: `${props.role ? '/' + props.role : ''}/search`,
    query: {
      page: 1,
      'jobCategories[]': checkListJobFilter,
      'appealPoint[]': checkListAppealPoint.value,
      'provinceIds[]': checkListPrefecture.value,
    },
  });
};
</script>

<style lang="scss">
.search-bar-jobs {
  .el-input__wrapper {
    box-shadow: none;
    @apply px-4;
  }
  .el-select {
    --el-select-border-color-hover: transition;
    --el-select-input-focus-border-color: transition;
  }
  .el-input__inner {
    text-overflow: ellipsis;
  }
  .el-select__icon {
    @apply mx-2;
  }
}

.checkbox-group-custom {
  .el-checkbox {
    @apply py-2 flex items-end;
    .el-checkbox__label {
      @apply pb-[2px] text-[14px];
    }
  }
}

.options-jobcategory {
  @apply mobile:max-h-[200px] mobile:overflow-y-scroll;
  .el-collapse-item__header {
    @apply h-[36px];
  }
  .el-collapse-item__arrow {
    @apply text-[20px];
  }
}

.options-appeal-points {
  @apply mobile:max-h-[200px] mobile:overflow-y-scroll;
  .el-checkbox {
    @apply py-3 flex items-end;
  }
}
.el-popper.is-pure.is-light.el-select__popper {
  @apply rounded-xl;
}

.el-collapse-item__header {
  .el-icon.el-collapse-item__arrow {
    @apply rotate-[90deg];
  }
}

.el-collapse-item__header.is-active {
  .el-icon.el-collapse-item__arrow {
    @apply -rotate-[90deg];
  }
}
.search-bar-jobs {
  .is-reverse {
    transform: rotateZ(0deg) !important;
  }
}
</style>
