import { AxiosResponse } from 'axios';
import { IPagination } from 'src/components/@orbit/table';
import { ICandidate } from '../CandidateEntity';

export type ICandidateAPI = {
  getAllCandidate: (params: any) => Promise<AxiosResponse<object & IPagination>>;
  getCandidateById: (id: string) => Promise<AxiosResponse<ICandidate>>;
  createCandidate: (data: any) => Promise<AxiosResponse<ICandidate>>;
  editCandidate: (data: any) => Promise<AxiosResponse<ICandidate>>;
  deleteCandidate: (id: string | number) => Promise<any>;

  getAllCandidateTable: (params: any) => Promise<AxiosResponse<object & IPagination>>;
};
