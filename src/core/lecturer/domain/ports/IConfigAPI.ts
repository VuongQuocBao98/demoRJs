import { AxiosResponse } from 'axios';
import { IPagination } from 'src/components/@orbit/table';
import { ILecturer } from '../LecturerEntity';

export type IConfigAPI = {
  getAllLecturer: (params: any) => Promise<object & IPagination>;
  getLecturerById: (id: string) => Promise<AxiosResponse<ILecturer>>;
  createLecturer: (data: any) => Promise<AxiosResponse<ILecturer>>;
  editLecturer: (data: any) => Promise<AxiosResponse<ILecturer>>;
  deleteLecturer: (id: number) => Promise<any>;
};
