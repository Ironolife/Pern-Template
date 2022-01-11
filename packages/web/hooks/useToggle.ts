import { useCallback, useState } from 'react';

export const useToggle = (initialState: boolean) => {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback(() => {
    setState((v) => !v);
  }, []);

  return [state, toggle] as const;
};
