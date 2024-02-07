import { TokenResponse } from '@/api/utils/types';

const snsLogin = async (snsAuthCode: string, snsAuthProvider: string): Promise<TokenResponse> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_NAJUHA_BE_ENDPOINT}/auth/snsLogin`, {
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

export default snsLogin;
