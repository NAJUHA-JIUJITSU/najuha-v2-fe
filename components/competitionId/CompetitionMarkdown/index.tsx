import styles from './index.module.scss';

interface CompetitionMarkdownProps {
  description: string;
}

export default function CompetitionMarkdown(props: CompetitionMarkdownProps) {
  return (
    <div className={styles.wrapper}>
      <div>{props.description}</div>
    </div>
  );
}
