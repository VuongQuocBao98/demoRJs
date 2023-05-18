import { ICertificateAPI } from '../ports/ICertificateAPI';
import { ICertificate } from '../CertificateEntity';
import { isEmpty } from 'lodash';

type CertificateAPIType = Pick<ICertificateAPI, 'getAllCertificate'>;

type CertificateResponse = {
  items?: ICertificate[] | undefined;
  totalItem?: number | undefined;
};

type IResponse = {
  data: CertificateResponse;
};

const defaultParams = {
  PageIndex: 1,
  PageSize: 20,
  OrderBy: 0,
};

const getListCertificateUsecase =
  (certificateAPI: CertificateAPIType) => async (params: any) => {
    try {
      const { data }: IResponse = await certificateAPI.getAllCertificate(
        isEmpty(params) ? defaultParams : params
      );
      const { items, totalItem } = data;

      if (items && items.length) {
        const dataConvert = items.map((value: any, idx: number) => ({
          ...value,
          totalItems: value.amountProfile,
          dateCreated: value.created,
          dateModified: value.updated || value.created,
        }));
        return {
          data: dataConvert,
          total: totalItem,
        };
      }
      return {
        data: [],
        total: 0,
      };
    } catch (error) {
      throw error;
    }
  };

export { getListCertificateUsecase };
