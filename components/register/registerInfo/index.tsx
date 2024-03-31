'use client';
import styles from './index.module.scss';
import { useRecoilState } from 'recoil';
import { nameState } from '@/recoil/atoms/registerState';

export default function registerInfo() {
  const [name, setName] = useRecoilState(nameState);

  return (
    <div className={styles.info}>
      <h1>
        안녕하세요 <span>{name}</span>님!
        <br /> 회원가입을 진행해드릴게요
      </h1>
    </div>
  );
}
