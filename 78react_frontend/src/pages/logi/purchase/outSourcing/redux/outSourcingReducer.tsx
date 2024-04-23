import { createSlice } from '@reduxjs/toolkit';
// @reduxjs/toolkit을 쓰면 미들웨어(Saga, Thunk) 두개 다 쓸 수 있다

const outSourcingReducer = createSlice({
    name: 'outSourcing',
    initialState: {
        outSourcingRequestData: [],
        error: null
    },
    reducers: {
        outSourcingListRequest: (state, action) => {
            console.log('✔️리듀서리퀘스트: outSourcingListRequest', action.payload.outSourcingList);
            state.error = null;
        },
        outSourcingListRequestSuccess: (state, action) => {
            console.log('✔️성공: ousSourcingListRequestSuccess', action.payload);
            state.outSourcingRequestData = action.payload;
        },
    }
});

export const {
    outSourcingListRequest,
    outSourcingListRequestSuccess
} = outSourcingReducer.actions;

export default outSourcingReducer.reducer;