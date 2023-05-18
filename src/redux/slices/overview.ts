import { createSlice, Dispatch } from '@reduxjs/toolkit';
// utils
import { IOverviewState } from 'src/@types/overview';
import { OverviewService } from 'src/services';

// ----------------------------------------------------------------------

const initialState: IOverviewState = {
  isLoading: false,
  error: null,
  overview: null,
};

const slice = createSlice({
  name: 'overview', // action type prefix
  initialState,
  reducers: {
    // LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    stopLoading(state) {
      state.isLoading = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET overview
    getOverviewSuccess(state, action) {
      state.overview = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getOverview() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await OverviewService.getOverview();
      dispatch(slice.actions.getOverviewSuccess(response.data.overview));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.stopLoading());
    }
  };
}
