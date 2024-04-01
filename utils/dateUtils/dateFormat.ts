// 년도.월.일 포맷
export const formatDateYMD = (date: string) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear().toString().slice(-2);
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
};

// 월.일 포맷
export const formatDateMD = (date: string) => {
  const dateObj = new Date(date);
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  return `${month}.${day}`;
};

// 월.일(요일) 포맷
export const formatDateMDWeekday = (date: string) => {
  const dateObj = new Date(date);
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[dateObj.getDay()];
  return `${month}.${day}(${weekday})`;
};

// 년도.월.일(요일) 포맷
export const formatDateYMDWeekday = (date: string) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear().toString().slice(-2);
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[dateObj.getDay()];
  return `${year}.${month}.${day}(${weekday})`;
};
