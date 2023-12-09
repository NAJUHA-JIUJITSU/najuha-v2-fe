import styles from './index.module.scss';
import Link from 'next/link';
import IconAlarm from '../../../public/svgs/alarm.svg';
import IconLogo from '../../../public/svgs/logo.svg';
import IconSearch from '../../../public/svgs/search.svg';

interface Props {
  icon: React.ReactNode;
  redirectUrl: string;
}
// 링크아이콘 베이스 컴포넌트 (재사용성을 위해)
function LinkIcon({ icon, redirectUrl }: Props) {
  return <Link href={redirectUrl}>{icon}</Link>;
}

function LinkIconAlarm() {
  return <LinkIcon icon={<IconAlarm />} redirectUrl={'/alarm'} />;
}

function LinkIconLogo() {
  return <LinkIcon icon={<IconLogo />} redirectUrl={'/home'} />;
}

function LinkIconSearch() {
  return <LinkIcon icon={<IconSearch />} redirectUrl={'/search'} />;
}

export { LinkIconAlarm, LinkIconLogo, LinkIconSearch };
