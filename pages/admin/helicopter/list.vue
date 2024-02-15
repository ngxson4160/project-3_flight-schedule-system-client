<template>
  <div class="mb-4 text-right">
    <el-button @click="isShowAddHelicopter = true">
      <span class="font-normal">+ New Helicopter</span>
    </el-button>
  </div>
  <!-- <AddRoute v-if="isShowAddHelicopter" @close-add-route="handleCloseAddRoute" /> -->
  <el-dialog
    v-model="isShowAddHelicopter"
    align-center
    class="dialog-confirn-edit-tag pc:!w-[550px] !rounded-xl"
    :before-close="handleClose"
  >
    <p class="font-bold text-[20px] mb-10 text-black text-center">
      Add new Flight Schedule
    </p>
    <AddHelicopter @closeAddHelicopter="handleCloseAddHelicopter" />
  </el-dialog>
  <!-- <el-dialog
    v-model="isShowAddHelicopter"
    align-center
    class="dialog-confirn-edit-tag pc:!w-[550px] !rounded-xl"
    :before-close="handleClose"
  >
    <p class="font-bold text-[20px] mb-10 text-black text-center">
      Add new Flight Schedule
    </p>
    <el-form
      v-if="isShowAddHelicopter"
      ref="ruleFormRef"
      label-position="top"
      :rules="rules"
      :model="formJobMasterCategory"
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

        <div class="mt-5 flex items-center justify-between">
          <p class="text-sm mb-2 font-bold">
            Image
            <span class="text-xs text-danger ml-2 font-normal">*required</span>
          </p>
          <el-input v-model="dataCreateHelicopter.img" class="!w-[240px]" />
        </div>

        <div class="mt-5 flex items-center justify-between">
          <p class="text-sm mb-2 font-bold">
            Type
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
  </el-dialog> -->
  <div class="flex flex-wrap">
    <el-card
      v-for="(el, index) in listHelicopter"
      class="ml-10 p-4 w-[365px] mb-8 hover:cursor-pointer"
      @click="routerPush(`/admin/helicopter/${el.id}`)"
    >
      <template #header>
        <div class="flex items-center justify-between mb-2">
          <div class="card-header font-bold text-[20px]">
            <p>{{ el.name }}</p>
          </div>
          <div class="flex">
            <img
              class="w-5 h-5 hover:cursor-pointer"
              src="~/assets/images/admin/edit-icon.svg"
            />
            <img
              class="w-5 h-5 ml-6 hover:cursor-pointer"
              src="~/assets/images/admin/bin-icon.svg"
              @click.stop="handleDeleteHelicopter(el.id)"
            />
          </div>
        </div>
      </template>
      <div class="flex justify-between items-center">
        <div>
          <div class="text item">Capacity: {{ el.capacity }}</div>
          <div class="text item">Size: {{ el.type }}</div>
          <div class="text item">Engine: {{ el.engine }}</div>
          <div class="text item">Speed: {{ el.speed }}</div>
          <!-- <div class="text item">Description: {{ el.description }}</div> -->
        </div>
        <div class="w-[180px] h-[180px] relative">
          <img
            v-if="!el.img"
            src="~/assets/images/admin/default-helicopter.svg"
          />
          <img v-else :src="el.img" class="object-fit: contain" />
        </div>
      </div>
      <!-- <template #footer>Footer content</template> -->
    </el-card>
    <DialogConfirmDelete
      v-model:dialog-visible="isShowDialogConfirmDelete"
      text-confirm="Confirm"
      text-cancel="Cancel"
      title="Are you sure you want to delete this helicopter?"
      @event-confirm="handleConfirmDelete"
      @event-cancel="isShowDialogConfirmDelete = !isShowDialogConfirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { useHelicopterStore } from '@/stores/helicopter';
definePageMeta({
  layout: 'admin-have-sidebar',
});

const helicopterStore = useHelicopterStore();
const isShowAddHelicopter = ref(false);

const listHelicopter = ref<any>({});
listHelicopter.value = await helicopterStore.getListHelicopter();
const isShowDialogConfirmDelete = ref(false);
const idDelete = ref();

const handleDeleteHelicopter = async (id: number) => {
  isShowDialogConfirmDelete.value = true;
  idDelete.value = id;
  // await routeStore.deleteRoute(id);
  // listRoute.value = await routeStore.getListData();
};

const handleConfirmDelete = async () => {
  await helicopterStore.deleteHelicopter(idDelete.value);
  listHelicopter.value = await helicopterStore.getListHelicopter();
  isShowDialogConfirmDelete.value = false;
};

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
  isShowAddHelicopter.value = false;
  listHelicopter.value = await helicopterStore.getListHelicopter();
};

const handleCloseAddHelicopter = async () => {
  isShowAddHelicopter.value = false;
  listHelicopter.value = await helicopterStore.getListHelicopter();
};
</script>

<style scoped></style>
