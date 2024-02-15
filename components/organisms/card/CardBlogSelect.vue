<template>
  <div>
    <el-card class="blog-select-box box-card !rounded-none">
      <div>
        <el-checkbox
          :label="data.id"
          class="w-full relative h-auto"
          :disabled="props.isDisabled"
        >
          <h3
            v-if="data.title"
            class="text-sm leading-4 font-bold tracking-wider break-words"
            style="white-space: break-spaces; line-break: anywhere"
          >
            {{ data.title }}
          </h3>
          <p v-else class="text-sm font-bold">ー</p>

          <div class="flex mt-2 gap-2 flex-wrap">
            <span v-for="tag in data.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </el-checkbox>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  dataBlog: {
    type: Object,
    default: () => {},
  },
  isDisabled: {
    type: Boolean,
    default: () => false,
  },
});

const data = reactive(props.dataBlog);
</script>

<style lang="scss">
.blog-select-box {
  @apply shadow-none overflow-auto #{!important};
  .el-checkbox {
    @apply flex-row-reverse items-center gap-4 w-full #{!important};
    .el-checkbox__label {
      @apply p-0 flex-grow #{!important};
    }
    .el-checkbox__input {
      .el-checkbox__inner {
        @apply border-gray #{!important};
      }
    }
  }
}
</style>
