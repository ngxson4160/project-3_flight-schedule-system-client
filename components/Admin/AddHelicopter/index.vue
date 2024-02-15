<template>
  <div>
    <el-form
      ref="ruleFormRef"
      label-position="top"
      :rules="rules"
      :model="dataCreateHelicopter"
      class="mb-4"
    >
      <div class="text-left text-black w-full">
        <div class="mt-5 flex items-center justify-between">
          <p class="text-sm mb-2 font-bold">
            Name
            <span class="text-xs text-danger ml-2 font-normal">*required</span>
          </p>
          <el-input v-model="dataCreateHelicopter.name" class="!w-[240px]" />
        </div>

        <div class="mt-5 flex items-center justify-between">
          <p class="text-sm mb-2 font-bold">
            Capacity
            <span class="text-xs text-danger ml-2 font-normal">*required</span>
          </p>
          <el-input
            v-model="dataCreateHelicopter.capacity"
            class="!w-[240px]"
          />
        </div>

        <!-- <div class="mt-5 flex items-center justify-between">
          <p class="text-sm mb-2 font-bold">
            Image
            <span class="text-xs text-danger ml-2 font-normal">*required</span>
          </p>
          <el-input v-model="dataCreateHelicopter.img" class="!w-[240px]" />
        </div> -->

        <div class="mt-5 flex items-center justify-between">
          <p class="text-sm mb-2 font-bold">
            Size
            <span class="text-xs text-danger ml-2 font-normal">*required</span>
          </p>
          <el-input v-model="dataCreateHelicopter.type" class="!w-[240px]" />
        </div>

        <div class="mt-5 flex items-center justify-between">
          <p class="text-sm mb-2 font-bold">
            Engine
            <span class="text-xs text-danger ml-2 font-normal">*required</span>
          </p>
          <el-input v-model="dataCreateHelicopter.engine" class="!w-[240px]" />
        </div>
        <div class="mt-5 flex items-center justify-between">
          <p class="text-sm mb-2 font-bold">
            Speed
            <span class="text-xs text-danger ml-2 font-normal">*required</span>
          </p>
          <el-input v-model="dataCreateHelicopter.speed" class="!w-[240px]" />
        </div>
        <div class="mt-5 flex items-center justify-between">
          <p class="text-sm mb-2 font-bold">
            Description
            <span class="text-xs text-danger ml-2 font-normal">*required</span>
          </p>
          <el-input
            v-model="dataCreateHelicopter.description"
            class="!w-[240px]"
          />
        </div>

        <div class="mt-10 flex justify-end text-primary">
          <el-button type="primary" @click="handleCreateHelicopter">
            Submit
          </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useHelicopterStore } from '@/stores/helicopter';

const helicopterStore = useHelicopterStore();
const props = defineProps({
  isShowAddHelicopter: {
    type: Boolean,
    default: false,
  },
});

interface Emits {
  (event: 'closeAddHelicopter'): void;
}
const emits = defineEmits<Emits>();

interface AddNewHelicopter {
  name: string | null;
  capacity: number | null;
  img: string | null;
  type: string | null;
  engine: string | null;
  speed: string | null;
  description: string | null;
}

const initData = {
  name: null,
  capacity: null,
  img: null,
  type: null,
  engine: null,
  speed: null,
  description: null,
};
const dataCreateHelicopter = ref<AddNewHelicopter>(initData);

const handleCreateHelicopter = async () => {
  dataCreateHelicopter.value.capacity = Number(
    dataCreateHelicopter.value.capacity,
  );
  await helicopterStore.createHelicopter(dataCreateHelicopter);
  emits('closeAddHelicopter');
};
</script>

<style scoped></style>
