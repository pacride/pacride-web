import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  rides: [],
  myRides: [],
  bookings: [],
  requests: [],
  passengers: [],
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

    case "DELETE_REQUEST":
      return {
        ...state,
        requests: state.requests.filter((request) => {
          return request._id !== action.payload.requestId;
        }),
        myRides:
          action.payload.status === "accepted"
            ? state.myRides.map((ride) => {
                if (ride._id === action.payload.rideId) {
                  return {
                    ...ride,
                    availableSeats: ride.availableSeats - 1,
                  };
                }
                return ride;
              })
            : state.myRides,
      };

    default:
      return state;
  }
};

const store = configureStore({
  reducer: reducerFtn,
});

export default store;
