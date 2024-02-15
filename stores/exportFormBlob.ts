import { defineStore } from 'pinia';

export interface ExportFormData {
  token: string;
  isLoadingCompleted: boolean;
  messageUploadPDFSuccess: string;
}

export const useExportFormData = defineStore('export-form', {
  state: (): ExportFormData => {
    return {
      token: '',
      isLoadingCompleted: false,
      messageUploadPDFSuccess: 'PDF出力が完了しました',
    };
  },
  actions: {
    setLoading(payload: boolean) {
      this.isLoadingCompleted = payload;
    },

    async exportFileCSV(applicantIds: (number | undefined)[]) {
      const query = {
        'settingInterviewIds[]': applicantIds,
      };
      const { data, error } = await useBaseFetch(
        '/file-export/employer/applicants-setting-interview-v2/csv/export',
        { query },
      );
      if (error.value?.data) {
        throw error.value?.data;
      } else {
        const response = data.value as IResponse;
        const pageName = '求職者管理';
        exportCSV(response, pageName);
      }
    },

    async getTokenFilePDF(form: { applicantIds: (number | undefined)[] }) {
      const config = useRuntimeConfig();
      try {
        this.setLoading(true);
        const { data, error } = await useBaseFetch(
          '/employers/profile/export-many-applicant-token',
          { method: 'POST', body: form },
        );
        if (error.value?.data) {
          throw error.value?.data;
        } else {
          const response = data.value as IResponse;
          if (response.data) {
            const url = `${config.public.baseURL}/file-export/employer/applicant/export?token=${response.data}`;
            downloadFileShowLoading(url, true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
