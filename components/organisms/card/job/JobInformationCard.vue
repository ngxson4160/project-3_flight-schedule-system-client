<template>
  <div
    class="mobile:hidden flex items-center border-b pb-4 border-color-border pc:w-[760px] justify-between"
  >
    <div class="w-[424px]">
      <div>
        <p class="text-sm font-bold">{{ data.title || ' ー' }}</p>
      </div>
      <div class="flex items-center gap-4 mt-2">
        <p
          v-if="data.jobCategory?.name"
          class="tag-job text-xs font-bold truncate"
        >
          {{ data.jobCategory?.name }}
        </p>

        <div
          v-if="data.isPublic && data.typeJob === textTab.currently"
          class="flex items-center flex-shrink-0"
        >
          <img src="~/assets/images/icon-polka-dots.svg" class="w-2 h-2" />
          <p class="text-primary text-xs font-normal ml-1">
            {{ data.typeJob }}
          </p>
        </div>

        <p
          v-if="statusCurrent !== 'drafts'"
          class="text-gray text-xs font-normal flex-shrink-0"
        >
          掲載期間：{{
            data.hiringStartDate ? dateTimeFormat(data.hiringStartDate) : ''
          }}
          〜{{ data.hiringEndDate ? dateTimeFormat(data.hiringEndDate) : '' }}
        </p>
        <p
          v-if="data.isDraft"
          class="text-gray text-xs font-normal flex-shrink-0"
        >
          {{ dateTimeFormat(data.updatedTime) }}
        </p>
      </div>
    </div>
    <div class="flex items-center justify-between shrink-0 pc:gap-8 gap-6">
      <div v-if="!data.isDraft" class="flex items-center flex-1 justify-center">
        <img src="~/assets/images/count-view.svg" class="" />
        <p class="text-sm font-normal">{{ data.viewingQuantity }}</p>
      </div>
      <div v-if="!data.isDraft" class="flex items-center flex-1 justify-center">
        <img src="~/assets/images/icon-user-white.svg" class="" />
        <p class="text-sm font-normal">{{ data.countEntry }}</p>
      </div>
      <div v-if="!data.isDraft" class="flex items-center flex-1 justify-center">
        <img src="~/assets/images/count-favorite.svg" class="" />
        <p class="text-sm font-normal">{{ data.countFavorite }}</p>
      </div>
      <div v-if="!data.isDraft" class="flex items-center flex-1 justify-center">
        <img src="~/assets/images/count-share.svg" class="" />
        <p class="text-sm font-normal">{{ data.share }}</p>
      </div>
      <div class="grid justify-items-end">
        <el-dropdown
          trigger="click"
          class="mobile:!hidden"
          @command="execCommand"
          @click.stop
        >
          <div @click.stop>
            <img
              src="~/assets/images/icon-black-dots-menu.svg"
              alt=""
              class="outline-none"
            />
          </div>
          <template #dropdown>
            <div class="py-2">
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(option, i) in optionsMenuJob"
                  :key="i"
                  :command="option.command"
                  :divided="i > 0"
                >
                  <span v-if="option.command === 'delete'" class="text-red-500">
                    {{ option.text }}
                  </span>
                  <template v-else>{{ option.text }}</template>
                </el-dropdown-item>
              </el-dropdown-menu>
            </div>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
  <div
    class="pc:hidden flex border-b pb-4 border-color-border pc:w-[342px] justify-between"
  >
    <div>
      <div>
        <p class="text-sm font-bold">{{ data.title }}</p>
      </div>
      <div class="flex mt-1">
        <p class="tag-job text-xs font-bold">
          {{ data.jobCategory?.name || ' ー' }}
        </p>
        <div
          v-if="data.isPublic && data.typeJob === textTab.currently"
          class="flex items-center ml-4"
        >
          <img src="~/assets/images/icon-polka-dots.svg" class="w-2 h-2" />
          <p class="text-primary text-xs font-normal ml-1">
            {{ data.typeJob }}
          </p>
        </div>
      </div>
      <div v-if="statusCurrent !== 'drafts'" class="mt-1">
        <p class="text-gray text-xs font-normal">
          掲載期間：{{
            data.hiringStartDate ? dateTimeFormat(data.hiringStartDate) : ''
          }}
          〜{{ data.hiringEndDate ? dateTimeFormat(data.hiringEndDate) : '' }}
        </p>
      </div>
      <p
        v-if="data.isDraft"
        class="text-gray text-xs font-normal mt-[6px] flex-shrink-0"
      >
        {{ dateTimeFormat(data.updatedTime) }}
      </p>
      <div v-if="statusCurrent !== 'drafts'" class="flex mt-2">
        <div class="flex items-center">
          <img src="~/assets/images/count-view.svg" class="" />
          <p class="text-sm font-normal">{{ data.viewingQuantity }}</p>
        </div>
        <div class="flex pc:ml-8 ml-6 items-center">
          <img src="~/assets/images/icon-user-white.svg" class="" />
          <p class="text-sm font-normal">{{ data.countEntry }}</p>
        </div>
        <div class="flex pc:ml-8 ml-6 items-center">
          <img src="~/assets/images/count-favorite.svg" class="" />
          <p class="text-sm font-normal">{{ data.countFavorite }}</p>
        </div>
        <div class="flex pc:ml-8 ml-6 items-center">
          <img src="~/assets/images/count-share.svg" class="" />
          <p class="text-sm font-normal">{{ data.share }}</p>
        </div>
      </div>
    </div>
    <div>
      <div>
        <el-dropdown
          class="new-menu-popover"
          trigger="click"
          @command="execCommand"
          @click.stop
        >
          <div @click.stop>
            <img
              src="~/assets/images/icon-black-dots-menu.svg"
              alt=""
              class="outline-none"
            />
          </div>
          <template #dropdown>
            <div class="py-2">
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(option, i) in optionsMenuJob"
                  :key="i"
                  :command="option.command"
                  :divided="i > 0"
                >
                  <span v-if="option.command === 'delete'" class="text-red-500">
                    {{ option.text }}
                  </span>
                  <template v-else>{{ option.text }}</template>
                </el-dropdown-item>
              </el-dropdown-menu>
            </div>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
enum textTab {
  all = 'すべて',
  currently = '掲載中',
  scheduled = '掲載予定',
  postingEnd = '掲載終了',
}
const props = defineProps({
  jobData: {
    type: Object,
    default: () => ({
      id: Number,
    }),
  },
  typePostJob: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: 'public',
  },
});

const visibleMenu = ref<boolean>(false);

const data = ref(props.jobData);

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
const typePostJob = ref<string>(props.typePostJob);
const statusCurrent = ref<string>(props.status);

watch(
  () => props.status,
  (newVal) => {
    statusCurrent.value = newVal;
  },
);
watch(
  () => props.typePostJob,
  (newVal) => {
    typePostJob.value = newVal;
  },
);
const optionsMenuJob = computed(() => {
  if (statusCurrent.value === 'public') {
    if (typePostJob.value === textTab.postingEnd)
      return [
        { text: '求人を編集', command: 'edit' },
        { text: '求人ページのリンクをコピー', command: 'copy' },
        { text: '掲載を再開する', command: 'extend' },
        { text: '求人を終了する', command: 'private' },
        { text: '削除する', command: 'delete' },
      ];
    return [
      { text: '求人を編集', command: 'edit' },
      { text: '求人ページのリンクをコピー', command: 'copy' },
      { text: '掲載を終了する', command: 'done' },
      { text: '求人を終了する', command: 'private' },
      { text: '削除する', command: 'delete' },
    ];
  }

  if (statusCurrent.value === 'drafts')
    return [
      { text: '下書きから求人を作成', command: 'clone' },
      { text: '削除する', command: 'delete' },
    ];

  return [
    { text: '求人を編集する', command: 'edit' },
    { text: '求人を再開する', command: 'extend' },
    { text: '削除する', command: 'delete' },
  ];
});

const emit = defineEmits([
  'delete',
  'edit',
  'private',
  'click',
  'done',
  'copy',
  'clone',
  'extend',
]);

const execCommand = (cmd: string) => {
  switch (cmd) {
    case 'delete':
      return emit('delete');
    case 'edit':
      return emit('edit');
    case 'private':
      return emit('private');
    case 'done':
      return emit('done');
    case 'copy':
      return emit('copy');
    case 'clone':
      return emit('clone');
    case 'extend':
      return emit('extend');
  }
};
</script>
<style lang="scss" scoped>
.tag-job {
  @apply border px-2 py-1 rounded font-bold text-xs border-color-border;
}
</style>
