'use client';
import React, { useState } from 'react';
import styles from './index.module.scss';
import BaseLayout from '@/components/layout/baseLayout';
import RadioButtonLabel from '@/components/common/radioButtonLabel';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useCreatePostReport, useCreateCommentReport } from '@/hooks/post';
import { CreatePostReportReqBody } from 'najuha-v2-api/lib/modules/posts/presentation/posts.controller.dto';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import ButtonOnClick from '@/components/common/button/buttonOnClick';

export default function ReportPost({ params }: { params: { id: string[] } }) {
  console.log('params', params);
  const report = params.id[0];
  const reportId = params.id[1];
  const router = useRouter();

  const {
    mutate: reportPost,
    isPending: isPendingPost,
    isError: isErrorPost,
  } = useCreatePostReport(reportId);
  const {
    mutate: reportComment,
    isPending: isPendingComment,
    isError: isErrorComment,
  } = useCreateCommentReport(reportId);

  const [reportType, setReportType] = useState<CreatePostReportReqBody>({ type: 'SPAM_CLICKBAIT' });

  const reportTypes: { type: CreatePostReportReqBody['type']; reason: string }[] = [
    { type: 'SPAM_CLICKBAIT', reason: '낚시 / 놀람 / 도배' },
    { type: 'COMMERCIAL_ADVERTISING', reason: '상업적 광고 및 판매' },
    { type: 'SEXUAL_CONTENT', reason: '음란성 / 선정적' },
    { type: 'ABUSE_HARASSMENT', reason: '욕설/비하' },
    { type: 'POLITICAL_DISPARAGEMENT', reason: '정당/정치인 비하 및 선거운동' },
    { type: 'IMPERSONATION_FRAUD', reason: '유출/사칭/사기' },
    { type: 'ILLEGAL_DISTRIBUTION', reason: '불법촬영물 등의 유통' },
    { type: 'RELIGIOUS_PROSELYTIZING', reason: '종교 포교 시도' },
    { type: 'INAPPROPRIATE_CONTENT', reason: '게시판 성격에 부적절함' },
  ];

  const handleReport = useCallback(() => {
    if (report === 'post') {
      reportPost(reportType, {
        onSuccess: () => {
          alert('게시글 신고가 접수되었습니다.');
          router.back();
        },
        onError: () => {
          console.error('게시글 신고 접수에 실패했습니다.');
        },
      });
    } else if (report === 'comment') {
      reportComment(reportType, {
        onSuccess: () => {
          alert('댓글 신고가 접수되었습니다.');
          router.back();
        },
        onError: () => {
          console.error('댓글 신고 접수에 실패했습니다.');
        },
      });
    }
  }, [report, reportType, reportPost, reportComment, router]);

  if (isPendingPost || isPendingComment) return <div>Loading...</div>;
  if (isErrorPost || isErrorComment) return <div>Error</div>;

  return (
    <BaseLayout isFooter={false}>
      <Header title="게시글 신고" leftIcon={<ButtonIconNavigateBefore />} />
      <div className={styles.title}>신고하는 이유를 선택해주세요.</div>
      {reportTypes.map((type) => (
        <RadioButtonLabel
          key={type.type}
          msg={type.reason}
          isChecked={reportType.type === type.type}
          changeCheck={() => {
            setReportType({ type: type.type });
          }}
          isUnderlined={true}
        />
      ))}

      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="신고하기"
          color="blue"
          width="full"
          size="large"
          onClick={handleReport}
        />
      </div>
    </BaseLayout>
  );
}
