// @flow
import "rxjs"

import React from "react"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, combineReducers } from "redux"
import { createLogger } from "redux-logger"
import {combineEpics, createEpicMiddleware} from "redux-observable" // fce k inicializaci mdw pro odchytavani akci pro zpracovani epics
// redux
import { reducer as mapReducer, coordinatesReqEpic, kindergartenReqEpic } from "./src/redux/MapRedux"
import { reducer as regionsReducer, regionsReqEpic } from "./src/redux/RegionsRedux"
import { reducer as graphReducer, kindergartenGraphReqEpic } from './src/redux/GraphRedux'

// containers
import Navigator from "./src/containers/navigator/Navigator"

const logger = createLogger({ collapsed: true })
const middleware = []
const initialState = {}
const epicMiddleware = createEpicMiddleware({
  dependencies: {},
})

middleware.push(epicMiddleware)
middleware.push(logger)

const store = createStore(
  combineReducers(
    {
      map: mapReducer,
      regions: regionsReducer,
      graph: graphReducer,
    },
  ),
  initialState,
  applyMiddleware(...middleware),
)

// middleware je API reduceru
// run() by se melo poustet az pote co vytvorime store
epicMiddleware.run(combineEpics(
  coordinatesReqEpic,
  regionsReqEpic,
  kindergartenReqEpic,
  kindergartenGraphReqEpic,
)) // do combine epics se vkladaji ty epics

export default class App extends React.PureComponent<null> {
  render() {
    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>
    )
  }
}
