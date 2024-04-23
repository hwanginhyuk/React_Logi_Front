import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SalesPlan {
  salesPlanData: [];
}

// 초기값 설정
export interface SalesPlanState extends SalesPlan {
  salesPlanData: [];
  salesPlanLoading: boolean;
  salesPlanSuccess: boolean;
  salesPlanError: any;
}

const initialState: SalesPlanState = {
  salesPlanData: [],
  salesPlanLoading: false,
  salesPlanSuccess: false,
  salesPlanError: null
};

// 데이터값 셋팅
const salesPlanSlice = createSlice({
  name: 'mps',
  initialState,
  reducers: {
    requestsalesPlan(state: SalesPlanState) {
      state.salesPlanLoading = true;
    },
    requestsalesPlanSuccess(state: SalesPlanState, action: PayloadAction<SalesPlan>) {
      state.salesPlanLoading = false;
      state.salesPlanData = action.payload.salesPlanData;
      state.salesPlanSuccess = true;
    },

    requestsalesPlanError(state: SalesPlanState) {
      state.salesPlanLoading = false;
      state.salesPlanError = '에러발생';
    }
  }
});

export default salesPlanSlice.reducer;
export const { requestsalesPlan, requestsalesPlanSuccess, requestsalesPlanError } = salesPlanSlice.actions;
