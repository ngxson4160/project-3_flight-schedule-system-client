export const splitTime = (date: Date | string) => {
  // const newDate = new Date(date);
  // const hours = newDate.getHours().toString().padStart(2, '0');
  // const minus = newDate.getMinutes().toString().padStart(2, '0');
  // return `${hours}:${minus}`;

  const newDate = new Date(date);
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const isAM = hours < 12;

  const formattedHours = (hours % 12 === 0 ? 12 : hours % 12)
    .toString()
    .padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const period = isAM ? 'AM' : 'PM';

  return `${formattedHours}:${formattedMinutes} ${period}`;
};

export const splitDate = (date: Date | string) => {
  const newDate = new Date(date);
  const day = newDate.getDate().toString().padStart(2, '0');
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const year = newDate.getFullYear();
  return `${year}/${month}/${day}`;
};

export const convertValueEnum = (str: string) => {
  const lowerCaseStr = str.toLowerCase();

  const words = lowerCaseStr.split('_');

  if (words.length > 0) {
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  }

  const formattedString = words.join(' ');

  return formattedString;
};
