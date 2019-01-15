export const initialState = {
  items: [],
  region: {
    latitude: 50.0755381,
    longitude: 14.4378005,
    latitudeDelta: 12,
    longitudeDelta: 12
  }
}

export const onGetCoordinates = coords => ({
  type: "ON_GET_COORDINATES",
  coords,
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_GET_COORDINATES":
      return {
        ...state,
        items: action.coords,
      }
    default:
      return state
  }
}