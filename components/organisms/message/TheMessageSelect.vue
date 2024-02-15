<template>
  <div
    class="bg-white border border-solid border-color-message message-checkbox"
  >
    <div class="px-6 py-4 w-full">
      <el-checkbox class="w-full relative">
        <div class="flex">
          <div class="pc:w-[95%] mobile:w-[85%]">
            <div class="flex gap-2">
              <h3
                class="leading-[20px] text-sm font-bold tracking-wider text-black"
              >
                {{ message.title }}
              </h3>
              <button
                type="button"
                class="bg-primary text-[10px] leading-[14px] text-white rounded px-2 py-1"
              >
                応募
              </button>
            </div>

            <div class="flex mt-2 text-xs mobile:text-[10px] leading-4">
              <div class="text-black tracking-wide">
                {{ message.descriptions.title }}
              </div>
              <span class="text-gray ml-1 mr-1">-</span>
              <div
                class="block w-full overflow-hidden text-ellipsis whitespace-nowrap text-gray"
              >
                {{ message.descriptions.content }}
              </div>
            </div>
          </div>

          <div class="ml-auto">
            <div class="text-sm text-black leading-4">11:00</div>
            <div class="mt-[14px]">
              <span
                class="w-[22px] h-[18px] rounded-[20px] bg-primary block text-white m-auto text-[10px] leading-4 text-center tracking-wide"
              >
                1
              </span>
            </div>
          </div>
        </div>
      </el-checkbox>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  message: {
    type: Object,
    default: () => {},
  },
});

const message = reactive(props.message);
</script>

<style lang="scss">
.message-checkbox {
  .el-checkbox__label {
    @apply w-full pl-4;
  }

  .el-checkbox__inner {
    @apply border-gray;
  }
}
</style>
