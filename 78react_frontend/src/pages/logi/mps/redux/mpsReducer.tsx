import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Imps {
  mpsData: [];
}

// 초기값 설정
export interface ImpsState extends Imps {
  mpsData: [];
  mpsLoading: boolean;
  mpsSuccess: boolean;
  mpsError: any;
}

const initialState: ImpsState = {
  mpsData: [],
  mpsLoading: false,
  mpsSuccess: false,
  mpsError: null
};

// 데이터값 셋팅
const mpsSlice = createSlice({
  name: 'mps',
  initialState,
  reducers: {
    requestmps(state: ImpsState) {
      state.mpsLoading = true;
    },
    requestmpsSuccess(state: ImpsState, action: PayloadAction<Imps>) {
      state.mpsLoading = false;
      state.mpsData = action.payload.mpsData;
      state.mpsSuccess = true;
    },

    requestmpsError(state: ImpsState) {
      state.mpsLoading = false;
      state.mpsError = '에러남';
    }
  }
});

export default mpsSlice.reducer;
export const { requestmps, requestmpsSuccess, requestmpsError } = mpsSlice.actions;
