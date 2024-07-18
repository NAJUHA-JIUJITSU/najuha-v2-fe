import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import PlayerInfo from '@/components/competitionParticipantInfo/playerInfo';
import TeamInfo from '@/components/competitionParticipantInfo/teamInfo';
import DivisionInfo from '@/components/competitionParticipantInfo/divisionInfo';
import { IPlayerSnapshot } from 'najuha-v2-api/lib/modules/applications/domain/interface/player-snapshot.interface';
import { SelectedOptions } from '@/interfaces/competitionApply';
import { IApplication } from 'najuha-v2-api/lib/modules/applications/domain/interface/application.interface';

// make interface
export interface CompetitionParticipantInfoProps {
  playerInfo: IPlayerSnapshot;
  selectedDivision: SelectedOptions[];
  expectedPayment: IApplication['expectedPayment'];
  onEditClick?: () => void;
  onPaymentClick?: () => void;
}

export default function CompetitionParticipantInfo({
  playerInfo,
  selectedDivision,
  onEditClick = () => {},
  onPaymentClick = () => {},
  expectedPayment,
}: CompetitionParticipantInfoProps) {
  return (
    <>
      <div className={styles.wrapper}>
        <PlayerInfo name={playerInfo.name} phoneNumber={playerInfo.phoneNumber} />
        <TeamInfo
          network={playerInfo.network}
          team={playerInfo.team}
          masterName={playerInfo.masterName}
        />
        <DivisionInfo
          name={playerInfo.name}
          gender={playerInfo.gender}
          birth={playerInfo.birth}
          belt={playerInfo.belt}
          expectedPayment={expectedPayment}
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
