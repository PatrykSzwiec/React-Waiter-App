// Action types
const SET_LOADING = 'loading/setLoading';

// Action creators
export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

// Reducer
const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case SET_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export default loadingReducer;