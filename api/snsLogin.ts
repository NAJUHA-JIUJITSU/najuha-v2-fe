// SNS 로그인 API 호출 함수
export async function snsLogin(snsAuthProvider: string, snsAuthCode: string) {
  const response = await fetch('http://localhost:3001/auth/snsLogin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ snsAuthProvider, snsAuthCode }),
  });
  if (!response.ok) throw new Error('SNS 로그인 API 호출 실패');
  return response.json();
}
