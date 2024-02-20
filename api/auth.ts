// SNS 로그인 API 호출 함수
export async function postSnsLogin(snsAuthProvider: string, snsAuthCode: string) {
  try {
    const response = await fetch('http://localhost:3001/auth/sns-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ snsAuthProvider, snsAuthCode }),
    });
    return response.json();
  } catch (error) {
    throw new Error('SNS 로그인 API 호출 실패');
  }
}
