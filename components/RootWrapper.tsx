'use client';

import { RecoilRoot } from 'recoil';
import React from 'react';
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';
import { saveTokens } from '@/util/tokenManagement';

// 전역 select 함수 정의
const globalSelectFn = (response: any) => {
  return response.data.result;
};

export interface AxiosResponse {
  data: { isSuccess: true; code: 200; result: any };
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5분
      // select: globalSelectFn,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      //프론트 에러처리 로직 추가
      if (error instanceof AxiosError && error.response) {
        console.log('statusCode: ', error.response.status);
        console.log('errorMsg: ', error.response.data.result);
      }

      //프론트 알림에러처리 로직 추가
      if (query.meta?.alertMsg) {
        alert(query.meta.alertMsg);
      }
    },
  }),
});

interface RootWrapperProps {
  children: React.ReactNode;
}

export default function RootWrapper({ children }: RootWrapperProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {children}

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
