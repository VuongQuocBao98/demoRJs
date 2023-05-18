import { RegisterBodyData } from 'src/auth/types';
import axiosInstance from 'src/utils/axios';
import ENDPOINT from '../Endpoint';
import axiosAuth from 'src/utils/axiosAuth';

const AuthService = {
  whoAmI: () => axiosInstance.get(ENDPOINT.WHO_AM_I),
  login: (authBodyData: any) => axiosAuth.post(ENDPOINT.LOGIN, authBodyData),
  logout: () => axiosInstance.post(ENDPOINT.LOGOUT),
  register: (registerBodyData: RegisterBodyData) =>
    axiosInstance.post(ENDPOINT.REGISTER, registerBodyData),
};
export default AuthService;
