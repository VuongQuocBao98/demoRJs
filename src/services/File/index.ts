import { ILecturer } from 'src/core/lecturer/domain';
import axiosInstance from 'src/utils/axios';
import ENDPOINT from '../Endpoint';

const FileService = {
  uploadSingleFile: (data: FormData) =>
    axiosInstance.post(ENDPOINT.FILE, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};
export default FileService;
