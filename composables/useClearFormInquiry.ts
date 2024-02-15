import { useInquiry } from '~~/stores/inquiry';
import { useInquiryEmployer } from '~~/stores/inquiryEmployer';

export const useClearFormInquiry = () => {
  const inquiryStore = useInquiry();
  inquiryStore.setSystemData({
    name: '',
    email: '',
    phoneNumber: '',
    content: '',
    isConfirm: null,
  });
};
export const useClearFormInquiryEmployer = () => {
  const inquiryEmployerStore = useInquiryEmployer();
  inquiryEmployerStore.setSystemData({
    governmentOfficeName: '',
    name: '',
    email: '',
    phoneNumber: '',
    content: '',
    isConfirm: null,
  });
};
