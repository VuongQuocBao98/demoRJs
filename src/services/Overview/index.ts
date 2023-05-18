import axiosInstance from 'src/utils/axios';
import ENDPOINT from '../Endpoint';

const OverviewService = {
  getOverview: () => axiosInstance.get(ENDPOINT.OVERVIEW),
};
export default OverviewService;
