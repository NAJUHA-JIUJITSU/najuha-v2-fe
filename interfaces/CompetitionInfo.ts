export interface CompetitionInfo {
  id: number;
  title: string;
  address: string;
  date: Date;
  registrationStartDate: Date;
  registrationEndDate: Date;
  refundDeadlineDate: Date;
  soloRegistrationAdjustmentStartDate: Date;
  soloRegistrationAdjustmentEndDate: Date;
  price: number;
  viewCnt: number;
  posterImg: string;
  easyPayAvailable: boolean;
}
