'use client';
import CompetitionDiscountForm from '@/components/admin/competition/competitionForm/competitionDiscountForm';
import { useParams, useRouter } from 'next/navigation';
import styles from './index.module.scss';

export default function CreateDiscount() {
  const { competitionId } = useParams();
  const router = useRouter();

  if (typeof competitionId !== 'string') return null;
  return (
    <div className={styles.wrapper}>
      <CompetitionDiscountForm
        competitionId={competitionId}
        onNext={() => {
          router.push(`/admin/competition/${competitionId}`);
        }}
      />
    </div>
  );
}
