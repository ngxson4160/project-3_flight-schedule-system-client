<template>
  <div>
    <Head>
      <Title>Test Map</Title>
      <Script
        src="https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.js"
      ></Script>
      <Link
        href="https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css"
        rel="stylesheet"
      />
    </Head>
    =
    <el-autocomplete
      v-model="mapboxId"
      :fetch-suggestions="querySearch"
      clearable
      class="inline-input w-50"
      placeholder="Please Input"
      @select="handleSelect"
    />
    <MapboxMap
      map-id="map"
      style="
        position: absolute;
        top: 100px;
        bottom: 100px;
        left: 250px;
        width: 50%;
      "
      :options="{
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-74.058855, 40.769963], // starting position
        zoom: 12, // starting zoom
      }"
    >
      <MapboxSource
        source-id="line-source"
        :source="{
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: lineCoordinates,
            },
          },
        }"
      />
      <MapboxLayer
        :layer="{
          id: 'lines',
          type: 'line',
          source: 'line-source',
          layout: { 'line-cap': 'round', 'line-join': 'round' },
          paint: { 'line-color': '#FF5733', 'line-width': 5 },
        }"
      />

      <MapboxDefaultMarker
        v-for="(el, index) in test"
        :lnglat="el"
        :class="index"
        :marker-id="index"
      />
    </MapboxMap>
    <!-- <MapboxMap>
      <MapboxDefaultMarker :lnglat="test2" />
    </MapboxMap> -->
    <div id="map" class="w-full h-full"></div>
  </div>
</template>

<script setup lang="ts">
import mapboxgl, { LngLat, Marker } from 'mapbox-gl';

definePageMeta({
  layout: 'admin-have-sidebar',
});

const mapboxKey = ref(
  'pk.eyJ1IjoiYmV0YXBjaG9pMTBrIiwiYSI6ImNrY2ZuaWEwNjA2ZW0yeWw4bG9yNnUyYm0ifQ.bFCQ-5yq6cSsrhugfxO2_Q',
);
// Define coordinates for your points
var coordinates = [
  { coordinates: [-74.075572, 40.782969], label: 'Point 1' },
  { coordinates: [-74.029175, 40.755444], label: 'Point 2' },
  { coordinates: [-74.056399, 40.763194], label: 'Point 3' },
  { coordinates: [-74.074275, 40.778247], label: 'Point 4' },
  { coordinates: [-74.075572, 40.782969], label: 'Point 1' },
];

const test = coordinates.map((el) => {
  return new LngLat(el.coordinates[0], el.coordinates[1]);
});

var lineCoordinates = coordinates.map(function (point: any) {
  return point.coordinates;
});

interface LocationsItem {
  value: string;
  mapboxId: string;
}
// const locations = ref<LocationsItem[]>([]);

const mapboxId = ref('');

const querySearch = async (queryString: string, cb: any) => {
  if (!queryString) return;
  const result: any = await useFetch(
    'https://api.mapbox.com/search/searchbox/v1/suggest',
    {
      query: {
        q: queryString,
        language: 'en',
        session_token: '014accbb-0315-4b21-88b7-7beb394067fc',
        access_token: mapboxKey.value,
      },
    },
  );
  const listSuggestions = result.data.value.suggestions as any[];
  const suggest = listSuggestions.map((el) => {
    return { value: el.name, mapboxId: el.mapbox_id };
  });
  // call callback function to return suggestions
  cb(suggest);
};

// const createFilter = (queryString: string) => {
//   return (restaurant: LocationsItem) => {
//     return (
//       restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
//     );
//   };
// };
// const loadAll = async (query: string) => {
//   const result: any = await useFetch(
//     'https://api.mapbox.com/search/searchbox/v1/suggest',
//     {
//       query: {
//         q: query,
//         language: 'vi',
//         session_token: '014accbb-0315-4b21-88b7-7beb394067fc',
//         access_token: mapboxKey.value,
//       },
//     },
//   );
//   const listSuggestions = result.data.value.suggestions as any[];
//   const suggest = listSuggestions.map((el) => {
//     return { value: el.name, mapboxId: el.mapbox_id };
//   });
//   return suggest;
// };

const handleSelect = async (item: LocationsItem) => {
  const result: any = await useFetch(
    `https://api.mapbox.com/search/searchbox/v1/retrieve/${item.mapboxId}`,
    {
      query: {
        language: 'en',
        session_token: '014accbb-0315-4b21-88b7-7beb394067fc',
        access_token: mapboxKey.value,
      },
    },
  );
  console.log(result.data.value.features[0].properties.coordinates);
};

// onMounted(async () => {
//   locations.value = await loadAll();
// });
</script>

<style lang="scss">
.marker {
  background-image: url('https://icons.veryicon.com/png/o/miscellaneous/dqdj/plane-23.png');
  background-size: cover;
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.custom-popup {
  border: 1px solid red;
}
</style>
