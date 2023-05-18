import { current, nanoid, createAsyncThunk, createSlice, AsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'src/utils/axios';
import { string } from 'yup';
import ENDPOINT from '../../services/Endpoint';

import type { PendingAction, RejectedAction, FulfilledAction } from './utils';

interface UploadFileState {
    file: any;
    multifile:[];
    loading: boolean;
    currentRequestId: undefined | string;
}

const initialState: UploadFileState = {
    file: string,
    multifile:[],
    loading: false,
    currentRequestId: undefined,
};

export const upLoadSingleFile = createAsyncThunk('cambridge/Lecturer/file', async (body: any, thunkAPI) => {
    const response = await axiosInstance.post(ENDPOINT.FILE, body, {
        signal: thunkAPI.signal,
    });
    return response.data.fileUrl;

});

export const upLoadMultiFile = createAsyncThunk('cambridge/Lecturer/files', async (body: any, thunkAPI) => {
    const response = await axiosInstance.post(ENDPOINT.MULTIFILE, body, {
        signal: thunkAPI.signal,
    });
    return response;

});

const FileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        //
    },
    extraReducers(builder) {
        builder

            .addCase(upLoadSingleFile.fulfilled, (state, action) => {
                state.file = action.payload;
            })

            .addCase(upLoadMultiFile.fulfilled, (state, action) => {
                state.file = action.payload;
            })

            .addMatcher<PendingAction>(
                (action) => action.type.endsWith('/pending'),
                (state, action) => {
                    state.loading = true;
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
            )
        // .addDefaultCase((state, action) => {
        //   console.log(`action type: ${action.type}`, current(state));
        // });
    },
});

const fileReducer = FileSlice.reducer;

export default fileReducer;
