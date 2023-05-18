import { ICandidate } from 'src/core/candidate/domain';
import axiosInstance from 'src/utils/axios';
import ENDPOINT from '../Endpoint';

const CandidateService = {
  getAllCandidate: (params: any) => axiosInstance.get(ENDPOINT.PROFILE_GROUP, { params }),
  getCandidateById: (id: string) => axiosInstance.get(`${ENDPOINT.CANDIDATE}/${id}`),
  createCandidate: (data: ICandidate) => axiosInstance.post(ENDPOINT.PROFILE_GROUP, data),
  editCandidate: (data: any) => axiosInstance.put(ENDPOINT.PROFILE_GROUP, data),
  deleteCandidate: (id: string | number) => axiosInstance.delete(`${ENDPOINT.PROFILE_GROUP}/${id}`),
  // ----------------------------------------------------------------------
  getAllCandidateTable: (params: any) => axiosInstance.get(ENDPOINT.CANDIDATE, { params }),
  createCandidateProfile: (data: any) => axiosInstance.post(ENDPOINT.CANDIDATE, data),
};
export default CandidateService;
