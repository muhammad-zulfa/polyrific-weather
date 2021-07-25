import {combineReducers, applyMiddleware, createStore, compose} from 'redux'
import {AppReducer} from "./AppRedux";
import {WeatherReducer} from "./WeatherRedux";
import thunk from "redux-thunk";
import {createWrapper} from "next-redux-wrapper";

let store;

const rootReducer = combineReducers({
  app: AppReducer,
  weather: WeatherReducer
})

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return compose(applyMiddleware(...middleware));
}

const createDefStore = (emptyState = {}) => {
  return createStore(
    rootReducer,
    emptyState,
    bindMiddleware([thunk]),
  )
}

export const initStore = () => {
  let state = {};

  let currentStore = store ?? createDefStore(state);

  if (state && store) {
    currentStore = createDefStore({
      ...store.getState(),
      ...state,
    });

    // Reset the current store
    store = undefined;
  }

  if (!store) {
    store = currentStore;
  }

  return currentStore;
}

export const wrapper = createWrapper(initStore)
