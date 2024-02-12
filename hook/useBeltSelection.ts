import { useState, useEffect } from 'react';

export enum ValidState {
  EMPTY,
  VALID,
}

export const useBeltSelection = (initialBelt: string | null) => {
  const [belt, setBelt] = useState<string | null>(initialBelt);
  const [validState, setValidState] = useState<ValidState>(ValidState.EMPTY);

  const validateBelts = (belt: string | null): ValidState => {
    if (!belt) return ValidState.EMPTY;
    return ValidState.VALID;
  };

  useEffect(() => {
    const validState = validateBelts(belt);
    setValidState(validState);
  }, [belt]);

  return { belt, setBelt, validState };
};
