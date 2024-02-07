import { FetchOptions, TokenResponse } from './types';
import refreshTokens from '@/api/auth/refresh';
import { cookies } from 'next/headers';

async function fetchWithTokenRetry(
  url: string,
  options: FetchOptions,
  retries = 1,
): Promise<Response> {
  try {
    const existAccessToken = cookies().get('accessToken');
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${existAccessToken}`,
      },
    });

    if (response.status === 401 && retries > 0) {
      console.log('Access token expired, attempting to refresh');
      const tokens: TokenResponse = await refreshTokens();
      if (tokens.accessToken && tokens.refreshToken) {
        console.log('Access and refresh tokens successfully refreshed');
        cookies().set('accessToken', tokens.accessToken, { path: '/' });
        cookies().set('refreshToken', tokens.refreshToken, { path: '/' });
        return fetchWithTokenRetry(url, options, retries - 1);
      } else {
        throw new Error('Unable to refresh access token');
      }
    }

    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default fetchWithTokenRetry;
