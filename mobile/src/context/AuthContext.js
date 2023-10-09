import AsyncStorage from '@react-native-async-storage/async-storage';

import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const ACTIONS_TYPES = {
  AUTH_ERROR: 'AUTH_ERROR',
  SIGN_UP: 'SIGN_UP',
}

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS_TYPES.AUTH_ERROR:
      return { ...state, errorMessage: action.payload }

    case ACTIONS_TYPES.SIGN_UP:
      return {
        ...state,
        token: action.payload,
        errorMessage: '',
      }

    default:
      return state;
  }
}

const signUp = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signup', { email, password });

    await AsyncStorage.setItem('@token', response.data.token);

    dispatch({ type: ACTIONS_TYPES.SIGN_UP, payload: response.data.token })
  } catch (error) {
    dispatch({ type: ACTIONS_TYPES.AUTH_ERROR, payload: error.response.data })
  }
}

const signIn = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signin', { email, password });
  } catch (error) {

  }
}

const signOut = (dispatch) => async () => {
  try {

  } catch (error) {

  }
}

const initialState = {
  token: null,
  errorMessage: '',
}

export const { Context, Provider } = createDataContext(
  authReducer,
  { signUp, signIn, signOut },
  initialState,
)
