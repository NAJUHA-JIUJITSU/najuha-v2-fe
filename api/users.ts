// userId로 사용자 정보를 가져오는 API
export async function getUser(accessToken: string) {
  try {
    const response = await fetch('http://localhost:3001/users/me', {
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

// export async function fetchUserById(userId: string): Promise<any> {
//   try {
//     const response = await fetch(`http://localhost:3001/users/${userId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error fetching user: ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Fetching user failed', error);
//     throw error;
//   }
// }
