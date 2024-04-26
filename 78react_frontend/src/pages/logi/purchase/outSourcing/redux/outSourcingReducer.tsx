import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OutSourcingTO } from 'types/logi/outsourcing/types';

/** 
 * [78inhyuk]
 * reducer 생성 및 구현
*/

interface OutSourcingState {
    outSourcingList: OutSourcingTO[]; // outSourcingList의 타입은 interface로 만들어서 지정함   
    error: any | null;          
}

const initialState: OutSourcingState = {
    outSourcingList: [],
    error: null
};

const outSourcingReducer = createSlice({
    name: 'outSourcing',
    initialState,
    reducers: {
        fetchOutSourcingRequest: (state, action: PayloadAction<any>) => {
            console.log('✔️리듀서리퀘스트: fetchOutSourcingRequest', action.payload.outSourcingList);
            state.outSourcingList = action.payload.outSourcingList; // 값이 바뀌면 상태 변경
            state.error = null; // 에러코드 초기화
        },
        fetchOutSourcingSuccess: (state, action: PayloadAction<any>) => {
            console.log('✔️성공: fetchOutSourcingSuccess', action.payload.outSourcingList);
            state.outSourcingList = action.payload.outSourcingList; // 에러코드 초기화  
            state.error = null; // 에러코드 초기화
        },
        fetchOutSourcingFailure: (state, action: PayloadAction<any>) => {
            console.log('✔️실패: fetchOutSourcingFailure', action.payload);
            state.error = action.payload;
        },
    }
});

export const {
    fetchOutSourcingRequest,
    fetchOutSourcingSuccess,
    fetchOutSourcingFailure
} = outSourcingReducer.actions;

export default outSourcingReducer.reducer;
