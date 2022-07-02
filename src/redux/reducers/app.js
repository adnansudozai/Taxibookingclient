import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  FAQs,
  GET_ARTICLES,
  GET_USERS,
  GET_ALL_PHOTOS,
} from '../actions/types';
const initialState = {
  faqs: null,
  articles: null,
  allUser: null,
  privatePhotos: null,
  PublicPhotos: null,
  cover: '',
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAQs:
      return {
        ...state,
        faqs: action.data,
      };
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.articles,
      };
    case GET_USERS:
      return {
        ...state,
        allUser: action.users,
      };
    case GET_ALL_PHOTOS:
      return {
        ...state,
        publicPhotos: action.publicPhotos,
        privatePhotos: action.privatePhotos,
        cover: action.coverPhoto,
      };
    default:
      return state;
  }
};
