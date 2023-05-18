import { ICandidatePaper } from 'src/core/candidate-paper/domain';
import axiosInstance from 'src/utils/axios';
import ENDPOINT from '../Endpoint';

const CandidatePaperService = {
  getAllCandidatePaper: (params: any) =>
    axiosInstance.get(ENDPOINT.CANDIDATE_PAPER_FOLDER, { params }),
  getCandidatePaperById: (id: string) =>
    axiosInstance.get(`${ENDPOINT.CANDIDATE_PAPER_FOLDER}/${id}`),
  createCandidatePaper: (data: ICandidatePaper) =>
    axiosInstance.post(ENDPOINT.CANDIDATE_PAPER_FOLDER, data),
  editCandidatePaper: (data: any) => axiosInstance.put(ENDPOINT.CANDIDATE_PAPER_FOLDER, data),
  deleteCandidatePaper: (id: string | number) =>
    axiosInstance.delete(`${ENDPOINT.CANDIDATE_PAPER_FOLDER}/${id}`),
  // ----------------------------------------------------------------------
  getAllCandidatePaperTable: (params: any) =>
    axiosInstance.get(ENDPOINT.CANDIDATE_PAPER, { params }),
};
export default CandidatePaperService;
