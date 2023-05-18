import { ICertificate } from 'src/core/certificate/domain';
import axiosInstance from 'src/utils/axios';
import ENDPOINT from '../Endpoint';

const CertificateService = {
  getAllCertificate: (params: any) => axiosInstance.get(ENDPOINT.CERTIFICATE_FOLDER, { params }),
  getCertificateById: (id: string) => axiosInstance.get(`${ENDPOINT.CERTIFICATE_FOLDER}/${id}`),
  createCertificate: (data: ICertificate) => axiosInstance.post(ENDPOINT.CERTIFICATE_FOLDER, data),
  editCertificate: (data: any) => axiosInstance.put(ENDPOINT.CERTIFICATE_FOLDER, data),
  deleteCertificate: (id: string | number) =>
    axiosInstance.delete(`${ENDPOINT.CERTIFICATE_FOLDER}/${id}`),
  // ----------------------------------------------------------------------
  getAllCertificateTable: (params: any) => axiosInstance.get(ENDPOINT.CERTIFICATE, { params }),
};
export default CertificateService;
