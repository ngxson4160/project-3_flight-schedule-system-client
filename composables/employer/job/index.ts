export const useEmpJob = () => {
  const getDetail = async (id: any) => {
    try {
      return await useBaseFetch(`/employers/profile/jobs/${id}`, {
        method: 'GET',
      });
    } catch (error) {}
  };

  const getProvince = async () => {
    try {
      onLoading();
      return await useBaseFetch(`/provinces`, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
    } finally {
      closeLoading();
    }
  };

  const getGovernmentOffices = async () => {
    try {
      return await useBaseFetch(`/government-offices`, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {}
  };

  const getCities = async () => {
    try {
      return await useBaseFetch(`/cities`, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {}
  };

  const getJobCategories = async () => {
    try {
      return await useBaseFetch(`/job-categories`, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {}
  };

  const initFormEdit = () => ({
    images: ['', '', ''],
    position: '',
    title: '',
    blogIds: [],
    jobCategoryId: '',
    employmentStatus: '',
    workModeOrther: '',
    appealPoint: [],
    duty: '',
    eligibilityAbility: '',
    salaryType: '',
    salaryRange: {
      min: 0,
      max: 0,
    },
    remark: '',
    workHour: '',
    workMode: '',
    officeName: '',
    provinceId: '',
    cityId: '',
    workAddress: '',
    workAccess: '',
    remarks: '',
    hiringQuantity: '',
    benefits: '',
    selectionFlows: [],
    attachment: '',
    freeDescription: {
      title: '',
      description: '',
    },
    hiringStartDate: '',
    postalCode: '',
    yearStart: '2023',
    monthStart: '1',
    dayStart: '1',
    yearEnd: '2023',
    monthEnd: '1',
    dayEnd: '1',
    requirement: '',
    jobCategoryParentId: '',
    jobCategoryName: '',
    provinceName: '',
    wellcome_requirement: '',
    wanting_point: '',
    hiringEndDate: '',
    isPublic: false,
    isDraft: false,
    jobEntry: {
      motivation: {
        status: '',
      },
      selfPr: {
        status: '',
      },
      profilePicture: {
        status: '',
      },
      otherData: {
        status: '',
        title: '',
      },
      settingQuestions: [
        {
          status: '必須',
          title: '',
          type: EFormEntry.DEFAULT,
          max: 100,
          questionRadio: [''],
          questionCheckbox: [''],
          questionConsentCheckbox: [''],
        },
      ],
    },
    id: '',
    isEmployer: false,
    nameAttachment: '',
    informationJob: '',
    smokingSolution: '',
  });

  const editJob = async (item: any) => {
    const hiringStartDates = [
      item.yearStart,
      item.monthStart,
      item.dayStart,
    ].join('-');

    const hiringEndDates =
      item.yearEnd && item.monthEnd && item.dayEnd
        ? [item.yearEnd, item.monthEnd, item.dayEnd].join('-')
        : null;

    const salaryRangeFormat = {
      min: +item.salaryRange.min,
      max: +item.salaryRange.max,
    };
    const data: any = {
      images: item.images,
      position: item.position,
      title: item.title,
      blogIds: item.blogIds,
      jobCategoryId: item.jobCategoryId !== '' ? item.jobCategoryId : null,
      employmentStatus: item.employmentStatus,
      appealPoint: item.appealPoint,
      duty: item.duty,
      eligibilityAbility: {
        requirement: item.requirement,
        wellcome_requirement: item.wellcome_requirement,
        wanting_point: item.wanting_point,
      },
      salaryType: item.salaryType,
      salaryRange: salaryRangeFormat,
      remark: item.remark,
      workHour: item.workHour,
      postalCode: item.postalCode,
      workMode: item.workMode,
      jobCategoryParentId: item.jobCategoryParentId,
      officeName: item.officeName,
      // provinceId: item.provinceId !== '' ? item.provinceId : null,
      cityId: item.cityId !== '' ? item.cityId : null,
      workAddress: item.workAddress,
      workAccess: item.workAccess,
      remarks: item.remarks,
      hiringQuantity: Number(item.hiringQuantity),
      benefits: item.benefits,
      selectionFlows: item.selectionFlows,
      attachment: item.attachment,
      freeDescription: {
        title: item.freeDescription.title,
        description: item.freeDescription.description,
      },
      hiringStartDate: hiringStartDates,
      hiringEndDate: hiringEndDates !== '' ? hiringEndDates : null,
      isPublic: item.isPublic,
      isDraft: item.isDraft,
      jobEntry: {
        motivation: {
          status: item.jobEntry.motivation.status,
        },
        selfPr: {
          status: item.jobEntry.selfPr.status,
        },
        profilePicture: {
          status: item.jobEntry.profilePicture.status,
        },
        otherData: {
          status: item.jobEntry.otherData.status,
          title: item.jobEntry.otherData.title,
        },
        settingQuestions: item.jobEntry.settingQuestions,
      },
      entryNumber: item.entryNumber,
      isEmployer: item.isEmployer,
      nameAttachment: item.nameAttachment,
      informationJob: item.informationJob,
      smokingSolution: item.smokingSolution,
    };

    // Object.keys(data).forEach((item) => data[item] === '' && delete data[item]);

    try {
      return await useBaseFetch(`/jobs/${item.id}`, {
        method: 'PUT',
        body: { ...data },
      });
    } catch (error) {}
  };

  const editJobByAdmin = async (item: any) => {
    const hiringStartDates = [
      item.yearStart,
      item.monthStart,
      item.dayStart,
    ].join('-');

    const hiringEndDates =
      item.yearEnd && item.monthEnd && item.dayEnd
        ? [item.yearEnd, item.monthEnd, item.dayEnd].join('-')
        : null;

    const salaryRangeFormat = {
      min: +item.salaryRange.min,
      max: +item.salaryRange.max,
    };
    const data: any = {
      images: item.images,
      position: item.position,
      title: item.title,
      blogIds: item.blogIds,
      jobCategoryId: item.jobCategoryId,
      employmentStatus: item.employmentStatus,
      appealPoint: item.appealPoint,
      duty: item.duty,
      creatorId: item.creatorId,
      eligibilityAbility: {
        requirement: item.requirement,
        wellcome_requirement: item.wellcome_requirement,
        wanting_point: item.wanting_point,
      },
      salaryType: item.salaryType,
      salaryRange: salaryRangeFormat,
      remark: item.remark,
      workHour: item.workHour,
      postalCode: item.postalCode,
      workMode: item.workMode,
      jobCategoryParentId: item.jobCategoryParentId,
      officeName: item.officeName,
      cityId: item.cityId,
      workAddress: item.workAddress,
      workAccess: item.workAccess,
      remarks: item.remarks,
      hiringQuantity: Number(item.hiringQuantity),
      benefits: item.benefits,
      selectionFlows: item.selectionFlows,
      attachment: item.attachment,
      freeDescription: {
        title: item.freeDescription.title,
        description: item.freeDescription.description,
      },
      hiringStartDate: hiringStartDates,
      hiringEndDate: hiringEndDates,
      isPublic: item.isPublic,
      isDraft: item.isDraft,
      jobEntry: {
        motivation: {
          status: item.jobEntry.motivation.status,
        },
        selfPr: {
          status: item.jobEntry.selfPr.status,
        },
        profilePicture: {
          status: item.jobEntry.profilePicture.status,
        },
        otherData: {
          status: item.jobEntry.otherData.status,
          title: item.jobEntry.otherData.title,
        },
        settingQuestions: item.jobEntry.settingQuestions,
      },
      isEmployer: item.isEmployer,
      nameAttachment: item.nameAttachment,
      informationJob: item.informationJob,
      smokingSolution: item.smokingSolution,
      entryNumber: item.entryNumber,
    };

    try {
      return await useBaseFetch(`/admins/jobs/${item.id}`, {
        method: 'PUT',
        body: { ...data },
      });
    } catch (error) {}
  };

  return {
    initFormEdit,
    editJob,
    getDetail,
    getProvince,
    getCities,
    getJobCategories,
    getGovernmentOffices,
    editJobByAdmin,
  };
};
