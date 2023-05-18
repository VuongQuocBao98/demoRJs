import { configAPI } from '../data/ConfigAPI';
import {
  createLecturerUsecase,
  deleteLecturerUsecase,
  editLecturerUsecase,
  getLecturerUsecase,
  getListLecturerUsecase,
} from '../domain';

export function useConfiguration() {
  const getListLecturer = getListLecturerUsecase({
    getAllLecturer: configAPI.getAllLecturer,
  });
  const getLecturer = getLecturerUsecase({
    getLecturerById: configAPI.getLecturerById,
  });
  const createLecturer = createLecturerUsecase({
    createLecturer: configAPI.createLecturer,
  });
  const editLecturer = editLecturerUsecase({ editLecturer: configAPI.editLecturer });
  const deleteLecturer = deleteLecturerUsecase({
    deleteLecturer: configAPI.deleteLecturer,
  });

  return {
    getListLecturer,
    getLecturer,
    createLecturer,
    editLecturer,
    deleteLecturer,
  };
}
