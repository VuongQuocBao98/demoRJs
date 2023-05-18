import axiosInstance from 'src/utils/axios';
import ENDPOINT from '../Endpoint';

const ExamRoomService = {
  getAllExamRoom: (params: any) => axiosInstance.get(ENDPOINT.EXAM_ROOM, { params }),
  getExamRoomById: (id: string) => axiosInstance.get(`${ENDPOINT.EXAM_ROOM}/${id}`),
  createExamRoom: (data: any) => axiosInstance.post(ENDPOINT.EXAM_ROOM, data),
  editExamRoom: (data: any) => axiosInstance.put(ENDPOINT.EXAM_ROOM, data),
  deleteExamRoom: (id: string | number) => axiosInstance.delete(`${ENDPOINT.EXAM_ROOM}/${id}`),

  createLinkZoom: (data: any) => axiosInstance.post(`${ENDPOINT.EXAM_ROOM}/create-zoom`, data),
};
export default ExamRoomService;
