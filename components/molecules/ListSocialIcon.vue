<template>
  <div class="flex items-center mt-6 mobile:mt-4">
    <a v-if="socialLinks?.twitter" :href="socialLinks?.twitter" target="_blank">
      <img src="~/assets/images/x-icon.svg" alt="" class="h-[29px] w-[29px]" />
    </a>
    <a
      v-if="socialLinks?.facebook"
      :href="socialLinks?.facebook"
      target="_blank"
    >
      <img
        src="~/assets/images/facebook-icon.svg"
        alt=""
        class="ml-4 h-[29px] w-[29px]"
      />
    </a>
    <a
      v-if="socialLinks?.instagram"
      :href="socialLinks?.instagram"
      target="_blank"
    >
      <img
        src="~/assets/images/instagram-icon.svg"
        alt=""
        class="ml-4 h-[29px] w-[29px]"
      />
    </a>
    <a v-if="socialLinks?.youTube" :href="socialLinks?.youTube" target="_blank">
      <img
        src="~/assets/images/youtube-icon.svg"
        alt=""
        class="ml-4 h-[17px] w-6"
      />
    </a>
    <a v-if="socialLinks?.note" :href="socialLinks?.note" target="_blank">
      <img
        src="~/assets/images/note-icon.svg"
        alt=""
        class="ml-4 h-[29px] w-[29px]"
      />
    </a>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  socialLinks: {
    type: Object,
    required: false,
  },
});
</script>

<style scoped></style>
