<template>
  <div>
    <section class="flex items-center">
      <span
        class="text-primary text-sm cursor-pointer underline underline-offset-2"
        @click="router.push('/')"
      >
        ホーム
      </span>
      <img
        src="~/assets/images/icon-keyboard-arrow-right.svg"
        alt=""
        class="mx-3 inline"
      />
      <p class="text-sm">{{ screenName }}</p>
    </section>

    <div class="flex flex-col gap-2 pc:mt-16 mobile:mt-10">
      <h1
        class="h-[52px] font-bold text-2xl border-b-[3px] border-solid border-gray-third"
      >
        {{ screenName }}
      </h1>

      <p
        v-if="pageName === EPageName.EMPLOYER_LIST"
        class="mt-2 text-sm mobile:hidden"
      >
        官公庁や自治体が運営する採用情報ページです。お気に入り登録すれば新着通知を受け取ることができます。
      </p>

      <section class="flex gap-4 mobile:flex-col mt-10">
        <el-select
          v-model="formSearch.city"
          clearable
          placeholder="都道府県"
          @change="handleSelectCity(formSearch.city)"
        >
          <el-option
            v-for="item in OPTION_PREFECTURE"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-input
          v-model="formSearch.name"
          placeholder="キーワードで検索"
          :prefix-icon="Search"
        />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';
import { Search } from '@element-plus/icons-vue';
import { EPageName } from '~~/utils/enum';
import { useEmployerList } from '~/stores/employerList';

type Props = {
  screenName: String;
  pageName: EPageName;
};
type Emits = {
  (event: 'selected-city', city: string): void;
  (event: 'selected-name', name: string): void;
};

defineProps<Props>();
const emit = defineEmits<Emits>();

const router = useRouter();
const { query } = useRoute();
const { city: _city, name: _name, page: _page } = query;
const city = Array.isArray(_city) ? _city[0] : _city;
const name = Array.isArray(_name) ? _name[0] : _name;

const formSearch = ref({
  city: city ?? '',
  name: name ?? '',
});

const employerListStore = useEmployerList();
await employerListStore.getGovermentNames();

const OPTION_PREFECTURE = computed(() => {
  if (
    employerListStore.govermentNames &&
    employerListStore.govermentNames.length
  ) {
    return employerListStore.govermentNames.map((_i) => {
      return _i.name;
    });
  }
});

const handleSelectCity = (city: string) => {
  emit('selected-city', city);
  const query = {
    city: city || undefined,
    name: formSearch.value.name ? formSearch.value.name : undefined,
  };
  router.push({ query });
};

watchDebounced(
  () => formSearch.value.name,
  (newVal) => {
    emit('selected-name', newVal);
    const query = {
      city: formSearch.value.city ? formSearch.value.city : undefined,
      name: newVal || undefined,
    };
    router.push({ query });
  },
  { debounce: 500, maxWait: 1000 },
);
</script>
