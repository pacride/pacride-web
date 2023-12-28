import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  rides: [],
};

const reducerFtn = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "SET_RIDES":
      return {
        ...state,
        rides: action.payload,
      };

    case "SET_MY_RIDES":
      return {
        ...state,
        myRides: action.payload,
      };

    default:
      return state;
  }
};

const store = configureStore({
  reducer: reducerFtn,
});

export default store;
