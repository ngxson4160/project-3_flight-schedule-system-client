import dayjs, { type Dayjs } from 'dayjs';
const dateDefault = 'YYYY/MM/DD';

export const useDateTime = () => {
  const formatDate = (
    date: string | Dayjs | null,
    type: string = dateDefault,
  ) => {
    return date ? dayjs(date).format(type) : dayjs().format(type);
  };

  const calculateAge = (birthday: string) => {
    const currentTime = dayjs();
    const dateOfBirth = dayjs(birthday);
    const age = currentTime.diff(dateOfBirth, 'year');
    return age;
  };

  return {
    formatDate,
    calculateAge,
  };
};
