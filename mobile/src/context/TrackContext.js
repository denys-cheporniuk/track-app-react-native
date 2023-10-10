import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const ACTION_TYPES = {
  GET_TRACKS: 'GET_TRACKS',
  ADD_TRACK: 'ADD_TRACK',
}

const trackReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_TRACKS:
      return action.payload;

    default:
      return state
  }
}

const getTracks = (dispatch) => async () => {
  const response = await trackerApi.get('/tracks');

  dispatch({ type: ACTION_TYPES.GET_TRACKS, payload: response.data });
}

const createTrack = (dispatch) => async (name, locations) => {
  await trackerApi.post('/tracks', { name, locations });
}

const initialState = {

};

export const { Context, Provider } = createDataContext(
  trackReducer,
  { getTracks, createTrack },
  initialState,
)
