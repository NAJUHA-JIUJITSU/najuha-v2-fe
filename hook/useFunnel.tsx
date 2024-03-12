// useFunnel.tsx;

import React, { ReactElement, ReactNode, useState } from 'react';

export interface StepProps {
  name: string;
  children: ReactNode;
}

export interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}
// steps type is an array of string
export const useFunnel = (steps: string[]) => {
  // state를 통해 현재 스텝을 관리한다.
  // setStep 함수를 통해 현재 스텝을 변경할 수 있다.
  const [stepIndex, setStepIndex] = useState(0);

  const currentStep = steps[stepIndex];

  // 다음 스텝으로 이동
  const gotoNextStep = () => {
    setStepIndex((currentIndex) => Math.min(currentIndex + 1, steps.length - 1));
  };

  // 이전 스텝으로 이동
  const gotoPreviousStep = () => {
    setStepIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  };

  // 각 단계를 나타내는 Step 컴포넌트
  // children을 통해 각 스텝의 컨텐츠를 렌더링 한다.
  const Step = (props: StepProps): ReactElement => {
    return <>{props.children}</>;
  };

  // 여러 단계의 Step 컴포넌트 중 현재 활성화된 스텝을 렌더링하는 Funnel
  // find를 통해 Step 중 현재 Step을 찾아 렌더링
  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = children.find((childStep) => childStep.props.name === currentStep);

    return <>{targetStep}</>;
  };

  return { Funnel, Step, gotoNextStep, gotoPreviousStep };
};

// import React, { ReactElement, ReactNode, useState } from 'react';

// export interface StepProps {
//   name: string;
//   children: ReactNode;
// }

// export interface FunnelProps {
//   children: Array<ReactElement<StepProps>>;
// }

// function useFunnel<StepType extends string, DataType>(steps: StepType[], initialData: DataType) {
//   const [currentStepIndex, setCurrentStepIndex] = useState(0);
//   const [funnelData, setFunnelData] = useState<DataType>(initialData); // 퍼널 데이터

//   const currentStep = steps[currentStepIndex]; // 현재 단계 이름

//   const gotoNextStep = () => {
//     setCurrentStepIndex((currentIndex) => Math.min(currentIndex + 1, steps.length - 1));
//   };

//   const gotoPreviousStep = () => {
//     setCurrentStepIndex((currentIndex) =>
//       steps[currentStepIndex - 1] === '전화번호인증'
//         ? Math.max(currentIndex - 2, 0)
//         : Math.max(currentIndex - 1, 0),
//     );
//   };

//   // 각 단계를 나타내는 Step 컴포넌트
//   const Step = (props: StepProps): ReactElement => {
//     return <>{props.children}</>;
//   };

//   // 여러 단계의 Step 컴포넌트 중 현재 활성화된 스텝을 렌더링하는 Funnel 컴포넌트
//   const Funnel = ({ children }: FunnelProps) => {
//     const targetStep = children.find((childStep) => childStep.props.name === currentStep);

//     return <>{targetStep}</>;
//   };

//   return {
//     currentStep,
//     gotoSaveNextStep,
//     gotoPreviousStep,
//     funnelData,
//     setFunnelData,
//     setCurrentStepIndex, // 이 함수를 제공하여 특정 단계로 직접 이동할 수 있도록 함
//     Funnel,
//     Step,
//   };
// }

// export default useFunnel;
