<template>
  <client-only>
    <div class="w-[760px] p-10 bg-white rounded-xl">
      <div class="flex flex-col items-center gap-14">
        <p class="text-[26px] font-bold">
          {{ titleRestriction }}
        </p>

        <div class="flex flex-col gap-4">
          <div>
            <ul
              v-for="text in descriptionRestriction"
              :key="text"
              class="list-disc pl-5"
            >
              <li>{{ text }}</li>
            </ul>
          </div>

          <p class="text-sm text-danger">
            {{ warningRestriction }}
          </p>

          <!-- Custom Options infinity scroll -->

          <el-form
            ref="ruleFormRef"
            label-position="top"
            :model="employerRestriction"
            :rules="rules"
            :hide-required-asterisk="true"
          >
            <el-form-item label="官公庁" prop="employerName">
              <el-popover
                :visible="openSelectOption"
                placement="bottom"
                :width="680"
                trigger="click"
              >
                <template #reference>
                  <el-input
                    id="input"
                    v-model="employerRestriction.employerName"
                    clearable
                    autocomplete="off"
                    placeholder="選択してください"
                    :suffix-icon="
                      employerRestriction.employerName ? '' : ArrowDownBold
                    "
                    @click="openSelectOption = true"
                    @input="
                      handleSearchEmployer(employerRestriction.employerName)
                    "
                    @blur="hideOptions"
                  />
                </template>

                <!-- Empty Data -->
                <div
                  v-if="!adminIpRestrictionStore.employers.length"
                  class="text-center"
                >
                  データなし
                </div>

                <!-- Have Data -->
                <ul
                  v-else
                  v-infinite-scroll="loadMoreOptions"
                  class="infinite-list"
                >
                  <li
                    v-for="i in optionEmployers"
                    :key="i.value"
                    class="infinite-list-item"
                    @click="handleSelected(i)"
                  >
                    <div
                      class="w-full h-[50px] flex items-center pl-3"
                      :class="{
                        'bg-option-gray':
                          activeId === i.value &&
                          employerRestriction.employerName,
                      }"
                    >
                      {{ i.label }}
                    </div>
                  </li>
                </ul>
              </el-popover>
            </el-form-item>

            <el-form-item prop="ipConfig">
              <el-input
                v-model="employerRestriction.ipConfig"
                :class="{
                  'border border-solid border-danger rounded-xl':
                    isLimited || isUnique,
                }"
                type="textarea"
                :rows="7"
                placeholder="例）&#10;198.51.100.6&#10;198.51.100.150&#10;63.139.127.5 -  63.139.127.23"
              />
            </el-form-item>
          </el-form>

          <p v-if="isLimited" class="text-xs text-danger">
            設定できるもは最大10行までとなります
          </p>

          <p v-if="isUnique" class="text-xs text-danger">
            重複したIPが存在しています
          </p>
        </div>

        <el-button
          class="w-full"
          type="primary"
          @click="handleRestriction(ruleFormRef)"
        >
          変更
        </el-button>
      </div>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ArrowDownBold } from '@element-plus/icons-vue';
import { FormInstance } from 'element-plus';
import { useAdminIpRestrictionStore } from '~~/stores/adminIpRestriction.ts';

type EmployerRestriction = {
  employerId: number;
  employerName: string;
  ipConfig: string[];
};

/* Text Description */
const titleRestriction = '官公庁画面へのアクセス元のIPアドレス制限';
const warningRestriction =
  '※設定したIPアドレス以外からはアクセスできなくなります。固定IP環境でない場合は設定しないようお気をつけ下さい。';
const descriptionRestriction = [
  '官公庁ごとに利用を許可するIPアドレスを1行に1つずつ入力してください。IPv4 / IPv6のCIDR記法に対応しています。',
  '設定できるものは最大で10行までです',
  '範囲の指定には、ダッシュを使用します。（例：63.139.127.5 - 63.139.127.23）',
  '空欄の場合は全てのIPアドレスで官公庁画面の利用を許可します。',
];
/* ------------------ */

/* Declare Variable */
const ruleFormRef = ref<FormInstance>();
const pageCurrent = ref<number>(1);
const openSelectOption = ref<boolean>(false);
const isLimited = ref<boolean>(false);
const isUnique = ref<boolean>(false);
const nameSearch = ref<string>('');
const employerRestriction = ref<EmployerRestriction>({
  employerName: '',
  employerId: 0,
  ipConfig: [],
});
const activeId = ref<number | null>(null);

const adminIpRestrictionStore = useAdminIpRestrictionStore();
/* GET List Employer */
await adminIpRestrictionStore.getEmployerRestriction({
  page: pageCurrent.value,
  loadMore: false,
});

const optionEmployers = computed(() => {
  return adminIpRestrictionStore.employers.map(
    (item: {
      id: string;
      ipConfig: string[];
      governmentOffice: {
        name: string;
      };
    }) => {
      return {
        value: item.id,
        label: item.governmentOffice.name,
        ipConfig: item.ipConfig,
      };
    },
  );
});

/* Load More Select Options */
const loadMoreOptions = async () => {
  const totalPage = Math.ceil(adminIpRestrictionStore.totalCount / 10);
  if (pageCurrent.value <= totalPage) {
    await adminIpRestrictionStore.getEmployerRestriction({
      name: nameSearch.value,
      page: pageCurrent.value++,
      loadMore: true,
    });
  }
};

/* Employer Selected */
const handleSelected = (data: {
  value: number;
  label: string;
  ipConfig: any;
}) => {
  activeId.value = data.value;
  employerRestriction.value.employerName = data.label;
  employerRestriction.value.employerId = data.value;
  employerRestriction.value.ipConfig = data.ipConfig.join('\n');
  openSelectOption.value = false;
};

/* Search Employer With Name */
const handleSearchEmployer = (name: string) => {
  pageCurrent.value = 1;
  nameSearch.value = name;
  setTimeout(async () => {
    await adminIpRestrictionStore.getEmployerRestriction({
      name,
      page: pageCurrent.value,
      loadMore: false,
    });
  }, 500);
};

/* Click OutSize hidden Option Select */
const hideOptions = () => {
  const input = document.getElementById('input');
  if (input) {
    openSelectOption.value = false;
    input.blur();
  }
};

const hasDuplicates = (arr: string[]) => {
  return new Set(arr).size !== arr.length;
};

/* Create Employer Restriction with IP */
const handleRestriction = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      let ipConfig;
      if (employerRestriction.value.ipConfig) {
        ipConfig = employerRestriction.value.ipConfig.split('\n');
      } else {
        ipConfig = [];
      }
      ipConfig = ipConfig.filter((i: string) => i);
      isLimited.value = !!(ipConfig && ipConfig.length > 10);
      isUnique.value = !!hasDuplicates(ipConfig);

      if (!isLimited.value && !isUnique.value) {
        await adminIpRestrictionStore.createEmployerRestriction({
          ...employerRestriction.value,
          ip: ipConfig,
        });
        await adminIpRestrictionStore.getEmployerRestriction({
          page: pageCurrent.value,
          loadMore: false,
        });
      }
    }
  });
};

const ValidateLimitIpWithRule = (
  rule: any,
  value: string,
  callback: any,
): boolean => {
  const newVals = value.split('\n').filter((i) => i);
  const regex =
    /^(?:[0-9a-z.: \\/-]+|63\.139\.127\.(5|6|7|8|9|1[0-9]|2[0-3]))?$/m;
  const valid = newVals.find((val) => !regex.test(val));
  return !valid;
};

const rules = {
  ipConfig: [
    {
      validator: ValidateLimitIpWithRule,
      message: 'IPフォーマットの形式が正しくありません',
      trigger: 'change',
    },
  ],
  employerName: {
    required: true,
    message: '必須項目です',
    trigger: 'change',
  },
};
</script>

<style lang="scss" scoped>
.infinite-list {
  @apply overflow-y-scroll max-h-[300px] p-0 m-0;
  &::-webkit-scrollbar {
    @apply bg-gray w-[10px] rounded-xl;
  }
  &::-webkit-scrollbar-track {
    @apply rounded;
  }
  &::-webkit-scrollbar-thumb {
    @apply bg-gray-third  w-[10px] rounded;
  }
}
.infinite-list .infinite-list-item {
  @apply flex justify-center items-center m-3 h-[50px] bg-white cursor-pointer;
  &:hover {
    @apply bg-option-gray;
  }
}
.infinite-list .infinite-list-item + .list-item {
  @apply mt-3;
}
</style>
