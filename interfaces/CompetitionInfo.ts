import { Division } from '@/interfaces/competitionApply';

export interface Competition {
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
  divisions: Division[];
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

export interface ApiCompetitionsResponse {
  data: {
    code: number;
    isSuccess: boolean;
    result: {
      competitions: Competition[];
    };
  };
}

export interface ApiInfiniteCompetitionsResponse {
  data: {
    code: number;
    isSuccess: boolean;
    result: {
      competitions: Competition[];
      nextPage: number | null;
    };
  };
}

export interface ApiCompetitionIdResponse {
  data: {
    code: number;
    isSuccess: boolean;
    result: {
      competition: Competition;
    };
  };
}
