import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import Input from '@/components/common/input';
import { useInput } from '@/hooks/useInput';
import { validateSsnFront, validateSsnBack } from '@/utils/validations/userValidations';

export default function ExtraInfoPage({
  extraInfo,
  onNext,
  setExtraInfo,
}: {
  extraInfo: any;
  onNext: () => void;
  setExtraInfo: (extraInfo: any) => void;
}) {
  const {
    value: ssnFront,
    setValue: setSsnFront,
    errMsg: ssnFrontErrMsg,
    validate: ssnFrontValidate,
  } = useInput(extraInfo.ssn.slice(0, 6), validateSsnFront);
  const {
    value: ssnBack,
    setValue: setSsnBack,
    errMsg: ssnBackErrMsg,
    validate: ssnBackValidate,
  } = useInput(extraInfo.ssn.slice(6, 13), validateSsnBack);
  const {
    value: address,
    setValue: setAddress,
    errMsg: addressErrMsg,
    validate: addressValidate,
  } = useInput(extraInfo.address, () => true);

  const validation = ssnBackValidate && ssnFrontValidate && addressValidate;

  const handleNext = () => {
    setExtraInfo({
      ...extraInfo,
      ssn: ssnFront + ssnBack,
      address,
    });
    onNext();
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.ssnWrapper}>
          <Input
            label="주민등록번호"
            placeholder="주민등록번호"
            value={ssnFront}
            onChange={(e) => setSsnFront(e.target.value)}
            autoFocus={true}
            errMsg={ssnFrontErrMsg}
            width="full"
          />
          <div className={styles.hyphen}></div>
          <Input
            label="뒷자리"
            placeholder="******"
            value={ssnBack}
            onChange={(e) => setSsnBack(e.target.value)}
            errMsg={ssnBackErrMsg}
            width="full"
            type="password"
          />
        </div>

        <Input
          label="주소"
          placeholder="주소입력"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color={validation ? 'blue' : 'disabled'}
          disabled={!validation}
          width="full"
          size="large"
          onClick={handleNext}
        />
      </div>
    </>
  );
}
