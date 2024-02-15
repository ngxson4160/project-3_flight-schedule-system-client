<template>
  <div class="flex mt-20 ml-10">
    <!-- <el-autocomplete
      v-model="mapboxId"
      :fetch-suggestions="querySearch"
      clearable
      class="inline-input w-50"
      placeholder="Please Input"
      @select="handleSelect"
    /> -->
    <div class="w-[500px] h-[500px]">
      <img
        v-if="!helicopterData.img"
        src="~/assets/images/admin/default-helicopter.svg"
      />
      <img v-else :src="helicopterData.img" class="object-fit: contain" />
    </div>
    <div class="ml-10 w-[650px]">
      <div class="card-header font-bold text-[20px] mb-4">
        {{ helicopterData.name }}
      </div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="Capacity">
          {{ helicopterData.capacity }}
        </el-descriptions-item>
        <el-descriptions-item label="Size">
          {{ helicopterData.type }}
        </el-descriptions-item>
        <el-descriptions-item label="Engine">
          {{ helicopterData.engine }}
        </el-descriptions-item>
        <el-descriptions-item label="Speed">
          {{ helicopterData.speed }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="Description">
          <el-scrollbar height="175px">
            {{ helicopterData.description }}
          </el-scrollbar>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHelicopterStore } from '@/stores/helicopter';
definePageMeta({
  layout: 'admin-have-sidebar',
});

const { params } = useRoute();
const helicopterStore = useHelicopterStore();
const helicopterData = ref<any>({});
helicopterData.value = await helicopterStore.getDetail(+params.id);
</script>

<style scoped></style>
