import { useState, useCallback } from 'react';

interface CheckboxState {
  [key: string]: boolean;
}

function useCheckboxState(initialState: CheckboxState) {
  const [state, setState] = useState<CheckboxState>(initialState);

  // const toggleState = useCallback((key: string) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     [key]: !prevState[key],
  //   }));
  // }, []);

  // const toggleState = useCallback((key: string) => {
  //   return () =>
  //     setState((prevState) => ({
  //       ...prevState,
  //       [key]: !prevState[key],
  //     }));
  // }, []);

  const toggleState = (key: string) => {
    return useCallback(
      () =>
        setState((prevState) => ({
          ...prevState,
          [key]: !prevState[key],
        })),
      [],
    );
  };

  // 함수형업데이트를 안쓰고 그냥 업데이트를 하면

  // const toggleState = (key: string) => {
  //   return useCallback(() => {
  //     const newValue = !state[key];
  //     setState({
  //       ...state,
  //       [key]: newValue,
  //     });
  //   }, [state]);
  // };

  return [state, toggleState] as const;
}

export default useCheckboxState;
