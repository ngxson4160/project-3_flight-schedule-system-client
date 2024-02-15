<template>
  <div
    class="w-full search-jobs p-6 mobile:p-0 bg-white rounded-xl border-2 border-gray-third mobile:border-none"
  >
    <p class="mobile:hidden">【基本情報】</p>
    <div class="flex items-stretch pb-4 mobile:hidden">
      <div class="flex-1 flex-shrink-0 mt-4 border-r border-gray-third">
        <div class="flex justify-start gap-4 pr-6">
          <p
            class="text-sm w-[104px] flex-shrink-0 font-bold mt-[2px]"
            :class="{ '!mt-2': checkListWorkLocation.length > 0 }"
          >
            都道府県
          </p>
          <div class="">
            <div
              v-for="(item, index) in checkListWorkLocation"
              :key="index"
              class="py-1 px-2 bg-secondary rounded inline-block mr-2 my-1"
            >
              <p
                class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
              >
                {{ getNameProvinceById(Number(item)) }}
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
      <div class="flex-1 flex-shrink-0 h-full mt-4">
        <div
          class="flex justify-start items-center gap-4 pl-6"
          :class="{ '!items-start': checkListWillingnessApplies.length > 0 }"
        >
          <p
            class="text-sm w-[104px] flex-shrink-0 font-bold"
            :class="{ '!mt-2': checkListWillingnessApplies.length > 0 }"
          >
            応募意欲
          </p>
          <div>
            <div
              v-for="(item, index) in checkListWillingnessApplies"
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
                @click="removeItemInCheckListWillingnessApplies(item)"
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
                        v-model="checkListWillingnessApplies"
                        class="checkbox-group-custom custom-scroll-bar options-appeal-points-custom"
                        @change="changeCheckListWorkLocation"
                      >
                        <el-checkbox
                          v-for="option in props.willingnessApplies"
                          :key="option"
                          :label="option"
                        >
                          <span>{{ option }}</span>
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
    </div>
    <div class="border-b border-gray-third flex items-start pb-4 mobile:hidden">
      <div class="flex-1 flex-shrink-0">
        <div
          class="flex justify-start items-center gap-4 pr-6 border-r border-gray-third"
        >
          <p class="text-sm w-[104px] flex-shrink-0 font-bold">最終アクセス</p>
          <div class="">
            <div
              v-if="lastLoginDate"
              class="py-1 px-2 bg-secondary rounded inline-block mr-2 my-1"
            >
              <p
                class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
              >
                {{ lastLoginDate }}
              </p>
              <img
                src="~/assets/images/icon-close-black-16.svg"
                class="inline mb-[2px] ml-[2px] cursor-pointer"
                @click="removeItemInCheckListLastLoginDates()"
              />
            </div>
            <div class="inline-block">
              <div class="flex gap-1 items-center">
                <el-dropdown trigger="click">
                  <p class="text-[14px] font-bold text-gray">選択</p>
                  <template #dropdown>
                    <div class="pl-4 pr-1 py-2 w-[342px]">
                      <p
                        v-for="option in props.lastLoginDates"
                        :key="option"
                        class="cursor-pointer text-[14px] !text-black leading-[40px] my-1"
                        @click="lastLoginDate = option"
                      >
                        {{ option }}
                      </p>
                    </div>
                  </template>
                </el-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 flex-shrink-0 h-full">
        <div class="flex justify-start items-center gap-4 pl-6">
          <p class="text-sm w-[104px] flex-shrink-0 font-bold">
            お気に入り登録
          </p>
          <div class="!h-[28px]">
            <el-radio-group v-model="isFavorite">
              <el-radio
                v-for="(item, index) in props.favorites"
                :key="index"
                :label="item.value"
                class="!h-[28px] !mr-4"
              >
                <span class="text-sm !leading-[28px]">{{ item.label }}</span>
              </el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile:hidden border-b border-gray-third">
      <p class="mt-4">【希望条件】</p>
      <div class="flex py-4">
        <div
          class="flex justify-start gap-4 flex-1 flex-shrink-0 pr-6 border-r border-gray-third"
          :class="{ '!items-start': checkListJobDesired.length > 0 }"
        >
          <p class="text-sm w-[104px] flex-shrink-0 font-bold mt-1">職種</p>
          <div>
            <div
              v-for="(item, index) in checkListJobDesired"
              :key="index"
              class="py-1 px-2 bg-secondary rounded inline-block mr-2 my-1"
              :class="{ hidden: item < 0 }"
            >
              <p
                class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
              >
                {{ getNameJob(item) }}
              </p>
              <img
                src="~/assets/images/icon-close-black-16.svg"
                class="inline mb-[2px] ml-[2px] cursor-pointer"
                @click="removeItemInCheckListJobDesired(item)"
              />
            </div>
            <div class="inline-block">
              <div class="flex gap-1 items-center">
                <p class="text-[14px] font-bold text-gray">追加</p>
                <el-dropdown
                  trigger="click"
                  popper-class="dropdown-jobcategory-custom"
                >
                  <img src="~/assets/images/icon-plus-bg-blue.svg" />
                  <template #dropdown>
                    <div class="py-4 pl-4 pr-3 w-[342px]">
                      <el-checkbox-group
                        v-model="checkListJobDesired"
                        class="options-jobcategory-custom checkbox-group-custom custom-scroll-bar options-appeal-points-custom"
                      >
                        <el-collapse
                          v-for="(item, index) in props.jobOptions"
                          :key="index"
                          class="mb-4 !rounded-lg !border-0"
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
                                :label="item.id * -1"
                                @click="
                                  handleCheckAllChangeJobCategory(
                                    item.jobCategories,
                                  )
                                "
                              >
                                <span>{{ item.name }}すべて</span>
                              </el-checkbox>
                              <el-checkbox
                                v-for="option in item.jobCategories"
                                :key="option.id"
                                :label="option.id"
                                @click="
                                  handleChoseOneJobCategory(
                                    item.jobCategories,
                                    option.id,
                                    item.id,
                                  )
                                "
                              >
                                <span>
                                  {{ option.name }}
                                </span>
                              </el-checkbox>
                            </div>
                          </el-collapse-item>
                        </el-collapse>
                        <!-- <el-checkbox
                          v-for="option in props.jobOptions"
                          :key="option.id"
                          :label="option.id"
                        >
                          <span>{{ option.name }}</span>
                        </el-checkbox> -->
                      </el-checkbox-group>
                    </div>
                  </template>
                </el-dropdown>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex justify-start gap-4 flex-1 flex-shrink-0 pl-6"
          :class="{ '!items-start': checkListEmploymentStatuses.length > 0 }"
        >
          <p class="text-sm w-[104px] flex-shrink-0 font-bold mt-1">勤務形態</p>
          <div class="">
            <div
              v-for="(item, index) in checkListEmploymentStatuses"
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
                        v-model="checkListEmploymentStatuses"
                        class="checkbox-group-custom custom-scroll-bar options-appeal-points-custom"
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
      </div>
      <div class="pb-4 w-1/2">
        <div
          class="flex justify-start items-center gap-4 pr-6"
          :class="{ '!items-start': checkListWorkLocationDesired.length > 0 }"
        >
          <p class="text-sm w-[104px] flex-shrink-0 font-bold mt-1">勤務地</p>
          <div class="">
            <div
              v-for="(item, index) in checkListWorkLocationDesired"
              :key="index"
              class="py-1 px-2 bg-secondary rounded inline-block mr-2 my-1"
            >
              <p
                class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
              >
                {{ getNameProvinceById(Number(item)) }}
              </p>
              <img
                src="~/assets/images/icon-close-black-16.svg"
                class="inline mb-[2px] ml-[2px] cursor-pointer"
                @click="removeItemInCheckListWorkLocationDesired(item)"
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
                        v-model="checkListWorkLocationDesired"
                        class="checkbox-group-custom custom-scroll-bar options-appeal-points-custom"
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
    </div>

    <div
      class="w-full my-4 input-search border border-gray-third rounded mobile:w-[342px] mobile:mx-auto"
    >
      <el-input v-model="textSearch" placeholder="キーワードで検索">
        <template #prepend>
          <div>
            <img src="~/assets/images/icon-search-gray.svg" alt="" />
          </div>
        </template>
      </el-input>
    </div>
    <div class="flex justify-between items-center mobile:hidden">
      <div class="w-[320px] relative">
        <div
          ref="targetHistory"
          class="p-4 bg-secondary rounded hover:cursor-pointer"
          @click="handleOpenListSavedTag"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img src="~/assets/images/icon-list-save-search.svg" alt="" />
              <p class="pl-2 text-[14px]">保存した検索条件</p>
            </div>
            <img
              src="~/assets/images/expand-more.svg"
              alt=""
              class="transform duration-300 transition-all"
              :class="{ '-rotate-180': showContentHistories }"
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
      checkListWorkLocation.length ||
      checkListWillingnessApplies.length ||
      lastLoginDate ||
      isFavorite ||
      checkListJobDesired.length ||
      checkListEmploymentStatuses.length ||
      checkListWorkLocationDesired.length
    "
    class="pc:hidden mt-8 p-6 bg-gray-sixth border-y border-gray-third"
  >
    <div class="">
      <h3 class="text-sm font-bold text-gray mb-4">検索条件</h3>
      <div>
        <div
          v-for="(item, index) in checkListWorkLocation"
          :key="index"
          class="py-1 px-2 bg-third rounded inline-block mr-2 my-1"
        >
          <p
            class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
          >
            {{ getNameProvinceById(Number(item)) }}
          </p>
          <img
            src="~/assets/images/icon-close-black-16.svg"
            class="inline mb-[2px] ml-[2px] cursor-pointer"
            @click="removeItemInCheckWorkLocation(item, true)"
          />
        </div>
        <div
          v-for="(item, index) in checkListWillingnessApplies"
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
            @click="removeItemInCheckListWillingnessApplies(item, true)"
          />
        </div>
        <div
          v-if="lastLoginDate"
          class="py-1 px-2 bg-third rounded inline-block mr-2 my-1"
        >
          <p
            class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
          >
            {{ lastLoginDate }}
          </p>
          <img
            src="~/assets/images/icon-close-black-16.svg"
            class="inline mb-[2px] ml-[2px] cursor-pointer"
            @click="removeItemInCheckListLastLoginDates(true)"
          />
        </div>
        <div
          v-if="isFavorite"
          class="py-1 px-2 bg-third rounded inline-block mr-2 my-1"
        >
          <p
            class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
          >
            {{ isFavorite === 'true' ? '有り' : '無し' }}
          </p>
          <img
            src="~/assets/images/icon-close-black-16.svg"
            class="inline mb-[2px] ml-[2px] cursor-pointer"
            @click="removeIsFavorite(true)"
          />
        </div>
        <div
          v-for="(item, index) in checkListJobDesired"
          :key="index"
          class="py-1 px-2 bg-third rounded inline-block mr-2 my-1"
          :class="{ hidden: item < 0 }"
        >
          <p
            class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
          >
            {{ getNameJob(item) }}
          </p>
          <img
            src="~/assets/images/icon-close-black-16.svg"
            class="inline mb-[2px] ml-[2px] cursor-pointer"
            @click="removeItemInCheckListJobDesired(item, true)"
          />
        </div>
        <div
          v-for="(item, index) in checkListEmploymentStatuses"
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
        <div
          v-for="(item, index) in checkListWorkLocationDesired"
          :key="index"
          class="py-1 px-2 bg-third rounded inline-block mr-2 my-1"
        >
          <p
            class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
          >
            {{ getNameProvinceById(Number(item)) }}
          </p>
          <img
            src="~/assets/images/icon-close-black-16.svg"
            class="inline mb-[2px] ml-[2px] cursor-pointer"
            @click="removeItemInCheckListWorkLocationDesired(item, true)"
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
        <el-input v-model="textSearch" placeholder="キーワードで検索">
          <template #prepend>
            <div>
              <img src="~/assets/images/icon-search-gray.svg" alt="" />
            </div>
          </template>
        </el-input>
      </div>
      <div
        class="pc:w-[320px] w-[342px] mobile:mx-auto relative mt-8 border-b border-gray-third pb-8"
      >
        <div
          ref="targetHistory"
          class="p-4 bg-secondary rounded hover:cursor-pointer"
          @click="handleOpenListSavedTag"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img src="~/assets/images/icon-list-save-search.svg" alt="" />
              <p class="pl-2 text-[14px]">保存した検索条件</p>
            </div>
            <img
              src="~/assets/images/expand-more.svg"
              alt=""
              class="transform duration-300 transition-all"
              :class="{ '-rotate-180': showContentHistories }"
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
      <div class="collapse-custom-first">
        <el-collapse
          class="mb-4 rounded-lg !border-0 mt-6 w-[342px] mx-auto"
          accordion
        >
          <el-collapse-item>
            <template #title>
              <p class="text-[18px]">【基本情報】</p>
              <img
                src="~/assets/images/expand-more.svg"
                class="icon-collapse-custom transform duration-300 transition-all"
              />
            </template>
            <div class="">
              <div class="h-full">
                <div class="pt-2">
                  <div
                    class="flex justify-start items-start gap-4 flex-1 flex-shrink-0 mobile:flex-col mobile:gap-2"
                  >
                    <p class="text-sm w-[104px] flex-shrink-0 font-bold mt-1">
                      都道府県
                    </p>
                    <div class="">
                      <div
                        v-for="(item, index) in checkListWorkLocation"
                        :key="index"
                        class="py-1 px-2 bg-secondary rounded inline-block mr-2 my-1"
                      >
                        <p
                          class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
                        >
                          {{ getNameProvinceById(Number(item)) }}
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
                  <div
                    class="flex justify-start items-start gap-4 flex-1 mobile:flex-col mobile:gap-2"
                  >
                    <p class="text-sm w-[104px] flex-shrink-0 font-bold mt-8">
                      応募意欲
                    </p>
                    <div class="">
                      <div
                        v-for="(item, index) in checkListWillingnessApplies"
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
                          @click="removeItemInCheckListWillingnessApplies(item)"
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
                                  v-model="checkListWillingnessApplies"
                                  class="checkbox-group-custom custom-scroll-bar options-appeal-points-custom"
                                >
                                  <el-checkbox
                                    v-for="option in props.willingnessApplies"
                                    :key="option"
                                    :label="option"
                                  >
                                    {{ option }}
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
                <div class="mt-8">
                  <p class="text-sm font-bold">最終アクセス</p>
                  <div class="mt-1">
                    <div
                      v-if="lastLoginDate"
                      class="py-1 px-2 bg-secondary rounded inline-block mr-2 my-1"
                    >
                      <p
                        class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
                      >
                        {{ lastLoginDate }}
                      </p>
                      <img
                        src="~/assets/images/icon-close-black-16.svg"
                        class="inline mb-[2px] ml-[2px] cursor-pointer"
                        @click="removeItemInCheckListLastLoginDates()"
                      />
                    </div>
                    <div class="inline-block">
                      <div class="flex gap-1 items-center">
                        <el-dropdown trigger="click">
                          <p class="text-[14px] font-bold text-gray">選択</p>
                          <template #dropdown>
                            <div class="pl-4 pr-1 py-2 w-[342px]">
                              <p
                                v-for="option in props.lastLoginDates"
                                :key="option"
                                class="cursor-pointer text-[14px] !text-black leading-[40px] my-1"
                                @click="lastLoginDate = option"
                              >
                                {{ option }}
                              </p>
                            </div>
                          </template>
                        </el-dropdown>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pt-4 pb-2">
                  <div
                    class="flex justify-start items-start gap-4 mobile:flex-col mobile:gap-2"
                  >
                    <p
                      class="text-sm w-[104px] flex-shrink-0 font-bold mt-1 mobile:mt-4"
                    >
                      お気に入り登録
                    </p>
                    <div>
                      <el-radio-group
                        v-model="isFavorite"
                        class="flex !flex-col !items-start"
                      >
                        <el-radio
                          v-for="(item, index) in props.favorites"
                          :key="index"
                          :label="item.value"
                          class="!h-[40px] !m-0"
                        >
                          <span class="text-sm !leading-[28px]">
                            {{ item.label }}
                          </span>
                        </el-radio>
                      </el-radio-group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="collapse-custom-second">
        <el-collapse
          class="mb-4 rounded-lg !border-0 mt-6 w-[342px] mx-auto"
          accordion
        >
          <el-collapse-item>
            <template #title>
              <p class="text-[18px]">【希望条件】</p>
              <img
                src="~/assets/images/expand-more.svg"
                class="icon-collapse-custom transform duration-300 transition-all"
              />
            </template>
            <div class="">
              <div class="h-full">
                <div class="pb-4 pt-2">
                  <div
                    class="flex justify-start gap-4 flex-1 flex-shrink-0 mobile:flex-col mobile:gap-2"
                  >
                    <p class="text-sm w-[104px] flex-shrink-0 font-bold mt-1">
                      職種
                    </p>
                    <div class="">
                      <div
                        v-for="(item, index) in checkListJobDesired"
                        :key="index"
                        class="py-1 px-2 bg-secondary rounded inline-block mr-2 my-1"
                        :class="{ hidden: item < 0 }"
                      >
                        <p
                          class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
                        >
                          {{ getNameJob(item) }}
                        </p>
                        <img
                          src="~/assets/images/icon-close-black-16.svg"
                          class="inline mb-[2px] ml-[2px] cursor-pointer"
                          @click="removeItemInCheckListJobDesired(item)"
                        />
                      </div>
                      <div class="inline-block">
                        <div class="flex gap-1 items-center">
                          <p class="text-[14px] font-bold text-gray">追加</p>
                          <el-dropdown
                            trigger="click"
                            popper-class="dropdown-jobcategory-custom"
                          >
                            <img src="~/assets/images/icon-plus-bg-blue.svg" />
                            <template #dropdown>
                              <div class="py-4 pl-4 pr-3 w-[342px]">
                                <el-checkbox-group
                                  v-model="checkListJobDesired"
                                  class="options-jobcategory-custom checkbox-group-custom custom-scroll-bar options-appeal-points-custom"
                                >
                                  <el-collapse
                                    v-for="(item, index) in props.jobOptions"
                                    :key="index"
                                    class="mb-4 rounded-lg !border-0"
                                    accordion
                                  >
                                    <el-collapse-item>
                                      <template #title>
                                        <p
                                          class="text-[14px] font-bold text-black"
                                        >
                                          {{ item.name }}
                                        </p>
                                      </template>
                                      <div class="pl-4">
                                        <el-checkbox
                                          :label="item.id * -1"
                                          @click="
                                            handleCheckAllChangeJobCategory(
                                              item.jobCategories,
                                            )
                                          "
                                        >
                                          <span>{{ item.name }}すべて</span>
                                        </el-checkbox>
                                        <el-checkbox
                                          v-for="option in item.jobCategories"
                                          :key="option.id"
                                          :label="option.id"
                                          @click="
                                            handleChoseOneJobCategory(
                                              item.jobCategories,
                                              option.id,
                                              item.id,
                                            )
                                          "
                                        >
                                          <span>
                                            {{ option.name }}
                                          </span>
                                        </el-checkbox>
                                      </div>
                                    </el-collapse-item>
                                  </el-collapse>
                                  <!-- <el-checkbox
                                    v-for="option in props.jobOptions"
                                    :key="option.id"
                                    :label="option.id"
                                  >
                                    <span>{{ option.name }}</span>
                                  </el-checkbox> -->
                                </el-checkbox-group>
                              </div>
                            </template>
                          </el-dropdown>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex justify-start items-start gap-4 flex-1 mobile:flex-col mobile:gap-2"
                  >
                    <p class="text-sm w-[104px] flex-shrink-0 font-bold mt-8">
                      勤務形態
                    </p>
                    <div class="">
                      <div
                        v-for="(item, index) in checkListEmploymentStatuses"
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
                                  v-model="checkListEmploymentStatuses"
                                  class="checkbox-group-custom custom-scroll-bar options-appeal-points-custom"
                                  @change="changeCheckListWorkLocation"
                                >
                                  <el-checkbox
                                    v-for="option in props.employmentForms"
                                    :key="option"
                                    :label="option"
                                  >
                                    {{ option }}
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
                <div
                  class="flex justify-start items-start gap-4 mobile:flex-col mobile:gap-2"
                >
                  <p
                    class="text-sm w-[104px] flex-shrink-0 font-bold mt-1 mobile:mt-4"
                  >
                    勤務地
                  </p>
                  <div>
                    <div
                      v-for="(item, index) in checkListWorkLocationDesired"
                      :key="index"
                      class="py-1 px-2 bg-secondary rounded inline-block mr-2 my-1"
                    >
                      <p
                        class="inline-block text-[14px] max-w-[300px] truncate leading-[14px]"
                      >
                        {{ getNameProvinceById(Number(item)) }}
                      </p>
                      <img
                        src="~/assets/images/icon-close-black-16.svg"
                        class="inline mb-[2px] ml-[2px] cursor-pointer"
                        @click="removeItemInCheckListWorkLocationDesired(item)"
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
                                v-model="checkListWorkLocationDesired"
                                class="checkbox-group-custom custom-scroll-bar options-appeal-points-custom"
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
            </div>
          </el-collapse-item>
        </el-collapse>
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
  prefectureIds: number[];
  willingnessApplies: string[];
  lastLoginDate: string;
  isFavorite: boolean | undefined;
  favoriteJobCategories: number[];
  desiredEmploymentStatuses: string[];
  desiredWorkLocations: number[];
  textSearch: string;
  content: string;
};
type OptionGenerateSelect = { id: number; name: string };

const props = defineProps({
  jobOptions: {
    type: Array as () => IJobCategories[],
    default: () => [],
  },
  prefectureOptions: {
    type: Array as () => { id: number; name: string }[],
    default: () => [],
  },
  appealPointOptions: {
    type: Array as () => string[],
    default: () => [],
  },
  employmentForms: {
    type: Array as () => string[],
    default: () => [],
  },
  willingnessApplies: {
    type: Array as () => string[],
    default: () => [],
  },
  lastLoginDates: {
    type: Array as () => string[],
    default: () => [],
  },
  favorites: {
    type: Array as () => { label: string; value: string }[],
    default: () => [],
  },
  querySearch: {
    type: Object as () => {
      prefectureIds: number[]; // checkListWorkLocation
      willingnessApplies: string[]; // checkListWillingnessApplies
      lastLoginDate: string; // lastLoginDate
      isFavorite: boolean | undefined; // isFavorite
      favoriteJobCategories: number[]; // checkListJobDesired
      desiredEmploymentStatuses: string[]; // checkListEmploymentStatuses
      desiredWorkLocations: number[]; // checkListWorkLocationDesired
      textSearch: string;
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
const prefectures = ref('');
const textSearch = ref<string>(props.querySearch.textSearch);
const checkListPrefecture = ref<number[]>(
  props.querySearch.favoriteJobCategories,
);
const checkListWorkingStyle = ref<string[]>(
  props.querySearch.desiredEmploymentStatuses,
);
const checkListEmploymentStatuses = ref<string[]>(
  props.querySearch.desiredEmploymentStatuses,
);
const checkListWorkLocation = ref<number[]>(props.querySearch.prefectureIds);
const checkListWillingnessApplies = ref<string[]>(
  props.querySearch.willingnessApplies,
);
const lastLoginDate = ref<string>(props.querySearch.lastLoginDate);
const isFavorite = ref<string>(
  props.querySearch.isFavorite !== undefined
    ? props.querySearch.isFavorite
      ? 'true'
      : 'false'
    : '',
);
const checkListJobDesired = ref<number[]>(
  props.querySearch.favoriteJobCategories,
);
const checkListWorkLocationDesired = ref<number[]>(
  props.querySearch.desiredWorkLocations,
);

const jobCategoryAll = computed(() => {
  let jobAllCategory: IJobCategory[] = [];
  jobOptions.forEach(
    (e) => (jobAllCategory = [...jobAllCategory, ...e.jobCategories]),
  );
  return jobAllCategory;
});

type TOptionJobCategory = { label: string; value: { id: number }[] } | number;
const getNameJob = (param: TOptionJobCategory) => {
  if (typeof param === 'number')
    return jobCategoryAll.value.find((e) => e.id === param)?.name;
};
const getNameProvinceById = (id: number) => {
  return props.prefectureOptions.find((e) => Number(e.id) === id)?.name;
};
const getNameJobDesiredById = (id: number) => {
  return props.jobOptions.find((e) => e.id === id)?.name;
};
const changeCheckListPrefecture = () => {
  prefectures.value = checkListPrefecture.value.join(',');
};
const changeCheckListWorkingStyle = () => {
  prefectures.value = checkListWorkingStyle.value.join(', ');
};
const changeCheckListWorkLocation = () => {
  prefectures.value = checkListWorkLocation.value.join(', ');
};
const removeItemInCheckListPrefecture = (item: number) => {
  checkListPrefecture.value = checkListPrefecture.value.filter(
    (el) => el !== item,
  );
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
const removeItemInCheckListWorkingStyle = (item: string) => {
  checkListWorkingStyle.value = checkListWorkingStyle.value.filter(
    (el) => el !== item,
  );
};
const removeItemInCheckListFeatures = (
  item: string,
  isReloadData?: boolean,
) => {
  checkListEmploymentStatuses.value = checkListEmploymentStatuses.value.filter(
    (el) => el !== item,
  );
  if (isReloadData) handleSearch(isReloadData);
};
const removeItemInCheckListWillingnessApplies = (
  item: string,
  isReloadData?: boolean,
) => {
  checkListWillingnessApplies.value = checkListWillingnessApplies.value.filter(
    (el) => el !== item,
  );
  if (isReloadData) handleSearch(isReloadData);
};
const removeItemInCheckListLastLoginDates = (isReloadData?: boolean) => {
  lastLoginDate.value = '';
  if (isReloadData) handleSearch(isReloadData);
};
const removeIsFavorite = (isReloadData?: boolean) => {
  isFavorite.value = '';
  if (isReloadData) handleSearch(isReloadData);
};
const removeItemInCheckListJobDesired = (
  item: number,
  isReloadData?: boolean,
) => {
  const parentId = jobCategoryAll.value.find((e) => e.id === item)?.parentId;
  if (parentId) {
    removeList([parentId * -1]);
  }
  checkListJobDesired.value = checkListJobDesired.value.filter(
    (el) => el !== item,
  );
  if (isReloadData) handleSearch(isReloadData);
};
const removeItemInCheckListWorkLocationDesired = (
  item: number,
  isReloadData?: boolean,
) => {
  checkListWorkLocationDesired.value =
    checkListWorkLocationDesired.value.filter((el) => el !== item);
  if (isReloadData) handleSearch(isReloadData);
};

const resetAllValue = () => {
  checkListWorkLocation.value = [];
  checkListWillingnessApplies.value = [];
  lastLoginDate.value = '';
  isFavorite.value = '';
  checkListJobDesired.value = [];
  checkListEmploymentStatuses.value = [];
  checkListWorkLocationDesired.value = [];
  textSearch.value = '';
  emit('resetAll');
};
const handleSearch = (isDisableHiddenDraw?: boolean) => {
  if (drawerSearchJob.value && !isDisableHiddenDraw)
    drawerSearchJob.value = false;
  emit('searchJobs', {
    prefectureIds: checkListWorkLocation.value,
    willingnessApplies: checkListWillingnessApplies.value,
    lastLoginDate: lastLoginDate.value,
    isFavorite: isFavorite.value ? isFavorite.value === 'true' : undefined,
    favoriteJobCategories: checkListJobDesired.value,
    desiredEmploymentStatuses: checkListEmploymentStatuses.value,
    desiredWorkLocations: checkListWorkLocationDesired.value,
    textSearch: textSearch.value,
  });
};
// save tag search
const targetHistory = ref(null);
const showContentHistories = ref(false);
onClickOutside(targetHistory, (event) => {
  if (showContentHistories.value) return (showContentHistories.value = false);
});

const hanleSaveTagCurrent = async () => {
  if (props.role === 'guest') emit('unregister');
  else {
    const { error } = await useBaseFetch('/search-histories', {
      method: 'POST',
      body: {
        prefectureIds: checkListWorkLocation.value,
        willingnessApplies: checkListWillingnessApplies.value,
        lastLoginDate:
          lastLoginDate.value !== '' ? lastLoginDate.value : undefined,
        isFavorite: isFavorite.value ? isFavorite.value === 'true' : undefined,
        favoriteJobCategories: checkListJobDesired.value,
        desiredEmploymentStatuses: checkListEmploymentStatuses.value,
        desiredWorkLocations: checkListWorkLocationDesired.value,
        textSearch: textSearch.value,
        typeSearch: '1',
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
      '/search-histories?typeSearch=1',
      {},
    );
    if (error.value?.data) throw error.value?.data;
    else {
      const response = data.value as IResponse;

      const formData = response?.data?.searchJobHistories;

      searchHistories.value = formData?.map((elem: any) => {
        let contentHistory: string[] = [];

        if (elem.metaData.prefectureIds && elem.metaData.prefectureIds.length) {
          const prefectureCurrent = props.prefectureOptions?.filter(
            (prefecture: OptionGenerateSelect) =>
              elem.metaData.prefectureIds.includes(prefecture.id),
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

        if (elem.metaData.willingnessApplies?.length) {
          contentHistory = [
            ...contentHistory,
            ...elem.metaData.willingnessApplies,
          ];
        }

        if (elem.metaData.lastLoginDate)
          contentHistory.push(elem.metaData.lastLoginDate);

        if (elem.metaData.isFavorite !== undefined)
          contentHistory.push(elem.metaData.isFavorite ? '有り' : '無し');

        if (
          elem.metaData.favoriteJobCategories &&
          elem.metaData.favoriteJobCategories.length
        ) {
          const favoriteJobCategories = props.jobOptions?.filter(
            (job: OptionGenerateSelect) =>
              elem.metaData.favoriteJobCategories.includes(job.id),
          );
          if (favoriteJobCategories?.length) {
            contentHistory = [
              ...contentHistory,
              ...favoriteJobCategories.map(
                (job: OptionGenerateSelect) => job.name,
              ),
            ];
          }
        }

        if (elem.metaData.desiredEmploymentStatuses?.length) {
          contentHistory = [
            ...contentHistory,
            ...elem.metaData.desiredEmploymentStatuses,
          ];
        }

        if (
          elem.metaData.desiredWorkLocations &&
          elem.metaData.desiredWorkLocations.length
        ) {
          const desiredWorkLocations = props.prefectureOptions?.filter(
            (prefecture: OptionGenerateSelect) =>
              elem.metaData.desiredWorkLocations.includes(prefecture.id),
          );
          if (desiredWorkLocations?.length) {
            contentHistory = [
              ...contentHistory,
              ...desiredWorkLocations.map(
                (prefecture: OptionGenerateSelect) => prefecture.name,
              ),
            ];
          }
        }

        if (elem.metaData.textSearch) {
          contentHistory.push(elem.metaData.textSearch);
        }

        return {
          id: elem?.id,
          prefectureIds: elem.metaData.prefectureIds,
          willingnessApplies: elem.metaData.willingnessApplies,
          lastLoginDate: elem.metaData.lastLoginDate,
          isFavorite: elem.metaData.isFavorite,
          favoriteJobCategories: elem.metaData.favoriteJobCategories,
          desiredEmploymentStatuses: elem.metaData.desiredEmploymentStatuses,
          desiredWorkLocations: elem.metaData.desiredWorkLocations,
          textSearch: elem.metaData.textSearch,
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

const handleOpenListSavedTag = async () => {
  if (props.role === 'guest') emit('unregister');
  else {
    showContentHistories.value = true;
    await getDataSearchHistory();
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
  checkListWorkLocation.value = history.prefectureIds;
  checkListWillingnessApplies.value = history.willingnessApplies;
  lastLoginDate.value = history.lastLoginDate;
  isFavorite.value =
    history.isFavorite !== undefined
      ? history.isFavorite
        ? 'true'
        : 'false'
      : '';
  checkListJobDesired.value = history.favoriteJobCategories;
  checkListEmploymentStatuses.value = history.desiredEmploymentStatuses;
  checkListWorkLocationDesired.value = history.desiredWorkLocations;
  textSearch.value = history.textSearch;

  showContentHistories.value = false;
};

const handleCheckAllChangeJobCategory = (jobCategory: IJobCategory[]) => {
  const listJobCategoryId = jobCategory.map((el: IJobCategory) => el.id);
  const isCheckAll =
    listJobCategoryId.length ===
    checkListJobInListJobDesired(listJobCategoryId);

  removeList(listJobCategoryId);
  if (!isCheckAll) {
    checkListJobDesired.value.push(...listJobCategoryId);
  }
};

const checkListJobInListJobDesired = (listCheck: number[]) => {
  let count = 0;
  listCheck.forEach((el) => {
    if (checkListJobDesired.value.includes(el)) {
      count++;
    }
  });
  return count;
};

const removeList = (listID: number[]) => {
  listID.forEach((el) => {
    const index = checkListJobDesired.value.indexOf(el);
    if (index !== -1) {
      checkListJobDesired.value.splice(index, 1);
    }
  });
};

const handleChoseOneJobCategory = (
  jobCategory: IJobCategory[],
  jobCategoryId: number,
  parentId: number,
) => {
  const listJobCategoryId = jobCategory.map((el: IJobCategory) => el.id);
  const countJobCategoryInListCheckBox =
    checkListJobInListJobDesired(listJobCategoryId);

  const isCheckAll =
    listJobCategoryId.length === countJobCategoryInListCheckBox;

  if (isCheckAll) {
    removeList([parentId * -1]);
  }

  if (
    listJobCategoryId.length - 1 === countJobCategoryInListCheckBox &&
    !checkListJobDesired.value.includes(jobCategoryId)
  ) {
    checkListJobDesired.value.push(parentId * -1);
  }
};
</script>

<style lang="scss">
.input-search {
  .el-input__wrapper,
  .el-input-group__prepend {
    @apply shadow-none;
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
  @apply mobile:max-h-[200px] mobile:overflow-y-scroll;
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
.collapse-custom-first {
  .el-collapse-item__header {
    @apply pb-6 justify-between pr-6;
  }
  .el-collapse-item__arrow {
    @apply text-[20px] #{!important};
  }
}
.collapse-custom-second {
  .el-collapse-item__header {
    @apply pb-6 border-0 justify-between pr-6 #{!important};
  }
  .el-collapse-item__wrap {
    @apply border-0 #{!important};
  }
  .el-collapse-item__arrow {
    @apply text-[20px] #{!important};
  }
}
// .is-active {
//   .icon-collapse-custom {
//     @apply -rotate-180;
//   }
// }
.dropdown-jobcategory-custom {
  @apply rounded-xl;
  .el-collapse-item__header {
    @apply border-b-[1px] border-[#DADCDE] text-[20px] h-9;
    .el-icon.el-collapse-item__arrow {
      @apply rotate-[90deg] block;
    }
    .is-active {
      @apply rotate-[-90deg] #{!important};
    }
  }
}
.collapse-custom-first {
  .el-icon.el-collapse-item__arrow {
    @apply hidden;
  }
  .el-collapse-item__header {
    @apply pr-4 #{!important};
  }
  .is-active {
    .icon-collapse-custom {
      @apply -rotate-180;
    }
  }
}
.collapse-custom-second {
  .el-icon.el-collapse-item__arrow {
    @apply hidden;
  }
  .el-collapse-item__header {
    @apply pr-4 #{!important};
  }
  .is-active {
    .icon-collapse-custom {
      @apply -rotate-180;
    }
  }
}
</style>
