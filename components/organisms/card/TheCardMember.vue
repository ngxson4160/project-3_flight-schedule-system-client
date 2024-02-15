<template>
  <el-card class="box-card" :body-style="{ padding: '0px' }">
    <div class="px-6 py-4 relative mobile:px-4">
      <h3 class="font-bold text-base text-black leading-[17px] tracking-wide">
        {{ member.name }}
      </h3>
      <div class="mt-2">{{ member.email }}</div>
      <div class="absolute top-4 right-4">
        <div class="rounded-full w-10 h-10 overflow-hidden">
          <button type="button">
            <img src="~/assets/images/more.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
const props = defineProps({
  member: {
    type: Object,
    default: () => {},
  },
});

const member = reactive(props.member);
</script>
