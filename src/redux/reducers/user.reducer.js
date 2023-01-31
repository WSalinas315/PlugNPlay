import { combineReducers } from "redux";

const userReducer = (state = {}, { type, payload }) => {
  return {
    'SET_USER': payload,
    'UNSET_USER': {}
  }[type] || state
};

const userWishlist = (state = [], { type, payload }) => {
  return {
    'USER/SET_WISHLIST': payload,
    'USER/CLEAR_WISHLIST': []
  }[type] || state;
}

const userIgnorelist = (state = [], { type, payload }) => {
  return {
    'USER/SET_IGNORELIST': payload,
    'USER/CLEAR_IGNORELIST': []
  }[type] || state;
}

const userPlayedList = (state = [], { type, payload }) => {
  return {
    'USER/SET_PLAYED': payload,
    'USER/CLEAR_PLAYED': []
  }[type] || state;
}

export default combineReducers({
  userReducer,
  userWishlist,
  userIgnorelist,
  userPlayedList,
});
