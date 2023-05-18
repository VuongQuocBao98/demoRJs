
import { CertificateService } from 'src/services';
import { ICertificateAPI } from '../domain/ports/ICertificateAPI';

class CertificateAPI implements ICertificateAPI {
  async getAllCertificate(params: any) {
    return CertificateService.getAllCertificate(params);
  }

  async getCertificateById(id: string) {
    return CertificateService.getCertificateById(id);
  }

  async createCertificate(data: any) {
    return CertificateService.createCertificate(data);
  }

  async editCertificate(data: any) {
    return CertificateService.editCertificate(data);
  }

  async deleteCertificate(id: string | number) {
    return CertificateService.deleteCertificate(id);
  }
  // ----------------------------------------------------------------------
  async getAllCertificateTable(params: any) {
    return CertificateService.getAllCertificateTable(params);
  }
}

const certificateAPI = new CertificateAPI();

export { certificateAPI };
