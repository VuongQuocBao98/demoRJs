import { IConfigAPI } from '../ports/IConfigAPI';

type ConfigAPIType = Pick<IConfigAPI, 'getLecturerById'>;

const getLecturerUsecase = (configAPI: ConfigAPIType) => async (id: string) => {
  try {
    const data = await configAPI.getLecturerById(id);
    return data;
  } catch (error) {
    throw error;
  }
};

export { getLecturerUsecase };
