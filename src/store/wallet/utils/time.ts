export const WithinSameMonth = (time1: number, time2: number): boolean => {
  if (!time1 || !time2) {
    return false;
  }
  const date1 = new Date(time1);
  const date2 = new Date(time2);
  return GetMonthYear(date1) === GetMonthYear(date2);
};

export const GetMonthYear = (date: Date): string => {
  return `${date.getMonth()}-${date.getFullYear()}`;
};

export const WithinPastDay = (time: number): boolean => {
  const now = new Date();
  const date = new Date(time);
  return now.getTime() - date.getTime() < 1000 * 60 * 60 * 24;
};

export const IsDateInCurrentMonth = (time: number): boolean => {
  const now = new Date();
  const date = new Date(time);
  return GetMonthYear(now) === GetMonthYear(date);
};