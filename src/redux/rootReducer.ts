import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import overviewReducer from './slices/overview';
import lecturerReducer from './slices/lecturer';
import roleReducer from './slices/role';
import candidateReducer from './slices/candidate';
import candidateGroupReducer from './slices/profileGroup';
import profileCollectionReducer from './slices/ProfileCollectionPoint';

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  overview: overviewReducer,
  lecturer: lecturerReducer,
  role: roleReducer,
  candidate:candidateReducer,
  profileGroup:candidateGroupReducer,
  profileColectionPoint:profileCollectionReducer,
});

export default rootReducer;

//
