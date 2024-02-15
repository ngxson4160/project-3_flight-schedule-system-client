<template>
  <div>
    <div class="news-item pc:gap-8 gap-4 mobile:!items-start">
      <div class="cursor-pointer flex-1" @click="emit('detail')">
        <h3 class="font-bold text-sm line-clamp-2 overflow-hidden">
          {{ data.title ? data.title : 'ー' }}
        </h3>
        <div class="mt-2 flex items-center flex-wrap gap-2">
          <span class="tag-type-news">
            {{ typeNewsText[data.typeNews] }}
          </span>
          <span
            v-for="session in sessionSchedule"
            :key="session"
            class="rounded text-xs px-2 py-1 border border-solid border-color-border"
          >
            {{ session.replace(/ - /g, '') }}
          </span>
          <span class="text-xs text-gray">
            {{
              data.updatedTime
                ? formatDate(data.updatedTime, 'YYYY/MM/DD')
                : formatDate(data.createdTime, 'YYYY/MM/DD')
            }}
          </span>

          <p
            v-if="checkIsNew(data.createdTime) && isNew"
            class="text-sm text-danger font-bold"
          >
            NEW
          </p>
        </div>
        <div
          v-if="role === 'ADMIN'"
          class="flex justify-start mt-2 gap-x-4 pc:hidden"
        >
          <div v-if="!data.isDraft" class="flex items-center justify-end">
            <img src="~/assets/images/count-view.svg" class="mr-1" />
            <p class="text-sm font-normal">{{ data.view }}</p>
          </div>
          <div v-if="!data.isDraft" class="flex items-center">
            <img src="~/assets/images/count-favorite.svg" class="mr-1" />
            <p class="text-sm font-normal">{{ data.countFavorite }}</p>
          </div>
          <div v-if="!data.isDraft" class="flex items-center">
            <img src="~/assets/images/count-share.svg" class="mr-1" />
            <p class="text-sm font-normal">{{ data.share }}</p>
          </div>
        </div>
      </div>
      <div class="flex justify-between">
        <div
          v-if="role === 'ADMIN'"
          class="flex w-[180px] mr-8 gap-x-8 mobile:hidden"
        >
          <div
            v-if="!data.isDraft"
            class="flex items-center flex-1 justify-center"
          >
            <img src="~/assets/images/count-view.svg" class="mr-1" />
            <p class="text-sm font-normal">{{ data.view }}</p>
          </div>
          <div
            v-if="!data.isDraft"
            class="flex items-center flex-1 justify-center"
          >
            <img src="~/assets/images/count-favorite.svg" class="mr-1" />
            <p class="text-sm font-normal">{{ data.countFavorite }}</p>
          </div>
          <div
            v-if="!data.isDraft"
            class="flex items-center flex-1 justify-center"
          >
            <img src="~/assets/images/count-share.svg" class="mr-1" />
            <p class="text-sm font-normal">{{ data.share }}</p>
          </div>
        </div>
        <el-dropdown
          v-if="!isNotCreator"
          trigger="click"
          @command="execCommand"
        >
          <img
            class="h-6 w-6 rotate-90 outline-none"
            src="@/assets/images/icon-selectree-49.6.svg"
          />

          <template #dropdown>
            <el-dropdown-menu>
              <div
                v-for="(option, index) in menuOptions"
                :key="index"
                class="w-[232px] py-[11px] border-gray-third px-2"
                :class="{ 'border-t-[1px]': index > 0 }"
              >
                <el-dropdown-item :command="option.value">
                  <span :class="{ 'text-red-500': option.value === 'delete' }">
                    {{ option.label }}
                  </span>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNewsStore } from '~~/stores/useNewsStore';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },

  isNotCreator: {
    type: Boolean,
    default: false,
  },
  isNew: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    required: false,
  },
});

const customSortDate = (a: string, b: string) => {
  const dateA = new Date(a.split(' - ')[0]);
  const dateB = new Date(b.split(' - ')[0]);
  return Number(dateA) - Number(dateB);
};

const store = useNewsStore();

const emit = defineEmits(['delete', 'edit', 'private', 'detail', 'publish']);

const sessionSchedule = computed(() => {
  const data =
    props.data &&
    props.data?.sessionSchedule.filter((session: string) => {
      return session;
    });
  return data.sort(customSortDate);
});

const menuOptions = computed(() => {
  if (store.status === 'drafts')
    return [
      { value: 'edit', label: '下書きからお知らせ作成' },
      { value: 'delete', label: '削除する' },
    ];

  if (store.status === 'private')
    return [
      { value: 'edit', label: 'お知らせを編集' },
      { value: 'publish', label: 'お知らせを公開する' },
      { value: 'delete', label: '削除する' },
    ];

  return [
    { value: 'edit', label: 'お知らせを編集' },
    { value: 'private', label: '非公開にする' },
    { value: 'delete', label: '削除する' },
  ];
});

const execCommand = (cmd: string) => {
  switch (cmd) {
    case 'delete':
      emit('delete');
      break;
    case 'edit':
      emit('edit');
      break;
    case 'private':
      emit('private');
      break;
    case 'publish':
      emit('publish');
      break;
  }
};
</script>

<style scoped lang="scss">
.news-item {
  @apply mb-4 mobile:mb-6 pb-4 flex items-center justify-between;
  border-bottom: 1px solid var(--el-border-color);
}
</style>
