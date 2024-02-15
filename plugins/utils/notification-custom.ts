import { h } from 'vue';

import { ElMessage } from 'element-plus';

export const openNotification = (
  content = '',
  duration = 3000,
  offset = 96,
) => {
  ElMessage({
    type: 'info',

    center: true,

    offset,

    duration,

    customClass: 'notification-custom',

    message: h('strong', { style: 'color: #0871E1' }, content),
  });
};

export const openNotificationCreateMember = (content = '', duration = 3000) => {
  ElMessage({
    type: 'info',
    offset: 96,
    center: true,
    showClose: true,

    duration,

    customClass: 'notification-create-custom',

    message: h('strong', { style: 'color: #0871E1' }, content),
  });
};

export const openNotificationError = (content = '', duration = 3000) => {
  ElMessage({
    type: 'info',
    offset: 96,
    center: true,
    showClose: true,

    duration,

    customClass: 'notification-error-custom',

    message: h('strong', { style: 'color: #FE4B28' }, content),
  });
};

export const openNotificationWarningRequired = (duration = 3000) => {
  ElMessage({
    type: 'info',
    offset: 96,
    center: true,
    showClose: true,
    dangerouslyUseHTMLString: true,
    duration,

    customClass: 'notification-custom notification-warning-required',

    message:
      '<p style="color: #0871E1; font-size: 16px; font-weight: 700; text-align: center; padding-bottom: 12px;">プロフィールを更新しました</p><p style="color: #FE4B28; font-size: 16px; font-weight: 700; text-align: center;">※求人にエントリーするには、「応募時必須」項目の入力が必要です</ơ>',
  });
};
