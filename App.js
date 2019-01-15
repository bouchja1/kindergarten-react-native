// @flow
import "rxjs"

import React from "react"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, combineReducers } from "redux"
import { createLogger } from "redux-logger"
// redux
import { reducer as moviesReducer } from "./src/redux/MoviesRedux"
import { reducer as mapReducer } from "./src/redux/MapRedux"

// containers
import Navigator from "./src/containers/Navigator"

const logger = createLogger({ collapsed: true })
const middleware = []
const initialState = {}

middleware.push(logger)

const store = createStore(
  combineReducers(
    {
      movies: moviesReducer,
      coords: mapReducer,
    },
  ),
  initialState,
  applyMiddleware(...middleware),
)

export default class App extends React.PureComponent<null> {
  render() {
    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>
    )
  }
}
