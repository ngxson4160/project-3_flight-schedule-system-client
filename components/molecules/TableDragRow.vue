<template>
  <div class="w-full">
    <div class="border-[2px] border-gray-third rounded-lg overflow-hidden">
      <div
        class="flex items-center w-full px-6 h-14 bg-white border-b-2 border-gray-third gap-x-4"
      >
        <div
          v-for="(label, index) in titleHeader"
          :key="index"
          :class="{ grow: !columnHeaderWidth[index] }"
          :style="{ width: `${columnHeaderWidth[index]}px` }"
        >
          <p class="font-bold text-xs">{{ label }}</p>
        </div>
      </div>
      <div
        v-if="!dataTable || dataTable.length === 0"
        class="bg-white text-gray-text text-sm h-[60px] flex items-center justify-center rounded-b-lg"
      >
        <span>データがありません。</span>
      </div>

      <draggable
        v-model="dataTable"
        tag="ul"
        :move="onDragStart"
        draggable=".item-active"
        :disabled="isDisabled"
      >
        <template #item="{ element: item, index: index }">
          <div
            class="flex items-center h-14 px-6 hover:bg-[#F5F7FA]"
            :class="{
              'bg-[#FAFAFA]': index % 2 !== 0,
              'bg-white': index % 2 === 0,
              'border-b border-color-border': index !== dataTable.length - 1,
              'item-active': isMouseDown,
              'hover:cursor-pointer': isClickRow,
            }"
            @mousemove="handleMouseDown"
            @click="handleClickRow(item)"
          >
            <img
              v-if="!isDisabled"
              src="~/assets/images/admin/sort-row.svg"
              alt=""
              class="w-6 h-6 mr-4"
              :class="{
                'hover:cursor-pointer': isDisabled,
                'hover:cursor-move': !isDisabled,
              }"
              @mousemove.stop="handleDragByIcon"
            />
            <div class="flex w-full gap-x-4">
              <slot :name="`${index}`"></slot>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';

interface IEmits {
  (event: 'drag-row', params: any): void;
  (event: 'update:tableData', val: any): void;
  (event: 'click-row', val: any): void;
}

interface IProps {
  tableData: Object[];
  tableHeader: string[];
  columnWidth: number[];
  isClickRow?: boolean;
  isDisabled?: false;
}

const emits = defineEmits<IEmits>();
const props = defineProps<IProps>();

const draggedInfo = ref({});
const relatedInfo = ref({});
const isMouseDown = ref(false);

const dataTable = computed({
  get: () => props.tableData,
  set: (val) => {
    if (isMouseDown.value) {
      emits('drag-row', {
        draggedInfo: draggedInfo.value,
        relatedInfo: relatedInfo.value,
      });
      emits('update:tableData', val);
    }
  },
});

const titleHeader = ref(props.tableHeader);
const columnHeaderWidth = ref(props.columnWidth);

if (props.isDisabled) {
  titleHeader.value = props.tableHeader.slice(1);
  columnHeaderWidth.value = props.columnWidth.slice(1);
}

watch(
  () => props.isDisabled,
  (newValue) => {
    if (newValue) {
      titleHeader.value = props.tableHeader.slice(1);
      columnHeaderWidth.value = props.columnWidth.slice(1);
    } else {
      titleHeader.value = props.tableHeader;
      columnHeaderWidth.value = props.columnWidth;
    }
  },
);

const onDragStart = (evt: any) => {
  if (evt) {
    draggedInfo.value = evt.draggedContext.element;
    relatedInfo.value = evt.relatedContext.element;
  }
};

const handleDragByIcon = () => {
  isMouseDown.value = true;
};

const handleMouseDown = () => {
  isMouseDown.value = false;
};

const handleClickRow = (row: any) => {
  emits('click-row', row);
};
</script>

<style scoped lang="scss"></style>
