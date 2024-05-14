export interface SelectedOptions {
  uniform: string;
  category: string;
  belt: string;
  weight: string;
}

export interface PlayerInfo {
  name: string;
  gender: string;
  birth: string;
  phoneNumber: string;
  belt: string;
}

export interface ExtraInfo {
  ssn: string;
  address: string;
}

export interface TeamInfo {
  network: string;
  team: string;
  master: string;
}

export interface ApplyInfo {
  playerInfo: PlayerInfo;
  extraInfo: ExtraInfo;
  teamInfo: TeamInfo;
  selectedDivision: SelectedOptions[];
  selectedDicisionId: string[];
}

export interface Division {
  id: string;
  category: string;
  uniform: string;
  gender: string;
  belt: string;
  weight: string;
  birthYearRangeStart: string;
  birthYearRangeEnd: string;
}
