import styles from './index.module.scss';
import ButtonLink from '@/components/common/button/buttonLink';
import IconNavigateNext from '@/public/svgs/navigateNext.svg';

//todo: 필수로 보여줘야 하는 규정 찾아서 적용하기
const rules = [
  {
    id: 1,
    content:
      '아래는 이 게시판에 해당하는 핵심 내용에 대한 요약 사항이며, 게시물 작성 전 게시판 이용규칙 전문을 반드시 확인하시기 바랍니다.',
  },
  { id: 2, content: '명예훼손, 광고/홍보 목적의 글은 올리실 수 없어요.' },
  {
    id: 3,
    content: '이용규칙 위반 시 게시물이 삭제되고 서비스 이용이 일정기간 제한될 수 있습니다. ',
  },
];

export default function CommnuityRules() {
  return (
    <div className={styles.wrapper}>
      <ButtonLink
        type="text"
        size="small"
        color="gray"
        text="게시판 이용규칙 전문 보기"
        iconRight={<IconNavigateNext />}
        href="/communityRules"
      />
      <div className={styles.rulesWrapper}>
        {rules.map((rule) => (
          <div key={rule.id} className={styles.rule}>
            {rule.content}
          </div>
        ))}
      </div>
    </div>
  );
}
