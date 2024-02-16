import { TokenResponse } from '@/api/utils/types';

// const refreshTokens = async (): Promise<TokenResponse> => {
//   try {
//     // const refreshToken = cookies().get('refresh-token');
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/token`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ refreshToken }),
//     });

//     if (!response.ok) {
//       throw new Error('Refresh token expired, redirecting to login page.');
//       // In a real-world application, you might redirect the user to a login page.
//       // window.location.href = '/login';
//     }

//     const data = await response.json();

//     return {
//       accessToken: data.data.accessToken,
//       refreshToken: data.data.refreshToken,
//     };
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

const postSnsLogin = async (
  snsAuthCode: string,
  snsAuthProvider: string,
): Promise<TokenResponse> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_NAJUHA_BE_URL}/auth/sns-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        snsAuthProvider: snsAuthProvider,
        snsAuthCode: snsAuthCode,
      }),
    });

    if (!res.ok) {
      throw new Error('SNS login failed');
    }
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { postSnsLogin };
