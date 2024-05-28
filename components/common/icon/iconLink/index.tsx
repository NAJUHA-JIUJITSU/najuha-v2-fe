import styles from './index.module.scss';
import Link from 'next/link';
import IconAlarm from '@/public/svgs/alarm.svg';
import IconLogo from '@/public/svgs/logo.svg';
import IconSearch from '@/public/svgs/search.svg';
import IconThropy from '@/public/svgs/trophy.svg';
import IconSeminar from '@/public/svgs/seminar.svg';
import IconOpenmat from '@/public/svgs/openmat.svg';
import IconEvent from '@/public/svgs/event.svg';

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

function IconLinkThropy() {
  return (
    <div className={styles.programBtn}>
      <IconLink icon={<IconThropy />} redirectUrl={'/competition'} />
      <p className={styles.programBtnText}>대회</p>
    </div>
  );
}

function IconLinkSeminar() {
  return (
    <div className={styles.programBtn}>
      <IconLink icon={<IconSeminar />} redirectUrl={'/seminar'} />
      <p className={styles.programBtnText}>세미나</p>
    </div>
  );
}

function IconLinkOpenmat() {
  return (
    <div className={styles.programBtn}>
      <IconLink icon={<IconOpenmat />} redirectUrl={'/openmat'} />
      <p className={styles.programBtnText}>오픈매트</p>
    </div>
  );
}

function IconLinkEvent() {
  return (
    <div className={styles.programBtn}>
      <IconLink icon={<IconEvent />} redirectUrl={'/event'} />
      <p className={styles.programBtnText}>이벤트</p>
    </div>
  );
}

export {
  IconLink,
  IconLinkAlarm,
  IconLinkLogo,
  IconLinkSearch,
  IconLinkThropy,
  IconLinkSeminar,
  IconLinkOpenmat,
  IconLinkEvent,
};
