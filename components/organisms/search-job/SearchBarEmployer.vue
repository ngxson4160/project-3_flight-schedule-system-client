<!-- eslint-disable vue/valid-v-for -->
<template>
  <div class="pc:w-[1072px] pc:p-6 w-[342px] searchbar-employer">
    <div class="flex items-center pb-6">
      <img
        src="~/assets/images/image-search.webp"
        alt=""
        class="w-[60px] h-[60px]"
      />
      <p class="font-bold text-2xl pl-4">
        官公庁を
        <br class="pc:hidden" />
        ピンポイントで探す
      </p>
    </div>
    <el-card>
      <div
        class="pc:flex pc:items-center pc:justify-between pc:py-6 py-4 mobile:px-4 w-full"
      >
        <div
          class="pc:max-w-[872px] pc:min-w-[872px] pc:flex pc:justify-between"
        >
          <div class="pc:w-1/3 pc:pl-6 px-4">
            <p class="font-bold text-sm text-gray">官公庁の種類</p>
            <div class="border-b-[1px] border-gray-third relative">
              <el-select v-model="category" placeholder=" " style="width: 100%">
                <el-option
                  v-for="item in categories"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <img
                v-if="category"
                src="~/assets/images/icon-close-black.svg"
                class="absolute right-[16px] top-[16px] cursor-pointer"
                @click="category = undefined"
              />
              <img
                v-else
                src="~/assets/images/expand-more.svg"
                alt=""
                class="absolute right-[16px] top-[16px]"
              />
            </div>
          </div>
          <div class="pc:w-1/3 pc:pl-6 px-4 mobile:my-4">
            <p class="font-bold text-sm text-gray">都道府県</p>
            <div
              :class="`border-b-[1px] border-gray-third relative ${selectPrefeture}`"
            >
              <el-select
                v-model="prefecture"
                placeholder=" "
                style="width: 100%"
              >
                <el-option
                  v-for="item in prefectures"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <img
                v-if="prefecture"
                src="~/assets/images/icon-close-black.svg"
                class="absolute right-[16px] top-[16px] cursor-pointer"
                @click="prefecture = undefined"
              />
              <img
                v-else
                src="~/assets/images/expand-more.svg"
                alt=""
                class="absolute right-[16px] top-[16px]"
              />
            </div>
          </div>
          <div class="pc:w-1/3 pc:pl-6 px-4 mobile:mb-4">
            <p class="font-bold text-sm text-gray">官公庁名</p>
            <div
              :class="`border-b-[1px] border-gray-third relative ${selectName}`"
            >
              <el-select
                v-model="name"
                placeholder=" "
                style="width: 100%"
                class="pc:!max-w-[266px] !max-w-[310px]"
              >
                <el-option
                  v-for="item in names"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <img
                v-if="name"
                src="~/assets/images/icon-close-black.svg"
                class="absolute right-[16px] top-[16px] cursor-pointer"
                @click="name = undefined"
              />
              <img
                v-else
                src="~/assets/images/expand-more.svg"
                alt=""
                class="absolute right-[16px] top-[16px]"
              />
            </div>
          </div>
        </div>
        <div
          class="pc:max-w-[104px] pc:min-w-[104px] w-[310px] pc:mx-6 mx-auto flex-grow"
        >
          <el-button
            type="primary"
            :class="`w-full ${buttonSearch}`"
            @click="handleSearch"
          >
            検索
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useDataSearchJob } from '~~/stores/masterDataSearchJob';
import { IResponse } from '~~/utils/interface';

const category = ref<string>();
const prefecture = ref<string>();
const name = ref<string>();

const categories = ref<string[]>([]);
const prefectures = ref<string[]>([]);
const names = ref<string[]>([]);

// setup data options input from store

const { data, error } = await useBaseFetch('/government-offices/category', {});
if (error.value?.data) {
  throw error.value?.data;
} else {
  const response = data.value as IResponse;
  categories.value = response.data?.map((e: any) => {
    return e.category;
  });
}
const dataSearchJobStore = useDataSearchJob();
dataSearchJobStore.governmentOffices =
  await dataSearchJobStore.getGovernmentOfficesData();

const selectPrefeture = ref('pointer-events-none');
const selectName = ref('pointer-events-none');

watch(category, async (newValue) => {
  prefecture.value = undefined;
  name.value = undefined;
  selectPrefeture.value = '';
  if (newValue !== undefined) {
    const { data, error } = await useBaseFetch(
      '/government-offices/prefecture',
      {
        query: {
          category: newValue,
        },
      },
    );
    if (error.value?.data) {
      throw error.value?.data;
    } else {
      const response = data.value as IResponse;
      const prefecturesCurrent = ref<string[]>([]);
      prefecturesCurrent.value = response.data?.map((e: any) => {
        return e.prefecture;
      });
      prefectures.value = Array.from(new Set(prefecturesCurrent.value));
      if (prefectures.value.length > 0 && prefectures.value[0] !== '') {
        selectName.value = 'pointer-events-none';
        selectPrefeture.value = '';
      } else {
        selectPrefeture.value = 'pointer-events-none';
        selectName.value = '';
        name.value = undefined;
        const namesCurrent = ref<string[]>([]);
        const { data, error } = await useBaseFetch('/government-offices/name', {
          query: {
            category: newValue,
            prefecture: '',
          },
        });
        if (error.value?.data) {
          throw error.value?.data;
        } else {
          const response = data.value as IResponse;
          namesCurrent.value = response.data?.map((e: any) => {
            return e.name;
          });
          names.value = Array.from(new Set(namesCurrent.value));
        }
      }
    }
  }
});

watch(prefecture, async (newValue) => {
  name.value = undefined;
  if (newValue !== undefined) {
    selectName.value = '';
    const namesCurrent = ref<string[]>([]);
    const { data, error } = await useBaseFetch('/government-offices/name', {
      query: {
        category: category.value,
        prefecture: newValue,
      },
    });
    if (error.value?.data) {
      throw error.value?.data;
    } else {
      const response = data.value as IResponse;
      namesCurrent.value = response.data?.map((e: any) => {
        return e.name;
      });
      names.value = Array.from(new Set(namesCurrent.value));
    }
  }
});

const buttonSearch = ref<string>(
  '!bg-secondary !border-secondary pointer-events-none',
);
watch(name, (newValue) => {
  if (newValue !== undefined) buttonSearch.value = '';
  else
    buttonSearch.value = '!bg-secondary !border-secondary pointer-events-none';
});
// action search
const handleSearch = async () => {
  const { data, error } = await useBaseFetch('/government-offices/employer', {
    query: {
      prefecture: prefecture.value ? prefecture.value : '',
      category: category.value,
      name: name.value,
    },
  });
  if (error.value?.data) {
    throw error.value?.data;
  } else {
    const response = data.value as IResponse;
    const id = response.data?.id;
    if (id !== undefined) routerPush(`/employer/${id}`);
    else routerPush('/404');
  }
};
</script>

<style lang="scss">
.searchbar-employer {
  .el-input__wrapper {
    box-shadow: none;
    @apply justify-start;
  }
  .el-select {
    --el-select-border-color-hover: transition;
    --el-select-input-focus-border-color: transition;
  }
  .el-icon.el-select__caret.el-select__icon {
    @apply hidden;
  }
  .el-input__inner {
    @apply text-base font-bold max-w-[180px];
  }
}
</style>
