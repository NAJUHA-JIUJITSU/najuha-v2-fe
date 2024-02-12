import { useState } from 'react';

function useFunnel<StepType extends string, DataType>(steps: StepType[], initialData: DataType) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [funnelData, setFunnelData] = useState<DataType>(initialData); // 퍼널 데이터

  const currentStep = steps[currentStepIndex]; // 현재 단계 이름

  const updateStepData = (step: StepType, data: Partial<DataType>) => {
    setFunnelData((prevData) => ({ ...prevData, [step]: data }));
  };

  const gotoNextStep = () => {
    setCurrentStepIndex((currentIndex) => Math.min(currentIndex + 1, steps.length - 1));
  };

  const gotoSaveNextStep = (funnelData: any) => {
    updateStepData(currentStep, funnelData);
    gotoNextStep();
  };

  const gotoPreviousStep = () => {
    setCurrentStepIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  };

  return {
    currentStep,
    gotoSaveNextStep,
    gotoPreviousStep,
    funnelData,
    setFunnelData,
    setCurrentStepIndex, // 이 함수를 제공하여 특정 단계로 직접 이동할 수 있도록 함
  };
}

export default useFunnel;
