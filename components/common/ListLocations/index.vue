<template>
  <span>{{ locationInfo }}</span>
</template>

<script setup lang="ts">
const props = defineProps({
  coordinate: {
    type: Object,
    require: true,
  },
});

const mapboxKey = ref(
  'pk.eyJ1IjoiYmV0YXBjaG9pMTBrIiwiYSI6ImNrY2ZuaWEwNjA2ZW0yeWw4bG9yNnUyYm0ifQ.bFCQ-5yq6cSsrhugfxO2_Q',
);

const locationInfo = ref();
const getInfoLocation = async (coordinate: number[]) => {
  const result: any = await useFetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinate[0]},${coordinate[1]}.json`,
    {
      query: {
        // language: 'en',
        // session_token: '014accbb-0315-4b21-88b7-7beb394067fc',
        access_token: mapboxKey.value,
      },
    },
  );
  return result.data.value.features[0].place_name;
};

// onMounted(async () => {
locationInfo.value = await getInfoLocation(props.coordinate);
console.log(props.coordinate);
// });
</script>
