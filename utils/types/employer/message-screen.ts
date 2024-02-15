export interface ITimeLineEmployer {
  department: string;
  resignationDate: string;
  entranceDate: string;
  project: [
    {
      endTime: string;
      startTime: string;
      title: string;
      description: string;
    },
  ];
}

export interface ApplicantDetail {
  address: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  businessCityId: number;
  postcode: string;
  academicBackground: [
    {
      schoolName: string;
      academicInfo: string;
      entranceDate: string;
      graduationDate: string;
      schoolDistinction?: string;
      statusGraduation?: string;
    },
  ];
  isShowWorkExperience: boolean;
  workExperience: [
    {
      project: [
        {
          title: string;
          endTime: string;
          startTime: string;
          description: string;
        },
      ];
      isWorking: boolean;
      department: string;
      description?: string | null;
      companyName: string;
      entranceDate: string;
      resignationDate: string;
      employmentStatus: string;
    },
  ];
  job: {
    title: string;
  };
  applicantEntry: {
    messages: {
      createdDate: string;
      applicationDate: string;
      motivation: string;
      selfPr: string;
      otherData: string;
      settingQuestions: [
        {
          title: string;
          content: string;
        },
      ];
      interviewSetting: {
        selectionStep: string;
        interviewDate: string;
        memo: string;
      };
    };
  };
}

export interface DetailUser {
  address: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  businessCityId: number;
  postcode: string;
  academicBackground: [
    {
      schoolName: string;
      academicInfo: string;
      entranceDate: string;
      graduationDate: string;
      schoolDistinction?: string;
      statusGraduation?: string;
    },
  ];
  isShowWorkExperience: boolean;
  workExperience: [
    {
      project: [
        {
          title: string;
          endTime: string;
          startTime: string;
          description: string;
        },
      ];
      isWorking: boolean;
      department: string;
      description?: string;
      companyName: string;
      entranceDate: string;
      resignationDate: string;
      employmentStatus: string;
    },
  ];
  job: {
    title: string;
  };
}
