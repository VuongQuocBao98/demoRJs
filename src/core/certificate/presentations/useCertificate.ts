import { certificateAPI } from '../data/CertificateAPI';
import {
  createCertificateUsecase,
  deleteCertificateUsecase,
  editCertificateUsecase,
  getCertificateUsecase,
  getListCertificateUsecase,
  getListCertificateTableUsecase,
} from '../domain';

export function useCertificate() {
  const getListCertificate = getListCertificateUsecase({
    getAllCertificate: certificateAPI.getAllCertificate,
  });
  const getCertificate = getCertificateUsecase({
    getCertificateById: certificateAPI.getCertificateById,
  });
  const createCertificate = createCertificateUsecase({
    createCertificate: certificateAPI.createCertificate,
  });
  const editCertificate = editCertificateUsecase({
    editCertificate: certificateAPI.editCertificate,
  });
  const deleteCertificate = deleteCertificateUsecase({
    deleteCertificate: certificateAPI.deleteCertificate,
  });

  const getListCertificateTable = getListCertificateTableUsecase({
    getAllCertificateTable: certificateAPI.getAllCertificateTable,
  });

  return {
    getListCertificate,
    getCertificate,
    createCertificate,
    editCertificate,
    deleteCertificate,

    getListCertificateTable,
  };
}
