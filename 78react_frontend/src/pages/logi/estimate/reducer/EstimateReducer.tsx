import * as types from '../action/EstimateActionType';
import { EstimateTO } from 'types/logi/estimate/types';

type Action = {
  type: string;
  mode?: string;
  payload?: any;
  error?: any;
};

type State = {
  estimateList: EstimateTO[];
  errorMsg?: any;
  error?: any;
};

const initialState = {
  estimateList: []
};

function estimateReducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case types.SEARCH_ESTIMATE:
      return {
        ...state,
        estimateList: []
      };
    case types.SEARCH_ESTIMATE_SUCCESS:
      return {
        ...state,
        estimateList: action.payload.gridRowJson
      };

    case types.SEARCH_ESTIMATE_FAILURE:
      return {
        ...state,
        errorMsg: action.payload
      };


    case types.REGISTER_ESTIMATE:
      return {
        ...state
      };
    case types.REGISTER_ESTIMATE_SUCCESS:
      return {
        ...state,
        errorMsg: action.payload
      };

    case types.REGISTER_ESTIMATE_FAILURE:
      return {
        ...state,
        errorMsg: action.payload
      };

    default:
      return state;
  }
}

export default estimateReducer;

