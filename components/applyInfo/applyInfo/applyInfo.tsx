import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import PlayerInfo from '@/components/applyInfo/playerInfo/playerInfo';
import TeamInfo from '@/components/applyInfo/teamInfo/teamInfo';
import ParticipantInfo from '@/components/applyInfo/participantInfo/participantInfo';

export default function ApplyInfo({
  playerInfo,
  selectedDivision,
  onEditClick = () => {},
  onPaymentClick = () => {},
}: {
  playerInfo: any;
  selectedDivision: any;
  onEditClick?: () => void;
  onPaymentClick?: () => void;
}) {
  return (
    <>
      <div className={styles.wrapper}>
        <PlayerInfo name={playerInfo.name} phoneNumber={playerInfo.phoneNumber} />
        <TeamInfo
          network={playerInfo.network}
          team={playerInfo.team}
          masterName={playerInfo.masterName}
        />
        <ParticipantInfo
          name={playerInfo.name}
          gender={playerInfo.gender}
          birth={playerInfo.birth}
          belt={playerInfo.belt}
          divisions={selectedDivision}
        />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="수정하기"
          color="disabled"
          width="full"
          size="large"
          onClick={onEditClick}
        />
        <ButtonOnClick
          type="filled"
          text="결제하기"
          color="blue"
          width="full"
          size="large"
          onClick={onPaymentClick}
        />
      </div>
    </>
  );
}
