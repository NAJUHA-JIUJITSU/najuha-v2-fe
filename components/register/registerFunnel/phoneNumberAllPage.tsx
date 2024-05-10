'use client';
import PhoneNumberPage from '@/components/register/registerFunnel/phoneNumberPage';
import PhoneNumberCheckPage from '@/components/register/registerFunnel/phoneNumberCheckPage';
import { useFunnel } from '@/hooks/useFunnel';

const steps = ['전화번호 수정', '전화번호 인증'];

interface PhoneNumberAllPageProps {
  onNext: () => void;
  submitText?: string;
}

export default function PhoneNumberAllPage({
  onNext,
  submitText = '다음',
}: PhoneNumberAllPageProps) {
  const { gotoNextStep, Funnel, Step } = useFunnel(steps);

  return (
    <div>
      <Funnel>
        <Step name="전화번호 수정">
          <PhoneNumberPage onNext={gotoNextStep} />
        </Step>
        <Step name="전화번호 인증">
          <PhoneNumberCheckPage onNext={onNext} submitText={submitText} />
        </Step>
      </Funnel>
    </div>
  );
}
