/**
 * 2-1 get temporary user info.
 * - GuardLevel: TEMPORARY_USER
 */
const getUsersMe = async (accessToken: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NAJUHA_BE_URL}/register/users/me`, {
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
 * 2-2 check duplicated nickname.
 * - GuardLevel: TEMPORARY_USER
 */
const getUserByNickname = async (nickname: string, accessToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NAJUHA_BE_URL}/register/users/${nickname}/is-duplicated`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

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

interface UpdateTemporaryUserDto {
  nickname?: null | string;
  belt?: null | string;
  gender?: null | string;
  birth?: null | string;
}
/**
 * 2-3 update temporary user info.
 * - GuardLevel: TEMPORARY_USER
 */
const patchTemporaryUser = async (accessToken: string, body: UpdateTemporaryUserDto) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NAJUHA_BE_URL}/register/users`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { getUsersMe, getUserByNickname, patchTemporaryUser };
