<template>
  <!-- <div class="text-center mb-5">Flight Schedule Management</div> -->
  <div class="flex justify-end">
    <div class="w-15">
      <el-select
        v-model="type"
        placeholder="All type route"
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
    <div class="w-15 ml-4">
      <el-date-picker
        v-model="date"
        type="daterange"
        unlink-panels
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        :shortcuts="shortcuts"
        size="default"
      />
    </div>
    <!-- <div class="w-15 ml-4">
      <el-time-picker
        v-model="timeFilter"
        clearable
        is-range
        range-separator="To"
        start-placeholder="Start time"
        end-placeholder="End time"
      />
    </div> -->

    <div class="ml-4">
      <el-button @click="isShowAddSchedule = true">
        <span class="font-normal">+ New operating time</span>
      </el-button>
    </div>
  </div>
  <div class="mt-10 border-2 border-[#DADCDE] rounded-lg">
    <el-table :data="listOperatingTime" stripe style="width: 100%">
      <el-table-column prop="routeName" label="Route Name" />
      <el-table-column prop="startMorning" label="Start Morning" />
      <el-table-column prop="endMorning" label="End Morning" />
      <el-table-column prop="startAfternoon" label="Start Afternoon" />
      <el-table-column prop="endAfternoon" label="End Afternoon" />
    </el-table>
  </div>

  <!-- <client-only> -->
  <el-dialog
    v-model="isShowAddSchedule"
    align-center
    class="dialog-confirn-edit-tag pc:!w-[550px] !rounded-xl"
    :before-close="handleClose"
  >
    <p class="font-bold text-[20px] mb-10 text-black text-center">
      Add new Flight Schedule
    </p>
    <FlightSchedule v-if="isShowAddSchedule" />
  </el-dialog>
  <!-- </client-only> -->
</template>

<script setup lang="ts">
import { useFlightScheduleStore } from '@/stores/flightSchedule';
import { useOperatingTimeStore } from '@/stores/operatingTime';
definePageMeta({
  layout: 'admin-have-sidebar',
  // middleware: ['admin-only'],
});

const params = ref<any>({});
const type = ref('');

const currentTime = new Date();
currentTime.setHours(0, 0, 0, 0);
currentTime.setHours(currentTime.getHours() + 7);

const date = ref<[Date, Date]>([currentTime, currentTime]);
const isShowAddSchedule = ref(false);
const timeFilter = ref([null, null]);

const flightScheduleStore = useFlightScheduleStore();
const operatingTimeStore = useOperatingTimeStore();

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you certain to cancel create flight schedule?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

watch(
  () => date.value,
  (newVal) => {
    const startDate = new Date(newVal[0]);
    startDate.setHours(0, 0, 0, 0);
    startDate.setHours(currentTime.getHours() + 7);
    const endDate = new Date(newVal[1]);
    endDate.setHours(0, 0, 0, 0);
    endDate.setHours(currentTime.getHours() + 7);

    params.value = {
      ...params.value,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
  },
);

onMounted(() => {
  const startDate = new Date(date.value[0]);
  const endDate = new Date(date.value[1]);
  params.value = {
    ...params.value,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
});

// watch(
//   () => timeFilter.value,
//   () => {
//     params.value = {
//       ...params.value,
//       start: timeFilter.value[0],
//       end: timeFilter.value[1],
//     };
//   },
// );

watch(
  () => type.value,
  (newVal) => {
    if (!newVal) {
      const tmp = { ...params.value };
      delete tmp.type;
      params.value = tmp;
      return;
    }
    params.value = { ...params.value, routeId: type };
  },
);

watch(
  () => params.value,
  async () => {
    await getListFlight();
  },
);

const shortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];

const optionTypeFlight = ref<any>([
  {
    value: '',
    label: 'All route',
  },
]);

const listFlight = ref();
const listOperatingTime = ref();
const getListFlight = async () => {
  listOperatingTime.value = await operatingTimeStore.getList(params.value);
  // listOperatingTime.value.forEach((el: any) => {
  //   optionTypeFlight.value = [
  //     {
  //       value: '',
  //       label: 'All route',
  //     },
  //   ];
  //   optionTypeFlight.value = [
  //     ...optionTypeFlight.value,
  //     { value: el.routeId, label: el.routeName },
  //   ];
  // });
};
await getListFlight();
// watch(
//   () => listOperatingTime.value,
//   (newVal) => {
//     optionTypeFlight.value = [
//       {
//         value: '',
//         label: 'All route',
//       },
//     ];
//     newVal.forEach((el: any) => {
//       if (!checkExistRoute(el.routeId)) {
//         optionTypeFlight.value = [
//           ...optionTypeFlight.value,
//           { value: el.routeId, label: el.routeName },
//         ];
//       }
//     });
//   },
// );

const listRoute = async () => {
  const { data, error } = await useBaseFetch('/routes/', {});
  if (error.value?.data) {
    throw error.value?.data;
  } else {
    const response = data.value as IResponse;
    const listRoute = response.data as object[];
    return listRoute;
  }
};
const listDataRoute = await listRoute();
listDataRoute.forEach((el: any) => {
  optionTypeFlight.value = [
    ...optionTypeFlight.value,
    { value: el.id, label: el.name },
  ];
});
</script>

<style scoped></style>
