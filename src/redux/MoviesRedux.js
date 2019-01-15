export const initialState = {
  items: [],
}

export const onGetMovies = movies => ({
  type: "ON_GET_MOVIES",
  movies,
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_GET_MOVIES":
      return {
        ...state,
        items: action.movies,
      }
    default:
      return state
  }
}
