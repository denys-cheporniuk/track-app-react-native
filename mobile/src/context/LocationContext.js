import createDataContext from "./createDataContext";

const ACTION_TYPES = {
  START_RECORDING: 'START_RECORDING',
  STOP_RECORDING: 'STOP_RECORDING',
  ADD_LOCATION: 'ADD_LOCATION',
  ADD_CURRENT_LOCATION: 'ADD_CURRENT_LOCATION',
  CHANGE_NAME: 'CHANGE_NAME',
  RESET: 'RESET'
}

const locationReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.START_RECORDING:
      return { ...state, recording: true }

    case ACTION_TYPES.STOP_RECORDING:
      return { ...state, recording: false }

    case ACTION_TYPES.ADD_LOCATION:
      return {
        ...state,
        locations: [...state.locations, action.payload],
      }

    case ACTION_TYPES.ADD_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
      }

    case ACTION_TYPES.CHANGE_NAME:
      return {
        ...state,
        name: action.payload,
      }

    case ACTION_TYPES.RESET:
      return {
        ...state,
        name: '',
        locations: [],
      }

    default:
      return state
  }
}

const changeName = (dispatch) => (name) => {
  dispatch({ type: ACTION_TYPES.CHANGE_NAME , payload: name });
}

const startRecording = (dispatch) => () => {
  dispatch({ type: ACTION_TYPES.START_RECORDING });
}

const stopRecording = (dispatch) => () => {
  dispatch({ type: ACTION_TYPES.STOP_RECORDING });
}

const addLocation = (dispatch) => (location, recording) => {
  dispatch({type: ACTION_TYPES.ADD_CURRENT_LOCATION, payload: location});

  if (recording) {
    dispatch({type: ACTION_TYPES.ADD_LOCATION, payload: location});
  }
}

const reset = (dispatch) => () => {
  dispatch({ type: ACTION_TYPES.RESET })
}

const initialState = {
  name: '',
  recording: false,
  locations: [],
  currentLocation: null,
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { changeName, startRecording, stopRecording, addLocation, reset },
  initialState,
)
