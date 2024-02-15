const REGION_JA = [
  { id: 1, label: '' },
  { id: 2, label: '' },
  { id: 3, label: '' },
  { id: 4, label: '' },
  { id: 5, label: '' },
  { id: 6, label: '' },
  { id: 7, label: '' },
  { id: 8, label: '' },
  { id: 9, label: '' },
  { id: 10, label: '' },
  { id: 11, label: '' },
];

export const getRegionNameWithId = (id: number) => {
  return REGION_JA.find((i) => i.id === id)?.label;
};
