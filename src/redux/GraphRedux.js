import { from } from "rxjs"
import { filter, switchMap, flatMap, catchError } from "rxjs/operators"
import { loadKindergartenCounts } from "../services/api"

export const initialState = {
  loading: false,
  error: null,
  counts: null,
  selectedIndex: 2,
}

/*
The following example shows an action creator, which is a function that creates and returns an action.
 */
export const onKindergartenCountsRequest = (kindergartenId, radius = 3, newSelectedIndex = 2) => ({
  type: "kindergartenGraph/ON_KINDERGARTEN_GRAPH_REQ",
  kindergartenId,
  newSelectedIndex,
  radius,
})

export const onKindergartenCountsSuccess = (counts) => ({
  type: "kindergartenGraph/ON_KINDERGARTEN_GRAPH_SUCCESS",
  counts,
})

export const onKindergartenCountsFail = (error) => ({
  type: "kindergartenGraph/ON_KINDERGARTEN_GRAPH_FAIL",
  error,
})

/*
A reducer is a function which decides how the action should change the state.
 It takes the current state and the action as inputs, and returns a new state
 */
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "kindergartenGraph/ON_KINDERGARTEN_GRAPH_REQ":
      return {
        ...state,
        loading: true,
        error: null,
        selectedIndex: action.newSelectedIndex,
      }
    case "kindergartenGraph/ON_KINDERGARTEN_GRAPH_SUCCESS": {
      return {
        ...state,
        counts: action.counts,
        loading: false,
      }
    }
    case "kindergartenGraph/ON_KINDERGARTEN_GRAPH_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error,
        selectedIndex: 2,
      }
    default:
      return state
  }
}

export const kindergartenGraphReqEpic = action$ => action$.pipe(
  filter(
    (action) => action.type === "kindergartenGraph/ON_KINDERGARTEN_GRAPH_REQ"),
  switchMap((action) => from(loadKindergartenCounts(action.kindergartenId, action.radius)).pipe(
    flatMap((response) => from([onKindergartenCountsSuccess(response.data.data)])),
    catchError((err) => from([onKindergartenCountsFail(err)])),
  )),
)