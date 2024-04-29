/**
 * [78inhyuk]
 * Reducer 생성 및 combinReducer 등록
 * from 'redux'로 지원해주는 걸 써도 되지만
 * 커스텀한 걸로 사용해도 된다
 */

import { combineReducers } from 'redux';
import gatherlist from './GatherReducer';
import mpslist from './mpsReducer';
import mrplist from './mrpReducer';
import mrpsimulatorlist from './mrpSimulator';

const ProductionReducerCombine = combineReducers({
  gatherlist,
  mpslist,
  mrplist,
  mrpsimulatorlist
});

export default ProductionReducerCombine;

