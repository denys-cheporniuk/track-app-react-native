import AsyncStorage from '@react-native-async-storage/async-storage';

import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const ACTIONS_TYPES = {
  AUTH_ERROR: 'AUTH_ERROR',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  CLEAR_MESSAGE: 'CLEAR_MESSAGE',
  STOP_LOADING: 'STOP_LOADING',
}

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS_TYPES.AUTH_ERROR:
      return { ...state, errorMessage: action.payload }

    case ACTIONS_TYPES.SIGN_IN:
      return {
        ...state,
        token: action.payload,
        errorMessage: '',
        isLoading: false,
      }

    case ACTIONS_TYPES.SIGN_OUT:
      return {
        ...state,
        token: null,
        errorMessage: '',
      }

    case ACTIONS_TYPES.STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      }

    case ACTIONS_TYPES.CLEAR_MESSAGE:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
}

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('@token');

  if (token) {
    dispatch({ type: ACTIONS_TYPES.SIGN_IN, payload: token })
  } else {
    dispatch({ type: ACTIONS_TYPES.STOP_LOADING })
  }
}

const signUp = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signup', { email, password });

    await AsyncStorage.setItem('@token', response.data.token);

    dispatch({ type: ACTIONS_TYPES.SIGN_IN, payload: response.data.token })
  } catch (error) {
    dispatch({ type: ACTIONS_TYPES.AUTH_ERROR, payload: error.message })
  }
}

const signIn = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signin', { email, password });

    await AsyncStorage.setItem('@token', response.data.token);

    dispatch({ type: ACTIONS_TYPES.SIGN_IN, payload: response.data.token })
  } catch (error) {
    dispatch({ type: ACTIONS_TYPES.AUTH_ERROR, payload: error.message })
  }
}

const signOut = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem('@token');

    dispatch({ type: ACTIONS_TYPES.SIGN_OUT })
  } catch (error) {
    console.log(error);
  }
}

const clearError = (dispatch) => async () => (
  dispatch({ type: ACTIONS_TYPES.CLEAR_MESSAGE, payload: '' })
)

const initialState = {
  token: null,
  errorMessage: '',
  isLoading: true,
}

export const { Context, Provider } = createDataContext(
  authReducer,
  { tryLocalSignIn, signUp, signIn, signOut, clearError },
  initialState,
)
