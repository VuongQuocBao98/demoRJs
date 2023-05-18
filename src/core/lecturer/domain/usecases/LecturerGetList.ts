import { IConfigAPI } from '../ports/IConfigAPI';
import { ILecturer } from '../LecturerEntity';

type ConfigAPIType = Pick<IConfigAPI, 'getAllLecturer'>;
type LecturerResponse = {
  data?: ILecturer[] | undefined;
  total?: number | undefined;
  perPage?: number | undefined;
  currentPage?: number | undefined;
};

const getListLecturerUsecase = (configAPI: ConfigAPIType) => async (params: any) => {
  try {
    const { data, total, perPage, currentPage }: LecturerResponse =
      await configAPI.getAllLecturer(params);
    if (data && data.length) {
      const startIdx = (currentPage! - 1) * perPage! + 1;
      const dataConvert = data.map((value: ILecturer, idx: number) => ({
        ...value,
        stt: startIdx + idx,
      }));
      const totalRecord = total ? total : 0;
      const perPageRequired = perPage ? perPage : 1;
      const totalPage = Math.floor(totalRecord / perPageRequired) + 1;
      return {
        data: dataConvert,
        total: totalPage,
      };
    }
    return [];
  } catch (error) {
    throw error;
  }
};

export { getListLecturerUsecase };
