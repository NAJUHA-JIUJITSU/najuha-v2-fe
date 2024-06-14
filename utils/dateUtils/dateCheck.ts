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
  return Math.floor(timeDiff / (1000 * 3600 * 24));
};

// 날짜를 ~일 전, ~시간 전, ~분 전으로 표시하는 함수
export const getPastTime = (date: Date): string => {
  const now = new Date();
  const timeDiff = now.getTime() - date.getTime(); // 현재 시간과의 차이를 밀리초 단위로 계산

  if (timeDiff < 0) {
    return ''; // 입력된 날짜가 미래인 경우
  }

  const minuteDiff = Math.floor(timeDiff / (1000 * 60));
  const hourDiff = Math.floor(timeDiff / (1000 * 3600));
  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  if (dayDiff >= 1) {
    return `${dayDiff}일 전`;
  } else if (hourDiff >= 1) {
    return `${hourDiff}시간 전`;
  } else {
    return `${minuteDiff}분 전`;
  }
};
