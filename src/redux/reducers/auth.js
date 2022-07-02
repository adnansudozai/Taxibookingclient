import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  PROFILE_INFO,
  TRANSLATION,
} from "../actions/types";
const initialState = {
  token: null,
  user: null,
  isLoggedIn: false,
  translation: null,
  selectedLanguages: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: action.isLoggedIn,
        token: action.token,
      };
    case LOGOUT_USER:
      return {
        ...state,
        token: "",
        isLoggedIn: false,
        user: null,
      };
    case TRANSLATION:
      return {
        ...state,
        translation: action.translation,
        selectedLanguages: action.selectedLanguages,
      };
    case PROFILE_INFO:
      return {
        ...state,
        user: action.user,
        isLoggedIn: action.isLoggedIn,
      };
    default:
      return state;
  }
};
