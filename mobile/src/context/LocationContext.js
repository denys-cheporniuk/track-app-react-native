import createDataContext from "./createDataContext";

const ACTION_TYPES = {
  START_RECORDING: 'START_RECORDING',
  STOP_RECORDING: 'STOP_RECORDING',
  ADD_LOCATION: 'ADD_LOCATION',
}

const locationReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.START_RECORDING:
      return state

    case ACTION_TYPES.STOP_RECORDING:
      return state

    case ACTION_TYPES.ADD_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
      }

    default:
      return state
  }
}

const startRecording = (dispatch) => () => {
  dispatch({ type: ACTION_TYPES.START_RECORDING , payload: {}});
}

const stopRecording = (dispatch) => () => {
  dispatch({ type: ACTION_TYPES.STOP_RECORDING , payload: {}});
}

const addLocation = (dispatch) => (location) => {
  dispatch({ type: ACTION_TYPES.ADD_LOCATION , payload: location});
}

const initialState = {
  recording: false,
  locations: [],
  currentLocation: null,
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation },
  initialState,
)
