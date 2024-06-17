import {
  AddressInfo,
  SocialScurityNumberInfo,
} from 'najuha-v2-api/lib/modules/applications/domain/interface/additional-info.interface';
import { IPlayerSnapshot } from 'najuha-v2-api/lib/modules/applications/domain/interface/player-snapshot.interface';
import { IDivision } from 'najuha-v2-api/lib/modules/competitions/domain/interface/division.interface';

// export type SelectedOptions = Pick<IDivision, 'uniform' | 'category' | 'belt' | 'weight'>;
export type SelectedOptions = {
  uniform: IDivision['uniform'] | '';
  category: IDivision['category'];
  belt: IDivision['belt'];
  weight: IDivision['weight'];
};

export interface PlayerInfo {
  name: IPlayerSnapshot['name'];
  gender: IPlayerSnapshot['gender'];
  birth: IPlayerSnapshot['birth'];
  phoneNumber: IPlayerSnapshot['phoneNumber'];
  belt: IPlayerSnapshot['belt'];
}

export interface ExtraInfo {
  ssn: SocialScurityNumberInfo['value'];
  address: AddressInfo['value'];
}

export interface TeamInfo {
  network: IPlayerSnapshot['network'];
  team: IPlayerSnapshot['team'];
  masterName: IPlayerSnapshot['masterName'];
}

export interface ApplyInfo {
  playerInfo: PlayerInfo;
  extraInfo: ExtraInfo;
  teamInfo: TeamInfo;
  selectedDivision: SelectedOptions[];
  selectedDicisionId: IDivision['id'][];
}
