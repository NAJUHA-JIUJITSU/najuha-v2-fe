// 날짜를 자정으로 초기화하는 함수
export const resetTime = (date: Date): Date => {
  const resetDate = new Date(date);
  resetDate.setHours(0, 0, 0, 0);
  return resetDate;
};

// 날짜가 오늘보다 이전인지 확인하는 함수
export const isDatePast = (date: Date): boolean => {
  const now = new Date();
  const resetNow = resetTime(now);
  const resetDate = resetTime(date);
  return resetDate < resetNow;
};

// 날짜가 오늘과 같은지 확인하는 함수
export const isDateToday = (date: Date): boolean => {
  const now = new Date();
  const resetNow = resetTime(now);
  const resetDate = resetTime(date);
  return resetDate.getTime() === resetNow.getTime();
};

// 날짜가 오늘보다 이후인지 확인하는 함수
export const isDateFuture = (date: Date): boolean => {
  const now = new Date();
  const resetNow = resetTime(now);
  const resetDate = resetTime(date);
  return resetDate > resetNow;
};

// 두 날짜가 모두 현재 날짜보다 이전인지 확인하는 함수
export const areBothDatesPassed = (date1: Date, date2: Date): boolean => {
  const now = new Date();
  const resetNow = resetTime(now);
  const resetDate1 = resetTime(date1);
  const resetDate2 = resetTime(date2);

  return resetDate1 < resetNow && resetDate2 < resetNow;
};

// 날짜 디데이 계산 함수
export const calculateDayDiff = (futureDate: Date): number => {
  const now = new Date();
  const timeDiff = futureDate.getTime() - now.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};
