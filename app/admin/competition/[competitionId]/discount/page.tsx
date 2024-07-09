'use client';
import CompetitionDiscountForm from '@/components/admin/competition/competitionForm/competitionDiscountForm';
import Header from '@/components/common/header/Header';
import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
import { ButtonIcon } from '@/components/common/icon/iconOnClick';
import { useParams, useRouter } from 'next/navigation';
import styles from './index.module.scss';

export default function CreateDiscount() {
  const { competitionId } = useParams();
  const router = useRouter();

  if (typeof competitionId !== 'string') return null;
  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={
          <ButtonIcon
            icon={<IconNavigateBefore />}
            onClick={() => {
              router.push(`/admin/competition/${competitionId}`);
            }}
          />
        }
        title="할인률추가"
      />
      <CompetitionDiscountForm
        competitionId={competitionId}
        onNext={() => {
          router.push(`/admin/competition/${competitionId}`);
        }}
      />
    </div>
  );
}
