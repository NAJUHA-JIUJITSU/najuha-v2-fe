import styles from './index.module.scss';

interface Props {
  name: string;
}

export default function RegisterInfo({ name }: Props) {
  return (
    <div className={styles.info}>
      <h1>
        안녕하세요 <span>{name}</span>님!
        <br /> 회원가입을 진행해드릴게요
      </h1>
    </div>
  );
}
