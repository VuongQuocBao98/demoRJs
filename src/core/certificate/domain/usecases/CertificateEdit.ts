import { ICertificate } from '../CertificateEntity';
import { ICertificateAPI } from '../ports/ICertificateAPI';

type CertificateAPIType = Pick<ICertificateAPI, 'editCertificate'>;

const editCertificateUsecase = (certificateAPI: CertificateAPIType) => async (certificate: ICertificate) => {
  try {
    const { data } = (await certificateAPI.editCertificate(certificate))!;
    return data;
  } catch (error) {
    throw error;
  }
};

export { editCertificateUsecase };

