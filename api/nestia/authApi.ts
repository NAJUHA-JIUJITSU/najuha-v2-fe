import { withAuth, createConnection } from '@/api/nestia/common';
import api from 'najuha-v2-api/lib/api';
import Cookies from 'js-cookie';
import { saveTokens, decodeToken } from '@/utils/tokenManagement';
import { IUser } from 'najuha-v2-api/lib/modules/users/domain/interface/user.interface';

// nestia sdk에서 사용하는 api
// 기존이랑 달라진점이 try catch로 감싸서 에러처리를 해줘야함.
// 기존에는 status확인하는 거 필요없이 성공처리만 하면되는데, 여기서는 타입추론을 위해 status확인이 필요함. status확인을 하게되면 return type이 달라지기 때문에 try catch로 감싸서 에러처리를 해줘야함.
// 타입추론도 되면서 성공처리만 할 수 있게 방법이 없을까? postRefreshToken리턴타입에 void를 넣어주면 될까?

export const postRefreshToken = async (): Promise<string> => {
  const refreshToken = Cookies.get('refreshToken');

  if (!refreshToken) {
    alert('로그인이 필요합니다.');
    window.location.href = '/login';
    return '';
  }

  const response = await api.functional.user.auth.token.refreshToken(createConnection(), {
    refreshToken: refreshToken,
  });

  const { accessToken, refreshToken: newRefreshToken } = response.result.authTokens;
  saveTokens(accessToken, newRefreshToken);
  return accessToken;
};

export const postSnsLogin = async (
  snsAuthProvider: IUser['snsAuthProvider'],
  snsAuthCode: string,
) => {
  const response = await withAuth((connection) =>
    api.functional.user.auth.sns_login.snsLogin(connection, {
      snsAuthProvider,
      snsAuthCode,
    }),
  );

  const { accessToken, refreshToken } = response.result.authTokens;
  saveTokens(accessToken, refreshToken);

  const payload = decodeToken(accessToken);
  return payload;
};

export const authApi = {
  postSnsLogin,
  postRefreshToken,
};
