import { defineStore } from 'pinia';
import { useUserProfile } from '@/composables/user/mypage';
const { editBasic, editHistory, editConditions, editScount } = useUserProfile();

export const useUserProfileStore = defineStore({
  id: 'useUserProfileStore',
  state: () => ({
    formDetailBasicTemporary: null,
    formDetailHistoryTemporary: null,
    formDetailConditionsTemporary: null,
    formDetailScountTemporary: null,
    desiredWorkLocationTypeNumberTemporary: [] as Number[],
    desiredJobCategoryTemporary: null,
    userDetail: null,
    isValidateInformationBasic: true,
    isValidateInformationHistory: true,
  }),
  getters: {},
  actions: {
    setFormDetailBasicTemporary(formDetailBasic: any) {
      this.formDetailBasicTemporary = formDetailBasic;
    },
    setFormDetailHistoryTemporary(formDetailHistory: any) {
      this.formDetailHistoryTemporary = formDetailHistory;
    },
    setDesiredWorkLocationText(desiredWorkLocationTypeNumber: any) {
      this.desiredWorkLocationTypeNumberTemporary =
        desiredWorkLocationTypeNumber;
    },
    setFormDetailConditionsTemporary(formDetailConditions: any) {
      this.formDetailConditionsTemporary = formDetailConditions;
    },
    setFormDetailScountTemporary(formDetailScount: any) {
      this.formDetailScountTemporary = formDetailScount;
    },
    setUserDetail(userDetail: any) {
      this.userDetail = userDetail;
    },
    setValidateInformationBasic(isValidateInformationBasic: any) {
      this.isValidateInformationBasic = isValidateInformationBasic;
    },
    setValidateInformationHistory(isValidateInformationHistory: any) {
      this.isValidateInformationHistory = isValidateInformationHistory;
    },
    resetAllFormDetail() {
      this.formDetailBasicTemporary = null;
      this.formDetailHistoryTemporary = null;
      this.formDetailConditionsTemporary = null;
      this.formDetailScountTemporary = null;
      this.desiredWorkLocationTypeNumberTemporary = [];
      this.desiredJobCategoryTemporary = null;
    },
    async updateAllChange() {
      onLoading();
      const formDetailConditions = this.formDetailConditionsTemporary ?? {};
      if (this.formDetailBasicTemporary) {
        await editBasic(this.formDetailBasicTemporary, true);
      }
      if (this.formDetailHistoryTemporary) {
        await editHistory(this.formDetailHistoryTemporary, true);
      }
      if (this.formDetailConditionsTemporary) {
        await editConditions(
          {
            ...formDetailConditions,
            desiredWorkLocation: this.desiredWorkLocationTypeNumberTemporary,
          },
          true,
        );
      }
      if (this.formDetailScountTemporary) {
        await editScount(this.formDetailScountTemporary, true);
      }
      if (
        this.isValidateInformationBasic &&
        this.isValidateInformationHistory
      ) {
        openNotification('プロフィールを更新しました');
      } else {
        openNotificationWarningRequired();
      }
      closeLoading();
    },
  },
});
