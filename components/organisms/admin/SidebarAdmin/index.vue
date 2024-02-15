<template>
  <div
    class="bg-black h-full fixed top-0 left-0 text-white text-sm pt-5 w-[232px]"
  >
    <NuxtLink
      v-for="(item, index) in menuData"
      :key="index"
      class="flex items-center gap-4 py-[6px] my-5 px-6 cursor-pointer"
      :class="{ 'router-active': item.link.includes(path) }"
      @click="routerPush(item.link[0])"
    >
      <img :src="item.img" alt="" />
      <p class="text-sm">{{ item.label }}</p>
    </NuxtLink>
    <span
      class="text-sm py-2 ml-14 cursor-pointer"
      @click="logoutDialogVisible = true"
    >
      Log out
    </span>
  </div>
  <el-dialog
    v-model="logoutDialogVisible"
    align-center
    :show-close="false"
    class="!rounded-xl !w-[496px] flex flex-col items-center py-5"
  >
    <template #header="{ titleId }">
      <div class="my-header">
        <h4 :id="titleId" class="font-bold text-xl">
          Are you sure you want to exit ?
        </h4>
      </div>
    </template>
    <el-button type="primary" class="w-[256px] mt-1" @click="logout">
      Log out
    </el-button>
    <template #footer>
      <span
        class="text-primary underline cursor-pointer font-bold mb-4"
        @click="logoutDialogVisible = false"
      >
        Cancel
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import SettingIcon from '~/assets/images/admin/setting.svg';
import AirPlane from '~/assets/images/admin/airplane.svg';
import Route from '~/assets/images/admin/route.svg';
import FlightSchedule from '~/assets/images/admin/flight-schedule.svg';
import AdventureOperatingTime from '~/assets/images/admin/adventure-operating-time.svg';
import Employer from '~/assets/images/admin/employer.svg';
import Rent from '~/assets/images/admin/rent.svg';
import User from '~/assets/images/admin/user.svg';

const route = useRoute();
const path = ref<string>('');
const id = ref<number>(0);
const idApplicant = ref<number>(0);

const logoutDialogVisible = ref(false);
const menuData = ref<{ label: string; link: string[]; img: any }[]>([]);

watchEffect(() => {
  path.value = route.path.toString() ?? '';
  id.value = Number(route.params.id) ?? 0;
  idApplicant.value = Number(route.params.idApplicant) ?? 0;
  menuData.value = [
    {
      label: 'Flight Schedule',
      link: ['/admin/flight-schedule', `/admin/flight-schedule/${id.value}`],
      img: FlightSchedule,
    },
    {
      label: 'Operating time',
      link: ['/admin/operating-time/list', `/admin/operating-time/${id.value}`],
      img: AdventureOperatingTime,
    },
    {
      label: 'Helicopter',
      link: ['/admin/helicopter/list', `/admin/helicopter/${id.value}`],
      img: AirPlane,
    },
    {
      label: 'Route',
      link: ['/admin/route/list', `/admin/route/${id.value}`],
      img: Route,
    },
    {
      label: 'Rent',
      link: ['/admin/rent/list', `/admin/rent/${id.value}`],
      img: Rent,
    },
    {
      label: 'Work Schedule',
      link: [
        '/admin/employer-work-schedule/list',
        `/admin/employer-work-schedule/${id.value}`,
      ],
      img: Employer,
    },
    {
      label: 'User',
      link: ['/admin/user/list', `/admin/user/${id.value}`],
      img: User,
    },
    {
      label: 'System setting',
      link: ['/admin/system-settings'],
      img: SettingIcon,
    },
  ];
});

const logout = () => {
  handleLogout();
  routerPush('/admin/login');
};
</script>

<style lang="scss" scoped>
.router-active {
  @apply relative pl-5 border-l-4 border-primary bg-fourth;
}
.router-active::before {
  content: '';
  @apply w-0 h-0 border-solid absolute right-0 top-[12px];
  border-width: 8px 10px 8px 0;
  border-color: transparent #f5f5f5 transparent transparent;
}
</style>
