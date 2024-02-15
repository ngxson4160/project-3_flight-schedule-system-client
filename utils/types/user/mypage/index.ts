export interface FormEditProfileUser {
  firstName: string;
  lastName: string;
  firstNamePhonetic: string;
  lastNamePhonetic: string;
  phoneNumber: number;
  dateOfBirth: number;
  sex: number;
  avatarURL: string;
  postcode: number;
  businessCityId: number;
  businessAddress: string;
  experienceOccupation: string[];
  isExperienceOccupation: string[];
  additionExperienceOccupation: string[];
  skill: string;
  aboutUs: string;
  qualification: [
    {
      qualificationDate: number;
      qualificationContent: string;
    },
  ];
  language: [
    {
      language: string;
      level: string;
      certificateTime: string;
      qualificationDetail: string;
    },
  ];
  academicBackground: [
    {
      entranceDate: number;
      graduationDate: number;
      schoolName: string;
      academicInfo: string;
      schoolDistinction?: string;
      statusGraduation?: string;
    },
  ];
  isShowWorkExperience: boolean;
  workExperience: [
    {
      isWorking: false;
      entranceDate: number;
      resignationDate: number;
      companyName: string;
      employmentStatus: string;
      department: string;
      description?: string | null;
      project: {
        startTime: string;
        endTime: number;
        title: string;
        description: string;
      };
    },
  ];
  desiredWorkGovernmentOfficeCategory: string;
  desiredJobCategory: string[];
  additionDesiredJobCategory: string[];
  desiredEmploymentStatus: string;
  desiredWorkDay: string;
  desiredWorkHour: string;
  desiredWorkLocation: string[];
  scoutReception: true;
  willingnessApplyStatus: string;
  hiddenGovernment: string[];
}
