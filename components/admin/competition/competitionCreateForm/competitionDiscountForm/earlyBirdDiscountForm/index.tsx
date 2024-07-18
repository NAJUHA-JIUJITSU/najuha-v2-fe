import Input from '@/components/common/input';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { CreateEarlybirdDiscountSnapshotReqBody } from 'najuha-v2-api/lib/modules/competitions/presentation/competitions.controller.dto';

interface earlyBirdDiscount {
  earlybirdStartDate: string;
  earlybirdEndDate: string;
  discountAmount: number;
}

interface IEarlyBirdDiscountFormProps {
  onToggle: (enable: boolean) => void;
  discount: earlyBirdDiscount | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EarlyBirdDiscountForm({
  onToggle,
  discount,
  onChange,
}: IEarlyBirdDiscountFormProps) {
  return (
    <>
      <ButtonOnClick
        type="filled"
        size="xLarge"
        color="lightblue"
        width="full"
        text="얼리버드 할인 적용"
        onClick={() => onToggle(discount === null)}
      />
      {/* <InputDate label="시작 날짜" placeholder="시작 날짜" width="full" onChange={() => {}} /> */}
      {discount && (
        <div className={styles.btnList}>
          <Input
            type="datetime-local"
            label="시작 날짜"
            name="earlybirdStartDate"
            placeholder="시작 날짜"
            width="full"
            value={discount.earlybirdStartDate}
            onChange={onChange}
          />
          <Input
            type="datetime-local"
            label="종료 날짜"
            name="earlybirdEndDate"
            placeholder="종료 날짜"
            width="full"
            value={discount.earlybirdEndDate}
            onChange={onChange}
          />
          <Input
            label="할인 금액"
            name="discountAmount"
            placeholder="할인 금액"
            type="text"
            width="full"
            value={discount.discountAmount.toString()}
            onChange={onChange}
          />
        </div>
      )}
    </>
  );
}
