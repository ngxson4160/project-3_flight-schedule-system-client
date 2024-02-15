<template>
  <el-popover
    ref="popoverRef"
    placement="top"
    :visible="visibleTemplateText"
    trigger="click"
    popper-class="popper-template-message"
  >
    <div class="py-3 pl-3 text-[12px]">
      <p class="pr-3">
        変数を挿入してメールを送信した場合、メール送信先の対象者の値に自動的に置き換わります。挿入した変数は文字列を削除したり編集することなく、そのままご利用ください。
      </p>
      <p class="pr-3">
        例：「{応募者名}様」と作った文章は「平田様」のように置き換わります。
      </p>
      <div class="flex mt-6">
        <p class="text-[14px] flex-shrink-0 mt-2 pr-3">変数：</p>
        <div class="flex flex-wrap">
          <p
            v-for="item in props.templateTextList"
            :key="item"
            class="rounded border border-gray-third px-4 py-2 m-1 cursor-pointer"
            @click="handleClick(`${item}`)"
          >
            {{ item }}
          </p>
        </div>
      </div>
    </div>
    <template #reference>
      <p
        v-if="visibleTemplateText"
        class="text-primary leading-[16px] cursor-pointer mobile:text-xs"
        :class="{ '!text-gray': props.isDisable }"
        @click="visibleTemplateText = false"
      >
        変数挿入
      </p>
      <p
        v-else
        class="text-primary leading-[16px] cursor-pointer mobile:text-xs"
        :class="{ '!text-gray': props.isDisable }"
        @click="visibleTemplateText = true"
      >
        変数挿入
      </p>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
const props = defineProps({
  status: {
    type: Boolean,
    default: false,
  },
  templateTextList: {
    type: Array<string>,
    default: () => [],
  },
  isDisable: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['updateStatus', 'handleClick']);
const visibleTemplateText = computed({
  get: () => props.status,
  set: (val: boolean) => {
    emit('updateStatus', val);
  },
});
const handleClick = (text: string) => {
  emit('handleClick', text);
};
const popoverRef = ref(null);
onClickOutside(popoverRef, (event) => {
  if (visibleTemplateText.value) return (visibleTemplateText.value = false);
});
</script>

<style scoped></style>
