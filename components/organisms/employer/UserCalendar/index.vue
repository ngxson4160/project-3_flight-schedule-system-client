<template>
  <div class="flex justify-center py-6 calendar-container">
    <div class="w-full">
      <div
        class="flex items-center border-2 justify-between p-[2px] w-full pc:w-[496px] border-color-border rounded-lg mb-6"
      >
        <button
          class="sm:w-[162px] w-full !m-0 !border-none font-bold py-2 rounded-lg text-sm"
          :class="
            typeView === ETypeView.TimeGridWeek && 'bg-primary text-white'
          "
          @click="handleChangeView(ETypeView.TimeGridWeek)"
        >
          週
        </button>
        <button
          class="sm:w-[162px] w-full !m-0 !border-none text-sm font-bold py-2 rounded-lg"
          :class="
            typeView === ETypeView.DayGridMonth && '!bg-primary text-white'
          "
          @click="handleChangeView(ETypeView.DayGridMonth)"
        >
          月
        </button>
        <button
          class="sm:w-[162px] w-full !m-0 !border-none text-sm font-bold py-2 rounded-lg"
          :class="typeView === ETypeView.DayGridDay && 'bg-primary text-white'"
          @click="handleViewToDay"
        >
          日
        </button>
      </div>
      <div class="flex items-center justify-start mb-6">
        <button
          class="w-10 h-10 rounded-full border-gray border flex justify-center items-center flex-shrink-0"
          @click="handlePreview()"
        >
          <img src="~/assets/images/arrow-left-gray-24.svg" alt="" />
        </button>
        <button
          class="w-10 h-10 rounded-full flex justify-center items-center border-gray border mr-8 ml-4 flex-shrink-0"
          @click="handleNext()"
        >
          <img src="~/assets/images/arrow-right-gray-24.svg" alt="" />
        </button>
        <h3 class="text-2xl whitespace-pre-line mobile:text-xl">
          {{ calendarTitle }}
        </h3>
      </div>
      <FullCalendar
        ref="fullCalendar"
        :class="`demo-app-calendar ${customClassCalendar} ${
          typeView === ETypeView.TimeGridWeek
            ? 'pc:!h-[1015px] mobile:!h-[896px] '
            : typeView === ETypeView.DayGridMonth
            ? 'pc:!h-[860px] mobile:!h-[738px] '
            : '!h-0'
        } ${
          !isShowCalendar
            ? '!h-0 overflow-hidden fc-media-screen fc-direction-ltr fc-theme-standard'
            : 'demo-app-calendar fc fc-media-screen fc-direction-ltr fc-theme-standard'
        }`"
        :options="calendarOptions"
      />
      <div
        v-if="!isShowCalendar"
        :class="`${!isShowCalendar ? 'block' : '!hidden'}`"
      >
        <div
          v-for="listItem in calendarListStore?.listCalendarResPonse"
          :key="listItem.id"
          class="flex gap-x-6 py-1 cursor-pointer hover:bg-primary hover:rounded-md hover:text-white"
          @click="(event) => handleShowDetailDay(event, listItem.id)"
        >
          <div class="w-[100px] font-bold flex-shrink-0 text-left text-sm">
            {{ convertHoursMinuteUser(listItem) }}
          </div>
          <div class="flex-shrink-0 w-full text-left text-sm">
            <span class="mr-4">
              [{{ listItem?.applicantEntry?.settingInterview?.title }}]
            </span>
            <span>
              {{
                listItem?.applicantEntry?.settingInterview?.creator
                  .governmentOffice.name
              }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <ClientOnly>
      <el-dialog
        v-if="isOpenModalDetail"
        id="modal-detail-calendar"
        v-model="isOpenModalDetail"
        class="modal-detail-calendar"
        :show-close="false"
      >
        <ModalCalendar
          :detail-calendar="detailCalendar"
          :is-user="true"
          @close-calendar="isOpenModalDetail = false"
        />
      </el-dialog>
    </ClientOnly>

    <ClientOnly>
      <el-dialog
        v-if="showModalShowMore"
        id="modal-detail-calendar-list"
        v-model="showModalShowMore"
        class="modal-detail-calendar"
        :show-close="false"
      >
        <ModalCalendarShowMore
          :detail-calendar="calendarListStore.listCalendarResPonse"
          :type-view="typeView"
          :date-info="dateInfo"
          :list-public-id="listPublicId"
          :is-user="true"
          @close-calendar-more="showModalShowMore = false"
          @view-detail="handleViewDetailEvent"
        />
      </el-dialog>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import {
  CalendarOptions,
  EventClickArg,
  DatesSetArg,
  MoreLinkArg,
  DayHeaderContentArg,
} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/vue3';
import { useBreakpoints } from '@vueuse/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import ja from 'dayjs/locale/ja';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { useCalendarStore } from '~/stores/useCalendarStore';
import { ETypeView } from '~/utils/enum';

const props = defineProps({
  tabPanesData: {
    type: Array as () => ITabPane[],
    default: () => [],
  },
  isHiddenHeaderCalendar: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['updateTabActive']);
const breakpoints = useBreakpoints({
  mobile: 0,
  desktop: 481,
});

const isMobile = breakpoints.between('mobile', 'desktop');

const calendarListStore = useCalendarStore();

const detailCalendar = ref();
const typeView = ref<ETypeView>(ETypeView.TimeGridWeek);
const fullCalendar = ref();
const isOpenModalDetail = ref(false);
const calendarTitle = ref('');

const isShowCalendar = ref(true);
const isViewWeek = ref(true);
const startDate = ref('');
const endDate = ref('');
const showModalShowMore = ref(false);
const dateInfo = ref();
const listPublicId = ref();
const customClassCalendar = ref<string>('');
watch(
  () => props.isHiddenHeaderCalendar,
  (newValue) => {
    if (newValue) customClassCalendar.value = 'is-hidden-fc-header';
    else customClassCalendar.value = '';
  },
);

const handleDateSelect = async (itemSelect: EventClickArg) => {
  detailCalendar.value = calendarListStore.listCalendarResPonse.find(
    (item) => Number(item.id) === Number(itemSelect.event?._def.publicId),
  );
  isOpenModalDetail.value = true;
  if (!isMobile.value) {
    await nextTick();
    const modalDetail = document.getElementById('modal-detail-calendar');
    if (modalDetail) {
      const positionTop = itemSelect.jsEvent?.pageY;
      const positionLeft = itemSelect.jsEvent?.pageX;
      const positionTopScreen = itemSelect.jsEvent?.screenY;
      if (positionLeft < 650) {
        if (positionTopScreen > 585) {
          if (positionTop < 680) {
            modalDetail.style.left = `${positionLeft + 30}px`;
            modalDetail.style.top = `${positionTopScreen - 150}px`;
          } else {
            modalDetail.style.left = `${positionLeft + 30}px`;
            modalDetail.style.top = `${positionTopScreen - 100}px`;
          }
        } else {
          modalDetail.style.left = `${positionLeft + 30}px`;
          modalDetail.style.top = `${positionTopScreen - 150}px`;
        }
      } else if (positionTopScreen > 585) {
        if (positionTop < 680) {
          modalDetail.style.left = `${positionLeft - 350}px`;
          modalDetail.style.top = `${positionTopScreen - 500}px`;
        } else {
          modalDetail.style.left = `${positionLeft - 350}px`;
          modalDetail.style.top = `${positionTopScreen - 600}px`;
        }
      } else {
        modalDetail.style.left = `${positionLeft - 350}px`;
        modalDetail.style.top = `${positionTopScreen - 100}px`;
      }
    }
  } else {
    await nextTick();
    const modalDetail = document.getElementById('modal-detail-calendar');
    if (modalDetail) {
      modalDetail.style.left = '24px';
      modalDetail.style.top = '200px';
    }
  }
};

const handleShowDetailDay = async (event: MouseEvent, id: string | number) => {
  detailCalendar.value = calendarListStore.listCalendarResPonse.find(
    (item) => Number(item.id) === Number(id),
  );
  isOpenModalDetail.value = true;
  if (!isMobile.value) {
    await nextTick();
    const modalDetail = document.getElementById('modal-detail-calendar');
    if (modalDetail) {
      const positionTop = event?.pageY;
      const positionLeft = event?.pageX;
      const positionTopScreen = event?.screenY;
      if (positionLeft < 650) {
        if (positionTopScreen > 585) {
          if (positionTop < 680) {
            modalDetail.style.left = `${positionLeft + 30}px`;
            modalDetail.style.top = `${positionTopScreen - 500}px`;
          } else {
            modalDetail.style.left = `${positionLeft + 30}px`;
            modalDetail.style.top = `${positionTopScreen - 600}px`;
          }
        } else {
          modalDetail.style.left = `${positionLeft + 30}px`;
          modalDetail.style.top = `${positionTopScreen - 150}px`;
        }
      } else if (positionTopScreen > 585) {
        if (positionTop < 680) {
          modalDetail.style.left = `${positionLeft - 350}px`;
          modalDetail.style.top = `${positionTopScreen - 500}px`;
        } else {
          modalDetail.style.left = `${positionLeft - 350}px`;
          modalDetail.style.top = `${positionTopScreen - 600}px`;
        }
      } else {
        modalDetail.style.left = `${positionLeft - 350}px`;
        modalDetail.style.top = `${positionTopScreen - 150}px`;
      }
    }
  } else {
    await nextTick();
    const modalDetail = document.getElementById('modal-detail-calendar');
    if (modalDetail) {
      modalDetail.style.left = `24px`;
      modalDetail.style.top = `${200}px`;
    }
  }
};

const handleDatesSet = (info: DatesSetArg) => {
  startDate.value = info.startStr;
  endDate.value = info.endStr;
};

const handleShowDetailList = async (event: UIEvent) => {
  showModalShowMore.value = true;
  await nextTick();
  if (!isMobile.value) {
    const modalDetail = document.getElementById('modal-detail-calendar-list');
    if (modalDetail) {
      const positionTop = event?.y;
      const positionLeft = event?.x;
      const positionTopScreen = event?.screenY;
      if (positionLeft < 650) {
        if (positionTopScreen > 585) {
          if (positionTop < 680) {
            modalDetail.style.left = `${positionLeft + 30}px`;
            modalDetail.style.top = `${positionTopScreen - 100}px`;
          } else {
            modalDetail.style.left = `${positionLeft + 30}px`;
            modalDetail.style.top = `${positionTopScreen - 150}px`;
          }
        } else {
          modalDetail.style.left = `${positionLeft + 30}px`;
          modalDetail.style.top = `${positionTopScreen - 150}px`;
        }
      } else if (positionTopScreen > 585) {
        if (positionTop < 680) {
          modalDetail.style.left = `${positionLeft - 350}px`;
          modalDetail.style.top = `${positionTopScreen - 100}px`;
        } else {
          modalDetail.style.left = `${positionLeft - 350}px`;
          modalDetail.style.top = `${positionTopScreen - 350}px`;
        }
      } else {
        modalDetail.style.left = `${positionLeft - 350}px`;
        modalDetail.style.top = `${positionTopScreen - 150}px`;
      }
    }
  } else {
    const modalDetail = document.getElementById('modal-detail-calendar-list');
    if (modalDetail) {
      modalDetail.style.left = `24px`;
      modalDetail.style.top = `200px`;
    }
  }
};

const handleClickLimit = (info: MoreLinkArg) => {
  if (typeView.value === ETypeView.TimeGridWeek) {
    const formatType = 'YYYY/MM/DD';
    const dateCurrent: Date = new Date(info.date);
    dateCurrent.setHours(dateCurrent.getHours() - getGMTOffset(dateCurrent));
    const dataClick = formatDate(dateCurrent, formatType);

    const filterDate = calendarListStore.listCalendarResPonse.filter(
      (item) =>
        new Date(
          item.applicantEntry?.settingInterview?.interviewDate,
        ).getHours() === dateCurrent.getHours(),
    );
    listPublicId.value = filterDate.map((item) => item.id);
    dateInfo.value = dataClick;
    handleShowDetailList(info.jsEvent);
  } else {
    listPublicId.value = info.allSegs.map((item) => item.event?._def?.publicId);
    dateInfo.value = info.date;
    handleShowDetailList(info.jsEvent);
  }
};

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
  editable: false,
  selectable: true,
  selectMirror: false,
  dayMaxEvents: true,
  weekends: true,
  locale: jaLocale,
  slotMinTime: '08:00',
  slotMaxTime: '21:00',
  slotDuration: '00:20:00',
  initialView: 'timeGridWeek',
  eventClick: handleDateSelect,
  eventMaxStack: 2,
  datesSet: handleDatesSet,
  dayHeaderContent: (args: DayHeaderContentArg) => {
    if (typeView.value === ETypeView.TimeGridWeek) {
      return dayjs(args.date).locale(ja).format('D (ddd)');
    }
    return args.text;
  },
  dayCellContent: function (e) {
    const result = e.dayNumberText.replace('日', '');
    return result;
  },
  moreLinkClick: (event: MoreLinkArg) => handleClickLimit(event),
} as CalendarOptions);

const handleGetListCalendar = async () => {
  await calendarListStore.setQueryUser({
    startDate: dayjs(startDate.value).format('YYYY-MM-DD'),
    endDate: dayjs(endDate.value).format('YYYY-MM-DD'),
  });
  calendarOptions.value = {
    ...calendarOptions.value,
    events: calendarListStore.listCalendar,
  };
};

onMounted(async () => {
  const calendar = fullCalendar.value;
  calendarTitle.value = calendar.calendar.view.title;
  await handleGetListCalendar();
});

const handleChangeView = async (viewType: ETypeView) => {
  isShowCalendar.value = true;
  const calendar = fullCalendar.value;
  typeView.value = viewType;

  if (calendar) {
    if (viewType === ETypeView.TimeGridWeek) {
      isViewWeek.value = true;
    } else {
      isViewWeek.value = false;
    }
  }
  calendar.getApi().changeView(viewType);
  calendarTitle.value = calendar.calendar.view.title;
  await handleGetListCalendar();
};

const handleViewToDay = async () => {
  typeView.value = ETypeView.DayGridDay;
  isShowCalendar.value = false;
  const calendar = fullCalendar.value;
  calendar.getApi().changeView(ETypeView.DayGridDay);
  const formattedDate = dayjs(calendar.calendar.view.currentStart)
    .locale(ja)
    .format('YYYY年 M月D日  (ddd)');
  calendarTitle.value = formattedDate;

  await calendarListStore.setQueryUser({
    startDate: dayjs(startDate.value).format('YYYY-MM-DD'),
    endDate: dayjs(startDate.value).format('YYYY-MM-DD'),
  });
  calendarOptions.value = {
    ...calendarOptions.value,
    events: calendarListStore.listCalendar,
  };
};

const handleNext = async () => {
  const calendar = fullCalendar.value;
  if (calendar) {
    calendar.getApi().next();
  }
  calendarTitle.value = calendar.calendar.view.title;
  await handleGetListCalendar();
};

const handlePreview = async () => {
  const calendar = fullCalendar.value;
  if (calendar) {
    calendar.getApi().prev();
  }
  calendarTitle.value = calendar.calendar.view.title;
  await handleGetListCalendar();
};

const handleViewDetailEvent = async (id: string, event: MouseEvent) => {
  detailCalendar.value = calendarListStore.listCalendarResPonse.find(
    (item) => Number(item.id) === Number(id),
  );

  isOpenModalDetail.value = true;
  await nextTick();
  if (!isMobile.value) {
    const modalDetail = document.getElementById('modal-detail-calendar');
    if (modalDetail) {
      const positionTop = event.pageY;
      const positionLeft = event?.pageX;
      const positionTopScreen = event?.screenY;
      if (positionLeft < 650) {
        if (positionTopScreen > 585) {
          if (positionTop < 680) {
            modalDetail.style.left = `${positionLeft + 30}px`;
            modalDetail.style.top = `${positionTopScreen - 500}px`;
          } else {
            modalDetail.style.left = `${positionLeft + 30}px`;
            modalDetail.style.top = `${positionTopScreen - 600}px`;
          }
        } else {
          modalDetail.style.left = `${positionLeft + 30}px`;
          modalDetail.style.top = `${positionTopScreen - 150}px`;
        }
      } else if (positionTopScreen > 585) {
        if (positionTop < 680) {
          modalDetail.style.left = `${positionLeft - 350}px`;
          modalDetail.style.top = `${positionTopScreen - 500}px`;
        } else {
          modalDetail.style.left = `${positionLeft - 350}px`;
          modalDetail.style.top = `${positionTopScreen - 600}px`;
        }
      } else {
        modalDetail.style.left = `${positionLeft - 350}px`;
        modalDetail.style.top = `${positionTopScreen - 150}px`;
      }
    }
  } else {
    const modalDetail = document.getElementById('modal-detail-calendar');
    if (modalDetail) {
      modalDetail.style.left = `24px`;
      modalDetail.style.top = `${300}px`;
    }
  }
};
</script>

<style lang="scss">
.calendar-container {
  .fc-header-toolbar.fc-toolbar {
    display: none !important;
  }

  .fc-scroller-harness .fc-daygrid-body-natural {
    display: none;
  }

  .fc-timegrid-divider.fc-cell-shaded {
    display: none;
  }

  .fc-day-today {
    background: white !important;
  }

  .fc-daygrid-day-events {
    .fc-daygrid-event-harness {
      .fc-event-title {
        @apply text-white text-xs;
      }
      @apply bg-primary rounded text-white mx-1 mb-[1px] cursor-pointer;
    }
  }

  .fc-popover-body {
    @apply bg-white;
    .fc-event-title {
      @apply bg-white text-black rounded hover:bg-primary hover:text-white cursor-pointer;
    }
    .fc-event.fc-v-event {
      @apply border-none bg-white rounded overflow-hidden p-[2px];
    }
    .fc-event-end.fc-event-past {
      @apply border-none bg-white rounded overflow-hidden p-[2px];
    }
  }

  .fc-daygrid-day-top {
    justify-content: start;
  }

  .fc-daygrid-day-bottom {
    @apply text-sm font-bold;
  }

  .fc-daygrid-event-dot {
    display: none !important;
  }

  .fc-col-header-cell-cushion {
    @apply mobile:text-sm text-lg font-normal;
  }

  .fc-event-main {
    @apply hover:bg-primary cursor-pointer;
  }

  .fc-event-title-container {
    @apply text-white text-xs;
  }

  .fc-event-start.fc-event-end {
    .fc-event-time {
      display: none !important;
    }
  }
  .fc-event-main-frame {
    .fc-event-time {
      display: none !important;
    }
  }

  .fc-popover {
    .fc-event.fc-event-start.fc-event-end.fc-event-past.fc-daygrid-event.fc-daygrid-dot-event {
      .fc-event-time {
        display: block !important;
        font-weight: 700;
      }
      @apply flex-col items-start gap-y-1 py-4 border-b border-color-border;
    }
  }

  .fc .fc-popover {
    .fc-popover-header {
      @apply bg-white;
    }
    .fc-event-title {
      @apply text-xs font-normal cursor-pointer;
    }
    .fc-popover-close {
      @apply p-1 rounded-full  text-black mr-3;
    }
    .fc-popover-close::before {
      @apply p-1 rounded-full;
    }
    .fc-popover-close::before:hover {
      @apply bg-gray-third;
    }
    @apply rounded-lg overflow-hidden z-[99];
  }

  .fc-timegrid-slot-label-cushion {
    @apply pc:text-sm text-xs #{!important};
  }
  .fc-timegrid-slot-label-frame {
    @apply text-center;
  }
  .el-overlay {
    position: relative;
    .modal-detail-calendar {
      .el-dialog__header {
        display: none !important;
      }
      .el-dialog__body {
        @apply pc:p-6 mobile:px-4;
      }

      @apply pc:w-[320px] mobile:w-[342px] m-0 absolute rounded-xl z-[999999999];
    }
  }

  .fc-popover.fc-more-popover {
    @apply opacity-0 pointer-events-none;
  }
}

.is-hidden-fc-header {
  .fc-col-header {
    @apply fixed  top-[70px]  bg-white z-[99];
  }
}

.fc-timegrid-more-link-inner {
  line-height: 8px;
}
</style>
