import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import encUtf8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';
import { signOut, getAuth } from 'firebase/auth';
// eslint-disable-next-line import/default
import iconv from 'iconv-lite';
import {
  IResponse,
  IDate,
  IDataQA,
  ICalendarList,
  ICalendarUserList,
} from './interface';
import { ISystemData, useAuthStore } from '~~/stores/auth';
import { useFavoriteStore } from '~~/stores/useFavoriteStore';
import { useBaseFetch } from '~~/composables/useBaseFetch';
import {
  IWorkExperience,
  IAcademicBackground,
} from '~~/stores/employerMessageList';
import { EMemberType, ESelectionFlows, ETypeStatusMessage } from '~/utils/enum';
import { useExportFormData } from '@/stores/exportFormBlob';
import { useEmployer } from '~~/composables/auth/useEmployer';

/**
 * encode and decode
 */
export function handleJWTEncrypt(payload: Object) {
  const runtimeConfig = useRuntimeConfig();

  return AES.encrypt(
    JSON.stringify(payload),
    runtimeConfig.public.nuxtAuthSecret,
  ).toString();
}

export function handleJWTDecrypt(token: string) {
  const runtimeConfig = useRuntimeConfig();

  return JSON.parse(
    AES.decrypt(token, runtimeConfig.public.nuxtAuthSecret).toString(encUtf8),
  );
}

export interface IAuthLocalStorage {
  tokenClientEncrypt: string;
  dataClientEncrypt: string;
}

/**
 * set auth localStorage
 */
export function handleSetAuthCookie(payload: IAuthLocalStorage) {
  const tokenClientEncrypt = useCookie('auth.session-token');
  tokenClientEncrypt.value = payload.tokenClientEncrypt;

  const dataClientEncrypt = useCookie('auth.system-data');
  dataClientEncrypt.value = payload.dataClientEncrypt;
}

/**
 * get auth localStorage
 */
export function handleGetAuthCookie() {
  const tokenClientEncrypt = useCookie('auth.session-token');
  const dataClientEncrypt = useCookie('auth.system-data');

  return {
    tokenClientEncrypt: tokenClientEncrypt.value,
    dataClientEncrypt: dataClientEncrypt.value,
  };
}
/**
 * remove auth localStorage
 */
export function handleRemoveAuthCookie() {
  const tokenClientEncrypt = useCookie('auth.session-token');
  tokenClientEncrypt.value = null;
  const dataClientEncrypt = useCookie('auth.system-data');
  dataClientEncrypt.value = null;
}

/**
 * set auth localStorage
 */
export function handleSetAuthLocalStorage(payload: IAuthLocalStorage) {
  const tokenClientEncrypt = useLocalStorage('auth.session-token', '');
  tokenClientEncrypt.value = payload.tokenClientEncrypt;

  const dataClientEncrypt = useLocalStorage('auth.system-data', '');
  dataClientEncrypt.value = payload.dataClientEncrypt;
}

/**
 * remove auth localStorage
 */
export function handleRemoveAuthLocalStorage() {
  const tokenClientEncrypt = useLocalStorage('auth.session-token', '');
  tokenClientEncrypt.value = null;
  const dataClientEncrypt = useLocalStorage('auth.system-data', '');
  dataClientEncrypt.value = null;
  const governmentName = useLocalStorage('governmentName', '');
  const businessAddress = useLocalStorage('businessAddress', '');
  const postcode = useLocalStorage('postcode', '');
  const provinceId = useLocalStorage('provinceId', '');
  const cityId = useLocalStorage('cityId', '');
  governmentName.value = null;
  businessAddress.value = null;
  postcode.value = null;
  provinceId.value = null;
  cityId.value = null;
}

/**
 * set favorite localStorage
 */
export function handleSetFavoritesJobLocalStorage(payload: string) {
  const favoriteJobLocal = useLocalStorage('auth.favoriteJobs', '');
  favoriteJobLocal.value = payload;
}

/**
 * remove favorite localStorage
 */
export function handleRemoveFavoritesJobLocalStorage() {
  const favoriteJobLocal = useLocalStorage('auth.favoriteJobs', '');
  favoriteJobLocal.value = null;
}

/**
 * set favorite localStorage
 */
export function handleSetFavoritesLocalStorage(payload: string) {
  const favoriteJobLocal = useLocalStorage('auth.favorites', '');
  favoriteJobLocal.value = payload;
}

/**
 * remove favorite localStorage
 */
export function handleRemoveFavoritesLocalStorage() {
  const favoriteJobLocal = useLocalStorage('auth.favorites', '');
  favoriteJobLocal.value = null;
}

/**
 * set favorite blog localStorage
 */
export function handleSetFavoriteBlogsLocalStorage(payload: string) {
  const favoriteBlogLocal = useLocalStorage('auth.favoritesBlogs', '');
  favoriteBlogLocal.value = payload;
}

/**
 * remove favorite localStorage
 */
export function handleRemoveFavoriteBlogsLocalStorage() {
  const favoriteBlogLocal = useLocalStorage('auth.favoritesBlogs', '');
  favoriteBlogLocal.value = null;
}

/**
 * set favorite applicant localStorage
 */
export function handleSetFavoriteApplicantLocalStorage(payload: string) {
  const favoriteApplicantLocal = useLocalStorage('auth.favoritesApplicant', '');
  favoriteApplicantLocal.value = payload;
}

/**
 * remove favorite applicant localStorage
 */
export function handleRemoveFavoriteApplicantLocalStorage() {
  const favoriteApplicantLocal = useLocalStorage('auth.favoritesApplicant', '');
  favoriteApplicantLocal.value = null;
}

/**
 * set favorite news localStorage
 */
export function handleSetFavoriteNewsLocalStorage(payload: string) {
  const favoriteNewsLocal = useLocalStorage('auth.favoritesNews', '');
  favoriteNewsLocal.value = payload;
}

/**
 * remove favorite news localStorage
 */
export function handleRemoveFavoriteNewsLocalStorage() {
  const favoriteNewsLocal = useLocalStorage('auth.favoritesNews', '');
  favoriteNewsLocal.value = null;
}

/**
 * get auth middleware
 */

export function handleGetProviders() {
  const authStore = useAuthStore();

  /**
   * get cookie
   */
  const cookieSessionAuth = useCookie('auth.session-token').value;
  const cookieSystemData = useCookie('auth.system-data').value;

  if (!cookieSystemData || !cookieSessionAuth) {
    authStore.roles = [ERole.GUEST];
    return computed(() => {
      return false;
    });
  }
  /**
   * set localStorage
   */
  handleSetAuthLocalStorage({
    tokenClientEncrypt: cookieSessionAuth,
    dataClientEncrypt: cookieSystemData,
  });
  /**
   * set pinia
   */
  const systemData = handleJWTDecrypt(cookieSystemData);

  authStore.setSystemData(systemData);
}

/**
 * sigIn
 */

export async function setupDateProfile(token: string) {
  const payloadToken = {
    token,
  };
  const tokenClientEncrypt = handleJWTEncrypt(payloadToken);
  const { data: dataProfile, error: errorProfile } = await useBaseFetch(
    '/auth/profile',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (errorProfile.value?.data) {
    throw errorProfile.value?.data;
  } else {
    const profile = dataProfile.value;

    const payloadSystemData = {
      id: profile.data.id,
      email: profile.data.email,
      firstName: profile.data.firstName,
      lastName: profile.data.lastName,
      roles: profile.data.role,
    };
    const dataClientEncrypt = handleJWTEncrypt(payloadSystemData);
    /**
     * set localStorage
     */
    handleSetAuthLocalStorage({ tokenClientEncrypt, dataClientEncrypt });
    /**
     * set cookie
     */
    handleRemoveAuthCookie();
    handleSetAuthCookie({ tokenClientEncrypt, dataClientEncrypt });
    /**
     * set pinia
     */
  }
}
export async function setupDateFavoriteJob(token: string) {
  const { data, error } = await useBaseFetch('/auth/profile/favorite/job', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (error.value?.data) throw error.value?.data;
  else {
    const response = data.value as IResponse;
    const payloadAuthFavoriteJobs: number[] = response.data.favoriteJobs || [];
    handleRemoveFavoritesJobLocalStorage();
    handleSetFavoritesJobLocalStorage(payloadAuthFavoriteJobs.toString());
  }
}
export async function setupDateFavoriteUser(token: string) {
  const { data, error } = await useBaseFetch(
    '/auth/profile/favorite/user-employer',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (error.value?.data) throw error.value?.data;
  else {
    const response = data.value as IResponse;
    const payloadAuthFavorite: number[] = response.data.userFavorites || [];
    handleRemoveFavoritesLocalStorage();
    handleSetFavoritesLocalStorage(payloadAuthFavorite.toString());
  }
}
export async function setupDateFavoriteBlog(token: string) {
  const { data, error } = await useBaseFetch('/auth/profile/favorite/blog', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (error.value?.data) throw error.value?.data;
  else {
    const response = data.value as IResponse;
    const payloadAuthFavoriteBlog: number[] = response.data.favoriteBlogs || [];
    handleRemoveFavoriteBlogsLocalStorage();
    handleSetFavoriteBlogsLocalStorage(payloadAuthFavoriteBlog.toString());
  }
}
export async function setupDateFavoriteApplicant(token: string) {
  const { data, error } = await useBaseFetch(
    '/auth/profile/favorite/applicant',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (error.value?.data) throw error.value?.data;
  else {
    const response = data.value as IResponse;
    const payloadAuthFavoriteApplicants: number[] =
      response.data.favoriteApplicants || [];
    handleRemoveFavoriteApplicantLocalStorage();
    handleSetFavoriteApplicantLocalStorage(
      payloadAuthFavoriteApplicants.toString(),
    );
  }
}
export async function setupDateFavoriteNews(token: string) {
  const { data, error } = await useBaseFetch('/auth/profile/favorite/news', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (error.value?.data) throw error.value?.data;
  else {
    const response = data.value as IResponse;
    const payloadAuthFavoriteNews: number[] = response.data.favoriteNews || [];
    handleRemoveFavoriteNewsLocalStorage();
    handleSetFavoriteNewsLocalStorage(payloadAuthFavoriteNews.toString());
  }
}
export async function setUpAfterLogin(token: string) {
  await Promise.all([setupDateProfile(token)]);
}

export async function handleSignIn(request: string, body: any) {
  const { data, error } = await useBaseFetch(request, {
    method: 'POST',
    body,
  });
  if (error.value?.data) {
    throw error.value?.data;
  } else {
    const response = data.value;
    await setUpAfterLogin(response.accessToken);
  }
}

/**
 * logout
 */
export function handleLogout() {
  const cookieSessionAuth = useCookie('auth.session-token').value;
  let isEmployer = false;
  if (cookieSessionAuth) {
    isEmployer = useEmployer();
  }
  handleRemoveAuthCookie();

  handleRemoveAuthLocalStorage();

  handleRemoveFavoritesJobLocalStorage();

  handleRemoveFavoritesLocalStorage();

  handleRemoveFavoriteBlogsLocalStorage();

  handleRemoveFavoriteApplicantLocalStorage();

  const authStore = useAuthStore();
  const favoriteStore = useFavoriteStore();
  favoriteStore.jobTemporary = [];
  favoriteStore.blogsTemporary = [];
  favoriteStore.favoriteJobsSystem = [];
  authStore.role = ERole.GUEST;

  const auth = getAuth();
  signOut(auth);
  if (isEmployer) {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
  routerPush('/');
}

/**
 * navigation
 */
export function routerPush(route: string) {
  // onLoading();
  const router = useRouter();
  router.push(route);
  // closeLoading();
}
export function handleBackNormal() {
  const router = useRouter();
  return router.go(-1);
}

/**
 * api get meta data
 */
export async function getJobCategorySmallById(id: number) {
  const { data: dataJobBigCategories } = await useBaseFetch(
    '/job-categories',
    {},
  );
  const responseJobBigCategories = dataJobBigCategories.value as IResponse;
  const jobBigCategories = responseJobBigCategories.data;
  const jobCategoriesAll = ref<[{ id: number; name: string }]>([
    { id: 0, name: '' },
  ]);
  jobCategoriesAll.value.shift();
  jobBigCategories.forEach((job: any) => {
    job.jobCategories.forEach((jobCategory: any) => {
      jobCategoriesAll.value.push({
        id: Number(jobCategory.id),
        name: jobCategory.name.toString(),
      });
    });
  });
  return jobCategoriesAll.value.find((e) => e.id === id);
}
export async function getGovernmentOfficeById(id: number) {
  const { data: dataGovernmentOffices } = await useBaseFetch(
    '/government-offices',
    {},
  );
  const responseGovernmentOffices = dataGovernmentOffices.value as IResponse;
  const governmentOffices = responseGovernmentOffices.data;
  const governmentOfficeNames = governmentOffices.map(
    (governmentOffice: any) => {
      return { id: governmentOffice.id, name: governmentOffice.name };
    },
  );
  return governmentOfficeNames.find((e: any) => e.id === id);
}

/**
 * format date
 */
export function formatDate(date: string | Date, format: string) {
  if (date) return dayjs(date).format(format);
  return '';
}

export function formatBytes(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;

  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }

  return parseFloat(bytes.toFixed(2)) + ' ' + units[i];
}

export function handleOpenNewTab(url: string) {
  const filePath = url;
  const a = document.createElement('A');
  a.href = url;
  a.download = filePath.substr(filePath.lastIndexOf('/') + 1);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function downloadFileShowLoading(url: string, isNotification: boolean) {
  const exportFormData = useExportFormData();
  handleOpenNewTab(url);
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      exportFormData.setLoading(false);
      if (isNotification) {
        openNotification(exportFormData.messageUploadPDFSuccess);
      }
    });
}

export function handleScrollToError(formRef: { $el: any }) {
  const formElement = formRef.$el;
  const fieldElement = formElement.querySelectorAll(`.el-form-item`);
  const formConvert = Object.values(fieldElement);
  const allElementForms = formConvert.map((i) => {
    return i;
  });
  const elementScroll = allElementForms.find((i) =>
    i.className.includes('is-error'),
  );
  elementScroll.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  });
}

export const handleCheckToken = async () => {
  const { data, error } = await useBaseFetch(`users/profile/export-token?`, {
    method: 'POST',
  });
  if (error.value) throw error.value;
  const token = data.value?.data;
  return token;
};

export function getCompanyName(workExperience: IWorkExperience[]) {
  if (workExperience && workExperience.length) {
    const isEmpty = workExperience.some((i) => !i.resignationDate);

    if (isEmpty) {
      const timeWork = workExperience.find((item) => !item.resignationDate);
      if (timeWork) {
        return timeWork.companyName;
      }
    } else {
      let closestDateElement = null as IWorkExperience | null;
      let closestDateDifference = Infinity;

      workExperience.forEach((element) => {
        const resignationDate = dayjs(element.resignationDate);
        const difference = Math.abs(
          dayjs().diff(resignationDate, 'millisecond'),
        );

        if (difference < closestDateDifference) {
          closestDateDifference = difference;
          closestDateElement = element;
        }
      });
      const closestDateValue = closestDateElement;
      if (closestDateValue) {
        return closestDateValue.companyName;
      }
    }
  }
  return '-';
}

export function getAcademic(
  academicBackground: IAcademicBackground[],
  typeAcademic?: string,
) {
  if (academicBackground && academicBackground.length) {
    const isEmpty = academicBackground.some((i) => !i.graduationDate);

    if (isEmpty) {
      const timeWork = academicBackground.find((item) => !item.graduationDate);
      if (timeWork) {
        return timeWork.schoolName + ' ' + timeWork.academicInfo;
      }
    } else {
      let closestDateElement = null as IAcademicBackground | null;
      let closestDateDifference = Infinity;

      academicBackground.forEach((element) => {
        const graduationDate = dayjs(element.graduationDate);
        const difference = Math.abs(
          dayjs().diff(graduationDate, 'millisecond'),
        );

        if (difference < closestDateDifference) {
          closestDateDifference = difference;
          closestDateElement = element;
        }
      });
      const closestDateValue = closestDateElement;
      if (closestDateValue) {
        if (typeAcademic)
          return (
            closestDateValue.schoolName + ' ' + closestDateValue.academicInfo
          );
        return (
          closestDateValue.schoolName + '/' + closestDateValue.academicInfo
        );
      }
    }
  }
  return '-';
}

export const checkIsEmployerBlob = () => {
  const dataStorage = useCookie('auth.system-data');
  let isBlogEmployer = false;
  if (dataStorage.value) {
    isBlogEmployer =
      handleJWTDecrypt(dataStorage.value).memberType ===
      EMemberType.MEMBER_BLOGGER;
  }
  return isBlogEmployer;
};

export function disabledDateInPast(time: Date) {
  const dateNow = new Date();
  dateNow.setDate(dateNow.getDate() - 1);
  return time < dateNow;
}

export function exportCSV(csv: string, pageName: string) {
  if (!csv.match(/^data:text\/csv/i)) {
    const shiftJISData = iconv.encode(csv, 'Shift-JIS');
    const blob = new Blob([shiftJISData], {
      type: 'text/csv;charset=shift-jis;',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = pageName;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}

export function getDate(date: IDate) {
  if (!date.year && !date.month && !date.day) return null;
  return `${date.year ?? '01'}-${date.month ?? '01'}-${date.day ?? '01'}`;
}

export function convertDateToObject(date: string) {
  return {
    year: dayjs(date).format('YYYY'),
    month: dayjs(date).format('MM'),
    day: dayjs(date).format('DD'),
  } as IDate;
}

export function convertPrice(price: number) {
  return price
    .toString()
    .replace(/\D/g, '')
    .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
}

export async function getListQA(
  categoryType: boolean,
  page: number,
  limit: number,
) {
  const listQA = ref<IDataQA[]>([]);
  const totalCount = ref(0);
  const { data: dataQA, error: errorQA } = await useBaseFetch(
    '/frequently-asked-question',
    {
      query: {
        categoryType,
        page,
        limit,
      },
    },
  );
  if (errorQA.value?.data) {
    throw errorQA.value?.data;
  } else {
    const response = dataQA.value as IResponse;
    totalCount.value = response.data.totalCount;
    response.data.frequentlyAskedQuestion.forEach((e: any) => {
      listQA.value.push({
        question: e.question,
        answer: e.answer,
        isShowAnswer: false,
      });
    });
  }
  return {
    frequentlyAskedQuestion: listQA.value,
    totalCount: totalCount.value,
  };
}

export function formatPhoneNumber(phoneNumber: string) {
  if (!phoneNumber) return phoneNumber;
  const phoneNumbercleaned = phoneNumber.replace(/\D/g, '');

  if (phoneNumbercleaned.length === 10) {
    return phoneNumbercleaned.replace(/(\d{3})(\d{4})(\d{3})/, '$1-$2-$3');
  }

  if (phoneNumbercleaned.length === 11) {
    return phoneNumbercleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }

  return phoneNumber;
}

export function formatTemplateText(text: string) {
  return `{${text}}`;
}

export async function fixParseHTMLTemplateText() {
  await nextTick();
  const divMessageEditor = document.getElementsByClassName('message-editor');
  for (let index = 0; index < divMessageEditor.length; index++) {
    const tagsEmployerName = divMessageEditor[index].getElementsByClassName(
      'template-employer-name',
    );
    for (let i = 0; i < tagsEmployerName.length; i++) {
      tagsEmployerName[i].innerHTML = formatTemplateText(
        ETemplateTextType.EMPLOYER_NAME,
      );
    }
    const tagsUserName =
      divMessageEditor[index].getElementsByClassName('template-user-name');
    for (let i = 0; i < tagsUserName.length; i++) {
      tagsUserName[i].innerHTML = formatTemplateText(
        ETemplateTextType.USER_NAME,
      );
    }
    const tagsJobTitle =
      divMessageEditor[index].getElementsByClassName('template-job-title');
    for (let i = 0; i < tagsJobTitle.length; i++) {
      tagsJobTitle[i].innerHTML = formatTemplateText(
        ETemplateTextType.JOB_TITLE,
      );
    }
    const tagsEntryNumber = divMessageEditor[index].getElementsByClassName(
      'template-entry-number',
    );
    for (let i = 0; i < tagsEntryNumber.length; i++) {
      tagsEntryNumber[i].innerHTML = formatTemplateText(
        ETemplateTextType.ENTRY_NUMBER,
      );
    }
    const tagsSelectionDate = divMessageEditor[index].getElementsByClassName(
      'template-selection-date',
    );
    for (let i = 0; i < tagsSelectionDate.length; i++) {
      tagsSelectionDate[i].innerHTML = formatTemplateText(
        ETemplateTextType.SELECTION_DATE,
      );
    }
    const tagsSelectionStep = divMessageEditor[index].getElementsByClassName(
      'template-selection-step',
    );
    for (let i = 0; i < tagsSelectionStep.length; i++) {
      tagsSelectionStep[i].innerHTML = formatTemplateText(
        ETemplateTextType.SELECTION_STEP,
      );
    }
  }
}

export async function fixContentMessageEditor(html: string) {
  await fixParseHTMLTemplateText();

  const contentMessageEditor = document.createElement('div');
  contentMessageEditor.innerHTML = html;

  const tagsEmployerName = contentMessageEditor.getElementsByClassName(
    'template-employer-name',
  );
  for (let i = 0; i < tagsEmployerName.length; i++) {
    tagsEmployerName[i].innerHTML = formatTemplateText(
      ETemplateTextType.EMPLOYER_NAME,
    );
  }
  const tagsUserName =
    contentMessageEditor.getElementsByClassName('template-user-name');
  for (let i = 0; i < tagsUserName.length; i++) {
    tagsUserName[i].innerHTML = formatTemplateText(ETemplateTextType.USER_NAME);
  }
  const tagJobTitle =
    contentMessageEditor.getElementsByClassName('template-job-title');
  for (let i = 0; i < tagJobTitle.length; i++) {
    tagJobTitle[i].innerHTML = formatTemplateText(ETemplateTextType.JOB_TITLE);
  }
  const tagsEntryNumber = contentMessageEditor.getElementsByClassName(
    'template-entry-number',
  );
  for (let i = 0; i < tagsEntryNumber.length; i++) {
    tagsEntryNumber[i].innerHTML = formatTemplateText(
      ETemplateTextType.ENTRY_NUMBER,
    );
  }
  const tagsSelectionDate = contentMessageEditor.getElementsByClassName(
    'template-selection-date',
  );
  for (let i = 0; i < tagsSelectionDate.length; i++) {
    tagsSelectionDate[i].innerHTML = formatTemplateText(
      ETemplateTextType.SELECTION_DATE,
    );
  }
  const tagsSelectionStep = contentMessageEditor.getElementsByClassName(
    'template-selection-step',
  );
  for (let i = 0; i < tagsSelectionStep.length; i++) {
    tagsSelectionStep[i].innerHTML = formatTemplateText(
      ETemplateTextType.SELECTION_STEP,
    );
  }

  return contentMessageEditor.innerHTML;
}

export function generateUpperCaseAlphabetArray() {
  const alphabetArray = [];
  const startCharCode = 'A'.charCodeAt(0);
  const endCharCode = 'Z'.charCodeAt(0);
  alphabetArray.push('選択しない');
  for (let charCode = startCharCode; charCode <= endCharCode; charCode++) {
    alphabetArray.push(String.fromCharCode(charCode));
  }

  return alphabetArray;
}

export function sortSelectionFlows(
  selectionFlows: { title: string; content: string }[],
) {
  if (
    !selectionFlows.some(
      (item: any) => item.title === ETypeStatusMessage.ADOPTION,
    )
  ) {
    selectionFlows.push({
      title: ETypeStatusMessage.ADOPTION,
      content: '',
    });
  }
  const newSelectionFlows = selectionFlows.map(
    (e: { title: string; content: string }) => {
      let idSelectionFlow = 1;
      switch (e.title) {
        case ESelectionFlows[0]:
          idSelectionFlow = 5;
          break;
        case ESelectionFlows[1]:
          idSelectionFlow = 4;
          break;
        case ESelectionFlows[2]:
          idSelectionFlow = 3;
          break;
        case ESelectionFlows[3]:
          idSelectionFlow = 2;
          break;
        default:
          break;
      }
      return { id: idSelectionFlow, ...e };
    },
  );
  newSelectionFlows.sort((a, b) => b.id - a.id);
  return newSelectionFlows.map((e) => {
    return { title: e.title, content: e.content };
  });
}
export function downloadFileAttachment(
  fileName: string | null,
  fileUrl: string,
) {
  if (fileName == null) fileName = 'output';
  const config = useRuntimeConfig();
  const a = document.createElement('A') as HTMLAnchorElement;
  a.href = `${config.public.baseURL}/file-export/download/job/attachment?fileName=${fileName}&fileUrl=${fileUrl}`;
  a.target = '_blank';
  a.click();
}

export function cutFileNameFromUrl(url: string) {
  if (!url) return;
  return url.slice(107, url.length).split('.').slice(0, -1).join('.');
}

export function createRegexConfigEmbedFromUrl(url: string) {
  const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regexString = `^${escapedUrl}.*`;
  return new RegExp(regexString);
}

export function checkIsNew(created: Date | string) {
  const dateStart = dayjs();
  const dateEnd = dayjs(created);
  return dateStart.diff(dateEnd, 'day') <= 14;
}

export function getFileExtensionFromUrl(
  url: string,
  isDisableToUpperCase?: boolean,
) {
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  const filenameParts = filename.split('.');
  const fileExtension = filenameParts[filenameParts.length - 1];
  if (isDisableToUpperCase) return fileExtension;
  return fileExtension.toUpperCase();
}

export const convertDateMonth = (time: string | Date) => {
  return dayjs(time).locale(ja).format('MM/DD (ddd)');
};

export const convertHoursMinute = (list: ICalendarList) => {
  return `${dayjs(list?.interviewDate).format('HH:mm')}~${
    list?.interviewEndDate ? dayjs(list?.interviewEndDate).format('HH:mm') : ''
  }`;
};

export const convertHoursMinuteUser = (list: ICalendarUserList) => {
  return `${dayjs(list?.applicantEntry?.settingInterview?.interviewDate).format(
    'HH:mm',
  )}~${
    list?.applicantEntry?.settingInterview?.interviewEndDate
      ? dayjs(list?.applicantEntry?.settingInterview?.interviewEndDate).format(
          'HH:mm',
        )
      : ''
  }`;
};

export function removeSpaceInPTag(content: string) {
  return content.replaceAll(/<p>(&nbsp;)+<\/p>/g, '');
}

export function getGMTOffset(dateString: string | Date): number {
  const date = new Date(dateString);
  const offsetMinutes = date.getTimezoneOffset();
  const offsetHours = offsetMinutes / 60;
  const sign = offsetHours >= 0 ? -1 : 1;
  const absoluteOffset = Math.abs(offsetHours);
  const result = sign * absoluteOffset;
  return result;
}

export const exportManyFileAndImage = async (
  fileList: { fileName: string; file: string }[],
) => {
  const { data } = await useBaseFetch('/file-export/download/many/file-image', {
    method: 'POST',
    body: {
      downloadFile: fileList,
    },
  });
  if (data.value) {
    const blob = data.value;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'output';
    link.click();
    URL.revokeObjectURL(link.href);
  }
};
