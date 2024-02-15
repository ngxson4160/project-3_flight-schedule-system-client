<template>
  <div :class="`top-0 left-0 right-0 bg-white z-50 ${notFixed ? '' : 'fixed'}`">
    <div
      class="border-b border-gray-third h-16 w-full shadow-md bg-opacity-10 bg-white pc:px-16"
    >
      <div class="flex h-16 w-full justify-between items-center mobile:p-6">
        <div>
          <div class="cursor-pointer" @click="handleReturn">
            <img src="@/assets/images/icon-back-49.6.svg" alt="" />
          </div>
        </div>
        <h1 class="text-base font-bold tracking-wider pc:ml-20">
          {{ props.title }}
        </h1>
        <button
          class="pc:bg-primary pc:px-6 pc:py-2 pc:text-white mobile:text-primary font-bold rounded-lg"
          @click="handleSave"
        >
          {{ props.titleButton }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits([
  'clickEvent',
  'returnEvent',
  'continueEvent',
  'createPublicJob',
  'createPrivateJob',
  'handleSave',
]);

const props = defineProps({
  title: {
    type: String,
    default: () => '',
  },
  isReview: {
    type: Boolean,
    default: () => false,
  },
  notFixed: {
    type: Boolean,
    default: () => false,
  },
  titleButton: {
    type: String,
    default: () => '保存',
  },
});

onMounted(() => {
  window.addEventListener('click', () => {
    document.querySelector('.dropdown-items')?.classList.remove('open-menu');
  });
});

const handleClick = () => {
  emits('clickEvent');
};

const handleReturn = () => {
  emits('returnEvent');
};

const handleSave = () => {
  emits('handleSave');
};

const handleRedirectEntry = () => {
  emits('continueEvent');
};

const handleSavePublicJob = () => {
  emits('createPublicJob');
};

const handleSavePrivateJob = () => {
  emits('createPrivateJob');
};
</script>

<style lang="scss">
.sub-header-dropdown {
  .dropdown-items {
    &.open-menu {
      @apply top-full opacity-100 visible transition-all duration-300 #{!important};
    }
  }
}
</style>
