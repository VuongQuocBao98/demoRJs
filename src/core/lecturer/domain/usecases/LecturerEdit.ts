import { ILecturer } from '../LecturerEntity';
import { IConfigAPI } from '../ports/IConfigAPI';

type ConfigAPIType = Pick<IConfigAPI, 'editLecturer'>;

const editLecturerUsecase = (configAPI: ConfigAPIType) => async (Lecturer: ILecturer) => {
  try {
    const { data } = (await configAPI.editLecturer(Lecturer))!;
    return data;
  } catch (error) {
    throw error;
  }
};

export { editLecturerUsecase };

