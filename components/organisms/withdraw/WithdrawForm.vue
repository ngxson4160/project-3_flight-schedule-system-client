<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/valid-v-for -->
<template>
  <div
    class="withdraw-form max-w-[762px] w-full mx-auto"
    :class="{ 'mobile:px-6': !confirm }"
  >
    <p class="font-bold text-lg">
      今後のサービス改善のためにアカウントを削除する理由を教えてください
    </p>
    <p class="font-medium text-sm pt-2 pb-4">※複数選択可</p>
    <el-form :model="withdrawForm">
      <el-form-item>
        <el-checkbox-group
          v-model="withdrawForm.labelsChecked"
          class="form-checkbox-group"
        >
          <el-checkbox
            v-for="itemCheckbox in dataCheckbox"
            :label="itemCheckbox.label"
            name="checkbox"
            :checked="itemCheckbox.checked"
          />
        </el-checkbox-group>
      </el-form-item>
      <p class="font-bold pt-[6px] pb-4">
        もう少しだけ詳しく教えて頂けますか？
      </p>
      <div v-if="confirm">
        <p class="pb-16 break-words whitespace-pre-line">
          {{ withdrawForm.reason }}
        </p>
      </div>

      <el-form-item v-else>
        <el-input v-model="withdrawForm.reason" type="textarea" :rows="10" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  withdrawForm: {
    type: Object,
    default: null,
  },
  dataCheckbox: {
    type: Array<{
      label: String;
      checked: boolean;
    }>,
    default: null,
  },
  confirm: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss">
.withdraw-form {
  .el-checkbox-group {
    .el-checkbox {
      @apply h-6 py-2 text-black flex items-start;
      .el-checkbox__input {
        @apply block pt-1;
      }
      .el-checkbox__label {
        @apply pl-[19.5px] text-base block whitespace-normal h-auto;
      }
    }
  }
}
</style>
