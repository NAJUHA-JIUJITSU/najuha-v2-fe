import styles from './index.module.scss';
import Link from 'next/link';
import IconAlarm from '@/public/svgs/alarm.svg';
import IconLogo from '@/public/svgs/logo.svg';
import IconSearch from '@/public/svgs/search.svg';

interface Props {
  icon: React.ReactNode;
  redirectUrl: string;
}
// 링크아이콘 베이스 컴포넌트 (재사용성을 위해)
function IconLink({ icon, redirectUrl }: Props) {
  return <Link href={redirectUrl}>{icon}</Link>;
}

function IconLinkAlarm() {
  return <IconLink icon={<IconAlarm />} redirectUrl={'/alarm'} />;
}

function IconLinkLogo() {
  return <IconLink icon={<IconLogo />} redirectUrl={'/home'} />;
}

function IconLinkSearch() {
  return <IconLink icon={<IconSearch />} redirectUrl={'/search'} />;
}

export { IconLink, IconLinkAlarm, IconLinkLogo, IconLinkSearch };
