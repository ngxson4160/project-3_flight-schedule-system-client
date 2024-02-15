<template>
  <div>
    <el-card>
      <div class="relative">
        <div
          class="absolute top-4 left-4 right-4 flex justify-between items-start"
          @click.stop
        >
          <div
            v-if="haveBtnSaved"
            class="h-10 w-10 rounded-full flex justify-center items-center bg-black/[.8] hover:cursor-pointer"
            @click="dialogAlert = !dialogAlert"
          >
            <img
              v-if="saved"
              src="~/assets/images/icon-saved-blue.svg"
              alt=""
            />
            <img v-else src="~/assets/images/icon-save-white.svg" alt="" />
          </div>
          <UnregisteredAlert
            v-model:dialog-visible="dialogAlert"
            @update-status="updateStatusAlert"
            @event-cancel="dialogAlert = false"
            @click.stop
          />
        </div>
        <img
          v-if="createdBlog.imgUrl"
          :src="createdBlog.imgUrl"
          class="w-full pc:h-[130px] mobile:h-[200px] object-cover"
        />
        <img
          v-else
          src="~/assets/images/img-card-blog.jpeg"
          class="w-full object-cover"
        />
      </div>

      <div class="p-4">
        <div>
          <p
            class="font-bold truncate-texts break-words"
            :class="{ 'text-sm': !props.isRemoveImageContent }"
          >
            {{ createdBlog.title }}
          </p>
        </div>
        <div class="flex gap-2 mt-2">
          <div
            v-for="(tag, index) in createdBlog.tags"
            :key="tag.label"
            :class="{
              'flex-shrink-0': index === 2,
            }"
          >
            <div
              v-if="index <= 2"
              class="bg-white px-2 py-1 rounded border-[1px] border-primary"
            >
              <p
                class="text-primary text-xs overflow-hidden text-ellipsis line-clamp-1"
                style="line-break: anywhere"
              >
                {{ index < 2 ? tag.name : '...' }}
              </p>
            </div>
          </div>
        </div>

        <div class="py-2">
          <div
            class="text-xs truncate-texts line-clamp-3 max-w-[400px] break-words ck-content ck-content-overview overflow-hidden"
            :class="{
              'p-tag-inline': checkSafari,
              '!text-xs': !props.isRemoveImageContent,
            }"
            v-html="
              isRemoveImageContent
                ? sanitizedContent
                : getContent(createdBlog.content)
            "
          ></div>
        </div>

        <div class="flex">
          <div
            v-if="haveAvatar"
            class="rounded-full w-10 h-10 flex justify-center items-center border-[1px] border-gray-third mr-2 bg-cover bg-center"
            :style="{
              'background-image': `url(${
                props.employerAvatar ?? defaultImage
              })`,
            }"
          ></div>
          <div>
            <p v-if="haveAvatar" class="text-xs pb-1">
              {{ props.employerGovernment }}
            </p>
            <p class="text-gray text-xs">
              {{
                createdBlog.updatedTime
                  ? createdBlog.updatedTime
                  : createdBlog.createdTime
              }}
            </p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import defaultImage from '~/assets/images/avatar-fire-24.png';

const props = defineProps({
  createdBlog: {
    type: Object,
    default: () => ({
      imgUrl: '',
      tags: [],
      title: '',
      content: '',
      createdTime: '',
      updateTime: '',
    }),
  },
  haveBtnSaved: {
    type: Boolean,
    default: () => false,
  },
  haveAvatar: {
    type: Boolean,
    default: () => false,
  },
  employerAvatar: {
    type: String,
    default: () => '',
  },
  employerGovernment: {
    type: String,
    default: () => '',
  },
  isRemoveImageContent: {
    type: Boolean,
    default: () => false,
  },
});

const checkSafari = computed(() => {
  if (process.client) {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }
  return false;
});

const saved = ref(false);
const haveBtnSaved = ref(props.haveAvatar);
const haveAvatar = ref(props.haveAvatar);
const dialogAlert = ref<boolean>(false);
const updateStatusAlert = (val: boolean) => {
  dialogAlert.value = val;
};

const getContent = (data: string) => {
  if (checkSafari.value) return data.replaceAll('</p>', '</p><br>');
  return data;
};

const sanitizedContent = computed(() => {
  const dummyElement = document.createElement('div');
  dummyElement.innerHTML = props.createdBlog.content;

  const images = dummyElement.getElementsByTagName('img');
  for (let i = images.length - 1; i >= 0; i--) {
    const image = images[i];
    image.parentNode && image.parentNode.removeChild(image);
  }

  return dummyElement.innerHTML;
});
</script>
<style lang="scss">
.truncate-texts {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  img {
    display: none;
  }
}
.p-tag-inline p {
  display: inline !important;
}
</style>
