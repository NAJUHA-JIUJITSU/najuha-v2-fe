import Link from 'next/link';

export default function Admin() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          gap: '30px',
        }}
      >
        <Link
          href={'/admin/user'}
          style={{
            fontSize: '20px',
            lineHeight: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            height: '40px',
            backgroundColor: 'gray',
          }}
        >
          회원
        </Link>
        <Link
          href={'/admin/competition'}
          style={{
            fontSize: '20px',
            lineHeight: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            height: '40px',
            backgroundColor: 'gray',
          }}
        >
          대회
        </Link>
        <Link
          href={'/admin/competition'}
          style={{
            fontSize: '20px',
            lineHeight: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            height: '40px',
            backgroundColor: 'gray',
          }}
        >
          세미나
        </Link>
        <Link
          href={'/admin/competition'}
          style={{
            fontSize: '20px',
            lineHeight: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            height: '40px',
            backgroundColor: 'gray',
          }}
        >
          오픈매트
        </Link>
        <Link
          href={'/admin/competition'}
          style={{
            fontSize: '20px',
            lineHeight: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            height: '40px',
            backgroundColor: 'gray',
          }}
        >
          게시판
        </Link>
        <Link
          href={'/admin/competition'}
          style={{
            fontSize: '20px',
            lineHeight: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            height: '40px',
            backgroundColor: 'gray',
          }}
        >
          배너
        </Link>
        <Link
          href={'/admin/competition'}
          style={{
            fontSize: '20px',
            lineHeight: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            height: '40px',
            backgroundColor: 'gray',
          }}
        >
          통계
        </Link>
      </div>
    </>
  );
}
