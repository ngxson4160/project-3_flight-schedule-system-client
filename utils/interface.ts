export interface IResponse {
  statusCode: number;
  data: any;
  errorMessage: any;
  error_code: string;
  timestamp: string;
}

export interface ISettingTopData {
  imgUrl: string;
  title: string;
  url: string;
  nameImgUrl: string;
}
export interface ICredential {
  email: string;
  password: string;
  role: string | undefined;
}

export interface IProvince {
  id: number;
  name: string;
  createdTime?: string;
  updatedTime?: string;
}

export interface IJobCategory {
  id: number;
  name: string;
  parentId?: number;
  createdTime: string | null;
  updatedTime: string | null;
}

export interface IJobCategories {
  id: number;
  name: string;
  createdTime: string;
  updatedTime: string | null;
  jobCategories: IJobCategory[];
}

export interface ICity {
  id: number;
  name: string;
  provinceId: number;
  createdTime?: string;
  updatedTime?: string | null;
}

export interface ICitiesResponse {
  id: number;
  name: string;
  provinceId: number;
  createdTime?: string | null;
  updatedTime?: string | null;
  province: IProvince;
}

export interface IProvinceResponse {
  id: number;
  name: string;
  createdTime: string | null;
  updatedTime: string | null;
  cities: ICity[];
}

export type typeEligibilityAbility = {
  requirement?: string;
};

export type typeSalaryRange = {
  min?: number;
  max?: number;
};

export interface IRESJob {
  id: number;
  employerLogoURL?: string | null;
  creatorId: number;
  images?: string[] | [];
  position?: string;
  title: string;
  jobCategoryId?: number;
  employmentStatus?: string;
  appealPoint?: string[] | [];
  duty?: string;
  eligibilityAbility: typeEligibilityAbility;
  salaryType?: string;
  salaryRange: typeSalaryRange;
  remark?: string;
  workHour?: string;
  workMode?: string;
  officeName?: string;
  cityId?: number;
  provinceId?: number;
  workAddress?: string;
  workAccess?: string;
  hiringQuantity?: number;
  benefits?: string;
  selectionFlows?: { title: string; content: string }[];
  attachment?: string;
  freeDescription?: {
    title?: string;
    description?: string;
  };
  hiringStartDate?: string;
  hiringEndDate?: string;
  isPublic?: boolean;
  isDraft?: boolean;
  isDelete?: boolean;
  createdTime?: string | null;
  updatedTime?: string | null;
  viewingQuantity: number;
  countEntry: number;
  countFavorite: number;
  isEmployer: boolean;
  nameAttachment: string;
}

export type typeListJob = {
  id: number;
  title?: string;
  numberOfApplicants?: number | null;
  favorites?: number | null;
  views?: number | null;
  employmentStatus?: string;
  jobCategory?: string;
  start_date?: string;
  end_date?: string;
};

export interface IUserData {
  id: number;
  creatorId: number;
  oldCompanyName: string;
  prefecture: string;
  age: number;
  school: string;
  majors: string;
  languageCertificate: string;
  languageCertificateLevel: string;
  employermentForms: string;
  cities: Array<string>;
  department: string;
  applicantEntry: IApplicantEntry;
}

export interface IGovernment {
  category: string;
  createdTime: string | null;
  id: number;
  name: string;
  prefecture: string;
  updatedTime: string | null;
}

export interface IUser {
  id: number;
  email: string;
  isPublicJob: boolean;
  firstName: string | null;
  lastName: string | null;
  firstNamePhonetic: string | null;
  lastNamePhonetic: string | null;
  isDeleted: boolean | number;
  requestDeleteStatus: boolean | number;
  deleteReason: string | number;
  sex: number;
  avatarURL: string | null;
  backgroundURL: string | null;
  phoneNumber: string | null;
  dateOfBirth: string;
  homepageURL: string | null;
  aboutUs: string | null;
  postcode: string | null;
  numberStaff: string | null;
  averageAge: string | null;
  desiredWorkLocation: number[];
  businessCityId: number | null;
  businessCity: ICitiesResponse;
  businessAddress: string | null;
  businessContent: string | null;
  government?: IGovernment;
  governmentOfficeId: number | null;
  governmentDepartmentName: string | null;
  additionExperienceOccupation: number[];
  additionDesiredJobCategory: number[];
  memberType: number | null;
  memberManageId: number | null;
  academicBackground: Array<{
    schoolName?: string | null;
    academicInfo?: string | null;
    entranceDate?: string | null;
    graduationDate?: string | null;
    schoolDistinction?: string;
    statusGraduation?: string;
  }>;
  isShowWorkExperience: boolean;
  workExperience:
    | [
        {
          isWorking?: boolean;
          entranceDate?: string;
          resignationDate?: string;
          companyName?: string;
          employmentStatus?: string;
          department?: string;
          description?: string | null;
          project?: [
            {
              startTime?: string;
              endTime?: string;
              title?: string;
              description?: string;
            },
          ];
        },
      ]
    | null;
  desiredWorkGovernmentOfficeCategory: string | null;
  desiredEmploymentStatus: string | null;
  desiredWorkDay: string | null;
  desiredWorkHour: string | null;
  desiredWorkMode: string | null;
  desiredWorkDescription: string | null;
  scoutReception: boolean;
  willingnessApplyStatus: string | null;
  skill: string | null;
  qualification: string | null;
  language:
    | [
        {
          language?: string;
          level?: string;
          certificateTime: string;
          qualificationDetail: string;
        },
      ]
    | null;
  lastLoginDate: string | null;
  createdDate: string | null;
  modifiedDate: string | null;
  currentMotivation: string | null;
}

export interface IApplicantEntry {
  id: number;
  motivation: string;
  selfPr: string;
  otherData: string;
  settingQuestions: [
    {
      title: string;
      content: string;
      typeQuestion: number;
      fileName?: string;
    },
  ];
  applicantId: number;
  isDraft: boolean;
  applicant?: {
    id: number;
    avatarURL: string;
    firstName: string;
    lastName: string;
  };
  message: {
    box: {
      id: number;
      boxType: string;
      lastMessageId: number;
    };
  };
}
export interface IApplicant extends IUser {
  jobId: number;
  box?: {
    id: number;
    jobId: number;
    senderId: number;
    lastMessageId: number;
    lastMessage: {
      messageType: string;
    };
  };
  boxId: number;
  applicantEntry?: IApplicantEntry;
  typeSettingInterview: string;
}

interface IProvinceCities {
  id: number;
  name: string;
  provinceId: number;
  createdTime: string | null;
  updatedTime: string | null;
}

export interface IProvinces {
  id: number;
  name: string;
  regionId: number;
  createdTime: string | null;
  updatedTime: string | null;
  cities: IProvinceCities[];
}

export interface INoticeDetail {
  imgUrl: string;
  title: string;
  content: string;
  isPublic: boolean;
  ENoticeType: string;
  publicationDate: Date | null;
  creatorId: number;
  updatedTime: Date | null;
  id: number;
}

export interface IJobCategoriesDetail {
  name: string;
  id: number | null;
  jobCategoryDescription: string;
  countJobCategories: number;
  parentId: number | null;
}

export interface IJobTagDetail {
  name: string;
  id: number | null;
  tagsDescription: string | null;
  creatorId?: number;
  tagsType?: number;
  countTags: number;
}

export interface IDataCardSpecialFeature {
  id: number;
  imgUrl: string;
  title: string;
  tags: Array<string>;
}

export interface IDataCardNews {
  id: number;
  title: string;
  publicationDate: string;
  createdTime: Date;
  typeNews: string;
  sessionSchedule: string[];
  creator: {
    id: number;
    avatarURL: string;
    governmentOffice: {
      prefecture: string;
      name: string;
    };
  };
}

export interface IDataCardJobPickUp {
  id: number;
  imgUrl: string;
  title: string;
  tags: Array<string>;
  governmentOffice: string;
}

export interface IDataCardBlogPublic {
  id: number;
  imgUrl: string;
  title: string;
  tags: Array<string>;
  description: string;
  creatorId: number;
  governmentOfficeName: string | null;
  governmentOfficeAvatar: string | null;
  createdDate: string;
  updatedTime: string;
}
export interface IFrequentlyAskedQuestionDetail {
  id: number;
  question: string;
  answer: string;
  isPublic: boolean;
  priority: number;
  categoryType: number;
  createdTime: Date;
  updatedTime: Date | null;
  publicationDate: Date | null;
}
export interface IBlogPubic {
  content: string;
  createdTime: string | null;
  creator: IUser;
  creatorId: number;
  id: number;
  imgUrl: string;
  isDelete: boolean;
  isDraft: boolean;
  isPublic: boolean;
  like: number;
  tags: string[];
  title: string;
  updatedTime: string | null;
  view: number;
}
export interface IBlogPublicResponse {
  blogs: IBlogPubic[];
  totalCount: number;
}

export interface IAdminEmployerList {
  id: number;
  email: string;
  isPublicJob: false;
  firstName: string;
  lastName: string;
  firstNamePhonetic: string | null;
  lastNamePhonetic: string | null;
  isDeleted: number;
  requestDeleteStatus: number;
  deleteReason: string | null;
  sex: number;
  avatarURL: string | null;
  backgroundURL: string | null;
  phoneNumber: string;
  dateOfBirth: string | null;
  homepageURL: string;
  aboutUs: string | null;
  postcode: string | null;
  numberStaff: string | null;
  averageAge: string | null;
  desiredWorkLocation: string | null;
  businessCityId: string | null;
  businessAddress: string | null;
  businessContent: string | null;
  governmentOfficeId: number;
  governmentDepartmentName: string;
  additionExperienceOccupation: string | null;
  additionDesiredJobCategory: string | null;
  memberType: string | null;
  memberManageId: string | null;
  academicBackground: Array<{
    schoolName?: string | null;
    academicInfo?: string | null;
    entranceDate?: string | null;
    graduationDate?: string | null;
    schoolDistinction?: string;
    statusGraduation?: string;
  }>;
  isShowWorkExperience: boolean;
  workExperience: string | null;
  desiredWorkGovernmentOfficeCategory: string | null;
  desiredEmploymentStatus: string | null;
  desiredWorkDay: string | null;
  desiredWorkHour: string | null;
  desiredWorkMode: string | null;
  desiredWorkDescription: string | null;
  scoutReception: false;
  willingnessApplyStatus: string | null;
  skill: string | null;
  qualification: string | null;
  notifiCationSettings: string | null;
  language: string | null;
  isActive: true;
  lastLoginDate: string;
  createdDate: string;
  modifiedDate: string;
  currentMotivation: string | null;
  userRoles: [
    {
      id: number;
      userId: number;
      roleId: number;
      createdTime: string;
      updatedTime: string | null;
      role: {
        id: number;
        name: string;
        key: string;
        description: string;
        createdTime: string;
        updatedTime: string | null;
      };
    },
  ];
  governmentOffice: {
    id: number;
    category: string;
    prefecture: string;
    name: string;
    createdTime: string;
    updatedTime: string | null;
  };
}

export interface IMassEmailingDetail {
  id: number;
  creatorId: number;
  title: string;
  content: string;
  massEmailingType: string;
  isDelete: boolean;
  createdTime: string;
  updatedTime: string;
}

export interface IGovernmentOffice {
  id: number;
  category: string;
  name: string;
  prefecture: string;
  createdTime: Date;
  updatedTime: Date | null;
}

export interface ICreator {
  id: number;
  governmentOffice: IGovernmentOffice;
}

export interface IJobList {
  id: number;
  creatorId: number;
  images: string[];
  position: string;
  title: string;
  jobCategoryParentId: number;
  jobCategoryId: number;
  employmentStatus: string;
  appealPoint: string[];
  duty: string;
  salaryType: string;
  remark: string;
  workHour: string;
  workMode: string;
  officeName: string;
  provinceId: number;
  cityId: number;
  workAddress: string;
  workAccess: null;
  hiringQuantity: number;
  benefits: string;
  selectionFlows: { title: string; content: string }[];
  attachment: null;
  hiringStartDate: Date;
  hiringEndDate: Date;
  postalCode: string;
  viewingQuantity: number;
  isPublic: boolean;
  isDraft: boolean;
  isPickup: boolean;
  isDelete: boolean;
  createdTime: Date;
  updatedTime: Date;
  createdDatePickUp: Date;
  creator: ICreator;
  jobCategory: IJobCategory;
  isEmployer: boolean;
  nameAttachment: string;
}

export interface IUserInformation {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  additionExperienceOccupation: string[];
  lastLoginDate: Date;
  createdDate: Date;
}

export interface IDate {
  year: null | string;
  month: null | string;
  day: null | string;
}

export interface IDataQA {
  question: string;
  answer: string;
  isShowAnswer: boolean;
}

export interface IEmployerOverview {
  id: number;
  avatarURL: string;
  backgroundURL: string;
  governmentOffice: { name: string };
  createdJobs: null | object;
}

export interface IBlogOverview {
  createdTime: Date;
  creator: {
    avatarURL: string;
    governmentOffice: {
      name: string;
    };
    id: number;
  };
  id: number;
  imgUrl: string;
  publicationDate: Date;
  tags: Array<string>;
  title: string;
  typeBlog: number;
  videoUrl: string;
  updatedTime: Date;
  content?: string;
}

export interface INewBriefingOverview {
  createdTime: Date;
  creator: {
    avatarURL: string;
    governmentOffice: {
      name: string;
    };
    id: number;
  };
  id: number;
  sessionSchedule: Array<string>;
  publicationDate: Date;
  title: string;
  typeNews: number;
  updatedTime: Date;
}

export interface ISpecialFeatureOverview {
  id: number;
  imgUrl: string;
  title: string;
  tags: Array<string>;
  publicationDate: Date;
  createdTime: Date;
}

export interface IJobOverview {
  id: number;
  title: string;
  employmentStatus: string;
  appealPoint: Array<string>;
  position: string;
  creator: {
    id: number;
    avatarURL: string;
    government: {
      name: string;
    };
  };
  createdTime: Date;
  updatedTime: Date;
  jobCategory: {
    name: string;
  };
}

// interfaceApplicantList
interface IApplicantEntryList {
  id: number;
  firstName?: string;
  lastName?: string;
  jobId?: number;
  entryNumber?: string;
  job?: {
    id?: number;
    title?: string;
    jobCategoryId?: number;
  };
}

interface Box {
  id: number;
  lastMessageId: number;
}

export interface IListApplicant {
  id?: number;
  creatorId?: number;
  content?: null | any;
  title?: string;
  interviewDate?: null | string;
  interviewEndDate?: null | string;
  applicantEntryId?: number;
  boxId?: number;
  isDelete?: boolean;
  createdTime?: string;
  updatedTime?: string;
  typeSettingInterview?: null | string;
  location?: null | string;
  memberChanges?: null | string;
  selectionMethod?: null | string;
  applicantEntry?: IApplicantEntryList;
  box?: Box;
}
// interfaceApplicantList

export interface ITabPane {
  id: number;
  label: string;
  name: string;
}

export interface IApplicantTimeline {
  id: number;
  boxId: number;
  creator: {
    id: number;
    avatarURL: string;
    firstName: string;
    lastName: string;
  };
  metaData: {
    content?: string;
    dataSchedule?: string[];
    dateSetting?: { endDate: string; startDate: string }[];
    link?: string;
    memo?: string;
    selectionStep?: string;
    selectionMethod?: string;
    interviewDate?: string;
    interviewEndDate?: string;
    location?: string;
  };
  typeData: number;
  createdTime: Date;
}

export interface IMemberInformation {
  id: number;
  firstName: string | null;
  lastName: string | null;
}

interface BoxCalendar {
  id: number;
  senderId: number;
  lastMessageId: number;
  jobId: number;
}

export interface ICalendarList {
  id: number;
  creatorId: number;
  content: string;
  title: string;
  interviewDate: string;
  interviewEndDate: string;
  applicantEntryId: number;
  boxId: number;
  isDelete: boolean;
  createdTime: string;
  updatedTime: string;
  typeSettingInterview: string;
  location: string;
  memberChanges: number[];
  selectionMethod: string;
  selectionStep?: string;
  applicantEntryInforId: number | null;
  updateSelectionSetp: string;
  applicantEntry?: {
    applicant?: IApplicantEntryList;
  };
  applicantEntryInfor?: {
    applicantInfor: IApplicantEntryList;
  };
  box: BoxCalendar;
}
interface ApplicantEntry {
  id: number;
  settingInterview: SettingInterview;
}

interface SettingInterview {
  id: number;
  creatorId: number;
  content: string;
  title: string;
  interviewDate: string;
  interviewEndDate: string;
  applicantEntryId: number;
  boxId: number;
  isDelete: boolean;
  createdTime: string;
  updatedTime: string;
  typeSettingInterview: string;
  location: string;
  memberChanges: number[];
  selectionMethod: string;
  applicantEntryInforId: number | null;
  updateSelectionSetp: string;
  selectionStep: string | null;
}

interface InfoMember {
  id: number;
  firstName: string;
}

export interface ICalendarUserList {
  id: number;
  firstName: string;
  lastName: string;
  jobId: number;
  entryNumber: string;
  applicantEntry: ApplicantEntry;
  infoMember: InfoMember[];
}

export interface IDataWorkExperience {
  companyName: string | null;
  resignationDate: any;
}

export interface IDataAcademicBackground {
  academicInfo: string;
  schoolName: string;
  graduationDate: any;
  schoolDistinction?: string;
  statusGraduation?: string;
}

export interface ISenderMessageInformation {
  id: number;
  firstName: string;
  lastName: string;
  avatarURL: string;
  workExperience: IDataWorkExperience[];
  governmentOffice: IGovernmentOffice | null;
}

export interface IMessageDetail {
  id: number;
  senderId: number;
  recipientId: number;
  titleUser: string | null;
  titleEmployer: string | null;
  content: string;
  messageType: string;
  isSeenUser: boolean;
  isSeenEmployer: boolean;
  joId: number;
  boxId: number;
  fileUrls: { url: string; size: number; fileName: string }[];
  createdDate: Date;
  applicationDate: Date | null;
  parentId: number;
  parent?: IMessageDetail;
  metaData: {
    content?: string;
    dataSchedule?: string[];
    dateSetting?: { endDate: string; startDate: string }[];
    link?: string;
    memo?: string;
    selectionStep?: string;
    selectionMethod?: string;
    interviewDate?: string;
    interviewEndDate?: string;
    location?: string;
  };
  typeData: number;
  isRep: boolean;
  senderUser: ISenderMessageInformation;
  recipientUser: ISenderMessageInformation;
  job: {
    id: number;
    position: string;
    title: string;
    provinceId: number;
    province: {
      name: string;
    };
    jobCategory: {
      name: string;
    };
    jobCategoryParent: {
      id: number;
      name: string;
    };
  };
  box: {
    id: number;
    senderId: number;
    recipientId: number;
    lastMessageId: number;
    boxType: string;
    isAnswer: boolean;
    isTurnOff: boolean;
    createdDate: Date;
    modifiedDate: Date | null;
    jobId: number;
    selectionStep: string | null;
    memoUser: string | null;
    memoEmployer: string | null;
    settingInterview: {
      id: number;
      creatorId: number;
      content: string | null;
      title: string | null;
      interviewDate: Date | null;
      interviewEndDate: Date | null;
      applicantEntryId: number;
      boxId: number;
      isDelete: boolean;
      createdTime: Date | null;
      updatedTime: Date | null;
      typeSettingInterview: number;
      location: string | null;
      memberChanges: number[];
      selectionMethod: string | null;
      applicantEntryInforId: number;
      updateSelectionSetp: Date | null;
      selectionStep: string | null;
      applicantEntry: {
        id: number;
        applicantId: number;
        applicant: {
          id: number;
          entryNumber: string | null;
        };
      };
    };
  };
}

export interface IFormCreateMessage {
  title: string;
  content: string;
  fileUrls: { url: string; size: number; fileName: string }[];
}

export interface ITemplateMessage {
  content: string;
  createdTime: Date | null;
  creatorId: number;
  id: number;
  isDelete: boolean;
  titleMessage: string;
  titleTemplate: string;
  updatedTime: Date | null;
}

export interface ITimelineItem {
  employmentStatus?: string;
  department: string;
  description?: string;
  companyName: string;
  entranceDate: string;
  resignationDate: string;
  project?: {
    title: string;
    endTime: string;
    startTime: string;
    description: string;
    isProject?: boolean;
  }[];
  isHiddenCard?: boolean;
  isWorking?: boolean;
  schoolDistinction?: string;
  statusGraduation?: string;
}
