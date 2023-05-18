import { AxiosResponse } from 'axios';
import { IPagination } from 'src/components/@orbit/table';
import { IResult } from '../ResultEntity';

export type IResultAPI = {
  getAllResult: (params: any) => Promise<AxiosResponse<object & IPagination>>;
  getResultById: (id: string) => Promise<AxiosResponse<IResult>>;
  createResult: (data: any) => Promise<AxiosResponse<IResult>>;
  editResult: (data: any) => Promise<AxiosResponse<IResult>>;
  deleteResult: (id: string | number) => Promise<any>;

  getAllResultTable: (params: any) => Promise<AxiosResponse<object & IPagination>>;
};
