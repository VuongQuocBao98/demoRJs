import { ILecturer } from '../LecturerEntity';
import { IConfigAPI } from '../ports/IConfigAPI';

type ConfigAPIType = Pick<IConfigAPI, 'createLecturer'>;

const createLecturerUsecase = (configAPI: ConfigAPIType) => async (lecturer: ILecturer) => {
  try {
    const { data } = (await configAPI.createLecturer(lecturer))!;
    return data;
  } catch (error) {
    throw error;
  }
};

export { createLecturerUsecase };
