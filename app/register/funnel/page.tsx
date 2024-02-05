'use client';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useFunnel } from '@/hook/useFunnel';
import Header from '@/components/common/header/Header';
import { ButtonIconFunnelBefore } from '@/components/common/icon/iconOnClick';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import Requirement from '@/components/register/requirement';
import Gender from '@/components/register/gender';
import useGoBack from '@/hook/useGoBack';
import Birthday from '@/components/register/birthday';
import Nickname from '@/components/register/nickname';
import Belt from '@/components/register/belt';
import Phonenumber from '@/components/register/phonenumber';
import Verify from '@/components/register/verify';

const steps = [
  '약관동의',
  '성별 선택',
  '생년월일 설정',
  '휴대폰 번호',
  '번호 인증',
  '닉네임 설정',
  '주짓수 벨트 설정',
];
export default function Funnel() {
  const goBack = useGoBack();
  const { Funnel, setStep, Step, step } = useFunnel(steps[0]);

  const prevClickHandler = () => {
    const currentStepIndex = steps.indexOf(step);
    if (currentStepIndex > 0) {
      setStep(steps[currentStepIndex - 1]);
    }
    if (currentStepIndex === 0) {
      goBack();
    }
  };

  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={<ButtonIconFunnelBefore onClick={prevClickHandler} />}
        title={step[0] === '약관동의' ? '회원가입' : step}
        rightIcon1={<IconLinkAlarm />}
        rightIcon2={<IconLinkSearch />}
      />
      <Funnel>
        <Step name="약관동의">
          <Requirement onNext={() => setStep(steps[1])} />
        </Step>
        <Step name="성별 선택">
          <Gender onNext={() => setStep(steps[2])} />
        </Step>
        <Step name="생년월일 설정">
          <Birthday onNext={() => setStep(steps[3])} />
        </Step>
        <Step name="휴대폰 번호">
          <Phonenumber onNext={() => setStep(steps[4])} />
        </Step>
        <Step name="번호 인증">
          <Verify onNext={() => setStep(steps[5])} />
        </Step>
        <Step name="닉네임 설정">
          <Nickname onNext={() => setStep(steps[6])} />
        </Step>
        <Step name="주짓수 벨트 설정">
          <Belt onNext={() => {}} />
        </Step>
      </Funnel>
    </div>
  );
}
