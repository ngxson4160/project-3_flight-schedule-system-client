<template>
  <div>
    <h3 class="text-sm font-bold text-gray mb-2">官公庁・自治体概要</h3>
    <div>
      <ul>
        <li
          class="flex justify-start py-4 border-b-[1px] border-gray-third gap-x-4"
        >
          <h3 class="font-bold text-xs w-[116px] flex-shrink-0">官公庁名</h3>
          <h4 class="font-normal text-xs w-full">
            {{ profileEmployerStore.government.name }}
          </h4>
        </li>
        <li
          class="flex justify-start py-4 border-b-[1px] border-gray-third gap-x-4"
        >
          <h3 class="font-bold text-xs w-[116px] flex-shrink-0">
            都道府県 / 市区町村
          </h3>
          <h4 class="font-normal text-xs w-full">
            {{ profileEmployerStore.businessCity?.province?.name }}
            {{ profileEmployerStore.businessCity?.name }}
          </h4>
        </li>
        <li
          class="flex justify-start py-4 border-b-[1px] border-gray-third gap-x-4"
        >
          <h3 class="font-bold text-xs w-[116px] flex-shrink-0">
            官公庁の種類
          </h3>
          <h4 class="font-normal text-xs w-full">
            {{ profileEmployerStore.government.category }}
          </h4>
        </li>

        <li
          v-if="profileEmployerStore.numberStaff"
          class="flex justify-start py-4 border-b-[1px] border-gray-third gap-x-4"
        >
          <h3 class="font-bold text-xs w-[116px] flex-shrink-0">職員人数</h3>
          <h4 class="font-normal text-xs w-full">
            {{
              profileEmployerStore.numberStaff
                ? `${profileEmployerStore.numberStaff}名`
                : ''
            }}
          </h4>
        </li>
        <li
          v-if="profileEmployerStore.averageAge"
          class="flex justify-start py-4 border-b-[1px] border-gray-third gap-x-4"
        >
          <h3 class="font-bold text-xs w-[116px] flex-shrink-0">平均年齢</h3>
          <h4 class="font-normal text-xs w-full">
            {{
              profileEmployerStore.averageAge
                ? `${profileEmployerStore.averageAge}歳`
                : ''
            }}
          </h4>
        </li>
        <li
          v-if="profileEmployerStore.homepageURL"
          class="flex justify-start py-4 border-b-[1px] border-gray-third gap-x-4"
        >
          <h3 class="font-bold text-xs w-[116px] flex-shrink-0">URL</h3>
          <h4
            class="font-normal text-xs w-full text-primary underline break-all cursor-pointer"
            @click="handleRedirect"
          >
            {{ profileEmployerStore.homepageURL }}
          </h4>
        </li>
      </ul>
      <div class="mt-10">
        <p class="text-gray font-bold text-sm tracking-wider">所在地</p>
        <p
          class="text-xs font-normal leading-5 tracking-wider mt-2 w-full whitespace-pre-line"
        >
          {{ address }}
        </p>
        <div class="mt-4">
          <ggmap :address="address" :is-sidebar="true"></ggmap>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProfileEmployerStore } from '~~/stores/profileEmployer';
const profileEmployerStore = useProfileEmployerStore();

const address = computed(() => {
  const value = profileEmployerStore?.postcode
    ? String(profileEmployerStore?.postcode)
    : '';
  const result = value.match(/(\d{0,3})(\d{0,4})/) ?? '';
  const postcode = (result[1] ?? '') + (result[2] ? `-${result[2]}` : '');

  return (
    (postcode ? `〒${postcode}` : '') +
    ' ' +
    (profileEmployerStore.businessCity?.province?.name || '') +
    ' ' +
    (profileEmployerStore?.businessCity?.name || '') +
    ' ' +
    (profileEmployerStore?.businessAddress || '')
  );
});

const handleRedirect = () => {
  window.open(profileEmployerStore.homepageURL, '_blank');
};
</script>

<style></style>
