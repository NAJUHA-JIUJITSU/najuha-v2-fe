import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { CheckItem, CheckList, checkListAtomFamily } from '@/recoil/checkListAtomFamily';

/**
 * checkListAtomFamily를 사용하여 checkList를 생성하고 관리하는 커스텀 훅.
 * 범용적으로 사용할 수 있는 메서드들을 제공한다.
 * TODO: 리렌더링 최적화
 *
 * @param initialCheckList 초기 checkList
 * @returns checkList와 관련된 메서드들
 */
export function useCheckList(initialCheckList: CheckList) {
  const [checkList, setCheckList] = useRecoilState(checkListAtomFamily(initialCheckList.id));

  // 기존에 저장된 checkList가 없다면 초기 checkList를 설정한다.
  useEffect(() => {
    if (!checkList.items.length) {
      setCheckList(initialCheckList);
    }
  });

  const updateIsAllMandatoryChecked = (items: CheckItem[]): boolean => {
    return items.filter((item) => item.mandatory).every((item) => item.checked);
  };

  const toggleCheckItem = (itemName: string) => {
    setCheckList((prevCheckList) => {
      const updatedItems = prevCheckList.items.map((item) =>
        item.name === itemName ? { ...item, checked: !item.checked } : item,
      );
      const isAllMandatoryChecked = updateIsAllMandatoryChecked(updatedItems);
      return {
        ...prevCheckList,
        items: updatedItems,
        isAllMandatoryChecked,
      };
    });
  };

  const toggleAllCheckItems = (checked: boolean) => {
    setCheckList((prevCheckList) => {
      const updatedItems = prevCheckList.items.map((item) => ({ ...item, checked }));
      const isAllMandatoryChecked = updateIsAllMandatoryChecked(updatedItems);
      return {
        ...prevCheckList,
        items: updatedItems,
        isAllMandatoryChecked,
      };
    });
  };

  const findCheckItem = (itemName: string) => {
    return checkList.items.find((item) => item.name === itemName);
  };

  return { checkList, toggleCheckItem, toggleAllCheckItems, findCheckItem };
}
