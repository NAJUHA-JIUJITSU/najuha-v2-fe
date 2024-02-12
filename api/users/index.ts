/**
 * 2-3 get me.
 * - GuardLevel: USER
 */
const getUsersMe = async (accessToken: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NAJUHA_BE_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get user information');
    }

    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * 2-4 get user by nickname.
 * - GuardLevel: USER
 */

const getUserByNickname = async (nickname: string, accessToken: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NAJUHA_BE_URL}/users/${nickname}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get user information');
    }

    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { getUsersMe, getUserByNickname };
