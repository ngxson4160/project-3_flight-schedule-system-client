<template>
  <!-- <div class="py-2 hover:cursor-pointer">
    <el-card
      class="hover:cursor-pointer"
      @click="routerPush('/employer/message/list')"
    >
      <div class="pc:p-6 p-4 flex items-center justify-between">
        <div class="text-sm pc:flex items-center grow pr-2">
          <div class="flex items-center mobile:justify-between">
            <div class="flex items-center">
              <img src="~/assets/images/icon-user-red.svg" alt="" />
              <p
                class="pc:w-[200px] w-[183px] pl-4 pr-6 font-bold whitespace-nowrap"
              >
                未対応のエントリー
              </p>
            </div>
            <p
              v-if="countEntry > 0"
              class="py-[2px] px-2 bg-danger rounded-[20px] text-center text-white font-bold whitespace-nowrap"
            >
              {{ countEntry }}件
            </p>
          </div>
          <div v-if="false" class="flex items-center pc:pl-6 grow mobile:pt-2">
            <p class="whitespace-nowrap">一次面接についてのご案内</p>
            <p class="text-gray px-1 whitespace-nowrap">-</p>
            <p
              class="text-gray pc:w-[468px] w-[114px] whitespace-nowrap text-ellipsis overflow-hidden"
            >
              お世話になっております。〇〇の田中花子と申します。一次面接につ...
            </p>
          </div>
        </div>
        <img src="~/assets/images/icon-keyboard-arrow-right-black.svg" alt="" />
      </div>
    </el-card>
  </div> -->
  <div class="py-2">
    <el-card
      class="hover:cursor-pointer"
      @click="routerPush('/employer/message/list?type=2')"
    >
      <div class="pc:p-6 p-4 flex items-center justify-between">
        <div class="text-sm pc:flex items-center grow pr-2">
          <div class="flex items-center mobile:justify-between">
            <div class="flex items-center">
              <img src="~/assets/images/icon-new-email-red.svg" alt="" />
              <p
                class="pc:w-[200px] w-[183px] pl-4 pr-6 font-bold whitespace-nowrap"
              >
                未読のメッセージ
              </p>
            </div>
            <p
              v-if="countMessageUnread > 0"
              class="py-[2px] px-2 bg-danger rounded-[20px] text-center text-white font-bold whitespace-nowrap"
            >
              {{ countMessageUnread }}件
            </p>
          </div>
          <div
            v-if="countMessageUnread > 0"
            class="flex items-center pc:pl-6 grow mobile:pt-2 pc:max-w-[656px] mobile:w-full"
          >
            <div
              class="whitespace-nowrap pc:max-w-[400px] max-w-[200px] label-custom-break-line line-clamp-1 flex-shrink-0"
              v-html="titleMessageUnread"
            ></div>
            <p class="text-gray px-1 whitespace-nowrap">-</p>
            <div
              class="text-gray whitespace-pre-line overflow-hidden line-clamp-1"
              v-html="contentMessageUnread"
            ></div>
          </div>
        </div>
        <img src="~/assets/images/icon-keyboard-arrow-right-black.svg" alt="" />
      </div>
    </el-card>
  </div>
  <div class="py-2 hover:cursor-pointer">
    <el-card
      class="hover:cursor-pointer"
      @click="routerPush('/employer/message/list?type=1')"
    >
      <div class="pc:p-6 p-4 flex items-center justify-between">
        <div class="text-sm pc:flex items-center grow pr-2">
          <div class="flex items-center mobile:justify-between">
            <div class="flex items-center">
              <img src="~/assets/images/icon-warning-red.svg" alt="" />
              <p
                class="pc:w-[200px] w-[183px] pl-4 pr-6 font-bold whitespace-nowrap"
              >
                未対応のメッセージ
              </p>
            </div>
            <p
              v-if="countMessageUnanswer > 0"
              class="py-[2px] px-2 bg-danger rounded-[20px] text-center text-white font-bold whitespace-nowrap"
            >
              {{ countMessageUnanswer }}件
            </p>
          </div>
          <div
            v-if="countMessageUnanswer > 0"
            class="flex items-center pc:pl-6 grow mobile:pt-2 pc:max-w-[656px] mobile:w-full"
          >
            <div
              class="whitespace-nowrap pc:max-w-[400px] max-w-[200px] label-custom-break-line line-clamp-1 flex-shrink-0"
              v-html="titleMessageUnanswer"
            ></div>
            <p class="text-gray px-1 whitespace-nowrap">-</p>
            <div
              class="text-gray whitespace-pre-line overflow-hidden line-clamp-1"
              v-html="contentMessageUnanswer"
            ></div>
          </div>
        </div>
        <img src="~/assets/images/icon-keyboard-arrow-right-black.svg" alt="" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { IResponse } from '~~/utils/interface';
import { EMessageType, EMemberType } from '~~/utils/enum';

const countEntry = ref<number>(0);

const countMessageUnanswer = ref<number>(0);
const titleMessageUnanswer = ref<string>('');
const contentMessageUnanswer = ref<string>('');

const countMessageUnread = ref<number>(0);
const titleMessageUnread = ref<string>('');
const contentMessageUnread = ref<string>('');

const dataStorage = useCookie('auth.system-data');
let isBlogEmployer = false;
if (dataStorage.value) {
  handleJWTDecrypt(dataStorage.value).memberType === EMemberType.MEMBER_BLOGGER
    ? (isBlogEmployer = true)
    : (isBlogEmployer = false);
}

if (!isBlogEmployer) {
  const { data, error } = await useBaseFetch('/messages/count', {});
  if (error.value?.data) {
    throw error.value?.data;
  } else {
    const response = data.value as IResponse;

    countEntry.value = response.data?.entryUnansweredMessages?.count;

    countMessageUnanswer.value = response.data?.unansweredMessages?.count;
    titleMessageUnanswer.value =
      response.data?.unansweredMessages?.message?.lastMessage?.titleEmployer;
    if (
      response.data?.unansweredMessages?.message?.lastMessage?.messageType ===
      EMessageType.ENTRY
    )
      contentMessageUnanswer.value =
        '以下の求人にエントリーが届きました。ユーザー情報を確認して、返信しましょう。';
    else
      contentMessageUnanswer.value =
        response.data?.unansweredMessages?.message?.lastMessage?.content;

    countMessageUnread.value = response.data?.countUnreadMessages?.count;
    titleMessageUnread.value =
      response.data?.countUnreadMessages?.message?.titleEmployer;
    if (
      response.data?.countUnreadMessages?.message?.messageType ===
      EMessageType.ENTRY
    )
      contentMessageUnread.value =
        '以下の求人にエントリーが届きました。ユーザー情報を確認して、返信しましょう。';
    else
      contentMessageUnread.value =
        response.data?.countUnreadMessages?.message?.content;
  }
}
</script>

<style scoped></style>
