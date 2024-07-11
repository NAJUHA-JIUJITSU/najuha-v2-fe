import { TDateOrStringDate } from 'najuha-v2-api/lib/common/common-types';

// 날짜를 자정으로 초기화하는 함수
export const resetTime = (date: TDateOrStringDate | null): Date => {
  if (!date) {
    return new Date();
  }
  const resetDate = new Date(date);
  if (isNaN(resetDate.getTime())) {
    throw new Error('유효하지 않은 날짜 형식입니다.');
  }
  resetDate.setHours(0, 0, 0, 0);
  return resetDate;
};

// 날짜가 오늘보다 이전인지 확인하는 함수
export const isDatePast = (date: TDateOrStringDate | null): boolean => {
  const now = resetTime(new Date());
  const resetDate = resetTime(date);
  return resetDate < now;
};

// 날짜가 오늘과 같은지 확인하는 함수
export const isDateToday = (date: TDateOrStringDate | null): boolean => {
  const now = resetTime(new Date());
  const resetDate = resetTime(date);
  return resetDate.getTime() === now.getTime();
};

// 날짜가 오늘보다 이후인지 확인하는 함수
export const isDateFuture = (date: TDateOrStringDate | null): boolean => {
  if (!date) {
    return true;
  }
  const now = resetTime(new Date());
  const resetDate = resetTime(date);
  return resetDate > now;
};

// 두 날짜가 모두 현재 날짜보다 이전인지 확인하는 함수
export const areBothDatesPassed = (
  date1: TDateOrStringDate | null,
  date2: TDateOrStringDate | null,
): boolean => {
  if (!date1 || !date2) {
    return true;
  }
  const now = resetTime(new Date());
  const resetDate1 = resetTime(date1);
  const resetDate2 = resetTime(date2);

  return resetDate1 < now && resetDate2 < now;
};

// 날짜 디데이 계산 함수
export const calculateDayDiff = (futureDate: TDateOrStringDate | null): number => {
  if (!futureDate) {
    return 0;
  }
  const futureDateObj = new Date(futureDate);
  if (isNaN(futureDateObj.getTime())) {
    throw new Error('유효하지 않은 날짜 형식입니다.');
  }
  const now = new Date();
  const timeDiff = futureDateObj.getTime() - now.getTime();
  return Math.floor(timeDiff / (1000 * 3600 * 24));
};

// 날짜를 ~일 전, ~시간 전, ~분 전으로 표시하는 함수
export const getPastTime = (date: TDateOrStringDate | null): string => {
  if (!date) {
    return '';
  }
  const now = new Date();
  const dateData = new Date(date);
  if (isNaN(dateData.getTime())) {
    throw new Error('유효하지 않은 날짜 형식입니다.');
  }
  const timeDiff = now.getTime() - dateData.getTime(); // 현재 시간과의 차이를 밀리초 단위로 계산

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
