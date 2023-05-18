import { current, createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import axiosInstance from 'src/utils/axios';
import ENDPOINT from '../../services/Endpoint';
import type { PendingAction, RejectedAction, FulfilledAction } from "./utils"

interface CandidateState {
  candidateList: any;
  editingAnswer: any;
  dataListCandidate:any;
  loading: boolean;
  currentRequestId: undefined | string;
}

const initialState: CandidateState = {
  dataListCandidate:[],
  candidateList: [],
  editingAnswer: null,
  loading: false,
  currentRequestId: undefined,
};

export const addCandidate = createAsyncThunk('Cambridge/addCandidate', async (body: any, thunkAPI) => {
  const response = await axiosInstance.post(ENDPOINT.CANDIDATE, body, {
    signal: thunkAPI.signal,
  });
  return response.data.api;
});

export const GetListCandidate = createAsyncThunk('Cambridge/ListCandidate', async (folderID:any, thunkAPI) => {
  const params = new URLSearchParams();
  params.append('ProfileGroupID', folderID)
  params.append('PageIndex', '1');
  params.append('PageSize', '20'.toString());
  params.append('OrderBy', '0'.toString());


  const response: any = await axiosInstance.get(`${ENDPOINT.CANDIDATE}?${params.toString()}`, {
    signal: thunkAPI.signal,
  });
  console.log('>>>>',response.data.items);
  
  return response.data.items;
});

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    //
  },
  extraReducers(builder) {
    builder

      .addCase(addCandidate.fulfilled, (state, action) => {
        state.candidateList.push(action.payload);
      })

      .addCase(GetListCandidate.fulfilled, (state, action) => {
       
        state.dataListCandidate.push(action.payload);
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

const candidateReducer = candidateSlice.reducer;

export default candidateReducer;
