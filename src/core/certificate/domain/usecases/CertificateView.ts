import { ICertificateAPI } from '../ports/ICertificateAPI';

type CertificateAPIType = Pick<ICertificateAPI, 'getCertificateById'>;

const getCertificateUsecase =
  (certificateAPI: CertificateAPIType) => async (id: string) => {
    try {
      const data = await certificateAPI.getCertificateById(id);
      return data;
    } catch (error) {
      throw error;
    }
  };

export { getCertificateUsecase };
