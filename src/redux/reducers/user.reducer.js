const userReducer = (state = {}, { type, payload }) => {
  return {
    'SET_USER': payload,
    'UNSET_USER': {}
  }[type] || state
};


export default userReducer;
