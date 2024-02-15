import { defineStore } from 'pinia';
import dayjs, { type Dayjs } from 'dayjs';
import { IResponse, IUser, IDataCardBlogPublic } from '~~/utils/interface';
export interface IFavoriteJob {
  employerLogoUrl?: string | null;
  appealPoint: string[];
  attachment: string;
  benefits: string;
  city: {
    id: number;
    name: string;
    provinceId: number;
    createdTime: string | null;
    updatedTime: string | null;
    province: {
      name: string;
    };
  };
  cityId: number;
  createdTime: string | null;
  creatorId: number;
  creator: IUser;
  duty: string;
  eligibilityAbility: {
    requirement: string;
    wellcome_requirement: string;
    wanting_point: string;
  };
  employmentStatus: string;
  freeDescription: {
    title?: string;
    description?: string;
  };
  hiringEndDate?: string | null;
  hiringQuantity?: number | null;
  hiringStartDate: string;
  id: number;
  images: [];
  isDelete: false;
  isDraft: false;
  isPublic: true;
  jobCategory: {
    id: number;
    name: string;
    parentId: number;
    createdTime?: string | null;
    updatedTime?: string | null;
  };
  jobCategoryParentId: number;
  officeName?: string;
  position?: string;
  provinceId?: number;
  remark?: string;
  salaryRange: { min?: number; max?: number };
  salaryType: string;
  selectionFlows: { title: string; content: string }[];
  title: string;
  updatedTime?: string | null;
  workAccess: string;
  workAddress: string;
  workHour: string;
  workMode: string;
}

export interface IFavoriteEmployer {
  id: number;
  email: string;
  isPublicJob: boolean;
  firstName: string;
  lastName: string;
  firstNamePhonetic: string | null;
  lastNamePhonetic: string | null;
  isDeleted: boolean | number;
  requestDeleteStatus: number;
  deleteReason?: string | null;
  sex: number | null;
  avatarURL?: string | null;
  backgroundURL: string | null;
  phoneNumber: string | null;
  dateOfBirth: string | null;
  homepageURL: string | null;
  aboutUs: string | null;
  postcode: string | null;
  numberStaff: string | null;
  averageAge: string | null;
  desiredWorkLocation: number[];
  businessCityId: number | null;
  businessAddress: string | null;
  businessContent: string | null;
  governmentOfficeId: string | null;
  governmentDepartmentName: string | null;
  additionExperienceOccupation: string[];
  additionDesiredJobCategory: string[];
  memberType: string | null;
  memberManageId: number | null;
  academicBackground?: Array<{
    schoolName?: string | null;
    academicInfo?: string | null;
    entranceDate?: string | null;
    graduationDate?: string | null;
    schoolDistinction?: string;
    statusGraduation?: string;
  }>;
  isShowWorkExperience: boolean;
  workExperience: [
    {
      project?: [
        {
          title?: string | null;
          endTime?: string | null;
          startTime?: string | null;
          description?: string | null;
        },
      ];
      isWorking?: boolean;
      department?: string | null;
      description?: string | null;
      companyName?: string | null;
      entranceDate?: string | null;
      resignationDate?: string | null;
      employmentStatus?: string | null;
    },
  ];
  desiredWorkGovernmentOfficeCategory: string | null;
  desiredEmploymentStatus: string | null;
  desiredWorkDay: string;
  desiredWorkHour: string;
  desiredWorkMode: string;
  desiredWorkDescription: string;
  scoutReception: string | null;
  willingnessApplyStatus: string;
  skill: string;
  qualification: [
    {
      qualificationDate: string;
      qualificationContent: string;
    },
  ];
  language: [
    {
      level: string;
      language: string;
      certificateTime: string;
      qualificationDetail: string;
    },
    {
      level: string;
      language: string;
      certificateTime: string;
      qualificationDetail: string;
    },
  ];
  lastLoginDate: string | null;
  createdDate: string | null;
  modifiedDate: string | null;
  government: {
    name: string;
  };
}

export interface IFavoriteEmployerResponse {
  id: number;
  receiver: IFavoriteEmployer;
  receiverId: number;
  senderId: number;
  createdTime: string | null;
  updatedTime: string | null;
  isDelete: boolean;
}

export interface IFavoriteUserResponse {
  id: number;
  receiver: IUser;
  receiverId: number;
  senderId: number;
  createdTime: string | null;
  updatedTime: string | null;
  isDelete: boolean;
}

export interface IFavoriteJobResponse {
  createdTime: string;
  id: number;
  isDelete: boolean;
  jobId: number;
  updatedTime: string | null;
  userId: number;
  job: IFavoriteJob;
}

interface IBlogData {
  content: string;
  createdTime: string;
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
  updatedTime: string;
  view: number;
  videoUrl?: string;
  typeBlog?: string;
  publicationDate?: Date | string | null;
}

export interface IFavoriteBlog {
  blogId: number;
  createdTime: string;
  id: number;
  isDelete: boolean;
  userId: number;
  blog: IBlogData;
  updatedTime: string;
}

export interface IFavoriteBlogResponse {
  favoriteBlogs: IFavoriteBlog[];
  totalCount: number;
}

export interface INews {
  id: number;
  creatorId: number;
  imgUrl: string;
  title: string;
  content: string;
  publicationDate: string;
  createdTime: string;
  updatedTime: string;
  typeNews: number;
  sessionSchedule: string[];
  creator: {
    avatarURL: string;
    governmentOffice: {
      name?: string;
    };
  };
}

export interface IFavoriteNews {
  id: number;
  userId: number;
  newsId: number;
  news: INews;
}

export interface IFavoriteNewsResponse {
  favoriteNews: IFavoriteNews[];
  totalCount: number;
}

export const useFavoriteStore = defineStore({
  id: 'useFavoriteStore',
  state: () => ({
    jobTemporary: [] as IFavoriteJobResponse[],
    employerTemporary: [] as IFavoriteEmployerResponse[],
    newsTemporary: [] as IFavoriteNews[],
    blogsTemporary: [] as IFavoriteBlog[],
    blogGovernment: [] as IDataCardBlogPublic[],
    userTemporary: [] as IFavoriteUserResponse[],
    totalItem: 0 as number,
    page: 1 as number,
    limit: 18 as number,
    errorMessageGenerator: '' as string,
    favoriteJobsSystem: [] as number[],
    favoritesSystem: [] as number[],
    favoriteBlogsSystem: [] as number[],
    favoriteApplicantsSystem: [] as number[],
  }),
  getters: {
    getJobFavorites(state) {
      if (state.jobTemporary.length) {
        return state.jobTemporary.map((el: IFavoriteJobResponse) => ({
          id: el.jobId,
          image: el.job.creator.avatarURL ?? '',
          title: el.job.title,
          employmentStatus: el.job.employmentStatus,
          jobCategory: el.job.jobCategory?.name,
          tags: el.job.appealPoint,
          location: el.job.city?.province?.name + el.job.city?.name,
          descriptions: '',
          start_date: el.job.hiringStartDate,
          end_date: el.job.hiringEndDate,
          governmentOffice: el.job.creator?.governmentOffice,
        }));
      } else {
        return [];
      }
    },
    getEmployerFavorites(state) {
      if (state.employerTemporary.length) {
        return state.employerTemporary.map(
          (el: IFavoriteEmployerResponse) => el.receiver,
        );
      } else {
        return [];
      }
    },
    getUserFavorites(state) {
      if (state.userTemporary.length) {
        return state.userTemporary.map((el: IFavoriteUserResponse) => ({
          id: el.receiverId,
          title: el.receiver.workExperience ?? [],
          local: el.receiver.businessCity,
          dateOfBirth: el.receiver.dateOfBirth ?? '',
          academicBackground: el.receiver.academicBackground,
          language: el.receiver.language,
        }));
      } else {
        return [];
      }
    },
    getNewsFavorites(state) {
      if (state.newsTemporary.length) {
        return state.newsTemporary.map((el: IFavoriteNews) => ({
          id: el.news.id,
          creatorId: el.news.creatorId,
          imgUrl: el.news.imgUrl,
          title: el.news.title,
          content: el.news.content,
          publicationDate: el.news.publicationDate,
          createdTime: el.news.createdTime,
          updatedTime: el.news.updatedTime,
          typeNews: el.news.typeNews,
          sessionSchedule: el.news.sessionSchedule,
          creator: {
            avatarURL: el.news.creator.avatarURL,
            governmentOffice: {
              name: el.news.creator.governmentOffice?.name,
            },
          },
        }));
      } else {
        return [];
      }
    },
  },
  actions: {
    async getAllJobs() {
      onLoading();
      this.limit = 18;
      const data = await useBaseFetch(
        `/favorite-jobs/jobs?page=${this.page}&limit=${this.limit}`,
        {
          method: 'GET',
        },
      );

      const dataJobFavorites = data.data.value as IResponse;

      const dataJobs =
        (dataJobFavorites?.data.favoriteJobs as IFavoriteJobResponse[]) || [];

      if (dataJobs.length) {
        this.jobTemporary = dataJobs;
        this.totalItem = dataJobFavorites.data.totalCount;
      } else {
        this.jobTemporary = [];
        this.totalItem = 0;
      }
      closeLoading();
    },

    async getAllEmployees() {
      onLoading();
      this.limit = 12;
      const data = await useBaseFetch(
        `/favorites?page=${this.page}&limit=${this.limit}`,
        {
          method: 'GET',
        },
      );

      const dataEmployerFavorites = data.data.value as IResponse;

      const dataEmployer =
        (dataEmployerFavorites?.data.favorite as IFavoriteEmployerResponse[]) ||
        [];

      if (dataEmployer.length) {
        this.employerTemporary = dataEmployer;
        this.totalItem = dataEmployerFavorites.data.totalCount;
      } else this.totalItem = 0;
      closeLoading();
    },

    async getAllEmployerFavorites() {
      onLoading();
      this.limit = 12;
      const data = await useBaseFetch(
        `/favorites/government-office?page=${this.page}&limit=${this.limit}`,
        {
          method: 'GET',
        },
      );

      const dataEmployerFavorites = data.data.value as IResponse;

      const dataEmployer =
        (dataEmployerFavorites?.data.favorite as IFavoriteEmployerResponse[]) ||
        [];

      if (dataEmployer.length) {
        this.employerTemporary = dataEmployer;
        this.totalItem = dataEmployerFavorites.data.totalCount;
      } else this.totalItem = 0;
      closeLoading();
    },

    async getAllUser() {
      onLoading();
      this.limit = 18;
      const data = await useBaseFetch(
        `/favorites?page=${this.page}&limit=${this.limit}`,
        {
          method: 'GET',
        },
      );

      const dataUserFavorites = data.data.value as IResponse;

      const dataUser =
        (dataUserFavorites?.data.favorite as IFavoriteUserResponse[]) || [];

      if (dataUser.length) {
        this.userTemporary = dataUser;
        this.totalItem = dataUserFavorites.data.totalCount;
      } else this.totalItem = 0;
      closeLoading();
    },

    async getAllBlogs() {
      onLoading();
      this.limit = 18;
      const { data, error } = await useBaseFetch(
        `/favorite-blogs/blogs?page=${this.page}&limit=${this.limit}`,
        {
          method: 'GET',
        },
      );

      if (error.value) return openNotification(error.value.data.errorMessage);

      const response = data.value as IResponse;

      const dataBlogs = response.data as IFavoriteBlogResponse;

      this.blogsTemporary = dataBlogs.favoriteBlogs;

      this.blogGovernment = dataBlogs.favoriteBlogs.map(
        (el: IFavoriteBlog) => ({
          id: el.blog.id,
          imgUrl: el.blog.imgUrl,
          videoUrl: el.blog.videoUrl,
          typeBlog: el.blog.typeBlog,
          title: el.blog.title,
          tags: el.blog.tags,
          content: el.blog.content,
          createdTime: el.blog.createdTime,
          updatedTime: el.blog.updatedTime,
          publicationDate: el.blog.publicationDate,
          creator: {
            id: el.blog.creatorId,
            avatarURL: el.blog.creator?.avatarURL,
            governmentOffice: { name: el.blog.creator.governmentOffice?.name },
          },
        }),
      );
      this.totalItem = dataBlogs.totalCount;
      closeLoading();
    },

    async getAllNews() {
      onLoading();
      this.limit = 18;
      const data = await useBaseFetch(
        `/favorite-news/user?page=${this.page}&limit=${this.limit}`,
        {
          method: 'GET',
        },
      );

      const dataNewsFavorites = data.data.value as IResponse;

      const dataNews =
        (dataNewsFavorites?.data.favoriteNews as IFavoriteNews[]) || [];

      if (dataNews.length) {
        this.newsTemporary = dataNews;
        this.totalItem = dataNewsFavorites.data.totalCount;
      } else {
        this.newsTemporary = [];
        this.totalItem = 0;
      }
      closeLoading();
    },

    setSystemFavoriteJobs(jobFavorites: number[]) {
      if (jobFavorites.length) {
        return (this.favoriteJobsSystem = jobFavorites);
      }
      return (this.favoriteJobsSystem = []);
    },

    setSystemFavorite(favorites: number[]) {
      if (favorites.length) {
        return (this.favoritesSystem = favorites);
      }
      return (this.favoritesSystem = []);
    },

    setSystemFavoriteBlogs(blogFavorites: number[]) {
      if (blogFavorites.length) {
        return (this.favoriteBlogsSystem = blogFavorites);
      }
      return (this.favoriteBlogsSystem = []);
    },

    setSystemFavoriteApplicant(applicants: number[]) {
      if (applicants.length) {
        return (this.favoriteApplicantsSystem = applicants);
      }
      return (this.favoriteApplicantsSystem = []);
    },

    async addFavoriteJob(id: number) {
      onLoading();
      const jobs = [] as number[];
      const favoriteJobs = useLocalStorage('auth.favoriteJobs', '');
      if (favoriteJobs.value.length) {
        const data = favoriteJobs.value.split(',');
        data.forEach((el: string) => {
          jobs.push(Number(el));
        });
      }
      const newJobs = [...jobs, id];
      handleSetFavoritesJobLocalStorage(newJobs.toString());
      const response = await useBaseFetch(`/favorite-jobs/jobs/${id}`, {
        method: 'POST',
        id,
      });
      closeLoading();
      return response;
    },

    async deleteFavoriteJob(id: number) {
      onLoading();
      const jobs = [] as number[];
      const favoriteJobs = useLocalStorage('auth.favoriteJobs', '');
      if (favoriteJobs.value.length) {
        const data = favoriteJobs.value.split(',');
        data.forEach((el: string) => {
          jobs.push(Number(el));
        });
      }
      const newJobs = jobs.filter((el: number) => el !== id);
      handleSetFavoritesJobLocalStorage(newJobs.toString());
      const response = await useBaseFetch(`/favorite-jobs/jobs/${id}`, {
        method: 'DELETE',
        id,
      });
      closeLoading();
      return response;
    },

    async addFavoriteEmployer(id: number) {
      onLoading();
      const favoriteUsers = [] as number[];
      const favoritesLocal = useLocalStorage('auth.favorites', '');
      if (favoritesLocal.value.length) {
        const data = favoritesLocal.value.split(',');
        data.forEach((el: string) => {
          favoriteUsers.push(Number(el));
        });
      }
      const newFavoriteUsers = [...favoriteUsers, id];
      handleSetFavoritesLocalStorage(newFavoriteUsers.toString());
      const response = await useBaseFetch(`/favorites`, {
        method: 'POST',
        body: {
          receiverId: id,
        },
      });
      closeLoading();
      return response;
    },

    async deleteFavoriteEmployer(id: number) {
      onLoading();
      const favoriteUsers = [] as number[];
      const favoritesLocal = useLocalStorage('auth.favorites', '');
      if (favoritesLocal.value.length) {
        const data = favoritesLocal.value.split(',');
        data.forEach((el: string) => {
          favoriteUsers.push(Number(el));
        });
      }
      const newFavoriteUsers = favoriteUsers.filter((el: number) => el !== id);
      handleSetFavoritesLocalStorage(newFavoriteUsers.toString());
      const response = await useBaseFetch(`/favorites/${id}`, {
        method: 'DELETE',
      });
      closeLoading();
      return response;
    },

    async addFavoriteBlog(id: number) {
      onLoading();
      const blogs = [] as number[];
      const favoritesBlogsLocal = useLocalStorage('auth.favoritesBlogs', '');
      if (favoritesBlogsLocal.value.length) {
        const data = favoritesBlogsLocal.value.split(',');
        data.forEach((el: string) => {
          blogs.push(Number(el));
        });
      }
      const newBlogs = [...blogs, id];
      handleSetFavoriteBlogsLocalStorage(newBlogs.toString());
      const response = await useBaseFetch(`/favorite-blogs/blogs/${id}`, {
        method: 'POST',
      });
      closeLoading();
      return response;
    },

    async deleteFavoriteBlog(id: number) {
      onLoading();
      const blogs = [] as number[];
      const favoritesBlogsLocal = useLocalStorage('auth.favoritesBlogs', '');
      if (favoritesBlogsLocal.value.length) {
        const data = favoritesBlogsLocal.value.split(',');
        data.forEach((el: string) => {
          blogs.push(Number(el));
        });
      }
      const newBlogs = blogs.filter((el: number) => el !== id);
      handleSetFavoriteBlogsLocalStorage(newBlogs.toString());
      const response = await useBaseFetch(`/favorite-blogs/blogs/${id}`, {
        method: 'DELETE',
      });
      closeLoading();
      return response;
    },

    async addFavoriteApplicant(id: number) {
      onLoading();
      const applicants = [] as number[];
      const favoritesApplicantLocal = useLocalStorage(
        'auth.favoritesApplicant',
        '',
      );
      if (favoritesApplicantLocal.value.length) {
        const data = favoritesApplicantLocal.value.split(',');
        data.forEach((el: string) => {
          applicants.push(Number(el));
        });
      }
      const newApplicants = [...applicants, id];
      handleSetFavoriteApplicantLocalStorage(newApplicants.toString());
      const response = await useBaseFetch(
        `/favorite-applicants/applicant/${id}`,
        {
          method: 'POST',
        },
      );
      closeLoading();
      return response;
    },

    async deleteFavoriteApplicant(id: number) {
      onLoading();
      const applicants = [] as number[];
      const favoritesApplicantLocal = useLocalStorage(
        'auth.favoritesApplicant',
        '',
      );
      if (favoritesApplicantLocal.value.length) {
        const data = favoritesApplicantLocal.value.split(',');
        data.forEach((el: string) => {
          applicants.push(Number(el));
        });
      }
      const newApplicants = applicants.filter((el: number) => el !== id);
      handleSetFavoriteApplicantLocalStorage(newApplicants.toString());
      const response = await useBaseFetch(
        `/favorite-applicants/applicant/${id}`,
        {
          method: 'DELETE',
        },
      );
      closeLoading();
      return response;
    },

    async addFavoriteNews(id: number) {
      onLoading();
      const news = [] as number[];
      const favoritesNewsLocal = useLocalStorage('auth.favoritesNews', '');
      if (favoritesNewsLocal.value.length) {
        const data = favoritesNewsLocal.value.split(',');
        data.forEach((el: string) => {
          news.push(Number(el));
        });
      }
      const newNews = [...news, id];
      handleSetFavoriteNewsLocalStorage(newNews.toString());
      const response = await useBaseFetch(`/favorite-news/news/${id}`, {
        method: 'POST',
      });
      closeLoading();
      return response;
    },

    async deleteFavoriteNews(id: number) {
      onLoading();
      const news = [] as number[];
      const favoritesNewsLocal = useLocalStorage('auth.favoritesNews', '');
      if (favoritesNewsLocal.value.length) {
        const data = favoritesNewsLocal.value.split(',');
        data.forEach((el: string) => {
          news.push(Number(el));
        });
      }
      const newNews = news.filter((el: number) => el !== id);
      handleSetFavoriteNewsLocalStorage(newNews.toString());
      const response = await useBaseFetch(`/favorite-news/news/${id}`, {
        method: 'DELETE',
      });
      closeLoading();
      return response;
    },
  },
});
