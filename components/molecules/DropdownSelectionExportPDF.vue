<template>
  <div class="relative">
    <button
      ref="buttonShowOption"
      :class="{ 'w-full': props.sizeButton === 'default' }"
      type="button"
      @click="handleOpenDropdown"
    >
      <div
        v-if="props.sizeButton === 'default'"
        class="flex justify-center items-center text-[16px] font-bold rounded-lg border-2 border-primary h-[56px]"
        :class="{
          'text-primary': props.typeButton === 'default',
          'text-white bg-primary': props.typeButton !== 'default',
        }"
      >
        <img
          v-if="props.typeButton !== 'default'"
          src="~/assets/images/icon-download-pdf.svg"
          alt=""
          class="mr-2"
        />
        <img
          v-else
          src="~/assets/images/icon-download-blu.svg"
          class="mr-2"
          alt=""
        />
        PDFで出力
      </div>
      <div
        v-else
        class="items-center"
        :class="{
          'flex pc:py-2 py-[6px] pc:px-4 border border-gray-third rounded-lg mobile:w-[115px] pc:gap-2 gap-1 mobile:justify-center':
            !props.isInApplicantOverview,
          'inline-flex gap-1 underline underline-offset-2 text-primary leading-[170%]':
            props.isInApplicantOverview,
        }"
      >
        <p class="text-primary text-sm">
          {{ props.isInApplicantOverview ? '応募者情報（PDF）' : 'PDF出力' }}
        </p>
        <img src="~/assets/images/icon-download-blue.svg" alt="" class="" />
      </div>
    </button>
    <div
      class="absolute z-10 w-[232px] bg-white rounded-lg shadow-base transition-all duration-300 ease-in-out left-0"
      :class="[
        visibleMenu
          ? 'top-14 opacity-100 visible'
          : 'top-10 opacity-0 invisible',
        props.sizeButton !== 'default' ? '!top-11' : '',
        props.isInApplicantOverview ? (visibleMenu ? '!top-6' : '') : '',
      ]"
    >
      <ul @click.prevent>
        <li class="border-b border-color-border hover:bg-secondary">
          <p
            class="block text-sm py-4 px-8 text-black cursor-pointer"
            @click="handleSelectExport('applicant-and-applicant-entry')"
          >
            全ての情報を出力
          </p>
        </li>
        <li class="border-b border-color-border hover:bg-secondary">
          <p
            class="block text-sm py-4 px-8 text-black cursor-pointer"
            @click="handleSelectExport('applicant')"
          >
            プロフィール情報を出力
          </p>
        </li>
        <li class="hover:bg-secondary">
          <p
            class="block text-sm py-4 px-8 text-black cursor-pointer"
            @click="handleSelectExport('applicant-entry')"
          >
            エントリー情報を出力
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  typeButton: {
    type: String,
    default: 'default',
  },
  sizeButton: {
    type: String,
    default: 'default',
  },
  isInApplicantOverview: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['handleSelectExport']);

const visibleMenu = ref<boolean>(false);

const handleOpenDropdown = () => {
  visibleMenu.value = !visibleMenu.value;
};

const buttonShowOption = ref(null);
onClickOutside(buttonShowOption, (event) => {
  if (visibleMenu.value) visibleMenu.value = false;
});

const handleSelectExport = (type: string) => {
  emits('handleSelectExport', type);
};
</script>

<style scoped></style>
