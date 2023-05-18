import { IConfigAPI } from '../ports/IConfigAPI';

type ConfigAPIType = Pick<IConfigAPI, 'deleteLecturer'>;

const deleteLecturerUsecase = (configAPI: ConfigAPIType) => async (id: number) => {
  try {
    await configAPI.deleteLecturer(id);
  } catch (error) {
    throw error;
  }
};

export { deleteLecturerUsecase };
