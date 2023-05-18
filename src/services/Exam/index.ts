import axiosInstance from 'src/utils/axios';
import ENDPOINT from '../Endpoint';

const ExamService = {
  getAllExam: (params: any) => axiosInstance.get(ENDPOINT.EXAM, { params }),
  getExamById: (id: string) => axiosInstance.get(`${ENDPOINT.EXAM}/${id}`),
  createExam: (data: any) => axiosInstance.post(ENDPOINT.EXAM, data),
  editExam: (data: any) => axiosInstance.put(ENDPOINT.EXAM, data),
  deleteExam: (id: number) => axiosInstance.delete(ENDPOINT.EXAM, { data: id }),

  getExamQuestions: (id: string) => axiosInstance.get(`${ENDPOINT.EXAM_SECTION}/${id}`),
  createExamSection: (data: any) => axiosInstance.post(ENDPOINT.EXAM_SECTION, data),
  editExamSection: (data: any) => axiosInstance.put(ENDPOINT.EXAM_SECTION, data),

  createExamQuestion: (data: any) => axiosInstance.post(ENDPOINT.EXAM_QUESTION, data),
  getExamQuestionById: (id: string) => axiosInstance.get(`${ENDPOINT.EXAM_QUESTION}/${id}`),
  deleteExamQuestion: (id: string) => axiosInstance.delete(`${ENDPOINT.EXAM_QUESTION}/${id}`),

  getExamSkillById: (id: string) => axiosInstance.get(`${ENDPOINT.EXAM_SKILL}/${id}`),
  editExamSkill: (data: any) => axiosInstance.put(ENDPOINT.EXAM_SKILL, data),
};
export default ExamService;
