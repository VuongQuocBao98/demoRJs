import { AxiosResponse } from 'axios';
import { IPagination } from 'src/components/@orbit/table';
import { ICertificate } from '../CertificateEntity';

export type ICertificateAPI = {
  getAllCertificate: (params: any) => Promise<AxiosResponse<object & IPagination>>;
  getCertificateById: (id: string) => Promise<AxiosResponse<ICertificate>>;
  createCertificate: (data: any) => Promise<AxiosResponse<ICertificate>>;
  editCertificate: (data: any) => Promise<AxiosResponse<ICertificate>>;
  deleteCertificate: (id: string | number) => Promise<any>;

  getAllCertificateTable: (params: any) => Promise<AxiosResponse<object & IPagination>>;
};
