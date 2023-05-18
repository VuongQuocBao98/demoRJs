import { ILecturer } from 'src/core/lecturer/domain';
import axiosInstance from 'src/utils/axios';
import ENDPOINT from '../Endpoint';

const LecturerService = {
  getAllLecturer: (params: any) => axiosInstance.get(ENDPOINT.LECTURER, { params }),
  getLecturerById: (id: string) => axiosInstance.get(`${ENDPOINT.LECTURER}/${id}`),
  createLecturer: (data: ILecturer) => axiosInstance.post(ENDPOINT.LECTURER, { data }),
  editLecturer: (data: any) => axiosInstance.put(ENDPOINT.LECTURER, { data }),
  deleteLecturer: (id: number) => axiosInstance.delete(ENDPOINT.LECTURER, { data: id }),
};
export default LecturerService;
