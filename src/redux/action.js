export const setUser = (data) => {
  return {
    type: "SET_USER",
    payload: data,
  };
};

export const setRides = (data) => {
  return {
    type: "SET_RIDES",
    payload: data,
  };
}

export const setMyRides = (data) => {
  return {
    type: "SET_MY_RIDES",
    payload: data,
  };
}