<template>
  <el-form-item class="job-categories" :prop="props.prop" :label="props.label">
    <div>
      <el-select-v2
        v-model="jobParent"
        :options="jobCategoriesParent"
        :placeholder="props.placeHolder"
        popper-class="job-categories-select"
        clearable
        @change="handleChangeJobCategory"
      />
    </div>
    <div class="text-xs w-full mt-4 text-black font-bold tracking-wider">
      以下から詳細な職種をお選びください。
    </div>
    <div class="mt-6 w-full">
      <el-checkbox-group v-model="jobCategorySelects">
        <div class="flex gap-x-7 gap-y-6 flex-wrap">
          <div v-for="job in jobCategoriesChild" :key="job.value">
            <el-checkbox :label="job.value" @change="handleChange($event, job)">
              {{ job.label }}
            </el-checkbox>
          </div>
        </div>
      </el-checkbox-group>
    </div>
    <!-- <div class="mb-2 mt-6 text-sm leading-4 text-black">
      &#8226; カンマで区切って入力してください
    </div> -->
    <div class="job w-full" :class="{ 'mt-6': jobCategoriesChild.length > 0 }">
      <div
        class="multi-tag-wrapper border border-color-cover px-4 py-2 rounded overflow-hidden"
      >
        <div class="flex flex-wrap gap-2">
          <el-tag
            v-for="tag in dynamicTags"
            :key="tag.value"
            closable
            @close="handleClose(tag)"
          >
            {{ tag.label }}
          </el-tag>

          <input
            v-model="inputValue"
            type="text"
            class="border-0 flex-1 h-10 w-full min-w-[100px] px-2 outline-none"
            placeholder="職種が入ります"
            @keyup.enter="handleInputConfirm"
          />
        </div>
      </div>
    </div>
  </el-form-item>
</template>

<script lang="ts" setup>
const { getJobCategories } = useCompositionMasterData();

type tagType = { value: number | string; label: string };

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  placeHolder: {
    type: String,
    default: '',
  },

  prop: {
    type: String,
    default: '',
  },

  jobCategorySelect: {
    type: Array<number>,
    default: () => [],
  },

  jobCategoryInput: {
    type: Array<string>,
    default: () => [],
  },
  dynamicTags: {
    type: Array<tagType>,
    default: () => [],
  },
});

const jobCategoriesParent = ref();
const jobCategoriesChild = ref();
const jobParent = ref<number>();
const jobCategorySelects = ref<number[]>([]);
const jobCategoryInputData = ref<string[]>([]);
const inputValue = ref();
const dynamicTagsRef = ref<tagType[]>(props.dynamicTags);

const emit = defineEmits([
  'update:jobCategorySelect',
  'update:jobCategoryInput',
  'update:dynamicTags',
]);

const { data } = await useBaseFetch('/job-categories', { method: 'GET' });

const jobCategories = data.value?.data || [];

jobCategoriesParent.value = getJobCategories(jobCategories) || [];

if (jobCategoriesParent.value.length) {
  // jobParent.value = jobCategoriesParent.value[0].value;
  // jobCategoriesChild.value = getJobCategories(jobCategories, jobParent.value);
  jobParent.value = undefined;
  jobCategoriesChild.value = [];
}

const handleChange = (event: any, job: tagType) => {
  if (event) {
    dynamicTagsRef.value.push(job);
  } else {
    const index = dynamicTagsRef.value.findIndex(
      (el: tagType) => el.value === job.value,
    );
    dynamicTagsRef.value.splice(index, 1);
  }
  emit('update:jobCategorySelect', jobCategorySelects.value);
  emit('update:dynamicTags', dynamicTagsRef.value);
};

const handleClose = (tag: tagType) => {
  const indexDynamicTags = dynamicTagsRef.value.findIndex(
    (el: tagType) => el.value === tag.value,
  );
  const indexJobCategorySelect = jobCategorySelects.value.findIndex(
    (el) => el === tag.value,
  );

  const indexJobCategoryInput = jobCategoryInputData.value.findIndex(
    (el) => el === tag.value,
  );

  if (indexDynamicTags >= 0) {
    dynamicTagsRef.value.splice(indexDynamicTags, 1);
    emit('update:dynamicTags', dynamicTagsRef.value);
  }

  if (indexJobCategorySelect >= 0) {
    jobCategorySelects.value.splice(indexJobCategorySelect, 1);
    emit('update:jobCategorySelect', jobCategorySelects.value);
  }

  if (indexJobCategoryInput >= 0) {
    jobCategoryInputData.value.splice(indexJobCategoryInput, 1);
    emit('update:jobCategoryInput', jobCategoryInputData.value);
  }
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    jobCategoryInputData.value.push(inputValue.value);
    dynamicTagsRef.value.push({
      value: inputValue.value,
      label: inputValue.value,
    });
    emit('update:jobCategoryInput', jobCategoryInputData.value);
    emit('update:dynamicTags', dynamicTagsRef.value);
  }
  inputValue.value = '';
};

const handleChangeJobCategory = () => {
  if (jobParent.value)
    jobCategoriesChild.value = getJobCategories(jobCategories, jobParent.value);
  else jobCategoriesChild.value = [];
};
</script>

<style lang="scss">
.multi-tag-wrapper {
  .el-input__inner {
    @apply h-10 border-0 border-transparent #{!important};
  }
}

.job-categories {
  .el-select-v2__placeholder {
    @apply text-base #{!important};
  }
  .el-select-v2__caret {
    @apply text-black #{!important};
  }
}

.job-categories-select {
  .el-select-dropdown__option-item {
    @apply text-base #{!important};
  }
}
</style>
