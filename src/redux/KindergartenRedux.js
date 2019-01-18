import { from } from "rxjs"
import { filter, switchMap, flatMap, catchError } from "rxjs/operators"
import { loadKindergartenRadius } from "../services/api"

export const initialState = {
  loading: false,
  error: null,
  schools: [],
}

/*
The following example shows an action creator, which is a function that creates and returns an action.
 */
export const onKindergartenRadiusRequest = (kindergartenReqObj) => ({
  type: "kindergarten/ON_KINDERGARTEN_RADIUS_REQ",
  kindergartenReqObj,
})

export const onKindergartenRadiusSuccess = (kindergartens) => ({
  type: "kindergarten/ON_KINDERGARTEN_RADIUS_SUCCESS",
  kindergartens,
})

export const onKindergartenRadiusFail = (error) => ({
  type: "kindergarten/ON_KINDERGARTEN_RADIUS_FAIL",
  error,
})

/*
A reducer is a function which decides how the action should change the state.
 It takes the current state and the action as inputs, and returns a new state
 */
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "kindergarten/ON_KINDERGARTEN_RADIUS_REQ":
      return {
        ...state,
        loading: true,
        error: null,
      }
    case "kindergarten/ON_KINDERGARTEN_RADIUS_SUCCESS": {
      console.log("ON_KINDERGARTEN_RADIUS_SUCCESS: ", action)
      return {
        ...state,
        schools: action.kindergartens.schools,
        loading: false,
      }
    }
    case "kindergarten/ON_KINDERGARTEN_RADIUS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
}

export const kindergartenRadiusReqEpic = action$ => action$.pipe(
  filter(
    (action) => action.type === "kindergarten/ON_KINDERGARTEN_RADIUS_REQ"),
  switchMap((action) => from(loadKindergartenRadius(action.kindergartenReqObj.latitude, action.kindergartenReqObj.longitude, action.kindergartenReqObj.id, action.kindergartenReqObj.radius)).pipe(
    flatMap((response) => from([onKindergartenRadiusSuccess(response.data.data)])),
    catchError((err) => from([onKindergartenRadiusFail(err)]))
  ))
)