<template>
  <div>
    <el-card class="job-select-box box-card" :body-style="{ padding: '0px' }">
      <div class="p-6 mobile:px-4">
        <el-checkbox class="w-full relative h-auto">
          <h3 class="leading-7 text-lg font-bold tracking-wider">
            {{ data.title }}
          </h3>

          <div class="flex mt-2 gap-2 flex-wrap">
            <span
              v-for="tag in data.tags"
              :key="tag.label"
              :class="['tag', { active: tag.isActive }]"
            >
              {{ tag.label }}
            </span>
          </div>
        </el-checkbox>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  jobData: {
    type: Object,
    default: () => {},
  },
});

const data = reactive(props.jobData);
</script>

<style lang="scss">
.job-select-box {
  .el-checkbox__input {
    @apply absolute top-3 right-0;
    .el-checkbox__inner {
      @apply w-6 h-6 rounded-full flex items-center justify-center;
      &:after {
        @apply w-1 h-3 left-[7px] top-[2px];
      }
    }
  }
  .el-checkbox__label {
    @apply p-0;
  }
}
</style>
