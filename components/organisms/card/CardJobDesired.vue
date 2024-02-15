<template>
  <div>
    <el-card>
      <div class="p-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <img
              v-if="data.imgUrl.includes('http')"
              :src="data.imgUrl"
              alt=""
              class="w-10 h-10 rounded-full border-[1px] border-gray-third object-cover"
            />
            <img
              v-else
              src=""
              alt=""
              class="w-10 h-10 rounded-full border-[1px] border-gray-third object-cover"
            />
            <p class="pl-2 max-w-[178px] truncate font-normal text-sm">
              {{ data.governmentOffice }}
            </p>
          </div>
          <img src="~/assets/images/book-mark-gray.svg" alt="" />
        </div>
        <p
          class="font-bold text-[16px] tracking-wider text-overflow pt-2"
          style="line-height: 170%"
        >
          {{ data.title }}
        </p>
        <div class="flex mt-2">
          <div v-for="(tag, index) in data.tags" :key="index">
            <p
              class="text-primary border-[1px] border-primary px-2 py-1 rounded mr-2 text-sm font-normal max-w-[130px] truncate"
            >
              {{ tag }}
            </p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { IDataCardJobPickUp } from '~~/utils/interface';
const props = defineProps({
  data: {
    type: Object as PropType<IDataCardJobPickUp>,
    default: () => ({
      imgUrl: '',
      title: '',
      tags: [],
      governmentOffice: '',
    }),
  },
});
</script>

<style lang="scss" scoped>
.text-overflow {
  -webkit-line-clamp: 2;
}
</style>
