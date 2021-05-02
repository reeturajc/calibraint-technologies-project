import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { ShowReducer } from "./ShowReducer";

export const rootReducer = combineReducers({
  showReducer: ShowReducer,
});

const composeEnhancers = compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
