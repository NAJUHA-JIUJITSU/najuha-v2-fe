// userId로 사용자 정보를 가져오는 API
export async function getUser(accessToken: string) {
  try {
    const response = await fetch('http://localhost:3001/register/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`, // "Bearer" 스키마를 사용하여 액세스 토큰 포함
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('response: ', responseData);
    return responseData;
    // return response;
  } catch (error) {
    console.log('error', error);
    throw new Error('SNS 로그인 API 호출 실패');
  }
}

// 닉네임 중복검사 API 호출 함수, 중복이면 true, 중복이 아니면 false 반환
export async function getCheckNicknameDuplication(nickname: string, accessToken: string) {
  try {
    const response = await fetch(`http://localhost:3001/register/users/${nickname}/is-duplicated`, {
      method: 'Get',
      headers: {
        Authorization: `Bearer ${accessToken}`, // "Bearer" 스키마를 사용하여 액세스 토큰 포함
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('닉네임 중복검사 결과: ', responseData);
    return responseData;
  } catch (error) {
    console.log('error', error);
    throw new Error('닉네임 중복검사 API 호출 실패');
  }
}

// 회원가입 API 호출 함수
export async function patchRegister(funnelData: any, accessToken: string) {
  try {
    const response = await fetch('http://localhost:3001/register', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(funnelData),
    });
    return response.json();
  } catch (error) {
    throw new Error('회원가입 API 호출 실패');
  }
}
