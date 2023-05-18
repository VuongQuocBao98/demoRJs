import { IResult } from 'src/core/result/domain';
import axiosInstance from 'src/utils/axios';
import ENDPOINT from '../Endpoint';

const ResultService = {
  getAllResult: (params: any) => axiosInstance.get(ENDPOINT.RESULT_FOLDER, { params }),
  getResultById: (id: string) => axiosInstance.get(`${ENDPOINT.RESULT_FOLDER}/${id}`),
  createResult: (data: IResult) => axiosInstance.post(ENDPOINT.RESULT_FOLDER, data),
  editResult: (data: any) => axiosInstance.put(ENDPOINT.RESULT_FOLDER, data),
  deleteResult: (id: string | number) => axiosInstance.delete(`${ENDPOINT.RESULT_FOLDER}/${id}`),
  // ----------------------------------------------------------------------
  getAllResultTable: (params: any) => axiosInstance.get(ENDPOINT.RESULT, { params }),
};
export default ResultService;
