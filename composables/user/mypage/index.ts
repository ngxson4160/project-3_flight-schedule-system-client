import { openNotificationWarningRequired } from '@/plugins/utils/notification-custom';

export const useUserProfile = () => {
  const router = useRouter();

  const getDetail = async () => {
    try {
      onLoading();
      return await useBaseFetch(`/users/profile`, {});
    } catch (error) {
    } finally {
      closeLoading();
    }
  };

  const initFormDetailEdit = () => ({
    id: 1,
    email: '',
    isPublicJob: false,
    address: '',
    firstName: '',
    lastName: '',
    firstNamePhonetic: '',
    lastNamePhonetic: '',
    isDeleted: 0,
    requestDeleteStatus: 0,
    deleteReason: {
      reasons: [],
      description: '',
    },
    sex: 0,
    avatarURL: '',
    backgroundURL: '',
    phoneNumber: '',
    dateOfBirth: '',
    yearStart: '',
    monthStart: '',
    dayStart: '',
    homepageURL: '',
    prefecture: '',
    cities: '',
    provinceId: '',
    aboutUs: '',
    postcode: '',
    numberStaff: 1,
    averageAge: 1,
    desiredWorkLocation: 1,
    businessCityId: '',
    jobName: '',
    businessAddress: '',
    businessContent: null,
    governmentOfficeId: null,
    governmentDepartmentName: '',
    additionExperienceOccupation: [],
    additionDesiredJobCategory: [],
    arrayExperienceOccupation: [],
    arrayDesiredJobCategory: [],
    memberType: null,
    memberManageId: null,
    isExperienceOccupation: [],
    isDesiredJobCategory: [],
    academicBackground: [
      {
        schoolName: '',
        academicInfo: '',
        entranceDate: '',
        graduationDate: '',
        schoolDistinction: '',
        statusGraduation: '',
      },
    ],
    isShowWorkExperience: false,
    workExperience: [
      {
        project: [{ title: '', endTime: '', startTime: '', description: '' }],
        isWorking: false,
        department: '',
        description: '',
        companyName: '',
        entranceDate: '',
        resignationDate: '',
        employmentStatus: '',
      },
    ],
    desiredWorkGovernmentOfficeCategory: '',
    desiredEmploymentStatus: '',
    desiredWorkDay: null,
    desiredWorkHour: null,
    desiredWorkMode: null,
    desiredWorkDescription: null,
    scoutReception: true,
    willingnessApplyStatus: '',
    parentJob: '',
    skill: '',
    qualification: [
      {
        qualificationDate: '',
        qualificationContent: '',
      },
    ],
    language: [
      {
        level: '',
        language: '',
        certificateTime: '',
        qualificationDetail: '',
      },
    ],
    lastLoginDate: '',
    createdDate: '',
    modifiedDate: '',
    userRoles: [
      {
        id: 1,
        userId: 1,
        roleId: 2,
        createdTime: '',
        updatedTime: null,
        role: {
          id: 2,
          name: '',
          key: '',
          description: ' ',
          createdTime: '',
          updatedTime: null,
        },
      },
    ],
    experienceOccupation: [
      {
        id: 0,
        userId: 0,
        jobCategoryId: 0,
        type: 0,
        createdTime: '',
        updatedTime: '',
        jobCategory: {
          id: 0,
          name: '',
          parentId: 0,
          createdTime: '',
          updatedTime: '',
        },
      },
    ],
    desiredJobCategory: [
      {
        id: 0,
        userId: 0,
        jobCategoryId: 0,
        type: 0,
        createdTime: '',
        updatedTime: '',
        jobCategory: {
          id: 0,
          name: '',
          parentId: 0,
          createdTime: '',
          updatedTime: '',
        },
      },
    ],
    hiddenGovernment: [],
    hiddenGovernmentOffices: [
      {
        id: 0,
        userId: 0,
        governmentOfficeId: 0,
        createdTime: '',
        updatedTime: '',
        isDelete: false,
      },
    ],
  });
  const messageErrorPhone = ref<string>('');
  const editBasic = async (item: any, isBlockNextPage?: Boolean) => {
    try {
      if (typeof item.additionExperienceOccupation === 'string') {
        item.additionExperienceOccupation =
          item.additionExperienceOccupation.split(',');
      }
      item.dateOfBirth = [item.yearStart, item.monthStart, item.dayStart].join(
        '-',
      );

      const { error } = await useBaseFetch(`/users/profile/basic-info`, {
        method: 'PUT',
        body: {
          firstName: item.firstName,
          lastName: item.lastName,
          firstNamePhonetic: item.firstNamePhonetic,
          lastNamePhonetic: item.lastNamePhonetic,
          phoneNumber: item.phoneNumber,
          dateOfBirth: item.dateOfBirth,
          sex: item.sex,
          avatarURL: item.avatarURL,
          postcode: item.postcode,
          businessCityId: item.businessCityId
            ? Number(item.businessCityId)
            : null,
          businessAddress: item.businessAddress,
          experienceOccupation: item.experienceOccupation,
          skill: item.skill,
          additionExperienceOccupation: item.additionExperienceOccupation,
          aboutUs: item.aboutUs,
          qualification: item.qualification,
          language: item.language,
          isBasicInfo: item.isBasicInfo,
        },
      });

      if (!error.value) {
        messageErrorPhone.value = '';
        if (!isBlockNextPage) {
          if (item.isBasicInfo) openNotification('');
          else openNotificationWarningRequired();
          router.push('/user/mypage/history');
        }
      } else {
        messageErrorPhone.value = '半角数字、ハイフンなしで入力してください';
      }
    } catch (error) {}
  };

  const editHistory = async (item: any, isBlockNextPage?: Boolean) => {
    try {
      const { error } = await useBaseFetch(
        `/users/profile/work-and-education`,
        {
          method: 'PUT',
          body: {
            academicBackground: item.academicBackground,
            workExperience: item.workExperience,
            isEducation: item.isEducation,
            isShowWorkExperience: item.isShowWorkExperience,
          },
        },
      );
      if (!error.value) {
        if (!isBlockNextPage) {
          if (item.isBasicInfo) openNotification('');
          else openNotificationWarningRequired();
          router.push('/user/mypage/preferred-conditions');
        }
      }
    } catch (error) {}
  };

  const editConditions = async (item: any, isBlockNextPage?: Boolean) => {
    try {
      if (typeof item.additionDesiredJobCategory === 'string') {
        item.additionDesiredJobCategory =
          item.additionDesiredJobCategory.split(',');
      }
      const { error } = await useBaseFetch(`/users/profile/desired-work`, {
        method: 'PUT',
        body: {
          desiredWorkGovernmentOfficeCategory:
            item.desiredWorkGovernmentOfficeCategory,
          desiredJobCategory: item.desiredJobCategory,
          additionDesiredJobCategory: item.additionDesiredJobCategory,
          desiredEmploymentStatus: item.desiredEmploymentStatus,
          desiredWorkMode: item.desiredWorkMode,
          desiredWorkLocation: item.desiredWorkLocation,
          desiredWorkDescription: item.desiredWorkDescription,
          isDesiredWork: item.isDesiredWork,
        },
      });
      if (!error.value) {
        // if (item.isDesiredWork) openNotification('');
        // // else openNotificationWarningRequired();
        // if (isBlockNextPage) return;
        // router.push('/user/mypage/scout-receiving-settings');

        if (!item.isDesiredWork) openNotificationWarningRequired();
        if (!isBlockNextPage) {
          openNotification('');
          router.push('/user/mypage/scout-receiving-settings');
        }
      }
    } catch (error) {}
  };

  const editScount = async (item: any, isBlockNextPage?: Boolean) => {
    try {
      const { error } = await useBaseFetch(`/users/profile/scout-setting`, {
        method: 'PUT',
        body: {
          scoutReception: item.scoutReception,
          willingnessApplyStatus: item.willingnessApplyStatus,
          hiddenGovernment: item.hiddenGovernmentOffices,
          isScout: true,
        },
      });
      if (!error.value) {
        if (!isBlockNextPage) {
          openNotification('');
        }
      }
    } catch (error) {}
  };

  return {
    getDetail,
    initFormDetailEdit,
    editBasic,
    editHistory,
    editConditions,
    editScount,
    messageErrorPhone,
  };
};
