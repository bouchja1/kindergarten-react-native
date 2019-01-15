import { from } from "rxjs"
import { filter, switchMap, flatMap, catchError } from "rxjs/operators"
import {loadCoordinates, loadRegions} from "../services/api"

export const initialState = {
  loading: false,
  items: [],
  region: {
    latitude: 50.0755381,
    longitude: 14.4378005,
    latitudeDelta: 12,
    longitudeDelta: 12
  },
  error: null,
}

export const onCoordinatesRequest = () => ({
  type: "coordinates/ON_COORDINATES_REQ",
})

export const onCoordinatesReqSuccess = (movies) => ({
  type: "coordinates/ON_COORDINATES_SUCCESS",
  movies,
})

export const onCoordinatesReqFail = (error) => ({
  type: "coordinates/ON_COORDINATES_FAIL",
  error,
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "coordinates/ON_COORDINATES_REQ":
      return {
        ...state,
        loading: true,
        error: null,
      }
    case "coordinates/ON_COORDINATES_SUCCESS":
      return {
        ...state,
        items: action.coords.data.coordinates,
        loading: false,
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

// action$ - dolar znaci subject (je to ale jen konvence, muze se to jmenovat jakkoliv)
export const coordinatesReqEpic = action$ => action$.pipe(
  filter((action) => action.type === "coordinates/ON_COORDINATES_REQ"),
  switchMap(() => from(loadCoordinates()).pipe(
    // ted tady v idealnim pripade mame data, ale muze nastat i error
    flatMap((response) => from([onCoordinatesReqSuccess(response)])),
    catchError((err) => from([onCoordinatesReqFail(err)]))
  ))
)