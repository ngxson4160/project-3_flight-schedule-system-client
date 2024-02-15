<template>
  <el-form
    ref="ruleFormRef"
    label-position="top"
    :rules="rules"
    :model="formJobMasterCategory"
    class="mb-4"
  >
    <div class="text-left text-black w-full">
      <div class="mt-5 flex items-center justify-between">
        <p class="text-sm mb-2 font-bold">
          Type
          <span class="text-xs text-danger ml-2 font-normal">*required</span>
        </p>
        <div class="ml-10 w-15">
          <el-select
            v-model="dataCreateRoute.type"
            placeholder="Select type"
            style="width: 240px"
          >
            <el-option
              v-for="item in optionTypeFlight"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="mt-5 flex items-center justify-between">
        <p class="text-sm mb-2 font-bold">
          Name
          <span class="text-xs text-danger ml-2 font-normal">*required</span>
        </p>
        <el-input v-model="dataCreateRoute.name" class="!w-[240px]" />
      </div>

      <div class="mt-5 flex items-center justify-between">
        <p class="text-sm mb-2 font-bold">
          Duration
          <span class="text-xs text-danger ml-2 font-normal">*required</span>
        </p>
        <el-input v-model="dataCreateRoute.duration" class="!w-[240px]" />
      </div>

      <div class="mt-5 flex items-center justify-between">
        <p class="text-sm mb-2 font-bold">
          Price
          <span class="text-xs text-danger ml-2 font-normal">*required</span>
        </p>
        <el-input v-model="dataCreateRoute.price" class="!w-[240px]" />
      </div>

      <div class="mt-5 flex items-center justify-between">
        <p class="text-sm mb-2 font-bold">
          Description
          <span class="text-xs text-danger ml-2 font-normal">*required</span>
        </p>
        <el-input v-model="dataCreateRoute.description" class="!w-[240px]" />
      </div>

      <div class="mt-5 flex items-center justify-between">
        <p class="text-sm mb-2 font-bold">
          Locations
          <span class="text-xs text-danger ml-2 font-normal">*required</span>
        </p>
        <el-button @click="isShowChoseLocations = true">
          Chose locations
        </el-button>
      </div>

      <div class="mt-10 flex justify-end text-primary">
        <el-button type="primary" @click="handleCreateFlightSchedule">
          Submit
        </el-button>
      </div>
    </div>
  </el-form>
  <el-dialog
    v-model="isShowChoseLocations"
    align-center
    class="dialog-confirn-edit-tag !w-[1550px] !h-[750px] !rounded-xl relative"
    :before-close="handleClose"
  >
    <p class="font-bold text-[20px] mb-10 text-black text-center">
      Add new Route
    </p>
    <div class="flex !h-full">
      <ChoseLocations
        v-if="isShowChoseLocations"
        v-model:locations="dataCreateRoute.locations"
        @close-chose-locations="handleCloseChoseLocations"
      />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { FormInstance } from 'element-plus';
import { useRouteStore } from '@/stores/route';
import _ from 'lodash';

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  dataForm: {
    type: Object,
    require: false,
  },
  // route: {
  //   type: Object,
  //   required: true,
  // },
  // pilot: {
  //   type: Object,
  //   required: true,
  // },
  // tourGuide: {
  //   type: Object,
  //   required: true,
  // },
  // helicopter: {
  //   type: Object,
  //   required: true,
  // },
  // start: {
  //   type: Date,
  //   required: true,
  // },
});

const optionTypeFlight = [
  {
    value: 'ADVENTURE',
    label: 'Adventure',
  },
  {
    value: 'HIRE',
    label: 'Hire',
  },
  {
    value: 'TRAINING',
    label: 'Training',
  },
  {
    value: 'TEST',
    label: 'Test new route',
  },
];

interface Emits {
  (event: 'closeAddRoute'): void;
}
const emits = defineEmits<Emits>();

interface AddNewFlightSchedule {
  name: string | null;
  type: string | null;
  duration: number | null;
  flightLength: number | null;
  price: number | null;
  description: string | null;
  locations: Array<{ coordinates: number[]; description: string }>;
}

const initData = {
  name: null,
  type: null,
  duration: null,
  flightLength: 0,
  price: null,
  description: null,
  locations: [],
};

const routeStore = useRouteStore();

const dataCreateRoute = ref<AddNewFlightSchedule>(initData);
if (props.dataForm && !_.isEmpty(props.dataForm)) {
  dataCreateRoute.value = props.dataForm as AddNewFlightSchedule;
}

const ruleFormRef = ref<FormInstance>();
const isShowChoseLocations = ref(false);

const handleCloseChoseLocations = () => {
  isShowChoseLocations.value = false;
};

const handleCreateFlightSchedule = async () => {
  dataCreateRoute.value.duration = Number(dataCreateRoute.value.duration);
  dataCreateRoute.value.price = Number(dataCreateRoute.value.price);

  const points = dataCreateRoute.value.locations.map((el) => {
    return el.coordinates;
  });
  let sum = 0;
  // for (let i = 0; i < points.length-1; i++) {
  //   if (i === points.length - 1) {
  //     sum += haversine(points[i], points[0]);
  //     break;
  //   }
  //   sum += haversine(points[i], points[i + 1]);
  // }
  for (let i = 0; i < points.length; i++) {
    sum += haversine(points[i], points[0]);
  }
  dataCreateRoute.value.flightLength = sum;
  await routeStore.createRoute(dataCreateRoute);
  emits('closeAddRoute');
};
</script>

<style lang="scss"></style>
