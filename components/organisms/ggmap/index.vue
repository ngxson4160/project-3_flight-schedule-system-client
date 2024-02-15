<template>
  <div class="">
    <iframe
      v-if="props.address.trim()"
      :class="`rounded-xl overflow-hidden !w-full mobile:h-[250px] ${
        isSidebar ? 'pc:h-[296px]' : 'pc:h-[200px]'
      }`"
      :src="apiggmap"
      style="border: 12"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  address: {
    type: String,
    default: null,
  },
  isSidebar: {
    type: Boolean,
    default: false,
  },
});

const config = useRuntimeConfig();
const ggAPIKey = config.public.ggAPIKey;

const apiggmap =
  `https://www.google.com/maps/embed/v1/place?key=${ggAPIKey}&q=` +
  props.address;
</script>

<style lang="scss" scoped></style>
