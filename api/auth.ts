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

//refreshToken을 사용하여 accessToken과 refreshToken 재발급 API 호출 함수
export async function postRefreshToken(refreshToken: string) {
  try {
    const response = await fetch('http://localhost:3001/auth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    return response.json();
  } catch (error) {
    throw new Error('accessToken과 refreshToken 재발급 API 호출 실패');
  }
}
