import React from 'react';
import styles from './index.module.scss';
import CheckBoxLabel from '@/components/common/checkBoxLabel';
import { IconLink } from '@/components/common/icon/iconLink';
import IconNavigateNext from '@/public/svgs/navigateNext.svg';
import { useCheckList } from '@/hook/useCheckList';
import { CheckList } from '@/recoil/checkListAtomFamily';
import ButtonOnClick from '@/components/common/button/buttonOnClick';

interface Props {
  onNext: () => void;
}

const checkListConfig = [
  {
    name: 'all',
    msg: '약관 전체동의',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/all'} />,
  },
  {
    name: 'use',
    msg: '이용약관 동의(필수)',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/use'} />,
  },
  {
    name: 'privacy',
    msg: '개인정보 수집 및 이용동의(필수)',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/privacy'} />,
  },
  {
    name: 'refund',
    msg: '환불규정 동의(필수)',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/refund'} />,
  },
  {
    name: 'ad',
    msg: '광고 및 마케팅 알림 수신 동의(선택)',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/ad'} />,
  },
];

const initialCheckList: CheckList = {
  id: 'requirements',
  isAllMandatoryChecked: false,
  items: [
    { name: 'all', checked: false, mandatory: false },
    { name: 'use', checked: false, mandatory: true },
    { name: 'privacy', checked: false, mandatory: true },
    { name: 'refund', checked: false, mandatory: true },
    { name: 'ad', checked: false, mandatory: false },
  ],
};

export default function RegisterForm({ onNext }: Props) {
  const { checkList, toggleCheckItem, toggleAllCheckItems, findCheckItem } =
    useCheckList(initialCheckList);

  const toggleHandler = (key: string) => {
    const allState = findCheckItem('all')?.checked;
    if (key === 'all') {
      return toggleAllCheckItems(!allState);
    } else {
      if (allState) toggleCheckItem('all');
      toggleCheckItem(key);
    }
  };

  // CheckBoxLabel 재랜더링 방지
  // const toggleHandler = (key: string) => {
  //   const allState = findCheckItem('all')?.checked;
  //   let runner = () => {};
  //   if (key === 'all') {
  //     runner = () => toggleAllCheckItems(!allState);
  //   } else {
  //     runner = () => {
  //       if (allState) toggleCheckItem('all');
  //       toggleCheckItem(key);
  //     };
  //   }
  //   return useCallback(runner, [allState]);
  // };

  return (
    <div className={styles.form}>
      {checkListConfig.map((configItem) => (
        <CheckBoxLabel
          key={configItem.name}
          msg={configItem.msg}
          isUnderlined={configItem.name === 'all'}
          rightIcon={configItem.name !== 'all' ? configItem.link : null}
          changeCheck={() => {
            toggleHandler(configItem.name);
          }}
          isChecked={findCheckItem(configItem.name)?.checked}
        />
      ))}
      {!checkList.isAllMandatoryChecked && (
        <div className={styles.submit}>
          <ButtonOnClick
            type="filled"
            text="약관전체 동의"
            color="blue"
            width="full"
            size="large"
            onClick={() => toggleAllCheckItems(true)}
          />
        </div>
      )}
      {checkList.isAllMandatoryChecked && (
        <div className={styles.submit}>
          <ButtonOnClick
            type="filled"
            text="다음"
            color="blue"
            width="full"
            size="large"
            onClick={onNext}
          />
        </div>
      )}
    </div>
  );
}

// import React from 'react';
// import styles from './index.module.scss';
// import CheckBoxLabel from '@/components/common/checkBoxLabel';
// import { IconLink } from '@/components/common/icon/iconLink';
// import IconNavigateNext from '@/public/svgs/navigateNext.svg';
// import { useRecoilState } from 'recoil';
// import { Requirements, registerRequirementAtom } from '@/recoil/registerRequirementAtom';

// const checkListConfig = [
//   {
//     name: 'all',
//     msg: '약관 전체동의',
//     link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/all'} />,
//   },
//   {
//     name: 'use',
//     msg: '이용약관 동의(필수)',
//     link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/use'} />,
//   },
//   {
//     name: 'privacy',
//     msg: '개인정보 수집 및 이용동의(필수)',
//     link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/privacy'} />,
//   },
//   {
//     name: 'refund',
//     msg: '환불규정 동의(필수)',
//     link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/refund'} />,
//   },
//   {
//     name: 'ad',
//     msg: '광고 및 마케팅 알림 수신 동의(선택)',
//     link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/ad'} />,
//   },
// ];

// export default function RegisterForm() {
//   const [requirements, setRequirements] = useRecoilState(registerRequirementAtom);

//   const toggleState = (key: string) => {
//     setRequirements((prev: Requirements) => ({ ...prev, [key]: !prev[key] }));
//   };

//   const toggleAllState = () => {
//     setRequirements((prev: Requirements) => {
//       const allState = !prev.all;
//       const newRequirements = checkListConfig.reduce((acc, cur) => {
//         acc[cur.name] = allState;
//         return acc;
//       }, {} as Requirements);
//       return { ...newRequirements };
//     });
//   };

//   const toggelHandler = (key: string) => {
//     if (key === 'all') {
//       toggleAllState();
//     } else {
//       toggleState(key);
//     }
//   };

//   return (
//     <div className={styles.form}>
//       {checkListConfig.map((item) => (
//         <CheckBoxLabel
//           key={item.name}
//           msg={item.msg}
//           isUnderlined={item.name === 'all'}
//           rightIcon={item.name !== 'all' ? item.link : null}
//           changeCheck={() => toggelHandler(item.name)}
//           isChecked={requirements[item.name]}
//         />
//       ))}
//     </div>
//   );
// }
