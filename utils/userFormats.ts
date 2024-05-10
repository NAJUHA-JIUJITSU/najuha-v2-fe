// 년도/월/일 포맷
export function formatBirth(birth: string) {
  const year = birth.substring(0, 4);
  const month = birth.substring(4, 6);
  const day = birth.substring(6, 8);

  return `${year}/${month}/${day}`;
}

// 성별 포맷
export function formatGender(gender: string) {
  if (gender === 'FEMALE') return '여성';
  return '남성';
}

// 전화번호 포맷 (010-1234-5678)
export function formatPhoneNumber(phoneNumber: string) {
  const phone = phoneNumber.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
  return phone;
}
