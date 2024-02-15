<template>
  <ClientOnly>
    <el-dialog
      v-model="centerDialogVisible"
      :show-close="isButtonSearch ? false : true"
      :title="props.title"
      :width="props.width"
      :align-center="props.alignCenter"
      :class="props.class"
      class="el-custom-dialog pc:!rounded-xl mobile:!rounded-b-0 !mt-16 overflow-hidden mobile:!rounded-t-xl"
    >
      <template #header>
        <div
          :class="`${
            isButtonSearch ? 'pc:px-14 mobile:px-6' : 'px-6'
          } pc:py-10 py-4 mobile:border-b mobile:border-color-border mobile:rounded-t-xl`"
        >
          <div
            :class="{
              'flex pc:justify-between justify-center items-center relative mobile:h-6':
                isButtonSearch,
            }"
          >
            <img
              v-if="isButtonSearch"
              src="~/assets/images/icon-close-black.svg"
              class="pc:hidden absolute left-0 top-0"
              @click="centerDialogVisible = false"
            />
            <p
              class="text-center font-bold pc:text-[22px] pc:leading-[170%] text-sm"
            >
              {{ props.title }}
            </p>

            <el-button
              v-if="isButtonSearch"
              type="primary"
              class="w-[151px] mobile:!hidden"
              @click="emits('open-form-search')"
            >
              <div class="flex gap-1 items-center">
                <img src="~/assets/images/icon-search-job.svg" alt="" />
                <p class="text-sm">絞り込み検索</p>
              </div>
            </el-button>
            <p
              v-if="isButtonSearch"
              class="pc:hidden text-sm text-primary underline underline-offset-2 absolute right-0 top-0"
              @click="emits('open-form-search')"
            >
              絞り込み検索
            </p>
          </div>
        </div>
      </template>
      <div
        class="px-14 mobile:px-6 pb-10 mobile:pt-2"
        :class="{
          'dialog-body-custom custom-scroll-bar pc:pl-14 pc:mr-12 pr-2 mobile:!px-6':
            isButtonSearch,
        }"
      >
        <slot name="content"></slot>
      </div>
      <div
        v-if="isButtonSearch"
        class="flex justify-center items-center pt-4 pb-10 mobile:hidden"
      >
        <p
          class="text-primary font-bold underline underline-offset-2 cursor-pointer"
          @click="centerDialogVisible = false"
        >
          キャンセル
        </p>
      </div>
      <template #footer>
        <div>
          <slot name="footer"></slot>
        </div>
      </template>
    </el-dialog>
  </ClientOnly>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: () => '',
  },
  width: {
    type: String,
    default: () => '760px',
  },
  class: {
    type: String,
    default: () => '',
  },
  alignCenter: {
    type: Boolean,
    default: () => true,
  },
  visibleDialog: {
    type: Boolean,
    default: () => false,
  },
  isButtonSearch: {
    type: Boolean,
    default: () => false,
  },
});

const emits = defineEmits(['update:visibleDialog', 'open-form-search']);

const centerDialogVisible = computed({
  get: () => props.visibleDialog,
  set: (val: boolean) => {
    emits('update:visibleDialog', val);
  },
});
</script>

<style lang="scss">
.el-custom-dialog {
  .dialog-body-custom {
    @apply pc:max-h-[657px] overflow-y-auto;
    @media screen and (max-width: 480px) {
      height: calc(100vh - 120px);
    }
  }
  .el-dialog__header {
    @apply mobile:rounded-t-xl;
  }
  .el-dialog__header,
  .el-dialog__body,
  .el-dialog__footer {
    @apply p-0 m-0 #{!important};
  }

  .el-dialog__headerbtn {
    @apply absolute top-4 right-6 w-6 h-6  #{!important};
    @media screen and (min-width: 480px) {
      @apply fixed top-6 right-6 text-white #{!important};
    }
    .el-dialog__close {
      @apply text-black font-bold text-lg #{!important};
      @media screen and (min-width: 480px) {
        @apply text-white #{!important};
      }
    }
  }
}
</style>
