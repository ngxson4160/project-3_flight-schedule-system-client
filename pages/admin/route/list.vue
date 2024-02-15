<template>
  <div class="mb-4 text-right">
    <el-button @click="isShowAddSchedule = true">
      <span class="font-normal">+ New Route</span>
    </el-button>
  </div>
  <el-dialog
    v-model="isShowAddSchedule"
    align-center
    class="dialog-confirn-edit-tag pc:!w-[550px] !rounded-xl"
    :before-close="handleClose"
  >
    <p class="font-bold text-[20px] mb-10 text-black text-center">
      Add new Route
    </p>
    <AddRoute v-if="isShowAddSchedule" @close-add-route="handleCloseAddRoute" />
  </el-dialog>
  <div class="flex flex-wrap">
    <el-card
      v-for="(el, index) in listRoute"
      class="ml-10 p-4 w-[365px] mb-8 hover:cursor-pointer"
      @click="routerPush(`/admin/route/${el.id}`)"
    >
      <template #header>
        <div class="flex items-center justify-between mb-2">
          <div class="card-header font-bold text-[20px]">
            <p>{{ el.name }}</p>
          </div>
          <div class="flex">
            <img
              class="w-5 h-5 hover:cursor-pointer"
              src="~/assets/images/admin/edit-icon.svg"
            />
            <img
              class="w-5 h-5 ml-6 hover:cursor-pointer"
              src="~/assets/images/admin/bin-icon.svg"
              @click.stop="handleDeleteRoute(el.id)"
            />
          </div>
        </div>
      </template>
      <div class="flex justify-between items-center">
        <div>
          <div class="text item">Length: {{ el.flightLength }} Km</div>
          <div class="text item">Type: {{ el.type }}</div>
          <div class="text item">Price: {{ el.price }}$</div>
          <div class="text item">Duration: {{ el.duration }}s</div>
          <div class="text item">Locations: {{ el.locations.length }}</div>
          <!-- <div class="text item">Description: {{ el.description }}</div> -->
        </div>
        <div class="w-[180px] h-[180px] relative" @click.stop="">
          <MapboxMap
            :map-id="'map0' + index"
            style="position: absolute; top: 0; bottom: 0; left: 0; width: 100%"
            :options="{
              style: 'mapbox://styles/mapbox/streets-v11', // style URL
              center: getCoordinateCenter(el.locations), // starting position
              zoom: 13, // starting zoom
            }"
            @load="handleMapLoad"
          >
            <div v-if="isMapLoaded">
              <MapboxSource
                :source-id="'line-source0' + index"
                :source="{
                  type: 'geojson',
                  data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                      type: 'LineString',
                      coordinates: getLineCoordinates(el.locations),
                    },
                  },
                }"
              />
              <MapboxLayer
                :layer="{
                  id: 'line-source0' + index,
                  type: 'line',
                  source: 'line-source0' + index,
                  layout: { 'line-cap': 'round', 'line-join': 'round' },
                  paint: { 'line-color': '#FF5733', 'line-width': 5 },
                }"
              />
            </div>

            <MapboxDefaultMarker
              v-for="(elTest, indexTest) in getListCoordinates(el.locations)"
              :lnglat="elTest"
              :class="index.toString() + indexTest.toString()"
              :marker-id="index.toString() + indexTest.toString()"
            />
          </MapboxMap>
        </div>
      </div>
      <!-- <template #footer>Footer content</template> -->
    </el-card>
    <DialogConfirmDelete
      v-model:dialog-visible="isShowDialogConfirmDelete"
      text-confirm="Confirm"
      text-cancel="Cancel"
      title="Are you sure you want to delete this route?"
      @event-confirm="handleConfirmDelete()"
      @event-cancel="isShowDialogConfirmDelete = !isShowDialogConfirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouteStore } from '@/stores/route';
import { LngLat } from 'mapbox-gl';
import EditIcon from '~/assets/images/admin/edit-icon.svg';
definePageMeta({
  layout: 'admin-have-sidebar',
});

const isMapLoaded = ref(false);

const handleMapLoad = () => {
  isMapLoaded.value = true;
};

const routeStore = useRouteStore();
const isShowAddSchedule = ref(false);

const listRoute = ref<any>({});
listRoute.value = await routeStore.getListData();
const isShowDialogConfirmDelete = ref(false);
const idDelete = ref();

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

// const test = coordinates.map((el) => {
//   return new LngLat(el.coordinates[0], el.coordinates[1]);
// });
// var lineCoordinates = coordinates.map(function (point: any) {
//   return point.coordinates;
// });

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

const handleDeleteRoute = async (id: number) => {
  isShowDialogConfirmDelete.value = true;
  idDelete.value = id;
  // await routeStore.deleteRoute(id);
  // listRoute.value = await routeStore.getListData();
};

const handleConfirmDelete = async () => {
  await routeStore.deleteRoute(idDelete.value);
  listRoute.value = await routeStore.getListData();
  isShowDialogConfirmDelete.value = false;
};

const handleCloseAddRoute = async () => {
  isShowAddSchedule.value = false;
  listRoute.value = await routeStore.getListData();
};
</script>

<style scoped></style>
