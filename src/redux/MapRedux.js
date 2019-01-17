import { from } from "rxjs"
import { filter, switchMap, flatMap, catchError } from "rxjs/operators"
import {loadCoordinates, loadKindergartenDetail} from "../services/api"

export const initialState = {
  loading: false,
  items: [],
  region: {
    latitude: 50.0755381,
    longitude: 14.4378005,
    latitudeDelta: 1,
    longitudeDelta: 1,
  },
  kindergarten: {},
  error: null,
}

/*
The following example shows an action creator, which is a function that creates and returns an action.
 */
export const onKindergartenDetailRequest = (kindergartenId) => ({
  type: "kindergarten/ON_KINDERGARTEN_REQ",
  kindergartenId,
})

export const onKindergartenReqSuccess = (kindergarten) => ({
  type: "kindergarten/ON_KINDERGARTEN_SUCCESS",
  kindergarten,
})

export const onKindergartenReqFail = (error) => ({
  type: "kindergarten/ON_KINDERGARTEN_FAIL",
  error,
})

export const onCoordinatesRequest = (metadata, vusc) => ({
  type: "coordinates/ON_COORDINATES_REQ",
  metadata,
  vusc
})

export const onCoordinatesReqSuccess = (coords, regionCoords) => ({
  type: "coordinates/ON_COORDINATES_SUCCESS",
  coords,
  regionCoords,
})

export const onCoordinatesReqFail = (error) => ({
  type: "coordinates/ON_COORDINATES_FAIL",
  error,
})

/*
A reducer is a function which decides how the action should change the state.
 It takes the current state and the action as inputs, and returns a new state
 */
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "kindergarten/ON_KINDERGARTEN_REQ":
      return {
        ...state,
        loading: true,
        error: null,
      }
    case "kindergarten/ON_KINDERGARTEN_SUCCESS": {
      console.log("NOOO: ", action)
      return {
        ...state,
        kindergarten: action.kindergarten,
        loading: false,
      }
    }
    case "kindergarten/ON_KINDERGARTEN_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case "coordinates/ON_COORDINATES_REQ":
      return {
        ...state,
        loading: true,
        error: null,
      }
    case "coordinates/ON_COORDINATES_SUCCESS": {
      let items = action.coords.coordinates;
      items = items.map(item => ({
          ...item,
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
        }));
      return {
        ...state,
        items,
        region: {
          ...state.region,
          latitude: Number(action.regionCoords.lat),
          longitude: Number(action.regionCoords.long),
        },
        loading: false,
      }
    }
    case "coordinates/ON_COORDINATES_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
}

/*
An action is an object that describes what has or should happen, but it doesn’t
specify how it should be done. It has a type and may have a payload with additional data.
 */
/*
The concept of an epic is the core part of Redux-Observable.
An epic is a function that takes a stream of actions and returns a stream of actions.
All of the dispatched actions go into the action stream
 */
// action$ - dolar znaci subject (je to ale jen konvence, muze se to jmenovat jakkoliv)
export const coordinatesReqEpic = action$ => action$.pipe(
  filter(
    (action) => action.type === "coordinates/ON_COORDINATES_REQ"),
    switchMap((action) => from(loadCoordinates(action.vusc, action.metadata.nvusc)).pipe(
      // ted tady v idealnim pripade mame data, ale muze nastat i error
      flatMap((response) => from([onCoordinatesReqSuccess(response.data.data, { lat: action.metadata.regionLatitude, long: action.metadata.regionLongitude })])),
      catchError((err) => from([onCoordinatesReqFail(err)]))
    ))
)

export const kindergartenReqEpic = action$ => action$.pipe(
  filter(
    (action) => action.type === "kindergarten/ON_KINDERGARTEN_REQ"),
  switchMap((action) => from(loadKindergartenDetail(action.kindergartenId)).pipe(
    flatMap((response) => from([onKindergartenReqSuccess(response.data.data)])),
    catchError((err) => from([onKindergartenReqFail(err)]))
  ))
)