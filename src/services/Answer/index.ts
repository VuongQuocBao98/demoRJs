import axiosInstance from 'src/utils/axios';
import ENDPOINT from '../Endpoint';

const AnswerService = {
  getAnswer: () => axiosInstance.get(ENDPOINT.ANSWER),
};
export default AnswerService;
