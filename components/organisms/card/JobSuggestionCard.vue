<template>
  <div
    class="p-4 relative rounded-xl border border-gray-third flex flex-col gap-2 justify-between"
    @click="routerPush(`/job/${job.id}`)"
  >
    <div>
      <p
        class="text-xs font-bold py-1 px-2 border border-gray-third rounded inline-block max-w-[240px] break-words"
      >
        {{ job.jobCategory.name }}
      </p>
      <div
        class="w-10 h-10 flex items-center justify-center rounded-full bg-[#F1F2F3] cursor-pointer absolute top-4 right-4"
        @click.stop
        @click.prevent="handleClick"
      >
        <img src="~/assets/images/icon-save-gray.svg" class="w-4 h-4" alt="" />
      </div>

      <div
        class="mt-2 font-bold text-black text-overflow line-clamp-3 max-w-[240px] break-words"
      >
        {{ job.title }}
      </div>
    </div>
    <div class="flex items-center gap-1 text-sm">
      <img
        :src="job.creator.avatarURL"
        class="h-10 w-10 rounded-full border border-gray-third"
        alt=""
      />
      <p>
        {{
          job.creator?.governmentOffice?.name ?? job.creator?.government?.name
        }}
      </p>
    </div>
  </div>
  <UnregisteredAlert
    v-model:dialog-visible="dialogAlert"
    @event-cancel="dialogAlert = false"
  />
</template>

<script setup lang="ts">
defineProps({
  job: {
    type: Object,
    required: true,
  },
});
const cookieSessionAuth = useCookie('auth.session-token').value;
const dialogAlert = ref(false);

const handleClick = () => {
  if (!cookieSessionAuth) {
    dialogAlert.value = true;
  }
};
</script>

<style scoped lang="scss">
.job-tag {
  @apply px-2 py-1 text-primary rounded text-xs border border-solid border-primary;
}
.truncate-texts {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
