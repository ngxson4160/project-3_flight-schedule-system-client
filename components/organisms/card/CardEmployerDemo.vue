<template>
  <el-card
    class="box-card"
    :class="props.class"
    :body-style="{ padding: '0px' }"
  >
    <div class="overflow-hidden">
      <div>
        <img
          :src="data.image.length ? data.image : defaultImage"
          alt=""
          class="h-[232px] w-full object-cover"
        />
      </div>

      <div class="pc:mx-10 pc:my-6 mobile:py-4 mobile:px-6">
        <span
          v-if="data.jobCategory"
          class="text-sm tag-job-category whitespace-pre-line break-words overflow-hidden"
        >
          {{ data.jobCategory }}
        </span>
        <p class="pt-2 font-bold text-xl leading-normal">
          {{ data.title }}
        </p>
        <!-- FOR TAGS -->
        <div class="flex mt-4 gap-2 flex-wrap">
          <span v-if="data.employmentStatus" class="tag">
            {{ data.employmentStatus }}
          </span>
          <span v-for="tag in data.tags" :key="tag" class="tag active">
            {{ tag }}
          </span>
        </div>
        <div class="text-sm mt-2 text-gray">
          <h1>
            【掲載期間】
            {{
              data.start_date !== '--' ? dateTimeFormat(data.start_date) : ''
            }}〜{{
              data.end_date !== '--' ? dateTimeFormat(data.end_date) : ''
            }}
          </h1>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import defaultImage from '~/assets/images/default-employer-card-image.webp';

const props = defineProps({
  jobData: {
    type: Object,
    default: () => {},
  },
  class: {
    type: String,
    default: () => '',
  },
});

const data = reactive(props.jobData);
</script>

<style lang="scss" scoped>
.text-overflow {
  -webkit-line-clamp: 3;
  @apply h-[60px];
}
</style>
