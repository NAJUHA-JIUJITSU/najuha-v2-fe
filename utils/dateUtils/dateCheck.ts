// 날짜를 자정으로 초기화하는 함수
export const resetTime = (date: string): Date => {
  const resetDate = new Date(date);
  resetDate.setHours(0, 0, 0, 0);
  return resetDate;
};

// 날짜가 오늘보다 이전인지 확인하는 함수
export const isDatePast = (date: string): boolean => {
  const now = new Date();
  const resetNow = resetTime(now.toString());
  const resetDate = resetTime(date);
  return resetDate < resetNow;
};

// 날짜가 오늘과 같은지 확인하는 함수
export const isDateToday = (date: string): boolean => {
  const now = new Date();
  const resetNow = resetTime(now.toString());
  const resetDate = resetTime(date);
  return resetDate.getTime() === resetNow.getTime();
};

// 날짜가 오늘보다 이후인지 확인하는 함수
export const isDateFuture = (date: string): boolean => {
  const now = new Date();
  const resetNow = resetTime(now.toString());
  const resetDate = resetTime(date);
  return resetDate > resetNow;
};

// 두 날짜가 모두 현재 날짜보다 이전인지 확인하는 함수
export const areBothDatesPassed = (date1: string, date2: string): boolean => {
  const now = new Date();
  const resetNow = resetTime(now.toString());
  const resetDate1 = resetTime(date1);
  const resetDate2 = resetTime(date2);

  return resetDate1 < resetNow && resetDate2 < resetNow;
};

// 날짜 디데이 계산 함수
export const calculateDayDiff = (futureDate: string): number => {
  const futureDateObj = new Date(futureDate);
  const now = new Date();
  const timeDiff = futureDateObj.getTime() - now.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};
