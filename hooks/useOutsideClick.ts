import { RefObject, useEffect } from 'react';

function useOutsideClick<T extends HTMLElement>(ref: RefObject<T>, handler: () => void): void {
  // 외부 클릭시 handler 실행
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, handler]);
}

export default useOutsideClick;
