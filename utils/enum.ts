interface tplot {
  [key: number | string]: string;
}

export const genderCode = {
  MALE: 0,
  FEMALE: 1,
  OTHER: 2,
};

export const genders: tplot = {
  [genderCode.MALE]: '男性',
  [genderCode.FEMALE]: '女性',
  [genderCode.OTHER]: '回答しない',
};

export const typeNewsCode = {
  ALL: 0,
  STAFF: 1,
  SELECTION: 2,
  RECRUITMENT: 3,
  OTHER: 4,
};

export const typeNewsText: tplot = {
  [typeNewsCode.ALL]: 'すべて',
  [typeNewsCode.STAFF]: '職員募集情報',
  [typeNewsCode.SELECTION]: '選考情報',
  [typeNewsCode.RECRUITMENT]: '採用説明会情報',
  [typeNewsCode.OTHER]: 'その他',
};

export enum ERole {
  EMPLOYER = 'EMPLOYER',
  USER = 'USER',
  GUEST = 'GUEST',
  ADMIN = 'ADMIN',
}

export enum EMemberType {
  MEMBER_ADMIN = 'MEMBER_ADMIN',
  MEMBER_RECRUITMENT = 'MEMBER_RECRUITMENT',
  MEMBER_BLOGGER = 'MEMBER_BLOGGER',
}

export enum EntryInputStatus {
  REQUIRED = '必須',
  ANY = '任意',
  HIDE = '非表示とする',
}

export enum ECurrentMotivation {
  ACTIVELY_LOOKING = '積極的に探している',
  ONLY_GOOD_DEAL = 'よい案件があれば',
  NOT_NOW = '今は考えていない',
}

export enum ETypeStatusMessage {
  FIRST_INTERVIEW = '一次選考',
  SECOND_INTERVIEW = '二次選考',
  THIRD_INTERVIEW = '三次選考',
  FOURTH_INTERVIEW = '四次選考',
  ADOPTION = '合格',
}
export enum EMessageType {
  ENTRY = 'エントリーが届きました',
  SCOUT = 'ユーザーをスカウトしました',
  INTERVIEW = '一次面接についてのご案内',
  SETTINGS_INTERVIEW = '選考予定',
}

export enum EStatusNotice {
  PENDING = '公開予約',
  PRIVATE = '非公開',
  PUBLIC = '公開中',
}

export enum EStatusEmployer {
  APPROVED = '承認済み',
  WITHDRAWAL = '退会申請',
  UNAPPROVED = '未承認',
  DELETED = '退会済み',
}

export enum ECategoryTypeOfFAQ {
  FOR_USER = 1,
  FOR_GOVERNMENT_OFFICE = 2,
}

export enum ESelectionFlows {
  '一次選考',
  '二次選考',
  '三次選考',
  '四次選考',
  // '合格',
}

export enum EApppealPoints {
  '英語を使う仕事',
  '土日祝日休み',
  '在宅勤務・リモート勤務制度あり',
  '服装自由',
  'U・Iターン支援あり',
  'マイカー通勤可',
  '寮・社宅あり',
  '完全週休2日',
  '転勤なし',
  '業種未経験OK',
  '職種未経験OK',
  '副業・WワークOK',
}

export enum EGoverment_status {
  '正社員',
  '契約社員',
  '業務委託',
  'アルバイト・パート',
  'インターンシップ',
  'ボランティア',
}

export enum EWorkMode {
  WORK_COMPANY = '{{官公庁名}}',
  // SOME_TO_WORK = '在宅勤務（一部出社あり）',
  // REMOTE = '在宅勤務（フルリモート）',
  ORTHER = 'その他',
}

export enum EMassEmailingType {
  ALL = 'すべて',
  USER = '求職者',
  EMPLOYER = '官公庁',
}

export enum ETemplateTextType {
  ENTRY_NUMBER = 'エントリー番号',
  USER_NAME = '応募者名',
  JOB_TITLE = '職種名',
  EMPLOYER_NAME = '送信者名',
  SELECTION_STEP = '現在の選考ステップ',
  SELECTION_DATE = '次の選考予定日時',
}

export enum EPageName {
  EMPLOYER_LIST = 'EMPLOYER_LIST',
  BLOG_VIDEOS = 'BLOG_VIDEOS',
  BLOG_IMAGES = 'BLOG_IMAGES',
}

export enum EFavoriteType {
  FAVORITE_EMPLOYER = 'FAVORITE_EMPLOYER',
  FAVORITE_BLOG = 'FAVORITE_BLOG',
}

export enum ETagNews {
  INFOMATION = 1,
  SELECTION_INFOMATION = 2,
  BRIEFING_INFOMATION = 3,
  OTHER = 4,
}

export enum ETypeBlog {
  UPLOAD_IMAGE = 1,
  UPLOAD_VIDEO = 2,
}

export enum ETypeJob {
  JOB_ALL = 0,
  JOB_PRODUCING = 1,
  JOB_SCHEDULED = 2,
  JOB_POSTING = 3,
}

export enum ETypeShareTools {
  BLOG = 'BLOG',
  JOB = 'JOB',
  NEWS = 'NEWS',
}

export enum EFormEntry {
  DEFAULT = 1,
  FREE_CHOICE = 2,
  FREE_CHOICE_MUTIPLE = 3,
  FREE_SETTING = 4,
  OBTAINING_CONSENT = 5,
}

export enum EBlogFilter {
  ALL = 0,
  IMAGE = 1,
  VIDEO = 2,
}

export const typeBlogFilter: tplot = {
  [EBlogFilter.ALL]: 'すべて',
  [EBlogFilter.IMAGE]: 'ブログ',
  [EBlogFilter.VIDEO]: 'ムービー',
};

export const EListInformationDisplay = [
  'この求人にエントリーした応募者の受験票に、「選考に関するご案内」として表示されます。',
  '受験票を利用しない求人の場合は入力する必要はございません。',
  'この求人公開後に案内文は更新することが可能です。',
  '例）試験会場の場所や持ち物、選考に関する案内など',
];
export enum ETypeStatusMessageSecond {
  REJECTION = '不採用',
  ACCEPTANCEOFOFFER = '内定承諾',
  ALL = 'すべて',
}

export type OptionsSelectionStep =
  | ETypeStatusMessage
  | ETypeStatusMessageSecond;

export const EOptionsSelectionStep = {
  ...ETypeStatusMessage,
  ...ETypeStatusMessageSecond,
};

export const OPTION_TITLE_SCHEDULE: string[] = [
  '一次選考',
  '二次選考',
  '三次選考',
  '四次選考',
];

export const OPTION_TITLE_CREATE_SCHEDULE: string[] = [
  '一次選考',
  '二次選考',
  '三次選考',
  '四次選考',
  '合格',
  '内定承諾',
  '不採用',
];

export const OPTION_SELECTION_METHOD_SCHEDULE: string[] = [
  '筆記試験',
  '対面面接',
  'オンライン面接',
];

export enum ETypeTabApplicantManagement {
  PROFILE = 'profile',
  ENTRY = 'entryInformation',
  TIMELINE = 'timeline',
  MESSAGE = 'message',
  CALENDAR = 'calendar',
}

export enum ETypeApplicantTimeline {
  EMPLOYER_SETTING_INTERVIEW = 1,
  EMPLOYER_CREATE_SCHEDULE = 2,
  USER_REPLY_SCHEDULE = 3,
  EMPLOYER_CREATE_TIMELINE = 4,
  EMPLOYER_CHANGE_SELECTION_STEP = 5,
  EMPLOYER_NOTICE_REGARDING_SELECTION = 6,
  EMPLOYER_SEND_MESSAGE = 7,
}

export enum ETypeSettingInterView {
  CANDIDATE_ONLINE = '1',
  CANDIDATE_OFFLINE = '2',
}

export enum ETypeUpdateSelectionContent {
  SELECTION = 'SELECTION',
  CONTENT = 'CONTENT',
}

export enum ETypeChangeSelectionSchedule {
  CREATE = '選考予定を作成',
  EDIT = '選考予定を編集',
}

export enum EBugProduction {
  NAME = 'エントリー',
}

export enum ETypeView {
  TimeGridWeek = 'timeGridWeek',
  DayGridMonth = 'dayGridMonth',
  DayGridDay = 'dayGridDay',
}

export enum EHeaderPath {
  EMPLOYER = '/employer',
  GUEST = '/',
  USER = '/user',
  FAVORITE = 'user-favorite-jobs',
}

export enum ETypeMessageList {
  UNREAD = 1,
  NOT_COMPATIBLE = 2,
  ALL = 3,
}

export const SCHOOL_DISTINCTION_OPTIONS: string[] = [
  '大学院',
  '大学',
  '高専',
  '短大',
  '専門各種学校',
  '高校',
  'その他',
];

export const STATUS_GRADUATION_OPTIONS: string[] = [
  '卒業',
  '卒業見込み',
  '中退',
];

export enum ETypeExportFileAndImage {
  ALL = 'all',
  FILE = 'file',
  IMAGE = 'image',
}
