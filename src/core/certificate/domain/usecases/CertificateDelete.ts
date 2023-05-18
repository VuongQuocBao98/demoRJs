import { ICertificateAPI } from '../ports/ICertificateAPI';

type CertificateAPIType = Pick<ICertificateAPI, 'deleteCertificate'>;

const deleteCertificateUsecase =
  (certificateAPI: CertificateAPIType) => async (id: string | number) => {
    try {
      await certificateAPI.deleteCertificate(id);
    } catch (error) {
      throw error;
    }
  };

export { deleteCertificateUsecase };
