import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export function useURLParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // URLSearchParams에서 모든 매개변수를 읽어와 상태로 관리하는 함수
  const getParamValue = (value: string) => (Array.isArray(value) ? value[0] : value);

  // URLSearchParams에서 모든 매개변수를 읽어와 상태로 관리하는 함수
  const getAllParams = () => {
    const params: { [key: string]: string | string[] } = {};
    for (const [key, value] of searchParams.entries()) {
      // 이미 존재하는 키인 경우, 배열로 처리
      if (params.hasOwnProperty(key)) {
        params[key] = Array.isArray(params[key])
          ? [...params[key], value]
          : [params[key] as string, value];
      } else {
        params[key] = value;
      }
    }
    return params;
  };

  // 상태로 URLSearchParams의 모든 매개변수를 관리
  const [params, setParams] = useState<{ [key: string]: string | string[] }>(getAllParams());

  // URL 매개변수 업데이트 함수
  const updateParams = (newParams: { [key: string]: string | string[] | undefined }) => {
    const updatedSearchParams = new URLSearchParams(window.location.search);

    // 새 매개변수로 기존 매개변수 업데이트 또는 추가
    for (const [key, value] of Object.entries(newParams)) {
      if (value === undefined || value === '') {
        // 값을 undefined 또는 빈 문자열로 설정한 경우, 매개변수 삭제
        updatedSearchParams.delete(key);
      } else {
        // 기존 값을 삭제 (중복 방지)
        updatedSearchParams.delete(key);
        if (Array.isArray(value)) {
          // 배열인 경우, 값이 있는 항목만 추가
          value.forEach((val) => {
            if (val !== '') updatedSearchParams.append(key, val);
          });
        } else {
          // 단일 값인 경우, 설정
          updatedSearchParams.set(key, value);
        }
      }
    }
    // Next.js 라우터를 사용하여 URL 매개변수 업데이트
    window.history.pushState({}, '', `${pathname}?${updatedSearchParams.toString()}`);
  };

  // 매개변수 상태 업데이트를 위한 훅
  useEffect(() => {
    setParams(getAllParams());
  }, [searchParams]);

  return { params, getParamValue, updateParams };
}
