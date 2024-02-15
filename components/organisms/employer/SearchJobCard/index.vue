<template>
  <div
    class="w-full search-jobs p-6 mobile:p-0 bg-white rounded-xl border-2 border-gray-third mobile:border-none"
  >
    <div class="border-b border-gray-third flex pb-4 mobile:hidden">
      <div
        class="flex justify-start gap-4 flex-1 flex-shrink-0 pr-6 border-r border-gray-third"
      >
        <p
          class="text-sm w-[64px] flex-shrink-0 font-bold mt-[2px]"
          :class="{ '!mt-2': checkListPrefecture.length > 0 }"
        >
          職種
        </p>
        <div class="">
          <div
            v-for="(item, index) in checkListPrefecture"
            :key="index"
            class="py-1 px-2 bg-secondary rounded inline-block mr-2 my-1"
            :class="{ 'hidden ': !getNameJobById(item) }"
          >
            <p
              class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
            >
              {{ getNameJobById(Number(item)) }}
            </p>
            <img
              src="~/assets/images/icon-close-black-16.svg"
              class="inline mb-[2px] ml-[2px] cursor-pointer"
              @click="removeItemInCheckListPrefecture(Number(item))"
            />
          </div>
          <div class="inline-block">
            <div class="flex gap-1 items-center">
              <p class="text-[14px] font-bold text-gray">追加</p>
              <el-dropdown trigger="click">
                <img src="~/assets/images/icon-plus-bg-blue.svg" />
                <template #dropdown>
                  <div class="pl-4 pr-1 py-2 w-[342px]">
                    <el-checkbox-group
                      v-model="checkListPrefecture"
                      class="options-jobcategory-custom checkbox-group-custom custom-scroll-bar"
                    >
                      <el-collapse
                        v-for="(item, index) in jobOptions"
                        :key="index"
                        class="mb-4 rounded-lg !border-0"
                        accordion
                      >
                        <el-collapse-item>
                          <template #title>
                            <p class="text-[14px] font-bold text-black">
                              {{ item.name }}
                            </p>
                          </template>
                          <div class="pl-4">
                            <el-checkbox
                              :label="{
                                label: `${item.name}すべて`,
                                value: item.jobCategories,
                              }"
                            >
                              <span>{{ item.name }}すべて</span>
                            </el-checkbox>
                            <el-checkbox
                              v-for="option in item.jobCategories"
                              :key="option.id"
                              :label="option.id"
                            >
                              <span>{{ option.name }}</span>
                            </el-checkbox>
                          </div>
                        </el-collapse-item>
                      </el-collapse>
                    </el-checkbox-group>
                  </div>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-start gap-4 flex-1 flex-shrink-0 pl-6 h-full">
        <p
          class="text-sm w-[64px] flex-shrink-0 font-bold mt-[2px]"
          :class="{ '!mt-2': checkListWorkLocation.length > 0 }"
        >
          勤務地
        </p>
        <div>
          <div
            v-for="(item, index) in checkListWorkLocation"
            :key="index"
            class="py-1 px-2 bg-secondary rounded inline-block mr-2 my-1"
          >
            <p
              class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
            >
              {{ getNameAppealPoint(Number(item)) }}
            </p>
            <img
              src="~/assets/images/icon-close-black-16.svg"
              class="inline mb-[2px] ml-[2px] cursor-pointer"
              @click="removeItemInCheckWorkLocation(item)"
            />
          </div>
          <div class="inline-block">
            <div class="flex gap-1 items-center">
              <p class="text-[14px] font-bold text-gray">追加</p>
              <el-dropdown trigger="click">
                <img src="~/assets/images/icon-plus-bg-blue.svg" />
                <template #dropdown>
                  <div class="pl-4 pr-1 py-2 w-[342px]">
                    <el-checkbox-group
                      v-model="checkListWorkLocation"
                      class="checkbox-group-custom custom-scroll-bar options-appeal-points-custom"
                      @change="changeCheckListWorkLocation"
                    >
                      <el-checkbox
                        v-for="option in props.prefectureOptions"
                        :key="option.id"
                        :label="option.id"
                      >
                        <span>{{ option.name }}</span>
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-b border-gray-third flex py-4 mobile:hidden">
      <div
        class="flex justify-start gap-4 flex-1 flex-shrink-0 pr-6 border-r border-gray-third"
      >
        <p
          class="text-sm w-[64px] flex-shrink-0 font-bold mt-[2px]"
          :class="{ '!mt-2': checkListWorkingStyle.length > 0 }"
        >
          勤務形態
        </p>
        <div>
          <div
            v-for="(item, index) in checkListWorkingStyle"
            :key="index"
            class="py-1 px-2 bg-secondary rounded inline-block mr-2 my-1"
          >
            <p
              class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
            >
              {{ item }}
            </p>
            <img
              src="~/assets/images/icon-close-black-16.svg"
              class="inline mb-[2px] ml-[2px] cursor-pointer"
              @click="removeItemInCheckListWorkingStyle(item)"
            />
          </div>
          <div class="inline-block">
            <div class="flex gap-1 items-center">
              <p class="text-[14px] font-bold text-gray">追加</p>
              <el-dropdown trigger="click">
                <img src="~/assets/images/icon-plus-bg-blue.svg" />
                <template #dropdown>
                  <div class="pl-4 pr-1 py-2 w-[342px]">
                    <el-checkbox-group
                      v-model="checkListWorkingStyle"
                      class="checkbox-group-custom custom-scroll-bar options-appeal-points-custom"
                      @change="changeCheckListWorkingStyle"
                    >
                      <el-checkbox
                        v-for="option in props.employmentForms"
                        :key="option"
                        :label="option"
                      ></el-checkbox>
                    </el-checkbox-group>
                  </div>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-start gap-4 flex-1 flex-shrink-0 pl-6">
        <p
          class="text-sm w-[64px] flex-shrink-0 font-bold mt-[2px]"
          :class="{ '!mt-2': checkListFeatures.length > 0 }"
        >
          特徴
        </p>
        <div class="">
          <div
            v-for="(item, index) in checkListFeatures"
            :key="index"
            class="py-1 px-2 bg-secondary rounded inline-block mr-2 my-1"
          >
            <p
              class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
            >
              {{ item }}
            </p>
            <img
              src="~/assets/images/icon-close-black-16.svg"
              class="inline mb-[2px] ml-[2px] cursor-pointer"
              @click="removeItemInCheckListFeatures(item)"
            />
          </div>
          <div class="inline-block">
            <div class="flex gap-1 items-center">
              <p class="text-[14px] font-bold text-gray">追加</p>
              <el-dropdown trigger="click">
                <img src="~/assets/images/icon-plus-bg-blue.svg" />
                <template #dropdown>
                  <div class="pl-4 pr-1 py-2 w-[342px]">
                    <el-checkbox-group
                      v-model="checkListFeatures"
                      class="checkbox-group-custom custom-scroll-bar options-appeal-points-custom"
                      @change="changeCheckListFeatures"
                    >
                      <el-checkbox
                        v-for="option in props.appealPointOptions"
                        :key="option"
                        :label="option"
                      ></el-checkbox>
                    </el-checkbox-group>
                  </div>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full my-4 input-search border border-gray-third rounded mobile:w-[342px] mobile:mx-auto"
    >
      <el-input
        v-model="searchContent"
        placeholder="キーワードで検索"
        clearable
        @keyup.enter="handleEnter"
      >
        <template #prepend>
          <div>
            <img src="~/assets/images/icon-search-gray.svg" alt="" />
          </div>
        </template>
      </el-input>
    </div>
    <div class="flex justify-between items-center mobile:hidden">
      <div ref="targetHistory" class="w-[320px] relative">
        <div
          class="p-4 bg-secondary rounded hover:cursor-pointer"
          @click="handleOpenListSavedTag"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img src="~/assets/images/icon-list-save-search.svg" alt="" />
              <p class="pl-2 text-[14px] cursor-pointer">保存した検索条件</p>
            </div>
            <img
              class="transform duration-300 transition-all"
              :class="{ 'rotate-180': showContentHistories }"
              src="~/assets/images/expand-more.svg"
              alt=""
            />
          </div>
        </div>
        <div
          v-if="showContentHistories"
          class="dropdowns text-sm w-full mobile:mx-6 rounded-xl bg-white max-h-[320px] overflow-y-auto custom-scroll-bar"
        >
          <div v-if="searchHistories.length !== 0" class="py-2">
            <div
              v-for="(item, index) in searchHistories"
              :key="item.id + index"
              class="flex justify-between p-4 items-center gap-4"
              :class="{
                'border-b border-solid border-color-border':
                  index !== searchHistories.length - 1,
              }"
            >
              <div class="flex-1 break-words">
                <h1
                  class="text-xs font-normal text-black tracking-wider cursor-pointer"
                  @click="applySearchHistory(item)"
                >
                  {{ item.content }}
                </h1>
              </div>

              <div
                class="bg-danger rounded-full cursor-pointer"
                @click="removeHistorySearch(item.id, index)"
              >
                <img src="@/assets/images/icon-remove-23.3.svg" alt="" />
              </div>
            </div>
          </div>

          <div v-else class="text-sm rounded-xl bg-white">
            <div class="py-6 px-4">
              <h1 class="text-sm font-bold tracking-wider text-black mb-4">
                保存されている検索条件はありません
              </h1>
              <p
                class="text-xs font-normal text-black tracking-wider leading-loose"
              >
                検索条件を選択後、「検索条件を保存」ボタンを押すとリストに追加することができます。
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-x-4">
        <button
          class="text-primary underline font-bold w-[88px] text-[14px]"
          @click="resetAllValue()"
        >
          リセット
        </button>
        <button
          class="text-sm p-4 border-primary border-2 rounded-lg text-primary font-bold w-40"
          @click="hanleSaveTagCurrent"
        >
          検索条件を保存
        </button>
        <button
          class="text-sm p-4 bg-primary text-white rounded-lg w-40 font-bold"
          @click="handleSearch()"
        >
          検索
        </button>
      </div>
    </div>
  </div>
  <div class="pc:hidden w-[342px] mx-auto">
    <button
      class="text-sm p-4 w-full bg-primary text-white rounded-lg font-bold transition-all hover:scale-[1.02] hover:shadow-sm"
      @click="drawerSearchJob = true"
    >
      絞り込み検索
    </button>
  </div>
  <div
    v-if="
      checkListPrefecture.length ||
      checkListWorkLocation.length ||
      checkListWorkingStyle.length ||
      checkListFeatures.length
    "
    class="pc:hidden mt-8 p-6 bg-gray-sixth border-y border-gray-third"
  >
    <div class="">
      <h3 class="text-sm font-bold text-gray mb-4">検索条件</h3>
      <div>
        <div
          v-for="(item, index) in checkListPrefecture"
          :key="index"
          class="py-1 px-2 bg-third rounded inline-block mr-2 my-1"
          :class="{ 'hidden ': !getNameJobById(item) }"
        >
          <p
            class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
          >
            {{ getNameJobById(Number(item)) }}
          </p>
          <img
            src="~/assets/images/icon-close-black-16.svg"
            class="inline mb-[2px] ml-[2px] cursor-pointer"
            @click="removeItemInCheckListPrefecture(Number(item), true)"
          />
        </div>
        <div
          v-for="(item, index) in checkListWorkLocation"
          :key="index"
          class="py-1 px-2 bg-third rounded inline-block mr-2 my-1"
        >
          <p
            class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
          >
            {{ getNameAppealPoint(Number(item)) }}
          </p>
          <img
            src="~/assets/images/icon-close-black-16.svg"
            class="inline mb-[2px] ml-[2px] cursor-pointer"
            @click="removeItemInCheckWorkLocation(item, true)"
          />
        </div>
        <div
          v-for="(item, index) in checkListWorkingStyle"
          :key="index"
          class="py-1 px-2 bg-third rounded inline-block mr-2 my-1"
        >
          <p
            class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
          >
            {{ item }}
          </p>
          <img
            src="~/assets/images/icon-close-black-16.svg"
            class="inline mb-[2px] ml-[2px] cursor-pointer"
            @click="removeItemInCheckListWorkingStyle(item, true)"
          />
        </div>
        <div
          v-for="(item, index) in checkListFeatures"
          :key="index"
          class="py-1 px-2 bg-third rounded inline-block mr-2 my-1"
        >
          <p
            class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
          >
            {{ item }}
          </p>
          <img
            src="~/assets/images/icon-close-black-16.svg"
            class="inline mb-[2px] ml-[2px] cursor-pointer"
            @click="removeItemInCheckListFeatures(item, true)"
          />
        </div>
      </div>
    </div>
  </div>

  <client-only>
    <el-drawer
      v-model="drawerSearchJob"
      :with-header="false"
      direction="ttb"
      size="100%"
      class="pb-[104px]"
    >
      <div
        class="w-full h-[66px] bg-white flex justify-between items-center px-6 border-b-[1px] border-gray-third sticky top-0 z-[999]"
      >
        <img
          src="~/assets/images/icon-close-black.svg"
          alt=""
          @click="drawerSearchJob = false"
        />
        <p
          class="text-primary underline text-sm hover:cursor-pointer"
          @click="resetAllValue"
        >
          リセット
        </p>
      </div>
      <div
        class="w-full mt-10 input-search border border-gray-third rounded mobile:w-[342px] mobile:mx-auto"
      >
        <el-input v-model="searchContent" placeholder="キーワードで検索">
          <template #prepend>
            <div>
              <img src="~/assets/images/icon-search-gray.svg" alt="" />
            </div>
          </template>
        </el-input>
      </div>
      <div
        ref="targetHistory"
        class="pc:w-[320px] w-[342px] mobile:mx-auto relative mt-8 border-b border-gray-third pb-8"
      >
        <div
          class="p-4 bg-secondary rounded hover:cursor-pointer"
          @click="handleOpenListSavedTag"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img src="~/assets/images/icon-list-save-search.svg" alt="" />
              <p class="pl-2 text-[14px]">保存した検索条件</p>
            </div>
            <img
              class="transform duration-300 transition-all"
              :class="{ 'rotate-180': showContentHistories }"
              src="~/assets/images/expand-more.svg"
              alt=""
            />
          </div>
        </div>
        <div
          v-if="showContentHistories"
          class="dropdowns text-sm w-full rounded-xl bg-white pc:max-h-[320px] max-h-[200px] overflow-y-auto custom-scroll-bar"
        >
          <div v-if="searchHistories.length !== 0" class="py-2">
            <div
              v-for="(item, index) in searchHistories"
              :key="item.id + index"
              class="flex justify-between p-4 items-center gap-4"
              :class="{
                'border-b border-solid border-color-border':
                  index !== searchHistories.length - 1,
              }"
            >
              <div class="flex-1 break-words">
                <h1
                  class="text-xs font-normal text-black tracking-wider cursor-pointer"
                  @click="applySearchHistory(item)"
                >
                  {{ item.content }}
                </h1>
              </div>

              <div
                class="bg-danger rounded-full cursor-pointer"
                @click="removeHistorySearch(item.id, index)"
              >
                <img src="@/assets/images/icon-remove-23.3.svg" alt="" />
              </div>
            </div>
          </div>

          <div v-else class="text-sm rounded-xl bg-white">
            <div class="py-6 px-4">
              <h1 class="text-sm font-bold tracking-wider text-black mb-4">
                保存されている検索条件はありません
              </h1>
              <p
                class="text-xs font-normal text-black tracking-wider leading-loose"
              >
                検索条件を選択後、「検索条件を保存」ボタンを押すとリストに追加することができます。
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="px-6 h-full">
        <div class="border-b border-gray-third pb-4 py-8">
          <div
            class="flex justify-start items-start gap-4 flex-1 flex-shrink-0 mobile:flex-col mobile:gap-2 mobile:pb-8"
          >
            <p class="text-sm w-[104px] flex-shrink-0 font-bold mt-2">職種</p>
            <div class="">
              <div
                v-for="(item, index) in checkListPrefecture"
                :key="index"
                class="py-1 px-2 bg-secondary rounded inline-block mr-2 my-1"
                :class="{ 'hidden ': !getNameJobById(item) }"
              >
                <p
                  class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
                >
                  {{ getNameJobById(Number(item)) }}
                </p>
                <img
                  src="~/assets/images/icon-close-black-16.svg"
                  class="inline mb-[2px] ml-[2px] cursor-pointer"
                  @click="removeItemInCheckListPrefecture(Number(item))"
                />
              </div>
              <div class="inline-block">
                <div class="flex gap-1 items-center">
                  <p class="text-[14px] font-bold text-gray">追加</p>
                  <el-dropdown trigger="click">
                    <img src="~/assets/images/icon-plus-bg-blue.svg" />
                    <template #dropdown>
                      <div class="pl-4 pr-1 py-2 w-[342px]">
                        <el-checkbox-group
                          v-model="checkListPrefecture"
                          class="options-jobcategory-custom checkbox-group-custom custom-scroll-bar"
                        >
                          <el-collapse
                            v-for="(item, index) in props.jobOptions"
                            :key="index"
                            class="mb-4 rounded-lg !border-0"
                            accordion
                          >
                            <el-collapse-item>
                              <template #title>
                                <p class="text-[14px] font-bold text-black">
                                  {{ item.name }}
                                </p>
                              </template>
                              <div class="pl-4">
                                <el-checkbox
                                  :label="{
                                    label: `${item.name}すべて`,
                                    value: item.jobCategories,
                                  }"
                                >
                                  <span>{{ item.name }}すべて</span>
                                </el-checkbox>
                                <el-checkbox
                                  v-for="option in item.jobCategories"
                                  :key="option.id"
                                  :label="option.id"
                                >
                                  <span>{{ option.name }}</span>
                                </el-checkbox>
                              </div>
                            </el-collapse-item>
                          </el-collapse>
                        </el-checkbox-group>
                      </div>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex justify-start items-start gap-4 flex-1 border-gray-third mobile:flex-col mobile:gap-2 border-t"
          >
            <p class="text-sm w-[104px] flex-shrink-0 font-bold mt-8">勤務地</p>
            <div class="">
              <div
                v-for="(item, index) in checkListWorkLocation"
                :key="index"
                class="py-1 px-2 bg-secondary rounded inline-block mr-2 my-1"
              >
                <p
                  class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
                >
                  {{ getNameAppealPoint(Number(item)) }}
                </p>
                <img
                  src="~/assets/images/icon-close-black-16.svg"
                  class="inline mb-[2px] ml-[2px] cursor-pointer"
                  @click="removeItemInCheckWorkLocation(item)"
                />
              </div>
              <div class="inline-block">
                <div class="flex gap-1 items-center">
                  <p class="text-[14px] font-bold text-gray">追加</p>
                  <el-dropdown trigger="click">
                    <img src="~/assets/images/icon-plus-bg-blue.svg" />
                    <template #dropdown>
                      <div class="pl-4 pr-1 py-2 w-[342px]">
                        <el-checkbox-group
                          v-model="checkListWorkLocation"
                          class="checkbox-group-custom custom-scroll-bar options-appeal-points-custom"
                          @change="changeCheckListWorkLocation"
                        >
                          <el-checkbox
                            v-for="option in props.prefectureOptions"
                            :key="option.id"
                            :label="option.id"
                          >
                            {{ option.name }}
                          </el-checkbox>
                        </el-checkbox-group>
                      </div>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="border-b border-gray-third py-4">
          <div
            class="flex justify-start items-start gap-4 mobile:flex-col mobile:gap-2 mobile:pb-8"
          >
            <p
              class="text-sm w-[104px] flex-shrink-0 font-bold mt-2 mobile:mt-4"
            >
              勤務形態
            </p>
            <div>
              <div
                v-for="(item, index) in checkListWorkingStyle"
                :key="index"
                class="py-1 px-2 bg-secondary rounded inline-block mr-2 my-1"
              >
                <p
                  class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
                >
                  {{ item }}
                </p>
                <img
                  src="~/assets/images/icon-close-black-16.svg"
                  class="inline mb-[2px] ml-[2px] cursor-pointer"
                  @click="removeItemInCheckListWorkingStyle(item)"
                />
              </div>
              <div class="inline-block">
                <div class="flex gap-1 items-center">
                  <p class="text-[14px] font-bold text-gray">追加</p>
                  <el-dropdown trigger="click">
                    <img src="~/assets/images/icon-plus-bg-blue.svg" />
                    <template #dropdown>
                      <div class="pl-4 pr-1 py-2 w-[342px]">
                        <el-checkbox-group
                          v-model="checkListWorkingStyle"
                          class="checkbox-group-custom custom-scroll-bar options-appeal-points-custom"
                          @change="changeCheckListWorkingStyle"
                        >
                          <el-checkbox
                            v-for="option in props.employmentForms"
                            :key="option"
                            :label="option"
                          ></el-checkbox>
                        </el-checkbox-group>
                      </div>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex justify-start items-start gap-4 flex-1 mobile:border-t border-gray-third mobile:flex-col mobile:gap-2"
          >
            <p
              class="text-sm w-[104px] flex-shrink-0 font-bold mt-2 mobile:mt-8"
            >
              特徴
            </p>
            <div class="">
              <div
                v-for="(item, index) in checkListFeatures"
                :key="index"
                class="py-1 px-2 bg-secondary rounded inline-block mr-2 my-1"
              >
                <p
                  class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
                >
                  {{ item }}
                </p>
                <img
                  src="~/assets/images/icon-close-black-16.svg"
                  class="inline mb-[2px] ml-[2px] cursor-pointer"
                  @click="removeItemInCheckListFeatures(item)"
                />
              </div>
              <div class="inline-block">
                <div class="flex gap-1 items-center">
                  <p class="text-[14px] font-bold text-gray">追加</p>
                  <el-dropdown trigger="click">
                    <img src="~/assets/images/icon-plus-bg-blue.svg" />
                    <template #dropdown>
                      <div class="pl-4 pr-1 py-2 w-[342px]">
                        <el-checkbox-group
                          v-model="checkListFeatures"
                          class="checkbox-group-custom custom-scroll-bar options-appeal-points-custom"
                          @change="changeCheckListFeatures"
                        >
                          <el-checkbox
                            v-for="option in props.appealPointOptions"
                            :key="option"
                            :label="option"
                          ></el-checkbox>
                        </el-checkbox-group>
                      </div>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="fixed bottom-0 h-[88px] w-full bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.1)] flex items-center justify-center gap-4 px-6"
      >
        <el-button
          class="flex-1 !text-primary !border-2 !border-primary"
          @click="hanleSaveTagCurrent"
        >
          検索条件を保存
        </el-button>
        <el-button type="primary" class="flex-1 !ml-0" @click="handleSearch()">
          検索
        </el-button>
      </div>
    </el-drawer>
  </client-only>
</template>

<script setup lang="ts">
import { IJobCategories, IJobCategory, IResponse } from '~/utils/interface';

type DetailHistory = {
  id: number;
  employmentStatuses: string[];
  jobCategories: number[];
  appealPoint: string[];
  provinceIds: number[];
  content: string;
  searchContent: string;
};

type OptionGenerateSelect = { id: number; name: string };
type TOptionJobCategory = { label: string; value: { id: number }[] } | number;

const props = defineProps({
  jobOptions: {
    type: Array as () => IJobCategories[],
    default: () => [],
  },
  prefectureOptions: {
    type: Array as () => OptionGenerateSelect[],
    default: () => [],
  },
  appealPointOptions: {
    type: Array as () => String[],
    default: () => [],
  },
  employmentForms: {
    type: Array as () => String[],
    default: () => [],
  },
  querySearch: {
    type: Object as () => {
      jobCategories: number[];
      employmentStatuses: string[];
      appealPoint: string[];
      provinceIds: number[];
      searchContent: string;
    },
    default: () => {},
  },
  role: {
    type: String,
    default: 'guest',
  },
});
const emit = defineEmits(['searchJobs', 'unregister', 'resetAll']);
const jobOptions = props.jobOptions;
const drawerSearchJob = ref(false);
// const jobs = ref<string>('');
// const checkListJob = ref<string[]>([]);
// const changeCheckListJob = () => {
//   jobs.value = checkListJob.value.join(', ');
// };
const prefectures = ref<string>('');
const searchContent = ref<string>(props.querySearch.searchContent);
const checkListPrefecture = ref<TOptionJobCategory[]>(
  props.querySearch.jobCategories,
);
watchEffect(() => {
  checkListPrefecture.value = props.querySearch.jobCategories;
});
const checkListWorkingStyle = ref<string[]>(
  props.querySearch.employmentStatuses,
);
watchEffect(() => {
  checkListWorkingStyle.value = props.querySearch.employmentStatuses;
});
const checkListFeatures = ref<string[]>(props.querySearch.appealPoint);
const checkListWorkLocation = ref<number[]>(props.querySearch.provinceIds);
watchEffect(() => {
  checkListWorkLocation.value = props.querySearch.provinceIds;
});
const jobCategoryAll = computed(() => {
  let jobAllCategory: IJobCategory[] = [];
  jobOptions.forEach(
    (e) => (jobAllCategory = [...jobAllCategory, ...e.jobCategories]),
  );
  return jobAllCategory;
});

const getNameJobById = (param: TOptionJobCategory) => {
  if (typeof param === 'number')
    return jobCategoryAll.value.find((e) => e.id === param)?.name;
};
const getNameAppealPoint = (id: number) => {
  return props.prefectureOptions.find((e) => Number(e.id) === id)?.name;
};

watch(checkListPrefecture, (newVal, oldVal) => {
  if (newVal.length > oldVal.length) {
    checkListPrefecture.value.forEach((e: TOptionJobCategory) => {
      if (typeof e === 'object') {
        e.value.forEach((el: { id: number }) => {
          if (!checkListPrefecture.value.includes(el.id))
            checkListPrefecture.value.push(el.id);
        });
      }
    });
  } else if (newVal.length < oldVal.length) {
    checkListPrefecture.value.forEach((e: TOptionJobCategory) => {
      if (typeof e === 'object') {
        const count = ref(0);
        e.value.forEach((el: { id: number }) => {
          if (checkListPrefecture.value.includes(el.id)) count.value++;
        });
        if (e.value.length !== count.value) {
          const indexToRemove = checkListPrefecture.value.findIndex(
            (item) => item === e,
          );
          if (indexToRemove !== -1) {
            checkListPrefecture.value.splice(indexToRemove, 1);
          }
        }
      }
    });
  }
  const checkListPrefectureName = checkListPrefecture.value
    .filter((el) => typeof el !== 'object')
    .map((e) => {
      return getNameJobById(Number(e));
    });
  prefectures.value = checkListPrefectureName.join(', ');
});

// const changeCheckListPrefecture = () => {
//   prefectures.value = checkListPrefecture.value.join(',');
// };
const changeCheckListWorkingStyle = () => {
  prefectures.value = checkListWorkingStyle.value.join(', ');
};
const changeCheckListWorkLocation = () => {
  prefectures.value = checkListWorkLocation.value.join(', ');
};
const removeItemInCheckListPrefecture = (
  item: number,
  isReloadData?: boolean,
) => {
  checkListPrefecture.value = checkListPrefecture.value.filter(
    (el) => el !== item,
  );
  if (isReloadData) handleSearch(isReloadData);
};
const removeItemInCheckWorkLocation = (
  item: number,
  isReloadData?: boolean,
) => {
  checkListWorkLocation.value = checkListWorkLocation.value.filter(
    (el) => el !== item,
  );
  if (isReloadData) handleSearch(isReloadData);
};
const removeItemInCheckListWorkingStyle = (
  item: string,
  isReloadData?: boolean,
) => {
  checkListWorkingStyle.value = checkListWorkingStyle.value.filter(
    (el) => el !== item,
  );
  if (isReloadData) handleSearch(isReloadData);
};
const removeItemInCheckListFeatures = (
  item: string,
  isReloadData?: boolean,
) => {
  checkListFeatures.value = checkListFeatures.value.filter((el) => el !== item);
  if (isReloadData) handleSearch(isReloadData);
};
const resetAllValue = () => {
  checkListWorkingStyle.value = [];
  checkListPrefecture.value = [];
  checkListFeatures.value = [];
  checkListWorkLocation.value = [];
  searchContent.value = '';
  emit('resetAll');
};
const handleSearch = (isDisableHiddenDraw?: boolean) => {
  if (drawerSearchJob.value && !isDisableHiddenDraw)
    drawerSearchJob.value = false;
  const checkListJobFilter = checkListPrefecture.value.filter(
    (e) => typeof e !== 'object',
  );
  emit('searchJobs', {
    jobCategories: checkListJobFilter,
    employmentStatuses: checkListWorkingStyle.value,
    appealPoint: checkListFeatures.value,
    provinceIds: checkListWorkLocation.value,
    searchContent: searchContent.value,
  });
};
// save tag search
const targetHistory = ref(null);
const showContentHistories = ref(false);

onClickOutside(targetHistory, (event) => {
  if (showContentHistories.value) return (showContentHistories.value = false);
});

const handleOpenListSavedTag = async () => {
  if (props.role === 'guest') emit('unregister');
  else {
    await getDataSearchHistory();
    showContentHistories.value = true;
  }
};
const hanleSaveTagCurrent = async () => {
  if (props.role === 'guest') emit('unregister');
  else {
    const checkListJobFilter = checkListPrefecture.value.filter(
      (e) => typeof e !== 'object',
    );
    const { error } = await useBaseFetch('/search-histories', {
      method: 'POST',
      body: {
        provinceIds: checkListWorkLocation.value,
        appealPoint: checkListFeatures.value,
        employmentStatuses: checkListWorkingStyle.value,
        jobCategories: checkListJobFilter,
        searchContent: searchContent.value,
        typeSearch: '2',
      },
    });
    if (error.value?.data) throw error.value?.data;
    else openNotification('検索条件を保存しました');
  }
};

const searchHistories = ref<DetailHistory[]>([]);

const getDataSearchHistory = async () => {
  try {
    const { data, error } = await useBaseFetch(
      '/search-histories?typeSearch=2',
      {},
    );
    if (error.value?.data) throw error.value?.data;
    else {
      const response = data.value as IResponse;

      const formData = response?.data?.searchJobHistories;

      searchHistories.value = formData?.map((elem: any) => {
        let contentHistory: string[] = [];

        if (elem.metaData.provinceIds && elem.metaData.provinceIds.length) {
          const prefectureCurrent = props.prefectureOptions?.filter(
            (prefecture: OptionGenerateSelect) =>
              elem.metaData.provinceIds.includes(prefecture.id),
          );

          if (prefectureCurrent?.length) {
            contentHistory = [
              ...contentHistory,
              ...prefectureCurrent.map(
                (prefecture: OptionGenerateSelect) => prefecture.name,
              ),
            ];
          }
        }

        if (elem.metaData.employmentStatuses?.length) {
          contentHistory = [
            ...contentHistory,
            ...elem.metaData.employmentStatuses,
          ];
        }

        const jobCategoriesCurrent: IJobCategory[] =
          jobCategoryAll.value?.filter((job: IJobCategory) =>
            elem.metaData.jobCategories.includes(job.id),
          );
        if (jobCategoriesCurrent?.length) {
          contentHistory = [
            ...contentHistory,
            ...jobCategoriesCurrent.map((job: any) => job.name),
          ];
        }

        if (elem.metaData.appealPoint?.length) {
          contentHistory = [...contentHistory, ...elem.metaData.appealPoint];
        }

        if (elem.metaData.searchContent) {
          contentHistory.push(elem.metaData.searchContent);
        }

        return {
          id: elem?.id,
          employmentStatuses: elem.metaData.employmentStatuses,
          provinceIds: elem.metaData.provinceIds,
          appealPoint: elem.metaData.appealPoint,
          jobCategories: elem.metaData.jobCategories,
          searchContent: elem.metaData.searchContent,
          content: contentHistory.join(', '),
        };
      });

      const searchHistoriesDraft = searchHistories.value?.filter(
        (e: any, index) => e.content,
      );
      searchHistories.value = [...searchHistoriesDraft];
    }
  } catch (error) {
    console.log(error, 'error');
  }
};

const removeHistorySearch = async (id: number, index: number) => {
  const { error } = await useBaseFetch(`/search-histories/${id}`, {
    method: 'DELETE',
  });
  if (error.value?.data) {
    throw error.value?.data;
  } else searchHistories.value.splice(index, 1);
};

const applySearchHistory = (history: DetailHistory) => {
  checkListWorkingStyle.value = history.employmentStatuses;
  checkListFeatures.value = history.appealPoint;
  searchContent.value = history.searchContent;
  checkListPrefecture.value = history.jobCategories;
  checkListWorkLocation.value = history.provinceIds;

  showContentHistories.value = false;
};

const handleEnter = () => {
  handleSearch();
};
</script>

<style lang="scss">
.input-search {
  .el-input__wrapper,
  .el-input-group__prepend {
    @apply shadow-none;
  }
}
.input-background-gray {
  .el-input__wrapper,
  .icon-expand {
    @apply bg-gray-secondary;
    box-shadow: unset;
  }
}
.input-background-blue {
  .el-input__wrapper,
  .icon-expand {
    @apply bg-secondary;
    box-shadow: unset;
  }
}
.input-background-white {
  .el-input__wrapper,
  .icon-expand {
    @apply bg-white;
  }
}
.search-jobs {
  .el-input__wrapper {
    box-shadow: none;
  }
  .el-select {
    --el-select-border-color-hover: transition;
    --el-select-input-focus-border-color: transition;
  }
  .el-input__inner {
    text-overflow: ellipsis;
  }
}
.checkbox-group-custom {
  .el-checkbox {
    @apply py-2 flex items-end;
    .el-checkbox__label {
      @apply pb-[2px] text-[14px];
    }
  }
}
.options-jobcategory-custom {
  @apply pc:max-h-[436px] max-h-[200px] overflow-y-auto;
  .el-collapse-item__header {
    @apply h-[36px];
  }
  .el-collapse-item__arrow {
    @apply text-[20px];
  }
}
.options-appeal-points-custom {
  @apply pc:max-h-[436px] max-h-[200px] overflow-y-auto;
  .el-checkbox {
    @apply py-3 flex items-end;
  }
}

.custom-scroll-bar {
  &::-webkit-scrollbar-thumb {
    width: 2px;
    background-color: #dadcde;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
}
.dropdowns {
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  @apply absolute top-[56px] left-0 z-[999];
}
</style>
