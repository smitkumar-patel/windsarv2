import {createStore, combineReducers, applyMiddleware} from 'redux';
import userReducer from './user/userReducer';
import bussinessReducer from './user/businessReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  user: userReducer,
  business: bussinessReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
