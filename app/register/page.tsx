'use client';
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
import PhoneNumber from '@/components/register/phoneNumber';
import Verify from '@/components/register/verify';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userAtom } from '@/recoil/userAtom';
import { accessTokenAtom } from '@/recoil/accessTokenAtom';
import { getUsersMe } from '@/api/users';

const steps = [
  '약관동의',
  '성별 선택',
  '생년월일 설정',
  '휴대폰 번호',
  '번호 인증',
  '닉네임 설정',
  '주짓수 벨트 설정',
];

const Register = () => {
  const goBack = useGoBack();
  const { Funnel, setStep, step } = useFunnel(steps);
  const setUser = useSetRecoilState(userAtom);
  const accessToken = useRecoilValue(accessTokenAtom);

  const prevClickHandler = () => {
    const currentStepIndex = steps.indexOf(step);
    if (currentStepIndex > 0) setStep(steps[currentStepIndex - 1]);
    if (currentStepIndex === 0) goBack();
  };

  // useEffect(() => {
  //   setStep(steps[6]);
  // }, []);

  useEffect(() => {
    (async () => {
      const data = await getUsersMe(accessToken);
      setUser((user) => ({
        ...user,
        ...data,
      }));
      console.log(data);
    })();
  }, [setUser, accessToken]);

  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={<ButtonIconFunnelBefore onClick={prevClickHandler} />}
        title={step}
        rightIcon1={<IconLinkAlarm />}
        rightIcon2={<IconLinkSearch />}
      />
      <Funnel>
        <Funnel.Step name="약관동의">
          <Requirement onNext={() => setStep(steps[1])} />
        </Funnel.Step>
        <Funnel.Step name="성별 선택">
          <Gender onNext={() => setStep(steps[2])} />
        </Funnel.Step>
        <Funnel.Step name="생년월일 설정">
          <Birthday onNext={() => setStep(steps[3])} />
        </Funnel.Step>
        <Funnel.Step name="휴대폰 번호">
          <PhoneNumber onNext={() => setStep(steps[4])} />
        </Funnel.Step>
        <Funnel.Step name="번호 인증">
          <Verify onNext={() => setStep(steps[5])} />
        </Funnel.Step>
        <Funnel.Step name="닉네임 설정">
          <Nickname onNext={() => setStep(steps[6])} />
        </Funnel.Step>
        <Funnel.Step name="주짓수 벨트 설정">
          <Belt onNext={() => {}} />
        </Funnel.Step>
      </Funnel>
    </div>
  );
};

export default Register;
