import React, { FC } from 'react';
import styles from './index.module.scss';
import IconInfoCircle from '@/public/svgs/infoCircle.svg';

interface InfoMessageProps {
  title: string;
  listItems: string[];
}

const InfoMessage: FC<InfoMessageProps> = ({ title, listItems }) => {
  return (
    <div className={styles.infoMsg}>
      <div className={styles.infoTitle}>
        <IconInfoCircle />
        <h1>{title}</h1>
      </div>
      <ul>
        {listItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default InfoMessage;
