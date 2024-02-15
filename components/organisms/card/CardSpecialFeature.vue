<template>
  <div>
    <el-card
      class="h-[240px] cursor-pointer"
      @click="handleGoToSpecialFeatureDetail(data.id)"
    >
      <div class="relative rounded-t-xl">
        <img
          v-if="data.imgUrl.includes('http')"
          :alt="data.title"
          :src="data.imgUrl"
          class="w-full pc:!h-[120px] !h-[116px] object-cover rounded-t-xl"
        />
        <img
          v-else
          :alt="data.title"
          src="~/assets/images/img-card-blog.jpeg"
          class="w-full pc:!h-[120px] !h-[116px] object-cover rounded-t-xl"
        />
      </div>
      <div class="px-4 py-2 rounded-b-xl">
        <p
          class="font-bold text-[16px] text-overflow break-all"
          style="line-height: 170%"
        >
          {{ data.title }}
        </p>
        <div class="top-4 left-4 right-4 flex justify-between items-start mt-2">
          <div class="flex">
            <div v-for="(tag, index) in data.tags" :key="index" class="">
              <p
                v-if="index < 2"
                class="text-primary text-xs bg-white px-2 py-1 rounded mr-2 border-[1px] border-primary max-w-[130px] tracking-wider truncate"
              >
                {{ tag }}
              </p>
            </div>

            <div v-if="data.tags && data.tags.length > 3">
              <el-tooltip
                class="box-item"
                effect="light"
                :content="data.tags.join(',')"
                placement="top"
              >
                <p
                  class="text-primary text-xs bg-white px-2 py-1 rounded mr-2 border-[1px] border-primary max-w-[130px] tracking-wider truncate"
                >
                  ...
                </p>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { IDataCardSpecialFeature } from '~~/utils/interface';
import { useUser } from '~~/composables/auth/useUser';
import { useEmployer } from '~~/composables/auth/useEmployer';

const props = defineProps({
  data: {
    type: Object as PropType<IDataCardSpecialFeature>,
    default: () => ({
      id: 0,
      imgUrl: '',
      title: '',
      tags: [],
    }),
  },
});
const handleGoToSpecialFeatureDetail = (id: number) => {
  const cookieSessionAuth = useCookie('auth.session-token').value;
  if (cookieSessionAuth) {
    const isUser = useUser();
    const isEmployer = useEmployer();
    if (isUser) return navigateTo(`/user/special-feature/${id}`);
    if (isEmployer) return navigateTo(`/employer/special-feature/${id}`);
  } else return navigateTo(`/special-feature/${id}`);
};
</script>
<style lang="scss">
.text-overflow {
  -webkit-line-clamp: 2;
}
</style>
