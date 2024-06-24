import { RefObject, useEffect } from 'react';

function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: () => void,
  eventType: 'mousedown' | 'click' = 'click',
): void {
  // 외부 클릭시 handler 실행
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener(eventType, handleClickOutside);
    return () => {
      document.removeEventListener(eventType, handleClickOutside);
    };
  }, [ref, handler, eventType]);
}

export default useOutsideClick;
