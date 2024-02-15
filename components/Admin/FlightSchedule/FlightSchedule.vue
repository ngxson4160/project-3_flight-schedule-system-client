<template>
  <el-form
    ref="ruleFormRef"
    label-position="top"
    :rules="rules"
    :model="formJobMasterCategory"
    class="mb-4"
  >
    <div class="text-left text-black w-full">
      <div
        v-if="isShowMessageOutsideOperatingTime"
        class="text-danger font-bold list-disc list-inside text-left"
      >
        <p v-for="el in messageError">
          {{ el }}
        </p>
      </div>
      <div class="mt-5 flex items-center justify-between">
        <p class="text-sm mb-2 font-bold">
          Select type flight
          <span class="text-xs text-danger ml-2 font-normal">*required</span>
        </p>
        <div class="ml-10 w-15">
          <el-select
            v-model="dataForm.type"
            placeholder="Select route"
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
          Select start time
          <span class="text-xs text-danger ml-2 font-normal">*required</span>
        </p>
        <div class="">
          <el-date-picker
            v-model="dataForm.start"
            type="datetime"
            placeholder="Select start time"
            class="!w-[240px] !h-[44px]"
          />
        </div>
      </div>
      <div
        class="mt-5 flex items-center justify-between"
        v-if="dataForm.type !== 'ADVENTURE' && dataForm.type"
      >
        <p class="text-sm mb-2 font-bold">
          Select end time
          <span class="text-xs text-danger ml-2 font-normal">*required</span>
        </p>
        <div class="">
          <el-date-picker
            v-model="dataForm.end"
            type="datetime"
            placeholder="Select end time"
            class="!w-[240px] !h-[44px]"
          />
        </div>
      </div>
      <div class="mt-5 flex items-center justify-between">
        <p class="text-sm mb-2 font-bold">
          Select route
          <span class="text-xs text-danger ml-2 font-normal">*required</span>
        </p>
        <div class="ml-10 w-15">
          <el-select
            v-model="dataForm.routeId"
            placeholder="Select route"
            style="width: 240px"
            :disabled="!dataForm.start"
          >
            <el-option
              v-for="item in routeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>

      <div class="mt-5 flex items-center justify-between">
        <p class="text-sm mb-2 font-bold">
          Select pilot
          <span class="text-xs text-danger ml-2 font-normal">*required</span>
        </p>
        <div class="w-15">
          <el-select
            v-model="dataForm.pilotId"
            placeholder="All type flight"
            style="width: 240px"
            :disabled="!dataForm.type || !dataForm.start || !pilotData"
          >
            <el-option
              v-for="item in pilotData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>

      <div class="mt-5 flex items-center justify-between">
        <p class="text-sm mb-2 font-bold">
          Select tour guide
          <span class="text-xs text-danger ml-2 font-normal">*required</span>
        </p>
        <div class="w-15">
          <el-select
            v-model="dataForm.tourGuideId"
            placeholder="All type flight"
            style="width: 240px"
            :disabled="!dataForm.type || !dataForm.start || !tourGuideData"
          >
            <el-option
              v-for="item in tourGuideData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>

      <div class="mt-5 flex items-center justify-between">
        <p class="text-sm mb-2 font-bold">
          Select helicopter
          <span class="text-xs text-danger ml-2 font-normal">*required</span>
        </p>
        <div class="">
          <el-select
            v-model="dataForm.helicopterId"
            placeholder="All type flight"
            style="width: 240px"
            :disabled="!dataForm.type || !dataForm.start || !helicopterData"
          >
            <el-option
              v-for="item in helicopterData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>

      <div class="mt-5 flex items-center justify-between">
        <p class="text-sm mb-2 font-bold">
          Select amount
          <span class="text-xs text-danger ml-2 font-normal">*required</span>
        </p>
        <div class="">
          <el-select
            v-model="dataForm.capacity"
            placeholder="All type flight"
            style="width: 240px"
            :disabled="!dataForm.helicopterId"
          >
            <el-option
              v-for="item in capacityData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>

      <div class="mt-10 flex justify-end text-primary">
        <el-button type="primary" @click="handleCreateFlightSchedule">
          Submit
        </el-button>
      </div>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { FormInstance } from 'element-plus';
import { useRouteStore } from '@/stores/route';
import { useStaffStore } from '@/stores/staff';
import { useHelicopterStore } from '@/stores/helicopter';
import { useFlightScheduleStore } from '@/stores/flightSchedule';
import _ from 'lodash';

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  dataForm: {
    type: Object,
    default: true,
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
interface Emits {
  (event: 'closeAddFlightSchedule'): void;
}
const emits = defineEmits<Emits>();

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

interface AddNewFlightSchedule {
  type: string | null;
  routeId: number | null;
  pilotId: number | null;
  tourGuideId: number | null;
  helicopterId: number | null;
  start: Date | null;
  end: Date | null;
  capacity?: number | null;
}

const initData = {
  type: null,
  routeId: null,
  pilotId: null,
  tourGuideId: null,
  helicopterId: null,
  start: null,
  end: null,
  capacity: null,
};

const ruleFormRef = ref<FormInstance>();
const isShowMessageErr = ref(false);
const resetData = () => ({ name: '' });
const isShowMessageOutsideOperatingTime = ref(false);

const routeStore = useRouteStore();
const staffStore = useStaffStore();
const helicopterStore = useHelicopterStore();
const flightScheduleStore = useFlightScheduleStore();

if (routeStore.listRoute.length === 0) {
  await routeStore.getListData();
}
if (staffStore.listPilot.length === 0) {
  await staffStore.getListPilot();
}
if (staffStore.listTourGuide.length === 0) {
  await staffStore.getListTourGuide();
}
if (helicopterStore.listHelicopter.length === 0) {
  await helicopterStore.getListHelicopter();
}

// const routeData = routeStore.listRoute.map((element) => {
//   return {
//     label: element.name,
//     value: element.id,
//   };
// });

// const pilotData = staffStore.listPilot.map((element) => {
//   return {
//     label: `${element.firstName} ${element.lastName}`,
//     value: element.id,
//   };
// });

// const tourGuideData = staffStore.listTourGuide.map((element) => {
//   return {
//     label: `${element.firstName} ${element.lastName}`,
//     value: element.id,
//   };
// });

// const helicopterData = helicopterStore.listHelicopter.map((element) => {
//   return {
//     label: element.name,
//     value: element.id,
// };
// });

const pilotData = ref();
const tourGuideData = ref();
const helicopterData = ref();
const capacityData = ref<any>([]);

const dataForm = ref<AddNewFlightSchedule>(initData);
const listRoute = ref();
const routeData = ref();
listRoute.value = await routeStore.getListData({ type: dataForm.value.type });
// const routeData = routeStore.listRoute.map((element) => {
//   return {
//     label: element.name,
//     value: element.id,
//   };
// });

watch(
  () => dataForm.value.type,
  async (newVal) => {
    listRoute.value = await routeStore.getListData({
      type: newVal,
    });

    routeData.value = listRoute.value.map((el: any) => {
      return {
        label: el.name,
        value: el.id,
      };
    });
  },
);

watch(
  () => dataForm.value.start,
  async () => {
    if (dataForm.value.end) {
      await getResource({
        start: dataForm.value.start?.toISOString(),
        end: dataForm.value.end?.toISOString(),
      });
    }
  },
);

watch(
  () => dataForm.value.routeId,
  async (newVal) => {
    if (newVal) {
      const route = await routeStore.getDetail(newVal);
      const start = dataForm.value.start;
      if (start instanceof Date) {
        const endTime = new Date(start?.getTime());
        endTime!.setMinutes(
          endTime!.getMinutes() + (route?.duration ?? 0) / 60,
        );
        dataForm.value.end = endTime;

        console.log({
          start: dataForm.value.start?.toISOString(),
          end: dataForm.value.end?.toISOString(),
          routeId: route.id,
        });

        await getResource({
          start: dataForm.value.start?.toISOString(),
          end: dataForm.value.end?.toISOString(),
          routeId: route.id,
        });
      }
    }
  },
);

watch(
  () => dataForm.value.helicopterId,
  async (newVal) => {
    if (newVal) {
      dataForm.value.capacity = null;
      const helicopter = await helicopterStore.getDetail(newVal);
      if (helicopter.capacity) {
        capacityData.value = [];
        for (let i = 1; i <= helicopter.capacity - 2; i++)
          capacityData.value = [...capacityData.value, { label: i, value: i }];
      }
    }
  },
);
const messageError = ref<any>([]);
const getResource = async (params: object) => {
  const listResource = await flightScheduleStore.getListResourcesAvailable({
    ...params,
    isAdventureFlight: dataForm.value.type === 'ADVENTURE' ? '1' : '0',
  });

  if (_.isEmpty(listResource)) {
    isShowMessageOutsideOperatingTime.value = true;
    messageError.value = ['Outside the operating time range'];
    return;
  } else {
    isShowMessageOutsideOperatingTime.value = false;
  }

  isShowMessageOutsideOperatingTime.value = false;
  pilotData.value = listResource.pilots.map((element) => {
    return {
      label: `${element.firstName} ${element.lastName}`,
      value: element.id,
    };
  });
  tourGuideData.value = listResource.tourGuides.map((element) => {
    return {
      label: `${element.firstName} ${element.lastName}`,
      value: element.id,
    };
  });
  helicopterData.value = listResource.helicopters.map((element) => {
    return {
      label: element.name,
      value: element.id,
    };
  });
};

const handleCreateFlightSchedule = async () => {
  const { message } = await flightScheduleStore.createFlightScheduleAdventure(
    dataForm.value,
  );
  if (typeof message == 'object') {
    console.log(message);
    isShowMessageOutsideOperatingTime.value = true;
    messageError.value = message;
    return;
  }
  emits('closeAddFlightSchedule');
};
</script>

<style lang="scss"></style>
