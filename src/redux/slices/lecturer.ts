import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import axiosInstance from 'src/utils/axios';
import ENDPOINT from '../../services/Endpoint';
import type { Lecturer } from '../type/slices.type';

import type { FulfilledAction, PendingAction, RejectedAction } from './utils';
import { dispatch } from '../store';

interface LecturerState {
  leturerList: Lecturer[];
  dataList: any;
  editingAnswer: any;
  loading: boolean;
  currentRequestId: undefined | string;
}

const initialState: LecturerState = {
  leturerList: [],
  dataList: [],
  editingAnswer: null,
  loading: false,
  currentRequestId: undefined,
};

const defaultParams = {
  PageSize: 5,
  PageIndex: 1,
};

export const addLecturer = createAsyncThunk(
  'cambridge/addLecturer',
  async (body: any, thunkAPI) => {
    try {
      const response = await axiosInstance.post(ENDPOINT.LECTURER, body, {
        signal: thunkAPI.signal,
      });
      //getListLecturer({});
      console.log('data', response);
      return response;
    } catch (ex: any) {
      return ex;
    }
  }
);

export const getListLecturer = createAsyncThunk(
  'cambridge/getListData',
  async (params: any, thunkAPI) => {
    try {
      const response: any = await axiosInstance.get(ENDPOINT.LECTURER, {
        params: isEmpty(params) ? defaultParams : params,
        signal: thunkAPI.signal,
      });

      return response.data;
    }
    catch (ex) {
      console.log(ex);
    }
  }
);

export const deleteLecturer = createAsyncThunk(
  'cambridge/deleteData',
  async (lecturerID: string, thunkAPI) => {
    const response: any = await axiosInstance.delete(`${ENDPOINT.LECTURER}/${lecturerID}`, {
      signal: thunkAPI.signal,

    });

    dispatch(getListLecturer({}));
    return response.data;
  }
);

export const GetLecturer = createAsyncThunk(
  'cambridge/GetLecturerData',
  async (lecturerID: string, thunkAPI) => {
    const params = new URLSearchParams();
    params.append('PageIndex', '1');
    params.append('PageSize', '20'.toString());
    params.append('OrderBy', '0'.toString());

    const response: any = await axiosInstance.get(`${ENDPOINT.LECTURER}/${lecturerID}`, {
      signal: thunkAPI.signal,
    });
    console.log('data', response);
    return response;
  }
);

export const EditLecturer = createAsyncThunk(
  'cambridge/EditLecturerData',
  async (body: any, thunkAPI) => {
    const params = new URLSearchParams();
    params.append('PageIndex', '1');
    params.append('PageSize', '20'.toString());
    params.append('OrderBy', '0'.toString());

    const response: any = await axiosInstance.put(ENDPOINT.LECTURER, body, {
      signal: thunkAPI.signal,
    });
    console.log('data', response);
    return response;
  }
);

const lecturerSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    //
  },
  extraReducers(builder) {
    builder

      // .addCase(addLecturer.fulfilled, (state, action) => {
      //   state.leturerList.push(action.payload);
      // })

      .addCase(getListLecturer.fulfilled, (state, action) => {
        state.dataList = action.payload;
      })

      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true;
          state.currentRequestId = action.meta.requestId;
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false;
            state.currentRequestId = undefined;
          }
        }
      );
  },
});

const lecturerReducer = lecturerSlice.reducer;

export default lecturerReducer;
