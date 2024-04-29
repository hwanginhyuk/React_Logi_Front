//Reducer 생성

const SEARCH_GATHER_LIST_SUCCESS = 'src/erp/logistic/Saga/SEARCH_GATHER_LIST_SUCCESS';

const initialState = {
  GatherList: []
};

/**
 * [78inhyuk]
 * 액션 타입과 액션 페이로드에 대해 명시적인 상수를 사용하여 액션유형을 관리
 * 가독성을 높이고, 액션유형을 중복하여 사용하는 실수를 방지할 수 있다
 * 아래의 방식은 switch ~ case 문으로 액션타입이 어떤 것이 들어오는가에 따라서 데이터의 상태를 업데이트 해준다
 * 
 * @param state 
 * @param action 
 * @returns 
 */

const gatherlist = (state = initialState, action: any) => {
  switch (action.type) {
    case SEARCH_GATHER_LIST_SUCCESS:
      return {
        ...state,
        GatherList: action.payload.gridRowJson
      };
    default:
      return state;
  }
};

export default gatherlist;
