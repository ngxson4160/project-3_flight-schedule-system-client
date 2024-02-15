import { defineStore } from 'pinia';
import {
  typeListJob,
  IRESJob,
  IJobCategories,
  IResponse,
} from '~~/utils/interface';

const { getJobById } = useCompositionMasterData();

interface IGetJobName {
  id: number;
  position?: string;
  title?: string;
}

export const useJobStore = defineStore({
  id: 'useJobStore',
  state: () => ({
    jobsTemporary: [] as typeListJob[],
    jobsTemporarys: [] as typeListJob[],
    jobsName: [] as IGetJobName[],
    limitItems: 10 as number,
    currentPage: 1 as number,
    totalItems: 0 as number,
    jobs: {} as IRESJob[],
    isPublic: true,
    isDraft: false,
  }),
  getters: {
    getListJob(state) {
      return state.jobsTemporary;
    },
    getListJobName(state) {
      return state.jobsName.map((el: IGetJobName) => ({
        // label: el.name,
        // value: el.id,
        label: el.position,
        value: el.id,
      }));
    },
  },
  actions: {
    setJobList(jobs: IRESJob[]) {
      this.jobsTemporarys = jobs;
    },

    setListJob(jobs: IRESJob[], jobCategories: IJobCategories[]) {
      this.jobsTemporary = [];
      const idsJobAlreadyExists = new Set(
        this.jobsTemporary.map((job: typeListJob) => job.id),
      );

      this.jobsTemporary = [
        ...this.jobsTemporary,
        ...jobs
          .filter((el: IRESJob) => !idsJobAlreadyExists.has(el.id))
          .map((el: IRESJob) => ({
            id: el.id,
            title: el.title,
            numberOfApplicants: el.countEntry,
            favorites: el.countFavorite,
            views: el.viewingQuantity,
            employmentStatus: el.employmentStatus,
            jobCategory: getJobById(el.jobCategoryId, jobCategories),
            start_date: el.hiringStartDate,
            end_date: el.hiringEndDate,
          })),
      ];
    },
    removeJob(jobId: number) {
      this.jobsTemporary = this.jobsTemporary.filter(
        (job: typeListJob) => job.id !== jobId,
      );
    },
    async getAllJob() {
      const { data } = await useBaseFetch('/job-categories/name', {
        method: 'GET',
      });

      const dataJobs = data.value as IResponse;

      this.jobsName = dataJobs.data;
    },

    async fetchListJob(
      isPublic: boolean,
      isDraft: boolean,
      jobCategories: IJobCategories[],
    ) {
      const url = `/employers/profile/jobs?isPublic=${isPublic}&isDraft=${isDraft}&limit=${this.limitItems}&page=${this.currentPage}`;
      onLoading();
      const { data } = await useBaseFetch(url, {
        method: 'GET',
      });

      const jobsData = data.value as IResponse;

      this.jobs = jobsData.data?.jobs || [];

      this.totalItems = jobsData.data?.totalCount ?? 1;

      this.setListJob(this.jobs, jobCategories);
      closeLoading();
    },

    async userGetAllEmployeesJob(id: number) {
      const { data, error } = await useBaseFetch(`/jobs/employer/${id}`, {});
      if (error.value?.data)
        return openNotification(error.value.data.errorMessage);
      const response = data.value as IResponse;
      this.jobsTemporary = response.data;
      return response.data;
    },
    setStatus(data: { isPublic: boolean; isDraft: boolean }) {
      this.isPublic = data.isPublic;
      this.isDraft = data.isDraft;
    },

    async getJobCategorieNames() {
      const { data } = await useBaseFetch('/employers/profile/jobs/names', {
        method: 'GET',
      });

      const dataJobs = data.value as IResponse;

      this.jobsName = dataJobs.data;
    },
  },
});
