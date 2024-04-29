import { createSlice } from '@reduxjs/toolkit';

/**
 * [78inhyuk]
 * gather 관련 상태와 액션을 정의하는 슬라이스를 생성
 * Redux 상태와 관련된 리듀서, 액션을 함께 정의한다
 * 
 * 각종 에러 해결 완료
 */

const initialState = {
    gatherList: [],
    gatherLoading: false,
    gatherSuccess: false,
    gatherError: '',
    registerGatherLoading: false,
    registerGatherSuccess: false,
    registerGatherError: '',
    gatheringList: [],
    gatheringLoading: false,
    gatheringSuccess: false,
    gatheringError: '',
  };

  const gatherSlice = createSlice({
    name: 'gather',
    initialState,
    reducers: {
      getMrpGatherList(state) {
        state.gatherLoading = true;
      },

      getMrpGatherListSuccess(state, action) {
        state.gatherList = action.payload.gatherList;
        state.gatherLoading = false;
        state.gatherSuccess = true;
      },

      getMrpGatherListError(state) {
        state.gatherLoading = false;
        state.gatherError = '에러남';
      },

      registerMrpGatherList(state) {
        state.registerGatherLoading = true;
      },

      registerMrpGatherListSuccess(state) {
        state.registerGatherSuccess = false;
      },

      registerMrpGatherListError(state) {
        state.registerGatherLoading = false;
        state.registerGatherError = '에러남';
      },

      getMrpGatheringList(state) {
        state.gatheringLoading = true;
      },

      getMrpGatheringListSuccess(state, action) {
        state.gatheringList = action.payload.data.gridRowJson
        state.gatheringLoading = false;
        state.gatheringSuccess = true;
      },

      getMrpGatheringListError(state) {
        state.gatheringLoading = false;
        state.gatheringError = '에러남';
      }
    }
  });
  
  export default gatherSlice.reducer;

  export const { getMrpGatherList, getMrpGatherListSuccess, getMrpGatherListError,
    registerMrpGatherList, registerMrpGatherListSuccess, registerMrpGatherListError,
    getMrpGatheringList, getMrpGatheringListSuccess, getMrpGatheringListError } = gatherSlice.actions;