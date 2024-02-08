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

export { getUsersMe };
