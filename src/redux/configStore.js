import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

let middlewares = []
const sagaMiddleware = createSagaMiddleware()

//this line run logger mode
if (process.env.NODE_ENV === 'production') {
    middlewares = [...middlewares, sagaMiddleware]
  } else {
    middlewares = [...middlewares, logger, sagaMiddleware]
  }

// middlewares = [...middlewares, sagaMiddleware];

const middleware = applyMiddleware(...middlewares)
export const store = createStore(rootReducer, middleware)
sagaMiddleware.run(rootSaga)