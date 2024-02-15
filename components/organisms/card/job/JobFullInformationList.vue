<template>
  <div
    :class="`h-full border-b border-solid border-color-border pb-8 cursor-pointer ${coverClass}`"
    @click="emit('click-detail')"
  >
    <div class="h-full flex flex-col gap-4">
      <div
        class="px-2 py-1 border border-gray-third rounded max-w-[200px] w-max"
      >
        <span class="text-xs font-bold text-overflow line-clamp-1">
          {{ jobData.jobCategory.name }}
        </span>
      </div>
      <p
        :class="`font-bold text-overflow line-clamp-3 ${
          size === sizeCard.small ? 'text-[20px]' : 'text-lg mobile:text-base'
        }`"
      >
        {{ jobData.title }}
      </p>

      <!-- <div
        class="flex items-center gap-2"
        :class="{ 'flex-wrap': props.showAllAppealPoints }"
      >
        <span class="tag flex-shrink-0 truncate">
          {{ jobData.employmentStatus }}
        </span>
        <div
          v-for="(tag, index) in props.showAllAppealPoints
            ? jobData.appealPoint
            : jobData.appealPoint.splice(0, 3)"
          :key="tag"
          class="tag active"
          :class="{
            'flex-shrink-0 truncate': index === 0,
            'line-clamp-1 text-overflow': index !== 0,
          }"
        >
          <span
            class=""
            :class="{ 'hidden ': index > 1 && !props.showAllAppealPoints }"
          >
            {{ tag }}
          </span>
          <span v-if="index === 2 && !props.showAllAppealPoints">...</span>
        </div>

        <p
          v-if="checkIsNew(jobData.createdTime)"
          class="text-sm text-danger font-bold"
        >
          NEW
        </p>
      </div> -->
      <div ref="elementParentTagList" class="flex gap-2 flex-wrap mb-auto">
        <span ref="elementStatusTag" class="tag">
          {{ jobData.employmentStatus }}
        </span>
        <span
          v-for="tag in jobData.appealPoint"
          :key="tag"
          :ref="(el) => itemRefs.push(el)"
          class="tag active"
        >
          {{ tag }}
        </span>
        <span v-if="isShowEllipsis" class="tag active">...</span>
        <span
          v-if="checkIsNew(jobData.createdTime)"
          class="flex items-center text-sm text-danger font-bold"
        >
          NEW
        </span>
      </div>

      <div
        v-if="showDuty"
        :class="`text-black text-sm tracking-wider text-overflow whitespace-pre-line overflow-hidden ${
          size === sizeCard.small ? 'line-clamp-2' : 'line-clamp-3'
        }`"
      >
        【職務内容】{{ jobData.duty }}
      </div>

      <div class="flex items-center gap-4">
        <Favorite
          :is-class="'!w-8 !h-8'"
          :is-favorite="isFavorite"
          :size="props.size === sizeCard.small ? sizeCard.small : ''"
          @un-login="handleRequestLogin"
          @favorite="handleFavorite"
          @un-favorite="handleUnFavorite"
        />

        <div class="flex items-center gap-1">
          <img
            :src="jobData ? jobData.creator.avatarURL : defaultLogo"
            alt=""
            class="stroke-1 stroke-color-border h-8 w-8 rounded-full border border-solid border-color-border"
          />

          <p class="text-black text-xs">
            {{ jobData.creator.governmentOffice.name }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <UnregisteredAlert
    v-model:dialog-visible="dialogAlert"
    @event-cancel="dialogAlert = false"
  />
</template>

<script setup lang="ts">
import defaultLogo from '~/assets/images/default-logo-employer.svg';
import { useFavoriteStore } from '~/stores/useFavoriteStore';

const emit = defineEmits(['click-detail']);

enum sizeCard {
  default = 'default',
  medium = 'medium',
  small = 'small',
}
const props = defineProps({
  jobData: {
    type: Object,
    default: () => {},
  },
  showDuty: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'default',
  },
  coverClass: {
    type: String,
    default: '',
  },
  showAllAppealPoints: {
    type: Boolean,
    default: false,
  },
});

const elementParentTagList = ref();
const elementStatusTag = ref();
const itemRefs = ref<any>([]);
const isShowEllipsis = ref(false);

onMounted(() => {
  const line = window.screen.width <= 481 ? 2 : 1;
  const widthParent = elementParentTagList.value.clientWidth + 1;
  let widthChild = elementStatusTag.value.clientWidth + 1;

  itemRefs.value.forEach((item: any, index: number) => {
    if (
      widthChild < widthParent &&
      widthChild + item.clientWidth + 9 > widthParent
    ) {
      widthChild = widthParent + item.clientWidth + 9;
    } else {
      widthChild += item.clientWidth + 9;
    }

    if (widthChild > widthParent * line) {
      item.style.display = 'none';
      isShowEllipsis.value = true;
    }

    if (
      widthParent * line - widthChild - 8 < 64 &&
      index !== itemRefs.value.length
    ) {
      item.style.display = 'none';
      isShowEllipsis.value = true;
    }
  });
});

const favoriteStore = useFavoriteStore();
const size = ref<string>(props.size);

const jobData = props.jobData;
const dialogAlert = ref(false);
const isFavorite = ref<boolean>(isJobFavorite(Number(props.jobData?.id)));

const handleUnFavorite = async () => {
  const data = await favoriteStore.deleteFavoriteJob(props.jobData?.id);
  if (!data.error.value) {
    isFavorite.value = false;
  }
};

const handleFavorite = async () => {
  const data = await favoriteStore.addFavoriteJob(props.jobData?.id);
  if (!data.error.value) {
    isFavorite.value = true;
  }
};

const handleRequestLogin = () => {
  dialogAlert.value = true;
};
</script>
