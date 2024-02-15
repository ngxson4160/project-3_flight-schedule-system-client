<template>
  <div class="social-button" :class="{ 'bg-white': bordered }" @click="share">
    <div
      :class="`flex justify-center items-center h-10 w-10 ${classTwitter} ${
        bordered && sns === 'twitter'
          ? 'bg-black h-6 w-6 rounded-full'
          : sns === 'twitter'
          ? 'bg-black rounded-full mobile:!w-8 mobile:!h-8'
          : bordered
          ? 'h-6 w-6'
          : ''
      }`"
    >
      <img
        :class="`cursor-pointer h-10 w-10 mobile:w-8 mobile:h-8 ${
          bordered && sns === 'twitter'
            ? 'h-3 w-3 mobile:!h-3 mobile:!w-3'
            : sns === 'twitter'
            ? '!w-5 !h-5 mobile:!w-4 mobile:!h-4'
            : bordered
            ? '!h-6 !w-6'
            : ''
        }`"
        :src="icon"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { FACEBOOK_SHARE_URL, TWITTER_SHARE_URL } from '~/constants';
import facebook from '~/assets/images/facebook-icon.svg';
import twitter from '~/assets/images/logo-twitter.svg';

const props = defineProps({
  sns: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  classTwitter: {
    type: String,
    default: '',
  },
});

const icon = computed(() => {
  if (props.sns === 'twitter') return twitter;

  if (props.sns === 'facebook') return facebook;

  return '';
});

const share = () => {
  let shareUrl = '';
  switch (props.sns) {
    case 'facebook':
      shareUrl = `${FACEBOOK_SHARE_URL}?u=${props.url}`;
      break;

    case 'twitter':
      shareUrl = `${TWITTER_SHARE_URL}?text=${props.title}%0D%0A&url=${props.url}`;
      break;
  }

  window.open(shareUrl, '_blank');
};
</script>

<style scoped scss="scss">
.social-button {
  @apply w-10 h-10 rounded-full flex items-center justify-center cursor-pointer;
}
</style>
