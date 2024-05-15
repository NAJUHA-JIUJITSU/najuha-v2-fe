import styles from './index.module.scss';
import { PlayerInfo } from '@/interfaces/competitionApply';

export const PlayerInfoDisplay = ({ playerInfo }: { playerInfo: PlayerInfo }) => (
  <div className={styles.playerInfoList}>
    <div>{playerInfo.name}</div>
    <div>{playerInfo.gender}</div>
    <div>{playerInfo.birth}</div>
    <div>{playerInfo.belt}</div>
  </div>
);
