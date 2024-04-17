//Reducer 생성

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

