<template>
  <div>
    <p
      v-if="!props.applicantEntry.settingQuestions?.length"
      class="text-base leading-[150%] font-bold"
    >
      エントリー情報なし
    </p>

    <!-- <div v-if="props.applicantEntry?.motivation" class="mb-16">
      <p class="text-base font-bold leading-[150%]">志望動機</p>
      <p
        class="label-custom-break-line whitespace-pre-line text-sm leading-[170%] mt-4"
      >
        {{
          props.applicantEntry?.motivation
            ? props.applicantEntry?.motivation
            : ''
        }}
      </p>
    </div>

    <div v-if="props.applicantEntry?.selfPr" class="mb-16">
      <p class="text-base font-bold leading-[150%]">自己PR</p>
      <p
        class="label-custom-break-line whitespace-pre-line text-sm leading-[170%] mt-4"
      >
        {{ props.applicantEntry?.selfPr ? props.applicantEntry?.selfPr : '' }}
      </p>
    </div> -->

    <div
      v-for="(item, index) in props.applicantEntry.settingQuestions"
      :key="item"
    >
      <div
        v-if="item.content.trim() !== ''"
        :class="{
          'mb-16': index !== props.applicantEntry.settingQuestions.length - 1,
        }"
      >
        <p
          class="label-custom-break-line whitespace-pre-line text-base font-bold leading-[150%]"
        >
          {{ item.title }}
        </p>
        <p
          v-if="item.typeQuestion === EFormEntry.FREE_SETTING && item.content"
          class="text-primary cursor-pointer mt-4 text-sm underline underline-offset-4"
          @click="handleOpenNewTab(item.content)"
        >
          {{ item?.fileName ?? 'ファイルを確認する' }} ({{
            getFileExtensionFromUrl(item.content)
          }}:{{ item.fileSize }}KB)
        </p>

        <div v-else class="mt-4">
          <ul v-if="item.typeQuestion === EFormEntry.FREE_CHOICE_MUTIPLE">
            <li
              v-for="(el, indexEl) in item.content.split(', ')"
              :key="indexEl"
              class="whitespace-pre-line break-words label-custom-break-line text-sm"
              :class="{ 'mt-2': indexEl !== 0 }"
            >
              {{ el }}
            </li>
          </ul>

          <p
            v-else-if="item.typeQuestion === EFormEntry.DEFAULT"
            class="whitespace-pre-line break-words label-custom-break-line text-sm"
          >
            {{ item.content }}
          </p>

          <ul v-else>
            <li
              v-for="(el, indexEl) in item.content.split(', ')"
              :key="indexEl"
              class="whitespace-pre-line break-words label-custom-break-line text-sm"
              :class="{ 'mt-2': indexEl !== 0 }"
            >
              {{ el }}
            </li>
          </ul>
        </div>
        <div
          v-if="
            item.typeQuestion === EFormEntry.FREE_CHOICE &&
            item?.subFormQuestionRadio
          "
          class="mt-16"
        >
          <div v-if="item.subFormQuestionRadio.content.trim() !== ''">
            <p
              class="label-custom-break-line whitespace-pre-line text-base font-bold leading-[150%]"
            >
              {{ item.subFormQuestionRadio.title }}
            </p>
            <p
              v-if="
                item.subFormQuestionRadio.typeQuestion ===
                  EFormEntry.FREE_SETTING && item.subFormQuestionRadio.content
              "
              class="text-primary cursor-pointer mt-4 text-sm underline underline-offset-4"
              @click="handleOpenNewTab(item.subFormQuestionRadio.content)"
            >
              {{ item?.fileName ?? 'ファイルを確認する' }} ({{
                getFileExtensionFromUrl(item.subFormQuestionRadio.content)
              }}:{{ item.subFormQuestionRadio.fileSize }}KB)
            </p>

            <div v-else class="mt-4">
              <ul
                v-if="
                  item.subFormQuestionRadio.typeQuestion ===
                  EFormEntry.FREE_CHOICE_MUTIPLE
                "
              >
                <li
                  v-for="(
                    el, indexEl
                  ) in item.subFormQuestionRadio.content.split(', ')"
                  :key="indexEl"
                  class="whitespace-pre-line break-words label-custom-break-line text-sm"
                  :class="{ 'mt-2': indexEl !== 0 }"
                >
                  {{ el }}
                </li>
              </ul>

              <p
                v-else-if="
                  item.subFormQuestionRadio.typeQuestion === EFormEntry.DEFAULT
                "
                class="whitespace-pre-line break-words label-custom-break-line text-sm"
              >
                {{ item.subFormQuestionRadio.content }}
              </p>

              <ul v-else>
                <li
                  v-for="(
                    el, indexEl
                  ) in item.subFormQuestionRadio.content.split(', ')"
                  :key="indexEl"
                  class="whitespace-pre-line break-words label-custom-break-line text-sm"
                  :class="{ 'mt-2': indexEl !== 0 }"
                >
                  {{ el }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EFormEntry } from '~/utils/enum';

const props = defineProps({
  applicantEntry: {
    type: Object,
    default: () => {},
  },
});
</script>

<style scoped></style>
