<template>
  <div class="flex">
    <!-- <el-autocomplete
      v-model="mapboxId"
      :fetch-suggestions="querySearch"
      clearable
      class="inline-input w-50"
      placeholder="Please Input"
      @select="handleSelect"
    /> -->
    <div>
      <MapboxMap
        :map-id="'map' + params.id"
        style="
          position: absolute;
          top: 100px;
          bottom: 100px;
          left: 275px;
          width: 50%;
        "
        :options="{
          style: 'mapbox://styles/mapbox/streets-v11', // style URL
          center: getCoordinateCenter(routeData.locations), // starting position
          zoom: 13, // starting zoom
        }"
        @load="handleMapLoad"
      >
        <div v-if="isMapLoaded">
          <MapboxSource
            :source-id="'line-source1' + params.id"
            :source="{
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: getLineCoordinates(routeData.locations),
                },
              },
            }"
          />
          <MapboxLayer
            :layer="{
              id: 'line-source1' + params.id,
              type: 'line',
              source: 'line-source1' + params.id,
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: { 'line-color': '#FF5733', 'line-width': 5 },
            }"
          />
        </div>

        <MapboxDefaultMarker
          v-for="(el, index) in getListCoordinates(routeData.locations)"
          :lnglat="el"
          :class="index + params.id.toString()"
          :marker-id="index + params.id.toString()"
        />
      </MapboxMap>
    </div>
    <div class="mt-[60px] right-4 absolute max-w-[650px]">
      <div class="card-header font-bold text-[20px] mb-4">
        {{ routeData.name }}
      </div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="Type">
          {{ routeData.type }}
        </el-descriptions-item>
        <el-descriptions-item label="Length">
          {{ routeData.flightLength }} Km
        </el-descriptions-item>
        <el-descriptions-item label="Price">
          {{ routeData.price }} $
        </el-descriptions-item>
        <el-descriptions-item label="Duration">
          {{ routeData.duration }}
        </el-descriptions-item>

        <!-- <div v-for="(el, index) in routeData.locations"> -->
        <el-descriptions-item label="Route">
          <el-scrollbar height="400px">
            <div v-for="(el, index) in routeData.locations">
              <ul
                class="mt-2 border-b-[1px] border-[#ebeef5] list-disc list-inside"
              >
                <span class="font-bold">Location {{ index + 1 }}</span>

                <li>
                  Address:
                  <ListLocations :coordinate="el.coordinates" />
                </li>
                <li>
                  Description:
                  <span class="w-[88px]">
                    {{ el.label }}
                  </span>
                </li>
              </ul>
            </div>
          </el-scrollbar>
        </el-descriptions-item>
        <!-- <el-descriptions-item label="Description" class="!w-[88px]">
            <div class="w-[88px]">
              {{ el.label }}
            </div>
          </el-descriptions-item> -->
        <!-- </div> -->
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="Description">
          <el-scrollbar height="175px">
            {{ routeData.description }}
          </el-scrollbar>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouteStore } from '@/stores/route';
import mapboxgl, { LngLat, Marker } from 'mapbox-gl';

definePageMeta({
  layout: 'admin-have-sidebar',
});

const routeData = ref();
const { params } = useRoute();
const routeStore = useRouteStore();
routeData.value = await routeStore.getDetail(+params.id);
const isMapLoaded = ref(false);

const handleMapLoad = () => {
  isMapLoaded.value = true;
};

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

const getListCoordinates = (
  coordinates: Array<{ coordinates: number[]; label: string }>,
) => {
  const listCoordinates = coordinates.map((el) => {
    return new LngLat(el.coordinates[0], el.coordinates[1]);
  });
  return listCoordinates;
};

const getLineCoordinates = (
  coordinates: Array<{ coordinates: number[]; label: string }>,
) => {
  const listCoordinates = coordinates.map((el) => {
    return el.coordinates;
  });
  return listCoordinates;
};

const getCoordinateCenter = (
  coordinates: Array<{ coordinates: number[]; label: string }>,
) => {
  let kt = 0,
    vt = 0;
  for (let i = 0; i < coordinates.length; i++) {
    kt += coordinates[i].coordinates[0];
    vt += coordinates[i].coordinates[1];
  }

  return [kt / coordinates.length, vt / coordinates.length];
};

interface LocationsItem {
  value: string;
  mapboxId: string;
}

// const mapboxId = ref('');
// const getInfoLocation = async (coordinate: number[]) => {
//   const result: any = await useFetch(
//     `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinate[0]},${coordinate[1]}.json`,
//     {
//       query: {
//         // language: 'en',
//         // session_token: '014accbb-0315-4b21-88b7-7beb394067fc',
//         access_token: mapboxKey.value,
//       },
//     },
//   );
//   return result.data.value.features[0].place_name;
// };
// const querySearch = async (queryString: string, cb: any) => {
//   if (!queryString) return;
//   const result: any = await useFetch(
//     'https://api.mapbox.com/search/searchbox/v1/suggest',
//     {
//       query: {
//         q: queryString,
//         language: 'en',
//         session_token: '014accbb-0315-4b21-88b7-7beb394067fc',
//         access_token: mapboxKey.value,
//       },
//     },
//   );
//   const listSuggestions = result.data.value.suggestions as any[];
//   const suggest = listSuggestions.map((el) => {
//     return { value: el.name, mapboxId: el.mapbox_id };
//   });
//   // call callback function to return suggestions
//   cb(suggest);
// };

// const handleSelect = async (item: LocationsItem) => {
//   const result: any = await useFetch(
//     `https://api.mapbox.com/search/searchbox/v1/retrieve/${item.mapboxId}`,
//     {
//       query: {
//         language: 'en',
//         session_token: '014accbb-0315-4b21-88b7-7beb394067fc',
//         access_token: mapboxKey.value,
//       },
//     },
//   );
// };
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
