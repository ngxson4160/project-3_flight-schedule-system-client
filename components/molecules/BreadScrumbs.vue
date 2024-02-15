<template>
  <div>
    <template v-for="(item, i) in breadcrumbs" :key="i">
      <a
        v-if="item.link"
        class="breadscrumb-item"
        @click="routerPush(item.link)"
      >
        {{ item.text }}
      </a>
      <span v-else class="text-sm">{{ item.text }}</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

type BreadScrumb = {
  link?: string;
  text: string;
};

const props = defineProps({
  data: {
    type: Array as PropType<BreadScrumb[]>,
    required: true,
  },
});

const breadcrumbs = ref<BreadScrumb[]>(props.data);

watch(
  () => props.data,
  () => {
    breadcrumbs.value = props.data;
  },
);
</script>

<style scoped lang="scss">
.breadscrumb-item {
  @apply text-primary underline cursor-pointer text-sm relative mr-6;

  &:after {
    @apply w-6 h-6 absolute top-0;
    background-size: cover;
    content: '';
    background-image: url('~/assets/images/icon-keyboard-arrow-right-black.svg');
  }
}
</style>
