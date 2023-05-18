import { AxiosResponse } from 'axios';
import { IPagination } from 'src/components/@orbit/table';
import { IExam, IExamQuestion, IExamSectionEdit } from '../ExamEntity';

export type IExamAPI = {
  getAllExam: (params: any) => Promise<AxiosResponse<object & IPagination>>;
  getExamById: (id: string) => Promise<AxiosResponse<IExam>>;
  createExam: (data: any) => Promise<AxiosResponse<IExam>>;
  editExam: (data: any) => Promise<AxiosResponse<IExam>>;
  deleteExam: (id: number) => Promise<any>;

  createExamSection: (data: any) => Promise<AxiosResponse<any>>;
  editExamSection: (data: any) => Promise<AxiosResponse<IExamSectionEdit>>;

  getExamQuestions: (id: string) => Promise<AxiosResponse<any>>;
  createExamQuestion: (data: any) => Promise<AxiosResponse<IExamQuestion>>;
};
