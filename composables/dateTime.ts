import dayjs from 'dayjs';

export const dateTimeFormat = (date: string) => {
  if (date) {
    return dayjs(date).format('YYYY/MM/DD');
  }
};

export const dateTimeFormatMinutes = (date: string) => {
  if (date) {
    return dayjs(date).format('HH:mm');
  }
};
