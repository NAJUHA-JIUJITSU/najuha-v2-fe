import { cookies } from 'next/headers';
import { TokenResponse } from '@/api/utils/types';

const refreshTokens = async (): Promise<TokenResponse> => {
  try {
    const refreshToken = cookies().get('refreshToken');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Refresh token expired, redirecting to login page.');
      // In a real-world application, you might redirect the user to a login page.
      // window.location.href = '/login';
    }

    const data = await response.json();

    return {
      accessToken: data.data.accessToken,
      refreshToken: data.data.refreshToken,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default refreshTokens;
