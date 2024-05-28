'use client';

import { useEffect } from 'react';
import api from 'najuha-v2-api/lib/api';

async function findCompetitions() {
  const ret = await api.functional.user.competitions.findCompetitions(
    {
      host: 'http://localhost:3001',
    },
    {
      page: 0,
    },
  );
  console.log('nestia findCompetitions ret', ret);
  return ret;
}

async function getCompetition() {
  const ret = await api.functional.user.competitions.getCompetition(
    {
      host: 'http://localhost:3001',
    },
    '018fba99-54e0-7402-bf55-d647e66ebe2d',
  );
  if (ret.status === 200) {
    if (!ret.data.result) return;
    // result type 추론 가능 !!!!!!
    ret.data.result.competition.address = '서울시 강남구';
    // ret.data.result.competition.address = 123123; //type error
  } else {
  }
  console.log('nestia getCompetition ret', ret);
  return ret;
}

async function snsLogin() {
  const ret = await api.functional.user.auth.sns_login.snsLogin(
    {
      host: 'http://localhost:3001',
    },
    {
      snsAuthProvider: 'KAKAO',
      snsAuthCode: 'test-auth-code',
    },
  );

  if (ret.status === 201) {
    console.log('nestia snsLogin ret', ret);
  } else {
    // error code, data 추론 가능 !!!!!!!!!!!!
    if (ret.data.code === 2000) console.log('nestia snsLogin ret data', ret.data);
    else if (ret.data.code === 2001) console.log('nestia snsLogin ret data', ret.data);
    else if (ret.data.code === 2002) console.log('nestia snsLogin ret data', ret.data);
    else if (ret.data.code === 2003) console.log('nestia snsLogin ret data', ret.data);
  }
  return ret;
}

export default function NestiaSdkTest() {
  useEffect(() => {
    findCompetitions();
    getCompetition();
    snsLogin();
  }, []);

  return (
    <div>
      <h1>Nestia SDK Test</h1>
    </div>
  );
}
