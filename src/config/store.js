import nextConnectRedux from 'next-connect-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { REHYDRATE } from 'redux-persist/constants'
//import Reactotron from './reactotron'
import createSagaMiddleware from 'redux-saga'
import modules from '../modules'
import rootSaga from '../sagas'
import createActionBuffer from 'redux-action-buffer'
import localforage from 'localforage'
import config from './'

let middleware, enhancers, sagaMiddleware
if (config.dev) {
  //const sagaMonitor = Reactotron.createSagaMonitor()
  //sagaMiddleware = createSagaMiddleware({sagaMonitor})
  sagaMiddleware = createSagaMiddleware()
  middleware = applyMiddleware(
    sagaMiddleware
    //createActionBuffer(REHYDRATE)
  )

  enhancers = compose(
    autoRehydrate(),
    middleware
  )
} else {
  sagaMiddleware = createSagaMiddleware()
  middleware = applyMiddleware(
    sagaMiddleware
    //createActionBuffer(REHYDRATE)
  )

  enhancers = compose(
    autoRehydrate(),
    middleware
  )
}

const configureStore = () => {
  console.log('Configuring a store')
  let store
  //if (config.dev) {
    //store = Reactotron.createStore(modules, enhancers)
  //} else {
  let initialState = {}
  if (typeof window !== 'undefined') {
    if (window.__NEXT_DATA__.redux) {
      initialState = window.__NEXT_DATA__.redux
    }
  }
  store = createStore(modules, initialState, enhancers)
  //}
  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../modules/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
export const nextConnect = nextConnectRedux(configureStore)

//const store = configureStore()
//
//export const persist = (callback) => {
//  persistStore(store, {
//    storage: localforage,
//    whitelist: ['user', 'entities']
//  }, callback)
//}
//
//export default store
