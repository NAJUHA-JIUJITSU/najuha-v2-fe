import styles from './index.module.scss';
import { useState } from 'react';

interface CompetitionMarkdownProps {
  description?: {
    title: string;
    img?: string;
    content: string;
  }[];
}

export default function CompetitionDescriptionContent(props: CompetitionMarkdownProps) {
  //description undefined일때 처리
  if (!props.description) {
    return <div>정보가 없습니다.</div>;
  }

  // const [content, setContent] = useState('');

  // const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setContent(e.target.value);
  // };

  // console.log('백엔드 전달 데이터: ', JSON.stringify({ content }));

  return (
    <div className={styles.wrapper}>
      {/* <textarea
        placeholder="- 자세한 정보를 입력해주세요 "
        value={content}
        onChange={handleInputChange}
      ></textarea> */}
      {props.description.map((item, index) => (
        <div key={index} className={styles.content}>
          <h1>{item.title}</h1>
          {item.img && <img src={item.img} alt={item.title} />}
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
