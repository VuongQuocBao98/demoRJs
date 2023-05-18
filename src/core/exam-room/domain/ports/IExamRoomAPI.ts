import { AxiosResponse } from 'axios';
import { IPagination } from 'src/components/@orbit/table';
import { IExamRoom } from '../ExamRoomEntity';

export type IExamRoomAPI = {
  getAllExamRoom: (params: any) => Promise<AxiosResponse<object & IPagination>>;
  getExamRoomById: (id: string) => Promise<AxiosResponse<IExamRoom>>;
  createExamRoom: (data: any) => Promise<AxiosResponse<IExamRoom>>;
  editExamRoom: (data: any) => Promise<AxiosResponse<IExamRoom>>;
  deleteExamRoom: (id: string | number) => Promise<any>;
};
