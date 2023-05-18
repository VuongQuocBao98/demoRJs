import { ICertificateAPI } from '../ports/ICertificateAPI';
import { ICertificate } from '../CertificateEntity';
import { isEmpty } from 'lodash';

type CertificateAPIType = Pick<ICertificateAPI, 'getAllCertificateTable'>;

type CertificateResponse = {
  items?: ICertificate[] | undefined;
  totalItem?: number | undefined;
  totalPage?: number | undefined;
};

type IResponse = {
  data: CertificateResponse;
};

const defaultParams = {
  PageIndex: 1,
  PageSize: 20,
  OrderBy: 0,
};

const getListCertificateTableUsecase =
  (certificateAPI: CertificateAPIType) => async (params: any) => {
    try {
      const { data }: IResponse = await certificateAPI.getAllCertificateTable(
        isEmpty(params) ? defaultParams : params
      );
      const { items, totalItem, totalPage } = data;

      if (items && items.length) {
        const dataConvert = items.map((value: any, idx: number) => ({
          ...value,
          totalItems: value.amountProfile,
          dateCreated: value.created,
          dateModified: value.updated || value.created,
        }));
        return {
          data: dataConvert,
          total: totalPage,
          totalItem,
        };
      }
      return {
        data: [],
        total: 0,
        totalItem,
      };
    } catch (error) {
      throw error;
    }
  };

export { getListCertificateTableUsecase };
