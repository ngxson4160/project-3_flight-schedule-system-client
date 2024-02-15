<template>
  <div
    v-if="blog"
    :class="`pc:pb-6 mobile:py-6 border-b border-gray-third cursor-pointer pc:flex pc:flex-col pc:justify-between ${props.class}`"
    @click="emit('handleGoToDetail')"
  >
    <div
      class="flex gap-4 justify-between"
      :class="{ 'mobile:flex-col': prioritize }"
    >
      <div
        class="flex-grow"
        :class="{
          'mobile:order-2': prioritize,
        }"
      >
        <div>
          <p
            :class="`text-base font-bold text-overflow break-words whitespace-pre-line break-all leading-150
            ${
              sizeCard === 'medium'
                ? 'mobile:h-auto pc:line-clamp-2'
                : 'mobile:h-[76px] '
            } 
         ${sizeText} ${lineClamp} ${
              props.prioritize ? 'pc:!text-[24px] !text-[20px]' : ''
            }`"
          >
            {{ props.blog?.title }}
          </p>
          <div
            class="flex gap-2 items-center mt-4"
            :class="{ 'mobile:hidden': !props.prioritize }"
          >
            <div
              v-for="(tag, index) in props.blog.tags"
              :key="index"
              :class="{ hidden: index > 1 }"
            >
              <p
                class="border border-primary py-1 px-2 rounded text-primary tracking-[0.5px] text-xs text-center leading-[17px]"
                :class="{
                  'flex-shrink-0 truncate': index === 0,
                  'line-clamp-1 text-overflow whitespace-pre-line break-words ':
                    index !== 0,
                  'pc:max-w-[232px] max-w-[298px]':
                    index === 0 && props.blog.tags.length === 1,
                  'pc:max-w-[168px] max-w-[198px]':
                    index === 0 && props.blog.tags.length === 2,
                  'max-w-[154px]': index === 0 && props.blog.tags.length > 2,
                  'pc:!max-w-[484px] ':
                    index === 0 &&
                    props.blog.tags.length === 1 &&
                    props.prioritize,
                  'pc:max-w-[372px] ':
                    index === 0 &&
                    props.blog.tags.length === 2 &&
                    props.prioritize,
                  'pc:max-w-[324px]':
                    index === 0 &&
                    props.blog.tags.length > 2 &&
                    props.prioritize,
                }"
                style="line-break: anywhere"
              >
                {{ tag }}
              </p>
            </div>
            <p
              v-if="props.blog.tags.length > 2"
              class="border border-primary py-1 px-2 rounded text-primary tracking-[0.5px] text-xs flex-shrink-0"
            >
              ...
            </p>
            <p
              v-if="
                checkIsNew(
                  props.blog.updatedTime
                    ? props.blog.updatedTime
                    : props.blog.createdTime,
                )
              "
              class="text-danger font-bold text-[14px]"
            >
              NEW
            </p>
          </div>
          <div
            v-if="showContent && (prioritize || sizeCard === 'medium')"
            class="text-overflow overflow-hidden"
            :class="{
              'mobile:h-[60px] h-[90px] line-clamp-2 content_blog-fist-card-blog-2-line content_blog-fist-card-blog':
                !prioritize,
              'h-[81px] mt-6 line-clamp-3 content_blog-fist-card-blog-3-line content_blog-fist-card-blog-prioritize':
                prioritize,
            }"
            v-html="removeSpaceInPTag(props.blog?.content)"
          ></div>
          <div
            v-if="props.prioritize"
            class="flex justify-between items-center w-full mt-4"
          >
            <div class="flex gap-4 items-center">
              <img
                v-if="isFavorite"
                src="~/assets/images/book-mark-blue.svg"
                alt=""
                class="h-[32px] w-[32px] cursor-pointer"
                @click.stop="handUnfavoriteBlog(props.blog.id)"
              />
              <img
                v-else
                src="~/assets/images/book-mark-gray.svg"
                alt=""
                class="h-[32px] w-[32px] cursor-pointer"
                @click.stop="handleFavoriteBlog(props.blog.id)"
              />
              <div class="flex gap-1 items-center">
                <img
                  :src="props.blog.creator.avatarURL"
                  class="w-[32px] h-[32px] rounded-full object-cover border border-gray-third"
                />
                <p class="text-xs pc:max-w-[298px] max-w-[176px] truncate">
                  {{ props.blog.creator.governmentOffice.name }}
                </p>
              </div>
            </div>
            <p class="text-xs text-gray flex-shrink-0">
              {{
                formatDate(
                  props.blog.updatedTime
                    ? props.blog.updatedTime
                    : props.blog.createdTime,
                  'YYYY/MM/DD',
                )
              }}
            </p>
          </div>
        </div>
      </div>
      <div
        :class="`${
          props.prioritize
            ? 'pc:!w-[400px] w-full pc:!h-[225px] h-[192px] mobile:order-1'
            : 'pc:w-[160px] w-[116px] pc:h-[90px] h-[66px]'
        } flex-shrink-0 relative ${
          sizeCard === 'medium' ? 'pc:!w-[232px] pc:!h-[130px]' : ''
        }`"
      >
        <img
          class="w-full h-full"
          :class="`${
            props.prioritize ? 'rounded-xl' : 'rounded-lg'
          } object-cover `"
          :src="props.blog.imgUrl"
        />
        <div
          v-if="showNewIconVideo"
          class="absolute mobile:right-[6px] mobile:bottom-[6px] right-2 bottom-2 mobile:w-6 mobile:h-6 w-8 h-8 rounded-full flex justify-center items-center show-icon-video"
        >
          <img
            class="w-4 h-4 mobile:w-3 mobile:h-3"
            src="~/assets/images/icon-new-video.svg"
          />
        </div>
      </div>
    </div>
    <div class="flex">
      <div
        class="flex gap-2 items-center mt-4 pc:hidden"
        :class="{ 'mobile:hidden': props.prioritize }"
      >
        <div
          v-for="(tag, index) in props.blog.tags"
          :key="index"
          :class="{ hidden: index > 1 }"
        >
          <p
            class="border border-primary py-1 px-2 rounded text-primary tracking-[0.5px] text-xs text-center leading-[17px]"
            :class="{
              'flex-shrink-0 truncate': index === 0,
              'line-clamp-1 text-overflow whitespace-pre-line break-words':
                index !== 0,
              'pc:max-w-[232px] max-w-[298px]':
                index === 0 && props.blog.tags.length === 1,
              'pc:max-w-[168px] max-w-[198px]':
                index === 0 && props.blog.tags.length === 2,
              'max-w-[154px]': index === 0 && props.blog.tags.length > 2,
            }"
            style="line-break: anywhere"
          >
            {{ tag }}
          </p>
        </div>
        <p
          v-if="props.blog.tags.length > 2"
          class="border border-primary py-1 px-2 rounded text-primary tracking-[0.5px] text-xs flex-shrink-0"
        >
          ...
        </p>
        <p
          v-if="
            checkIsNew(
              props.blog.updatedTime
                ? props.blog.updatedTime
                : props.blog.createdTime,
            )
          "
          class="text-danger font-bold text-[14px]"
        >
          NEW
        </p>
      </div>
    </div>
    <div v-if="!props.prioritize" class="flex gap-x-4">
      <div
        class="flex justify-between items-center w-full"
        :class="{ 'mt-4': !prioritize, 'mobile:mt-4': props.prioritize }"
      >
        <div class="flex gap-4 items-center">
          <img
            v-if="isFavorite"
            src="~/assets/images/book-mark-blue.svg"
            alt=""
            class="h-[32px] w-[32px] cursor-pointer"
            @click.stop="handUnfavoriteBlog(props.blog.id)"
          />
          <img
            v-else
            src="~/assets/images/book-mark-gray.svg"
            alt=""
            class="h-[32px] w-[32px] cursor-pointer"
            @click.stop="handleFavoriteBlog(props.blog.id)"
          />
          <div class="flex gap-1 items-center">
            <img
              :src="props.blog.creator.avatarURL"
              class="w-[32px] h-[32px] rounded-full object-cover border border-gray-third"
            />
            <p class="text-xs pc:max-w-[298px] max-w-[176px] truncate">
              {{ props.blog.creator.governmentOffice.name }}
            </p>
          </div>
        </div>
        <p class="text-xs text-gray flex-shrink-0">
          {{
            formatDate(
              props.blog.updatedTime
                ? props.blog.updatedTime
                : props.blog.createdTime,
              'YYYY/MM/DD',
            )
          }}
        </p>
      </div>
      <div
        v-if="sizeCard === 'medium'"
        class="w-[400px] flex-shrink-0 mobile:hidden"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IBlogOverview } from '~/utils/interface';
import { useFavoriteStore } from '~/stores/useFavoriteStore';

const favoriteStore = useFavoriteStore();
const props = defineProps({
  blog: {
    type: Object as () => IBlogOverview,
    default: () => {},
  },
  class: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: 'guest',
  },
  showNewIconVideo: {
    type: Boolean,
    default: false,
  },
  prioritize: {
    type: Boolean,
    default: false,
  },
  sizeCard: {
    type: String,
    default: 'small',
  },
  sizeTitle: {
    type: String,
    default: 'small',
  },
  sizeText: {
    type: String,
    default: 'pc:text-lg',
  },
  lineClamp: {
    type: String,
    default: 'line-clamp-3',
  },
  showContent: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits([
  'handleFavorite',
  'handleGoToDetail',
  'unregister',
  'eventDelete',
]);
const cookieSessionAuth = useCookie('auth.session-token').value;
const isFavorite = ref<boolean>(isFavoriteBlog(props.blog.id));
const handUnfavoriteBlog = async (id: number) => {
  const data = await favoriteStore.deleteFavoriteBlog(id);
  if (!data.error.value) {
    isFavorite.value = false;
    emit('eventDelete');
  } else {
    emit('unregister');
  }
};

const handleFavoriteBlog = async (id: number) => {
  if (!cookieSessionAuth) {
    emit('unregister');
  } else {
    await favoriteStore.addFavoriteBlog(id);
    isFavorite.value = true;
  }
};
</script>
<style lang="scss" scoped></style>
<style lang="scss">
.content_blog-fist-card-blog-prioritize {
  @apply pc:h-[71px] h-[60px] pc:text-base font-normal leading-[170%] text-xs #{!important};
  p,
  h1,
  ul,
  li,
  strong {
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    @apply leading-[170%] mt-0 pc:text-base text-xs overflow-hidden truncate overflow-ellipsis break-all whitespace-pre-line break-words  #{!important};
  }
  img,
  video {
    display: none !important;
  }
  strong {
    @apply font-normal #{!important};
  }
}
.content_blog-fist-card-blog {
  @apply text-sm font-normal leading-[170%] #{!important};
  p,
  h1,
  ul,
  li,
  strong {
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    @apply leading-[170%] mt-0 text-sm overflow-hidden truncate overflow-ellipsis break-all whitespace-pre-line break-words  mobile:hidden #{!important};
  }
  img,
  video {
    display: none !important;
  }
  strong {
    @apply font-normal #{!important};
  }
}
.content_blog-fist-card-blog-2-line {
  p,
  h1,
  ul,
  li,
  strong {
    -webkit-line-clamp: 2 !important;
  }
  // p:first-child,
  // h1:first-child {
  //   -webkit-line-clamp: 2 !important;
  // }
  // p:not(:first-child),
  // h1:not(:first-child) {
  //   -webkit-line-clamp: 1 !important;
  // }
}

.content_blog-fist-card-blog-3-line {
  p,
  h1,
  ul,
  li,
  strong {
    -webkit-line-clamp: 3 !important;
  }
  // p:first-child,
  // h1:first-child {
  //   -webkit-line-clamp: 3 !important;
  // }
  // p:not(:first-child),
  // h1:not(:first-child) {
  //   -webkit-line-clamp: 2 !important;
  // }
}
.leading-150 {
  line-height: 150% !important;
}
</style>
