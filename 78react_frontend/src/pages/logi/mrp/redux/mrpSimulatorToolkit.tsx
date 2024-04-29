import { createSlice } from '@reduxjs/toolkit';

/**
 * [78inhyuk]
 * 에러 해결 완료
 */

const initialState = {
    mrpSimulatorList: [],
    mrpSimulatorLoading: false,
    mrpSimulatorSuccess: false,
    mrpSimulatorError: ''
  };

  const mrpSimulatorSlice = createSlice({
    name: 'mrpSimulator',
    initialState,
    reducers: {
      getMrpSimulatorList(state) {
        state.mrpSimulatorLoading = true;
      },

      getMrpSimulatorListSuccess(state, action) {
        state.mrpSimulatorList = action.payload.mpsNoList;
        state.mrpSimulatorSuccess = true;
      },
  
      getMrpSimulatorListError(state) {
        state.mrpSimulatorLoading = false;
        state.mrpSimulatorError = '에러남';
      },

      postMrpSimulator(state) {
        state.mrpSimulatorLoading = true;
      },

      postMrpSimulatorSuccess(state) {
        state.mrpSimulatorSuccess = true;
      },

      postMrpSimulatorError(state) {
        state.mrpSimulatorLoading = false;
        state.mrpSimulatorError = '에러남';
      }
    }
  });
  
  export default mrpSimulatorSlice.reducer;

  export const { getMrpSimulatorList, getMrpSimulatorListSuccess, getMrpSimulatorListError,
    postMrpSimulator, postMrpSimulatorSuccess, postMrpSimulatorError } = mrpSimulatorSlice.actions;