import { AxiosResponse } from 'axios';
import { IPagination } from 'src/components/@orbit/table';
import { ICandidatePaper } from '../CandidatePaperEntity';

export type ICandidatePaperAPI = {
  getAllCandidatePaper: (params: any) => Promise<AxiosResponse<object & IPagination>>;
  getCandidatePaperById: (id: string) => Promise<AxiosResponse<ICandidatePaper>>;
  createCandidatePaper: (data: any) => Promise<AxiosResponse<ICandidatePaper>>;
  editCandidatePaper: (data: any) => Promise<AxiosResponse<ICandidatePaper>>;
  deleteCandidatePaper: (id: string | number) => Promise<any>;

  getAllCandidatePaperTable: (params: any) => Promise<AxiosResponse<object & IPagination>>;
};
