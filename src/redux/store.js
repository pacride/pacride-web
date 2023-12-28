import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  rides: [],
  myRides: [],
  bookings: [],
  requests: [],
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

    case "SET_BOOKINGS":
      return {
        ...state,
        bookings: action.payload,
      };

    case "UPDATE_BOOKINGS":
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
      };

    case "DELETE_BOOKING":
      return {
        ...state,
        bookings: state.bookings.filter(
          (booking) => booking.rideId !== action.payload
        ),
      };

    case "SET_REQUESTS":
      return {
        ...state,
        requests: action.payload,
      };

    default:
      return state;
  }
};

const store = configureStore({
  reducer: reducerFtn,
});

export default store;
