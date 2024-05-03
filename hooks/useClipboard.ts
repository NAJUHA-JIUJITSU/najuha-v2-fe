import { useCallback } from 'react';

export const useClipboard = () => {
  const copyToClipboard = useCallback(async (copyText: string, alertText: string) => {
    // Clipboard API 사용 가능 여부 확인
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(copyText);
        alert(`${alertText}가 클립보드에 복사되었습니다.`);
      } catch (err) {
        console.error('Clipboard copy failed:', err);
        alert('클립보드에 복사하는 데 실패했습니다.');
      }
    } else {
      // navigator.clipboard API가 없는 경우의 대체 메커니즘
      // Clipboard API 사용 불가 시 textarea를 이용한 복사
      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      textarea.value = copyText;
      textarea.select();
      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (successful) {
          alert(`${alertText}가 클립보드에 복사되었습니다.`);
        } else {
          alert('클립보드에 복사하는 데 실패했습니다.');
        }
      } catch (err) {
        console.error('Clipboard copy failed:', err);
        document.body.removeChild(textarea);
        alert('클립보드에 복사하는 데 실패했습니다.');
      }
    }
  }, []);

  return copyToClipboard;
};
