<template>
  <ClientOnly>
    <div class="w-full block relative">
      <div
        class="relative"
        :class="{
          'pc:h-[427px] h-[192px] rounded-xl bg-gray-fifth': dataImage === '',
        }"
      >
        <el-image
          v-if="dataImage !== ''"
          :src="dataImage"
          class="rounded-xl w-full pc:max-h-[427px] max-h-[192px]"
        />

        <div
          v-if="dataImage && opacity"
          class="background-overlay pc:max-h-[427px] max-h-[192px] h-full rounded-xl"
        ></div>
        <div
          class="absolute top-0 w-full flex items-center justify-center h-full mobile:!hidden"
        >
          <div
            class="border-2 border-solid border-white flex justify-center items-center w-[256px] h-14 rounded-xl cursor-pointer"
            :class="{ 'form-background': !opacity }"
            @click="fileInput?.click()"
          >
            <span
              class="text-base font-bold tracking-wider leading-normal text-white"
            >
              {{ button }}
            </span>
          </div>
        </div>
      </div>

      <el-button
        class="w-full !bg-transparent !text-primary !border-2 mt-2 pc:!hidden"
        type="primary"
        plain
        @click="fileInput?.click()"
      >
        {{ button }}
      </el-button>

      <input
        ref="fileInput"
        class="hidden"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        @change="uploadBackground"
      />

      <h1 class="text-danger text-xs">{{ messageError }}</h1>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { uploadFileStore } from '@/stores/upload';

const fileInput = ref<HTMLInputElement>();

const props = defineProps({
  modelValue: {
    type: String,
    default: () => '',
  },
  size: {
    type: String,
    default: 'large',
  },
  button: {
    type: String,
    default: '画像を設定',
  },
  opacity: {
    type: Boolean,
    default: false,
  },
  backgroundOverlay: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'exportFileName']);
const { uploadFiles } = uploadFileStore();
const messageError = ref('');

const dataImage = computed<any>({
  get: () => props.modelValue,
  set: (val: any) => {
    return val;
  },
});

const uploadBackground = async (e: any) => {
  if (!e.target.files?.length) return;

  const formData = new FormData();
  const file = e.target.files[0];
  const typeImg = ['image/jpeg', 'image/png', 'image/webp'];
  const isCheckType = typeImg.includes(file.type);
  emit('exportFileName', file.name);
  if (file.size / 1024 / 1024 > 10) {
    messageError.value = 'ファイルサイズが10MBを超えています';
    return;
  } else if (!isCheckType) {
    messageError.value = 'JPGもしくはPNG形式のみサポートされています';
    return;
  } else {
    messageError.value = '';
  }

  formData.append('file', file);
  if (fileInput.value) {
    fileInput.value.value = '';
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    dataImage.value = e.target?.result;
  };

  const response = await uploadFiles(formData);
  if (response) {
    emit('update:modelValue', response);
  }
};
</script>

<style lang="scss" scoped>
.form-background {
  background-color: rgb(24 23 23 / 59%);
}
</style>
