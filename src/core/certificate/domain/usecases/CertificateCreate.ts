import { ICertificate } from '../CertificateEntity';
import { ICertificateAPI } from '../ports/ICertificateAPI';

type CertificateAPIType = Pick<ICertificateAPI, 'createCertificate'>;

const createCertificateUsecase =
  (certificateAPI: CertificateAPIType) => async (certificate: ICertificate) => {
    try {
      const { data } = (await certificateAPI.createCertificate(certificate))!;
      return data;
    } catch (error) {
      throw error;
    }
  };

export { createCertificateUsecase };
