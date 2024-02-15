<template>
  <!-- <div class="text-center mb-5">Flight Schedule Management</div> -->
  <div class="flex justify-end">
    <div class="w-15">
      <el-select
        v-model="type"
        placeholder="All type flight"
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
        <span class="font-normal">+ New schedule</span>
      </el-button>
    </div>
  </div>
  <div class="mt-10 border-2 border-[#DADCDE] rounded-lg">
    <el-table :data="listFlight" stripe style="width: 100%">
      <el-table-column prop="id" label="Code" width="65" />
      <el-table-column prop="customer" label="Customer" />
      <el-table-column prop="route" label="Route" width="175" />
      <el-table-column prop="startTime" label="Start" width="175" />
      <el-table-column prop="endTime" label="End" width="175" />
      <!-- <el-table-column prop="date" label="Date" /> -->
      <el-table-column prop="helicopter" label="Helicopter" />
      <el-table-column prop="pilot" label="Pilot" />
      <el-table-column prop="tourGuide" label="Tour guide" />
      <el-table-column prop="price" label="Price" width="80" />
      <el-table-column prop="status" label="Status" width="145" />
      <el-table-column prop="duration" label="Duration" width="95" />
      <el-table-column prop="type" label="Type" width="100" />
      <el-table-column prop="delete" label="Action" width="110">
        <div class="flex">
          <span class="text-primary cursor-pointer">Edit</span>
          <span class="text-danger cursor-pointer ml-2">Delete</span>
        </div>
      </el-table-column>
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
    <FlightSchedule
      v-if="isShowAddSchedule"
      @closeAddFlightSchedule="handleCloseAddFlightSchedule"
    />
  </el-dialog>
  <!-- </client-only> -->
</template>

<script setup lang="ts">
import { useFlightScheduleStore } from '@/stores/flightSchedule';
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
    const endDate = new Date(newVal[1]);

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
    params.value = { ...params.value, type };
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

const optionTypeFlight = [
  {
    value: '',
    label: 'All type flight',
  },
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

const listFlight = ref();
const getListFlight = async () => {
  // const { data, error } = await useBaseFetch('/flight-schedules', {
  //   method: 'GET',
  //   params,
  // });
  // if (error.value?.data) {
  //   throw error.value?.data;
  // } else {
  //   const resultPromises = data.value?.data.map(async (el: any) => {
  //     const { data: helicopter } = await useBaseFetch(
  //       `/helicopters/${el.helicopterId}`,
  //       {},
  //     );
  //     console.log(params.value);
  //     const { data: route } = await useBaseFetch(`/routes/${el.routeId}`, {});
  //     const customer = el.user.find((user: any) => (user.role = 'CUSTOMER'));
  //     const pilot = el.user.find((user: any) => (user.role = 'PILOT'));
  //     const tourGuide = el.user.find((user: any) => (user.role = 'TOUR_GUIDE'));
  //     return {
  //       id: el.id,
  //       customer: customer.firstName + customer.lastName,
  //       route: route.value?.data.duration,
  //       startTime: `${splitDate(el.start)} ${splitTime(el.start)}`,
  //       endTime: `${splitDate(el.end)} ${splitTime(el.end)}`,
  //       date: splitDate(el.date),
  //       helicopter: helicopter.value?.data.name,
  //       pilot: pilot.firstName + pilot.lastName,
  //       tourGuide: tourGuide.firstName + tourGuide.lastName,
  //       price: `${el.price}$`,
  //       status: convertValueEnum(el.status),
  //       duration: el.duration,
  //       type: convertValueEnum(el.type),
  //     };
  //   });

  //   listFlight.value = await Promise.all(resultPromises);
  //   // return result;
  // }

  listFlight.value = await flightScheduleStore.getListFlight(params.value);
};
await getListFlight();

const handleCloseAddFlightSchedule = async () => {
  isShowAddSchedule.value = false;
  await getListFlight();
};
</script>

<style scoped></style>
