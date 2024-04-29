//🌟new
import { createSlice } from '@reduxjs/toolkit';

const salesReducer = createSlice({
  name: 'sales',
  initialState: {
    deliveryCompleteData: [],
    orderCompleteData: [],
    isDeliveryOpen: false,
    contractDetailListInMpsAvailable: [],
    contractAvailableList: [],
    error: null
  },
  reducers: {
    deliveryCompleteRequest: (state, action) => {
      console.log('✋리듀서리퀘스트: deliveryCompleteRequest', action);
      state.error = null;
    },
    deliveryCompleteRequestSuccess: (state, action) => {
      console.log('✋성공: deliveryCompleteRequestSuccess', action.payload);
      state.deliveryCompleteData = action.payload;
    },
    deliveryCompleteRequestFailure: (state, action) => {
      state.error = action.payload;
    },
    deliveryDivisionFailure: (state, action) => {
      state.deliveryCompleteData = action.payload;
    },
    orderCompleteSuccess: (state, action) => {
      state.orderCompleteData = action.payload;
    },
    orderCompleteFailure: (state, action) => {
      state.error = action.payload;
    },
    orderDivisionFailure: (state, action) => {
      state.error = action.payload;
    },
    contractDetailListInMpsAvailableRequest: (state, action) => {
      state.contractDetailListInMpsAvailable = action.payload;
    },
    contractDetailListInMpsAvailableSuccess: (state, action) => {
      state.contractDetailListInMpsAvailable = action.payload;
    },
    contractDetailListInMpsAvailableFailure: (state, action) => {
      state.error = action.payload;
    },
    deliveryAvailableRequest: (state, action) => {
      console.log('✋리퀘스트: deliveryAvailableRequest', action.payload);
      state.error = null;
    },
    deliveryAvailableRequestSuccess: (state, action) => {
      console.log('✋리듀서: deliveryAvailableRequestSuccess', action.payload);
      state.contractAvailableList = action.payload;
    },
    deliveryAvailableRequestFailure: (state, action) => {
      state.error = action.payload;
      console.log('@-@/', action);
      console.log('확인', action.payload);
    }
  }
});

export const {
  deliveryCompleteRequest,
  deliveryCompleteRequestSuccess,
  deliveryCompleteRequestFailure,
  deliveryDivisionFailure,
  orderCompleteSuccess,
  orderCompleteFailure,
  orderDivisionFailure,
  contractDetailListInMpsAvailableRequest,
  contractDetailListInMpsAvailableSuccess,
  contractDetailListInMpsAvailableFailure,
  deliveryAvailableRequest,
  deliveryAvailableRequestSuccess,
  deliveryAvailableRequestFailure
} = salesReducer.actions;

export default salesReducer.reducer;