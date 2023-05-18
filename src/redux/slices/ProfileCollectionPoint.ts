import { current, nanoid, createAsyncThunk, createSlice, AsyncThunk } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import axiosInstance from 'src/utils/axios';
import ENDPOINT from '../../services/Endpoint';
import type { Collectionpoint, Lecturer } from '../type/slices.type';

import type { PendingAction, RejectedAction, FulfilledAction } from './utils';

interface ColectionPointState {
    ColectionPointList: Collectionpoint[];
    dataList: any,
    editingAnswer: any;
    loading: boolean;
    currentRequestId: undefined | string;
}

const initialState: ColectionPointState = {
    ColectionPointList: [],
    dataList: [],
    editingAnswer: null,
    loading: false,
    currentRequestId: undefined,
};

const defaultParams = {
    PageSize: 5,
    PageIndex: 1,
  };

export const addProfileColectionPoint = createAsyncThunk('cambridge/addProfileColectionPoint', async (body: any, thunkAPI) => {
    const response = await axiosInstance.post(ENDPOINT.PROFILECOLECTIONPOINT, body, {
        signal: thunkAPI.signal,
    });
    return response.data.api;

});

export const getListProfileCollectionPoint = createAsyncThunk(
    'cambridge/getListData',
    async (params: any, thunkAPI) => {
        const response: any = await axiosInstance.get(ENDPOINT.PROFILECOLECTIONPOINT, {
            params: isEmpty(params) ? defaultParams : params,
            signal: thunkAPI.signal,
        });
        return response.data;
    }
);



// export const deleteLecturer = createAsyncThunk('cambridge/deleteData', async (lecturerID:string, thunkAPI ) => {
//   const params = new URLSearchParams();
//   params.append('PageIndex', '1');
//   params.append('PageSize', '20'.toString());
//   params.append('OrderBy', '0'.toString());
//   console.log('>>>>>>>', lecturerID);


//   const response: any = await axiosInstance.delete(`${ENDPOINT.LECTURER}/${lecturerID}`, {
//     signal: thunkAPI.signal,
//   });
//   // console.log('data', response.data.items)
//   return response.data.items
// });

export const GetColectionPoint = createAsyncThunk('cambridge/GetCollectionPointData', async (LocationID: string, thunkAPI) => {
    const params = new URLSearchParams();
    params.append('PageIndex', '1');
    params.append('PageSize', '20'.toString());
    params.append('OrderBy', '0'.toString());
    console.log('>>>>>>>', LocationID);


    const response: any = await axiosInstance.get(`${ENDPOINT.PROFILECOLECTIONPOINT}/${LocationID}`, {
        signal: thunkAPI.signal,
    });
    console.log('data', response)
    return response
});

// export const EditLecturer = createAsyncThunk('cambridge/EditLecturerData', async (body: any, thunkAPI) => {
//   const params = new URLSearchParams();
//   params.append('PageIndex', '1');
//   params.append('PageSize', '20'.toString());
//   params.append('OrderBy', '0'.toString());


//   const response: any = await axiosInstance.put(ENDPOINT.LECTURER, body, {
//     signal: thunkAPI.signal,
//   });
//   console.log('data', response)
//   return response
// });




const ProfileCollectionPointSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        //
    },
    extraReducers(builder) {
        builder

            .addCase(addProfileColectionPoint.fulfilled, (state, action) => {

                state.ColectionPointList.push(action.payload);
            })

            .addCase(getListProfileCollectionPoint.fulfilled, (state, action) => {
                console.log("dataList =================", action.payload);

                state.dataList = action.payload
            })

            //   .addCase(deleteLecturer.fulfilled, (state, action) => {
            //    const Lecturerid=action.meta.arg
            //    const deleteLecturerIndex = state.dataList.findIndex(lecturerID =>  )
            //     state.dataList.push(action.payload);
            //   })


            //   .addCase(deleteLecturer.fulfilled, (state, action) => {
            //    const Lecturerid=action.meta.arg
            //     console.log(Lecturerid);

            //  const deleteLecturerIndex = state.dataList.findIndex(lecturerID =>  )
            //     state.dataList.push(action.payload);
            //   })



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
            )
        // .addDefaultCase((state, action) => {
        //   console.log(`action type: ${action.type}`, current(state));
        // });
    },
});

const profileCollectionReducer = ProfileCollectionPointSlice.reducer;

export default profileCollectionReducer;
