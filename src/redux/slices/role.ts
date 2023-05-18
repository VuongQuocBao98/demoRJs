import { current, nanoid, createAsyncThunk, createSlice, AsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'src/utils/axios';
import ENDPOINT from '../../services/Endpoint';

import type { PendingAction, RejectedAction, FulfilledAction } from './utils';

interface RoleState {
  roleList: any;
  loading: boolean;
  currentRequestId: undefined | string;
}

const initialState: RoleState = {
  roleList: [],
  loading: false,
  currentRequestId: undefined,
};

export const getRole = createAsyncThunk('cambridge/getRole', async (_, thunkAPI) => {
  const params = new URLSearchParams();
  params.append('PageIndex', '1');
  params.append('PageSize', '20'.toString());
  params.append('OrderBy', '0'.toString());

  const response: any = await axiosInstance.get(`${ENDPOINT.ROLE}?${params.toString()}`, {
    signal: thunkAPI.signal,
  });

  const _items = response.data?.items;

  // console.log('sdasdsadsadasdsad',_items)

  const result = _items.reduce((acc: any, item: any) => {
    acc[item.code.toLowerCase()] = {
      code: item.code,
      _id: item.id,
    };

    return acc;
  }, {});

  return result;
});

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    //
  },
  extraReducers(builder) {
    builder

      .addCase(getRole.fulfilled, (state, action) => {
        state.roleList = action.payload;
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

const roleReducer = roleSlice.reducer;

export default roleReducer;
