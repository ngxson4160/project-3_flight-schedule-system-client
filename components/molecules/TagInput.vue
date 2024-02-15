<template>
  <div class="w-full overflow-hidden">
    <el-checkbox-group :model-value="modelValue" @change="updateTags">
      <el-checkbox
        v-for="(tag, i) in tags"
        :key="i"
        :label="tag"
        class="mb-4"
      />
    </el-checkbox-group>

    <div
      class="rounded border border-slate-200 flex flex-wrap gap-2 p-3 min-h-[66px] bg-white"
    >
      <el-tag
        v-for="(tag, i) in modelValue"
        :key="i"
        class="tag-item"
        closable
        @close="removeTag(tag)"
      >
        {{ tag }}
      </el-tag>

      <input
        v-model="newTag"
        type="text"
        class="border-0 flex-1 h-10 w-full min-w-[100px] px-2 outline-none"
        @keyup.enter="addTag"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CheckboxValueType } from 'element-plus';
import { PropType } from 'vue';

const newTag = ref('');

const props = defineProps({
  tags: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  modelValue: {
    type: Array as PropType<string[]>,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue', 'add']);

const updateTags = (value: CheckboxValueType[]) => {
  emit('update:modelValue', value);
};

const addTag = () => {
  emit('update:modelValue', [...props.modelValue, newTag.value]);
  emit('add', newTag.value);

  newTag.value = '';
};

const removeTag = (tag: string) => {
  const newValue = props.modelValue.filter((v) => v !== tag);

  emit('update:modelValue', newValue);
};
</script>

<style lang="scss" scoped>
.tag-item {
  @apply inline-flex px-4 bg-secondary rounded items-center text-base;
}

:deep {
  .el-checkbox {
    @apply max-w-full;

    .el-checkbox__label {
      @apply overflow-hidden text-ellipsis;
    }
  }

  .el-tag {
    @apply max-w-full;

    .el-tag__content {
      @apply overflow-hidden text-ellipsis;
    }
  }
}
</style>
