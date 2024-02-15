<template>
  <div
    class="pc:w-[288px] w-full bg-color-bg p-6 rounded-lg sidebar-search-job"
  >
    <div>
      <div class="flex items-center gap-2 border-b-2 border-gray-third pb-2">
        <img src="~/assets/images/icon-bag-black-24.svg" />
        <p class="text-[14px] font-bold text-[#858585]">職種から探す</p>
      </div>
      <div v-for="item in props.jobOptions" :key="item.id" class="mt-4">
        <el-collapse>
          <el-collapse-item>
            <template #title>
              <p class="text-[14px] font-bold pl-2">{{ item.name }}</p>
            </template>
            <div class="pl-6 pt-2 text-[14px]">
              <p
                class="cursor-pointer hover:text-primary"
                @click="handleSearch(item.jobCategories, 'jobs')"
              >
                {{ item.name }}すべて
              </p>
              <p
                v-for="job in item.jobCategories"
                :key="job.id"
                class="cursor-pointer hover:text-primary"
                @click="handleSearch(job.id, 'job')"
              >
                {{ job.name }}
              </p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="mt-[48px]">
      <div class="flex items-center gap-2 border-b-2 border-gray-third pb-2">
        <img src="~/assets/images/icon-user-black-24.svg" />
        <p class="text-[14px] font-bold text-[#858585]">勤務形態から探す</p>
      </div>
      <div class="mt-2">
        <p
          v-for="(item, index) in props.employmentForms"
          :key="index"
          class="text-[14px] mt-2 cursor-pointer hover:text-primary"
          @click="handleSearch(item, 'employmentForm')"
        >
          {{ item }}
        </p>
      </div>
    </div>
    <div class="mt-[48px]">
      <div class="flex items-center gap-2 border-b-2 border-gray-third pb-2">
        <img src="~/assets/images/icon-star-black-24.svg" />
        <p class="text-[14px] font-bold !text-[#858585]">特徴から探す</p>
      </div>
      <div class="mt-2">
        <p
          v-for="(item, index) in props.appealPointOptions"
          :key="index"
          class="text-[14px] mt-2 cursor-pointer hover:text-primary"
          @click="handleSearch(item, 'appealPoint')"
        >
          {{ item }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  jobOptions: {
    type: Array as () => IJobCategories[],
    default: () => [],
  },
  employmentForms: {
    type: Array as () => String[],
    default: () => [],
  },
  appealPointOptions: {
    type: Array as () => String[],
    default: () => [],
  },
  role: {
    type: String,
    default: '',
  },
});

const handleSearch = (querySearch: any, type: string) => {
  const router = useRouter();
  router.push({
    path: !props.role ? '/search' : `/${props.role}/search`,
    query: {
      'jobCategories[]':
        type === 'jobs'
          ? querySearch.map((e: any) => {
              return e.id;
            })
          : type === 'job'
          ? querySearch
          : undefined,
      'employmentStatuses[]':
        type === 'employmentForm' ? querySearch : undefined,
      'appealPoint[]': type === 'appealPoint' ? querySearch : undefined,
    },
  });
};
</script>

<style lang="scss">
.sidebar-search-job {
  .el-collapse {
    @apply border-0;
  }
  .el-collapse-item__header {
    @apply h-[24px] flex-row-reverse justify-end border-0 bg-color-bg;
  }
  .el-collapse-item__arrow {
    @apply m-0 text-gray text-base #{!important};
  }
  .el-collapse-item__wrap {
    @apply border-0;
  }
  .el-collapse-item__content {
    @apply bg-color-bg pb-0;
  }
  .el-collapse-item__header.is-active .el-icon.el-collapse-item__arrow {
    transform: rotateZ(90deg) !important;
  }
  .el-collapse-item__header .el-icon.el-collapse-item__arrow {
    --tw-rotate: 0deg !important;
  }
}
</style>
