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

  return [state, toggleState] as const;
}

export default useCheckboxState;
