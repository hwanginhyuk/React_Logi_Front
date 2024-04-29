import { createSlice } from '@reduxjs/toolkit';

/** 
 * [78inhyuk]
 * reducer 생성 및 구현
*/

interface OutSourcingState {
    outSourcingList: [];  
    errorMsg: string | null;          
}

const initialState: OutSourcingState = {
    outSourcingList: [],
    errorMsg: null
};

const outSourcingReducer = createSlice({
    name: 'outSourcing',
    initialState,
    reducers: {
        fetchOutSourcingRequest: (state, action) => {
            console.log('✔️리듀서리퀘스트: fetchOutSourcingRequest', action.payload);
            state.outSourcingList = action.payload
        },
        fetchOutSourcingSuccess: (state, action) => {
            console.log('✔️성공: fetchOutSourcingSuccess', action.payload.outSourcingList);
            state.outSourcingList = action.payload.outSourcingList;
        },
        fetchOutSourcingFailure: (state, action) => {
            console.log('✔️실패: fetchOutSourcingFailure', action.payload.errorMsg);
            state.errorMsg = action.payload.errorMsg;
        },
    }
});

export const {
    fetchOutSourcingRequest,
    fetchOutSourcingSuccess,
    fetchOutSourcingFailure
} = outSourcingReducer.actions;

export default outSourcingReducer.reducer;
