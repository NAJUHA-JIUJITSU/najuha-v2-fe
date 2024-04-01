export interface CompetitionInfo {
  earlybirdDiscountSnapshots: {
    id: number;
    createdAt: string;
    earlybirdStartDate: string;
    earlybirdEndDate: string;
    discountAmount: number;
    competitionId: number;
  }[];
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  address: string;
  competitionDate: string;
  registrationStartDate: string;
  registrationEndDate: string;
  refundDeadlineDate: string;
  soloRegistrationAdjustmentStartDate: string;
  soloRegistrationAdjustmentEndDate: string;
  registrationListOpenDate: string;
  bracketOpenDate: string;
  description: string;
  isPartnership: boolean;
  viewCount: number;
  posterImgUrlKey: string;
}
