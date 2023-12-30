export const setUser = (data) => {
  return {
    type: "SET_USER",
    payload: data,
  };
};

export const updateUser = (data) => {
  return {
    type: "UPDATE_USER",
    payload: data,
  };
};

export const setRides = (data) => {
  return {
    type: "SET_RIDES",
    payload: data,
  };
};

export const setMyRides = (data) => {
  return {
    type: "SET_MY_RIDES",
    payload: data,
  };
};

export const updateMyRides = (data) => {
  return {
    type: "UPDATE_MY_RIDES",
    payload: data,
  };
};

export const setBookings = (data) => {
  return {
    type: "SET_BOOKINGS",
    payload: data,
  };
};

export const updateBookings = (data) => {
  return {
    type: "UPDATE_BOOKINGS",
    payload: data,
  };
};

export const deleteBooking = (data) => {
  return {
    type: "DELETE_BOOKING",
    payload: data,
  };
};

export const setRequests = (data) => {
  return {
    type: "SET_REQUESTS",
    payload: data,
  };
};

export const deleteRequest = (
  requestId,
  status = "rejected",
  rideId,
  data = {}
) => {
  return {
    type: "DELETE_REQUEST",
    payload: { requestId, status, rideId, data },
  };
};

export const updateRide = (data) => {
  return {
    type: "UPDATE_RIDE",
    payload: data,
  };
};
