<template>
  <div v-if="blog.isPin" class="flex">
    <img src="@/assets/images/icon-pin.svg" alt="pin" />
    <span class="text-xs text-primary mb-1 ml-1">固定されたブログ</span>
  </div>

  <div
    class="pc:h-[74px] flex border-color-border border-b pb-4 mb-4 w-full justify-between cursor-pointer mobile:flex-col"
    @click="emit('click')"
  >
    <div class="flex pc:w-[492px]">
      <div
        v-if="blog.imgUrl"
        class="w-[96px] h-[54px] mobile:w-20 mobile:h-[45px] !bg-cover rounded-lg mr-4 flex-shrink-0 relative"
        :style="{ backgroundImage: `url(${blog.imgUrl})` }"
      >
        <div
          v-if="blog.typeBlog === 2"
          class="absolute right-1 bottom-1 pc:w-6 w-5 pc:h-6 h-5 rounded-full flex justify-center items-center show-icon-video"
        >
          <img
            class="pc:w-3 w-[10px] pc:h-3 h-[10px]"
            src="~/assets/images/icon-new-video.svg"
          />
        </div>
      </div>

      <div
        class="flex flex-col items-start mobile:mr-1 mobile:flex-1 mobile:pr-0"
      >
        <p
          class="!text-left font-bold text-sm mb-2 text-overflow pc:line-clamp-1 mobile:line-clamp-2 whitespace-pre-line break-all"
        >
          {{ blog.title ? blog.title : 'ー' }}
        </p>
        <div class="flex items-center">
          <div v-for="(tag, i) in blogTags" :key="i" class="mobile:hidden">
            <div
              class="bg-white px-2 py-1 rounded border-[1px] border-primary max-w-[95px]"
              :class="{ 'mr-2': !i }"
            >
              <p
                class="text-primary text-xs overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {{ tag }}
              </p>
            </div>
          </div>
          <div
            v-if="statusText"
            class="text-primary text-xs flex items-center mx-4 mobile:ml-0"
          >
            <svg
              width="8"
              height="9"
              viewBox="0 0 8 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="4" cy="4.5" r="4" fill="#0871E1" />
            </svg>
            <span class="ml-1">{{ statusText }}</span>
          </div>
          <span class="text-gray text-xs">
            {{
              blog.updatedTime
                ? formatDate(blog.updatedTime, 'YYYY/MM/DD')
                : formatDate(blog.createdTime, 'YYYY/MM/DD')
            }}
          </span>
        </div>
      </div>
      <el-dropdown
        class="new-menu-popover pc:!hidden"
        @command="execCommand"
        @click.stop
      >
        <div @click.stop>
          <img src="~/assets/images/icon-black-dots-menu.svg" alt="" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(option, i) in options"
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
        </template>
      </el-dropdown>
    </div>
    <div
      class="flex w-[268px] min-w-[268px] mobile:mt-2 pc:ml-8 justify-between"
    >
      <div class="flex pc:w-[180px]">
        <span
          class="text-sm flex items-center mobile:mr-6 6 flex-1 justify-center"
        >
          <img
            src="~/assets/images/count-view.svg"
            class="mr-1 !block"
            alt=""
          />
          {{ blog.view }}
        </span>
        <span
          class="text-sm flex items-center mobile:mr-6 flex-1 justify-center"
        >
          <img
            src="~/assets/images/count-favorite.svg"
            class="mr-1 !block"
            alt=""
          />
          {{ blog.countFavorite }}
        </span>
        <span
          class="text-sm flex items-center mobile:mr-6 6 flex-1 justify-center"
        >
          <img
            src="~/assets/images/count-share.svg"
            class="mr-1 !block"
            alt=""
          />
          {{ blog.share }}
        </span>
      </div>

      <el-dropdown
        class="new-menu-popover mobile:!hidden"
        placement="bottom-end"
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
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(option, i) in options"
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
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatDate } from '~/utils/helper';

const props = defineProps({
  blog: {
    type: Object,
    required: true,
  },
});

const blogTags = computed(() => {
  // eslint-disable-next-line vue/no-mutating-props
  return props.blog.tags.splice(0, 2) ?? [];
});

const options = computed(() => {
  if (props.blog.isDraft) {
    return [
      {
        text:
          props.blog.typeBlog === ETypeBlog.UPLOAD_IMAGE
            ? '下書きからブログ作成'
            : '下書きから動画を作成',
        command: 'edit',
      },
      { text: '削除する', command: 'delete' },
    ];
  }

  if (!props.blog.isPublic) {
    return [
      {
        text:
          props.blog.typeBlog === ETypeBlog.UPLOAD_IMAGE
            ? 'ブログを編集'
            : '動画を編集',
        command: 'edit',
      },
      {
        text:
          props.blog.typeBlog === ETypeBlog.UPLOAD_IMAGE
            ? 'ブログを公開する'
            : '動画を公開する',
        command: 'publish',
      },
      { text: '削除する', command: 'delete' },
    ];
  }

  if (props.blog.typeBlog === ETypeBlog.UPLOAD_VIDEO) {
    return [
      { text: '動画を編集', command: 'edit' },
      { text: '動画ページのリンクをコピー', command: 'copy' },
      { text: '非公開にする', command: 'private' },
      { text: '削除する', command: 'delete' },
    ];
  }

  const listAction = [
    { text: 'ブログを編集', command: 'edit' },
    { text: 'ブログページのリンクをコピー', command: 'copy' },
    { text: '非公開にする', command: 'private' },
    { text: '削除する', command: 'delete' },
  ];

  listAction.splice(
    3,
    0,
    !props.blog.isPin
      ? { text: 'ブログを固定する', command: 'pin' }
      : { text: 'ブログの固定を外す', command: 'unpin' },
  );

  return listAction;
});

const statusText = computed(() => {
  if (props.blog.isPublic && !props.blog.isDraft) {
    return '公開中';
  } else if (!props.blog.isPublic && !props.blog.isDraft) {
    return '非公開';
  }
  return '';
});

const emit = defineEmits([
  'delete',
  'edit',
  'private',
  'click',
  'pin',
  'copy',
  'unpin',
  'publish',
]);

const execCommand = (cmd: string) => {
  switch (cmd) {
    case 'delete':
      return emit('delete');
    case 'edit':
      return emit('edit');
    case 'private':
      return emit('private');
    case 'pin':
      return emit('pin');
    case 'unpin':
      return emit('unpin');
    case 'copy':
      return emit('copy');
    case 'publish':
      return emit('publish');
    default:
  }
};
</script>
