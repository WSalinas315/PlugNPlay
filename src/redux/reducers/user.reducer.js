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
    'USER/CLEAR_WISHLIST': [],
    'UNSET_USER': []
  }[type] || state;
}

const userIgnorelist = (state = [], { type, payload }) => {
  return {
    'USER/SET_IGNORELIST': payload,
    'USER/CLEAR_IGNORELIST': [],
    'UNSET_USER': []
  }[type] || state;
}

const userPlayedList = (state = [], { type, payload }) => {
  return {
    'USER/SET_PLAYED_LIST': payload,
    'USER/CLEAR_PLAYED_LIST': [],
    'UNSET_USER': []
  }[type] || state;
}

export default combineReducers({
  userReducer,
  userWishlist,
  userIgnorelist,
  userPlayedList,
});
