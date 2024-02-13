import { useEffect, useState } from 'react';

export enum ValidState {
  EMPTY,
  VALID,
}

const validateBelts = (belt: string | null): ValidState => {
  if (!belt) return ValidState.EMPTY;
  return ValidState.VALID;
};

export const useBeltSelection = (initialBelt: string | null) => {
  const [belt, setBelt] = useState<string | null>(initialBelt);
  const [validState, setValidState] = useState<ValidState>(ValidState.EMPTY);

  useEffect(() => {
    handelUpdateBelt(belt);
  }, [belt]);

  const handelUpdateBelt = (belt: string | null) => {
    const newValidState = validateBelts(belt);
    setValidState(newValidState);
    setBelt(belt);
  };

  return { belt, setBelt, validState };
};
