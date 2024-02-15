<template>
  <div v-if="socialShared.url" class="inline-flex items-center">
    <SocialShared
      :id="socialShared.id"
      :url="socialShared.url"
      :title="socialShared.title"
      :type="socialShared.type"
    />

    <div v-if="!isOwner" class="items-center pc:ml-4 ml-3">
      <div v-if="isFavorite" class="flex items-center gap-2 mobile:gap-1">
        <img
          src="~/assets/images/blog-favorite-true.png"
          class="pc:w-10 w-8 cursor-pointer"
          @click="handleUnFavorite"
        />
        <span class="text-primary">{{ countFavorite }}</span>
      </div>
      <div v-else class="flex items-center gap-2 mobile:gap-1">
        <img
          src="~/assets/images/blog-favorite-false.png"
          class="pc:w-10 w-8 cursor-pointer"
          @click="handleFavorite"
        />
        <span class="text-gray">{{ countFavorite }}</span>
      </div>
    </div>
    <div v-else class="flex items-center gap-2 pc:ml-4 ml-3 mobile:gap-1">
      <div class="favorite-icon">
        <img
          src="~/assets/images/blog-favorite-false.png"
          class="pc:w-10 w-8"
        />
      </div>
      <span class="text-gray">{{ countFavorite }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  socialShared: {
    type: Object,
    required: true,
  },
  countFavoriteData: {
    type: Number,
    default: 0,
  },
  isOwner: {
    type: Boolean,
    default: false,
  },
  isPreview: {
    type: Boolean,
    default: false,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
});

interface Emits {
  (event: 'un-favorite'): void;
  (event: 'favorite'): void;
  (event: 'update:countFavoriteData', val: number): number;
}

const emits = defineEmits<Emits>();

const countFavorite = computed({
  get: () => props.countFavoriteData,
  set: (val: number) => {
    return emits('update:countFavoriteData', val);
  },
});

const handleUnFavorite = () => {
  emits('un-favorite');
};
const handleFavorite = () => {
  emits('favorite');
};
</script>

<style scoped lang="scss"></style>
