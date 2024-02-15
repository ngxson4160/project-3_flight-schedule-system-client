<template>
  <div class="pt-16 mobile:pt-10">
    <div class="form-login-user flex justify-center items-center">
      <div
        class="form-login-container min-h-[500px] !w-[400px] mobile:w-[340px] mobile:px-6"
      >
        <div class="form-login-container-detail w-full h-full">
          <div class="flex justify-center mb-4">
            <h1
              class="font-bold mobile:text-xl text-2xl text-center leading-10 tracking-wider text-black"
            >
              {{ titleLogin }}
            </h1>
          </div>

          <div class="flex justify-center mb-6">
            <div class="border-2 border-solid border-primary w-10"></div>
          </div>

          <div v-if="role === 'USER'" class="mb-6 mobile:mb-4">
            <el-button
              class="button-login-google w-full !h-[44px] bg-white rounded-lg"
              @click="handleLoginWithGoogle"
            >
              <img
                src="~/assets/images/icon-google-login.png"
                class="mr-2 w-[18px] h-[18px]"
              />
              <span class="flex">
                <h1 class="leading-normal text-sm tracking-wider font-medium">
                  Google
                </h1>
                <h2 class="leading-normal text-sm tracking-wider font-medium">
                  Login
                </h2>
              </span>
            </el-button>
          </div>

          <div
            v-if="role === 'USER'"
            class="text-divider flex justify-center items-center after:ml4 before:content-[''] after:content-[''] mobile:mb-4 mb-6 before:flex-grow after:flex-grow"
          >
            <h1
              class="text-sm font-normal tracking-wider leading-normal text-gray"
            >
              または
            </h1>
          </div>
          <!-- Message Error------------------------------------------------------- -->
          <div
            v-if="messageError"
            class="form-message-err flex items-center justify-center gap-2 py-2 px-4 w-full rounded mb-4"
          >
            <img src="~/assets/images/icon-err-login.svg" alt="" />
            <h1 class="text-xs font-bold leading-6 tracking-wider text-danger">
              {{ messageError }}
            </h1>
          </div>
          <!----------------------------------------------------------------------- -->

          <el-form
            ref="ruleFormRef"
            label-position="top"
            :model="formUserLogin"
            :rules="rules"
          >
            <el-form-item
              label="Email"
              class="form-item-login input-password !mb-0"
              required
              prop="email"
            >
              <el-input
                v-model="formUserLogin.email"
                :class="{ 'form-item__input-error': errorMessageEmail }"
                autocomplete="off"
                @keyup.enter="inputPassword?.focus()"
              />
            </el-form-item>
            <p class="text-xs text-danger mb-4 mt-1">{{ errorMessageEmail }}</p>

            <el-form-item
              label="Password"
              class="form-item-login input-password !mb-0"
              required
              prop="password"
            >
              <div class="relative w-full">
                <el-input
                  ref="inputPassword"
                  v-model="formUserLogin.password"
                  :class="{ 'form-item__input-error': errorMessagePassword }"
                  :type="isShowPass ? 'text' : 'password'"
                  autocomplete="off"
                  @keyup.enter="handleLogin(ruleFormRef)"
                />
                <div
                  class="absolute right-2.5 top-[24px] translate-y-[-50%] cursor-pointer"
                  @click="isShowPass = !isShowPass"
                >
                  <img
                    src="~/assets/images/icon-hide-password.svg"
                    :class="{ 'show-pass hidden': isShowPass }"
                  />
                  <img
                    src="~/assets/images/icon-show-password.svg"
                    :class="{ 'hide-pass hidden': !isShowPass }"
                  />
                </div>
              </div>
            </el-form-item>
            <p
              class="text-xs text-danger mb-4 mt-1"
              :class="{ '!mb-6': !errorMessagePassword }"
            >
              {{ errorMessagePassword }}
            </p>

            <el-form-item>
              <el-button
                id="button-login"
                class="w-full h-14"
                type="primary"
                @click="handleLogin(ruleFormRef)"
              >
                Login
              </el-button>
            </el-form-item>
          </el-form>

          <div v-if="role !== 'ADMIN'" class="flex justify-center mt-6">
            <p
              class="font-bold text-sm text-center tracking-wider underline leading-normal text-primary hover:cursor-pointer"
              @click="handleForgotPassword"
            >
              パスワードをお忘れの方
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import type { FormInstance, FormRules } from 'element-plus';
import { ref } from 'vue';
import { ICredential, IResponse } from '~~/utils/interface';
import { useAuthStore } from '~~/stores/auth';

const emit = defineEmits(['login-user']);

const props = defineProps({
  titleLogin: {
    type: [String],
    default: '',
  },
  role: {
    type: [String],
    default: '',
  },
});

const inputPassword = ref(null);

const formUserLogin = reactive<ICredential>({
  email: '',
  password: '',
  role: props.role,
});
const ruleFormRef = ref<FormInstance>();

const rules = reactive<FormRules>({
  email: [
    {
      required: true,
      message: '必須項目です',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: 'メールアドレスの形式が正しくありません',
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    { required: true, message: '必須項目です', trigger: 'blur' },
    {
      validator: validatePasswordMin,
      message: 'パスワードは8文字以上で入力してください',
      trigger: ['blur', 'change'],
    },
    {
      validator: validatePasswordMax,
      message: 'パスワードは20文字以下で入力してください',
      trigger: ['blur', 'change'],
    },
    {
      validator: validateSpecialCharacters,
      message: '記号は使用できません',
      trigger: ['blur', 'change'],
    },
    {
      validator: validateHiraganaKanji,
      message: '半角で入力してください',
      trigger: ['blur', 'change'],
    },
    {
      validator: validateHalfwidth,
      message: '半角で入力してください',
      trigger: ['blur', 'change'],
    },
  ],
});
const isShowPass = ref(false);
const messageError = ref<string>('');
const authStore = useAuthStore();

const pathBefore = useSessionStorage('pathBefore', '');

const systemLogin = async () => {
  try {
    await authStore.systemLogin({ ...formUserLogin });
    if (props.role === 'USER') {
      if (!authStore.currentMotivation) return emit('login-user');
      return routerPush(pathBefore.value === '' ? '/user' : pathBefore.value);
    } else if (props.role === 'EMPLOYER') {
      authStore.memberType
        ? routerPush('/employer/mypage')
        : routerPush(pathBefore.value === '' ? '/employer' : pathBefore.value);
    } else if (props.role === 'ADMIN')
      return routerPush('/admin/flight-schedule');
  } catch (error) {
    messageError.value = error.errorMessage;
  }
};

const errorMessageEmail = ref<string>('');
const errorMessagePassword = ref<string>('');

const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    const valid = await formEl.validate();
    if (valid) {
      onLoading();
      await systemLogin();
      closeLoading();
    }
  } catch (error: any) {
    if (error?.password && error?.password.length) {
      errorMessagePassword.value = error?.password[0].message;
    }
    if (error?.email && error?.email.length) {
      errorMessageEmail.value = error?.email[0].message;
    }
  }
};

const handleForgotPassword = () => {
  if (props.role === 'EMPLOYER') {
    sessionStorage.setItem('role', 'employer');
  } else sessionStorage.setItem('role', 'user');
  routerPush('/forgot-password');
};

const handleLoginWithGoogle = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then(async (dataUser) => {
    const idToken = await dataUser.user.getIdToken();

    const { data, error } = await useBaseFetch('/auth/login-google', {
      method: 'POST',
      body: {
        token: idToken,
      },
    });
    if (error.value?.data) {
      throw error.value?.data;
    } else {
      const response = data.value as IResponse;
      if (response.data.token) {
        await setUpAfterLogin(response.data.token);
        routerPush(pathBefore.value === '' ? '/user' : pathBefore.value);
      } else if (response.data.redirectUrl) {
        const url = response.data.redirectUrl;
        await navigateTo(url, {
          external: true,
        });
      }
    }
  });
};
onBeforeRouteLeave(() => {
  pathBefore.value = null;
});

watch(
  () => formUserLogin.password,
  () => {
    errorMessagePassword.value = '';
    messageError.value = '';
  },
);

watch(
  () => formUserLogin.email,
  () => {
    errorMessageEmail.value = '';
    messageError.value = '';
  },
);
</script>

<style lang="scss" scoped>
/*---------------------------------PC---------------------------*/
.form-login-user {
  .form-login-container {
    .button-login-google {
      color: #2b3647;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    }
    .form-message-err {
      background: rgba(254, 75, 40, 0.15);
    }
    .text-divider::before,
    .text-divider::after {
      height: 1px;
      background-color: #dadcde;
    }
  }
}
</style>

<style lang="scss">
.form-item-login .el-form-item__label {
  @apply text-xs  font-bold leading-5 text-black tracking-wider;
  margin-bottom: 4px !important;
}
.form-login-user {
  .el-form-item__label:before {
    display: none !important;
  }
  .input-password {
    .el-form-item__error {
      @apply hidden;
    }
  }
  .el-input__inner {
    @apply h-[42px] mobile:text-sm pc:text-base;
  }
  .el-form-item.is-error .el-input__wrapper {
    box-shadow: 0 0 0 1px rgba(201, 204, 207, 0.6);
  }
}

.form-item__input-error {
  .el-input__wrapper {
    box-shadow: 0 0 0 1px #fe4b28 !important;
  }
}
</style>
