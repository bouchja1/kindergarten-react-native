import { from } from "rxjs"
import { filter, switchMap, flatMap, catchError } from "rxjs/operators"
import {loadCoordinates} from "../services/api"

export const initialState = {
  loading: false,
  items: [],
  region: {
    latitude: 50.0755381,
    longitude: 14.4378005,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  },
  error: null,
}

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

export const reducer = (state = initialState, action) => {
  switch (action.type) {
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
      console.log("ITEEEMS: ", items)
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

// action$ - dolar znaci subject (je to ale jen konvence, muze se to jmenovat jakkoliv)
export const coordinatesReqEpic = action$ => action$.pipe(
  filter((action) => action.type === "coordinates/ON_COORDINATES_REQ"),
  switchMap((action) => from(loadCoordinates(action.vusc, action.metadata.nvusc)).pipe(
    // ted tady v idealnim pripade mame data, ale muze nastat i error
    flatMap((response) => from([onCoordinatesReqSuccess(response.data.data, { lat: action.metadata.regionLatitude, long: action.metadata.regionLongitude })])),
    catchError((err) => from([onCoordinatesReqFail(err)]))
  ))
)