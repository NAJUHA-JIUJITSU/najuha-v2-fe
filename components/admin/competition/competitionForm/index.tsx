// 'use client';
// import styles from './index.module.scss';
// import Header from '@/components/common/header/Header';
// import { ButtonIcon } from '@/components/common/icon/iconOnClick';
// import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
// import { useFunnel } from '@/hooks/useFunnel';
// import CompetitionInfoForm from './competitionInfoForm';
// import CompetitionDetailForm from './competitionDetailForm';
// import CompetitionDivisionForm from './competitionDivisionForm';
// import CompetitionDiscountForm from './competitionDiscountForm';
// import CompetitionAdditionalInfoForm from './competitionAdditionalInfoForm';
// import { useState } from 'react';
// import { ICompetitionCreateDto } from 'najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';
// import { IDivisionPack } from 'najuha-v2-api/lib/modules/competitions/domain/interface/division-pack.interface';
// import { useCreateCompetition, useCreateDivision } from '@/hooks/admin';

// const steps = ['주요정보', '상세정보', '부문등록', '할인률', '추가정보'];

// interface ICompetitionFormProps {
//   // patch 인지 cretae인지 구별해주는 props
//   isCreate: boolean;
//   // patch일 경우 patch할 대회의 id
//   competitionId?: number;
//   // competition create or patch하는 함수
//   competitionFunction: (data: any) => void;
//   // division create or patch하는 함수
//   divisionFunction: (data: any) => void;
//   // required-additional-info create or patch하는 함수
//   requiredAdditionalInfoFunction: (data: any) => void;
// }

// export default function CompetitionForm() {
//   const { gotoNextStep, gotoPreviousStep, Funnel, Step, currentStep } = useFunnel(steps);
//   const [competitionInfo, setCompetitionInfo] = useState<ICompetitionCreateDto>({
//     title: '',
//     address: '',
//     competitionDate: '',
//     registrationStartDate: '',
//     registrationEndDate: '',
//     refundDeadlineDate: '',
//     soloRegistrationAdjustmentStartDate: '',
//     soloRegistrationAdjustmentEndDate: '',
//     registrationListOpenDate: '',
//     bracketOpenDate: '',
//     description: '',
//     isPartnership: false,
//   });
//   const [divisionPackInfo, setDivisionPackInfo] = useState<IDivisionPack[]>([]);
//   const [competitionId, setCompetitionId] = useState<string | null>(null);
//   const { mutate: createCompetition } = useCreateCompetition();
//   const { mutate: createDivision } = useCreateDivision();

//   return (
//     <div className={styles.wrapper}>
//       <Header
//         leftIcon={<ButtonIcon icon={<IconNavigateBefore />} onClick={gotoPreviousStep} />}
//         title={currentStep === '약관동의' ? '회원가입' : currentStep}
//       />
//       <Funnel>
//         <Step name="주요정보">
//           <CompetitionInfoForm
//             competitionInfo={competitionInfo}
//             setCompetitionInfo={setCompetitionInfo}
//             onNext={gotoNextStep}
//           />
//         </Step>
//         <Step name="상세정보">
//           <CompetitionDetailForm
//             competitionInfo={competitionInfo}
//             setCompetitionInfo={setCompetitionInfo}
//             onNext={gotoNextStep}
//             createCompetition={createCompetition}
//             setCompetitionId={setCompetitionId}
//           />
//         </Step>
//         <Step name="부문등록">
//           <CompetitionDivisionForm
//             divisionPackInfo={divisionPackInfo}
//             setDivisionPackInfo={setDivisionPackInfo}
//             competitionId={competitionId}
//             createDivision={createDivision}
//             onNext={gotoNextStep}
//           />
//         </Step>
//         <Step name="할인률">
//           <CompetitionDiscountForm onNext={gotoNextStep} competitionId={competitionId} />
//         </Step>
//         <Step name="추가정보">
//           <CompetitionAdditionalInfoForm onNext={gotoNextStep} competitionId={competitionId} />
//         </Step>
//       </Funnel>
//     </div>
//   );
// }

'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/common/header/Header';
import { ButtonIcon } from '@/components/common/icon/iconOnClick';
import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
import { useFunnel } from '@/hooks/useFunnel'; // 가정된 훅
import { ICompetitionCreateDto } from 'najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';
import CompetitionInfoForm from './competitionInfoForm';
import CompetitionDetailForm from './competitionDetailForm';
import styles from './index.module.scss';
import { Primitive } from '@nestia/fetcher';

interface CompetitionFormProps {
  competitionId?: string;
  initialData?: Primitive<ICompetitionCreateDto>;
  onCreate?: (competitionInfo: Primitive<ICompetitionCreateDto>) => void;
  onUpdate?: (competitionId: string, competitionInfo: ICompetitionCreateDto) => void;
}
const steps = ['주요정보', '상세정보'];
export default function CompetitionForm({
  competitionId,
  initialData,
  onCreate,
  onUpdate,
}: CompetitionFormProps) {
  const { gotoNextStep, gotoPreviousStep, Funnel, Step, currentStep } = useFunnel(steps);
  const [competitionInfo, setCompetitionInfo] = useState<Primitive<ICompetitionCreateDto>>({
    title: '',
    address: '',
    competitionDate: '',
    registrationStartDate: '',
    registrationEndDate: '',
    refundDeadlineDate: '',
    soloRegistrationAdjustmentStartDate: '',
    soloRegistrationAdjustmentEndDate: '',
    registrationListOpenDate: '',
    bracketOpenDate: '',
    description: '',
    isPartnership: false,
  });

  useEffect(() => {
    if (initialData) {
      setCompetitionInfo(initialData);
    }
  }, [initialData]);

  const handleSaveCompetition = () => {
    if (competitionId && onUpdate) {
      onUpdate(competitionId, competitionInfo);
    } else if (onCreate) {
      onCreate(competitionInfo);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={<ButtonIcon icon={<IconNavigateBefore />} onClick={gotoPreviousStep} />}
        title={currentStep === '약관동의' ? '회원가입' : currentStep}
      />
      <Funnel>
        <Step name="주요정보">
          <CompetitionInfoForm
            competitionInfo={competitionInfo}
            setCompetitionInfo={setCompetitionInfo}
            onNext={gotoNextStep}
          />
        </Step>
        <Step name="상세정보">
          <CompetitionDetailForm
            competitionInfo={competitionInfo}
            setCompetitionInfo={setCompetitionInfo}
            onSave={handleSaveCompetition}
          />
        </Step>
      </Funnel>
    </div>
  );
}
