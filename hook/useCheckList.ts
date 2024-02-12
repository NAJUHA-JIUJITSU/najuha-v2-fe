import { useEffect, useState } from 'react';

export interface CheckItem {
  checked: boolean;
  mandatory: boolean;
}

export interface CheckList {
  [key: string]: CheckItem;
}

export function useCheckList(initialCheckList: CheckList) {
  const [checkList, setCheckList] = useState<CheckList>(initialCheckList);
  const [isAllMandatoryChecked, setIsAllisAllMandatoryChecked] = useState(false);

  useEffect(() => {
    const updateIsAllMandatoryChecked = () => {
      const items = Object.values(checkList);
      setIsAllisAllMandatoryChecked(
        items.filter((item) => item.mandatory).every((item) => item.checked),
      );
    };
    updateIsAllMandatoryChecked();
  }, [checkList]);

  const toggleCheckItem = (itemName: string) => {
    setCheckList((prevCheckList) => {
      const item = prevCheckList[itemName];
      if (!item) return prevCheckList;

      const updatedCheckList = {
        ...prevCheckList,
        [itemName]: { ...item, checked: !item.checked },
      };
      return updatedCheckList;
    });
  };

  const toggleAllCheckItems = (checked: boolean) => {
    setCheckList((prevCheckList) => {
      const updatedCheckList = Object.keys(prevCheckList).reduce((acc, key) => {
        acc[key] = { ...prevCheckList[key], checked };
        return acc;
      }, {} as CheckList);
      return updatedCheckList;
    });
  };

  const toggleHandler = (key: string) => {
    const allState = checkList['all']?.checked;
    if (key === 'all') {
      toggleAllCheckItems(!allState);
    } else {
      if (allState) toggleCheckItem('all');
      toggleCheckItem(key);
    }
  };

  return { checkList, isAllMandatoryChecked, toggleHandler };
}

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
