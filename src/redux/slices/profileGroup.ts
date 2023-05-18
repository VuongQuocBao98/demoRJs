import { current, createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import axiosInstance from 'src/utils/axios';
import ENDPOINT from '../../services/Endpoint';
import type { PendingAction, RejectedAction, FulfilledAction } from "./utils"

interface ProfileGroup {
    folderList: any;
    dataListFolderCandidate: any;
    editingAnswer: any;
    loading: boolean;
    currentRequestId: undefined | string;
}

const initialState: ProfileGroup = {
    folderList: [],
    dataListFolderCandidate: [],
    editingAnswer: null,
    loading: false,
    currentRequestId: undefined,
};

export const addFolder = createAsyncThunk('Cambridge/addFolderCandidate', async (body: any, thunkAPI) => {
  try {
    const response = await axiosInstance.post(ENDPOINT.PROFILE_GROUP, body, {
        signal: thunkAPI.signal,
    });
    return response;
    getListFolderCandidate()
  } catch (error) {
    console.error(error)
  }
});

export const getListFolderCandidate = createAsyncThunk('Cambridge/ListFolderCandidate', async (_, thunkAPI) => {
    const params = new URLSearchParams();
    params.append('PageIndex', '1');
    params.append('PageSize', '20'.toString());
    params.append('OrderBy', '0'.toString());

    const response: any = await axiosInstance.get(`${ENDPOINT.PROFILE_GROUP}?${params.toString()}`, {
        signal: thunkAPI.signal,
    });
    console.log('>>>>>>>',response.data)

    return response.data.items.map((folder: any, index: number) => ({
      id: folder?.id,
      name: folder?.name,
      type: 'folder',
      totalItems: folder?.amountProfile,
      dateCreated: folder?.created,
      dateModified: folder?.updated,
    }));
});

const candidateGroupSlice = createSlice({
    name: 'candidate',
    initialState,
    reducers: {
        //
    },
    extraReducers(builder) {
        builder

            .addCase(addFolder.fulfilled, (state, action) => {
                state.folderList.push(action.payload);
            })

            .addCase(getListFolderCandidate.fulfilled, (state, action) => {

                state.dataListFolderCandidate.push(action.payload);
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
            )
            .addDefaultCase((state, action) => {
                // console.log(`action type: ${action.type}`, current(state));
            });
    },
});

const candidateGroupReducer = candidateGroupSlice.reducer;

export default candidateGroupReducer;
