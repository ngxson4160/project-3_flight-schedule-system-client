<template>
  <div>
    <div class="!w-[210px]">
      <el-autocomplete
        v-model="mapboxId"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input w-[212px]"
        placeholder="Please input location"
        @select="handleSelect"
      />
      <el-input
        class="mt-2 !w-[210px]"
        placeholder="description"
        v-model="tempDescription"
      />
      <el-button
        type="primary"
        class="!h-11 mt-4"
        @click="handleAddTemporaryLocation"
      >
        Add location
      </el-button>
    </div>
    <MapboxMap
      map-id="map"
      style="
        position: absolute;
        top: 100px;
        bottom: 0px;
        left: 250px;
        width: 50%;
      "
      :options="{
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: getCoordinateCenter(listLocations), // starting position
        zoom: 15, // starting zoom
      }"
      @load="handleMapLoad"
      @click="handleMapClick"
    >
      <div v-if="isMapLoaded">
        <MapboxSource
          source-id="line-source--2"
          :source="{
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: getLineCoordinates(listLocations),
              },
            },
          }"
        />
        <MapboxLayer
          :layer="{
            id: 'line-source--2',
            type: 'line',
            source: 'line-source--2',
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: { 'line-color': '#FF5733', 'line-width': 5 },
          }"
        />
      </div>

      <MapboxDefaultMarker
        v-for="(el, index) in getListCoordinates(listLocations)"
        :lnglat="el"
        :class="index"
        :marker-id="index"
      />
    </MapboxMap>
    <div class="absolute top-[100px] right-8">
      <p
        v-if="listLocations.length === 10"
        class="text-danger text-base font-bold mb-2"
      >
        *Maximum 10 locations for 1 route
      </p>
      <el-scrollbar height="535px">
        <ul
          class="w-[450px] mb-4 flex items-center justify-between pb-2"
          v-for="(el, index) in listLocations"
        >
          <li class="list-disc list-inside">
            <span class="font-bold">Location {{ index + 1 }}</span>
            <div class="">
              <div class="grow flex items-center">
                <span>Description:</span>
                <el-input
                  v-model="listLocations[index].label"
                  v-if="+index !== 0"
                  class="!w-[300px] !h-8 text-sm ml-2"
                ></el-input>
              </div>
            </div>
            <div>
              Address:
              <ListLocations :coordinate="el.coordinates" :key="index" />
            </div>
          </li>
          <img
            v-if="+index !== 0"
            src="~/assets/images/admin/delete-item-icon.svg"
            class="w-6 h-6 mr-4 hover:cursor-pointer"
            @click="handleRemoveLocation(+index)"
          />
        </ul>
      </el-scrollbar>
      <!-- <div>{{ listLocations }}</div> -->
    </div>
    <el-button
      type="primary"
      @click="emits('closeChoseLocations')"
      class="absolute bottom-4 right-4"
    >
      OK
    </el-button>
  </div>
</template>

<script setup lang="ts">
import mapboxgl, { LngLat, Marker } from 'mapbox-gl';

definePageMeta({
  layout: 'admin-have-sidebar',
});

interface Emits {
  (event: 'update:locations', form: any): void;
  (event: 'closeChoseLocations'): void;
}
const emits = defineEmits<Emits>();
const props = defineProps({
  locations: {
    type: Object,
    default: false,
  },
});
const isMapLoaded = ref(false);
const handleMapLoad = () => {
  isMapLoaded.value = true;
};

const listLocations = computed({
  get: () => props.locations,
  set: (val: object) => {
    emits('update:locations', val);
  },
});
const tempLocation = ref<any>([]);
const tempDescription = ref();
const mapboxKey = ref(
  'pk.eyJ1IjoiYmV0YXBjaG9pMTBrIiwiYSI6ImNrY2ZuaWEwNjA2ZW0yeWw4bG9yNnUyYm0ifQ.bFCQ-5yq6cSsrhugfxO2_Q',
);
const defaultLocation = await useBaseFetch('/configurations', {
  query: {
    key: 'location',
  },
});

if (listLocations.value.length === 0) {
  const temp = defaultLocation.data.value.data.value;
  listLocations.value = [temp];
}

// Define coordinates for your points
// var coordinates = [
//   { coordinates: [-74.075572, 40.782969], label: 'Point 1' },
//   { coordinates: [-74.029175, 40.755444], label: 'Point 2' },
//   { coordinates: [-74.056399, 40.763194], label: 'Point 3' },
//   { coordinates: [-74.074275, 40.778247], label: 'Point 4' },
// ];

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

const handleAddTemporaryLocation = async () => {
  const td = [tempLocation.value.longitude, tempLocation.value.latitude];
  listLocations.value = [
    ...listLocations.value,
    { coordinates: td, label: tempDescription.value },
  ];
  mapboxId.value = '';
  tempDescription.value = '';
};

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
  // console.log(result.data.value.features[0].properties.coordinates);
  tempLocation.value = result.data.value.features[0].properties.coordinates;
};

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
  if (coordinates.length === 0) {
    return [106.2780998, 15.9026468];
  }
  let kt = 0,
    vt = 0;
  for (let i = 0; i < coordinates.length; i++) {
    kt += coordinates[i].coordinates[0];
    vt += coordinates[i].coordinates[1];
  }

  return [kt / coordinates.length, vt / coordinates.length];
};

const handleMapClick = (event: any) => {
  if (listLocations.value.length === 10) {
    return;
  }
  const coordinates = event.lngLat;
  // if (listLocations.value.length > 1) {
  //   const lastItem = listLocations.value[listLocations.value.length - 1];
  //   if (lastItem === defaultLocation.data.value.data.value) {
  //     listLocations.value.pop();
  //   }
  // }
  // listLocations.value = [
  //   ...listLocations.value,
  //   {
  //     coordinates: [coordinates.lng, coordinates.lat],
  //     label: '',
  //   },
  //   defaultLocation.data.value.data.value,
  // ];

  listLocations.value = [
    ...listLocations.value,
    {
      coordinates: [coordinates.lng, coordinates.lat],
      label: '',
    },
  ];
};

const handleRemoveLocation = (index: number) => {
  listLocations.value.splice(index, 1);
};

const points = [
  [105.8544441, 21.0294498],
  [105.8544441, 21.0394498],
  [105.8644441, 21.0394498],
  [105.8644441, 21.0294498],
];
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
