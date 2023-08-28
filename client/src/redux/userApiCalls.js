import { requestStart, requestSuccess, requestFailure } from "./userRedux";
import { publicRequest } from "../requestMethods.js";

export const login = async (dispatch, user) => {
  dispatch(requestStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(requestSuccess({status: true, _id: res.data._id.toString()}));
    return res.data._id.toString();
  } catch (err) {
    dispatch(requestFailure("Username or password incorrect"));
  }
};

export const logOut = async (dispatch) => {
  try {
    dispatch(logOut);
  } catch (err) {
    console.log("Error when logging out");
  }
};

export const register = async (dispatch, user) => {
  dispatch(requestStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(requestSuccess({status: null, _id: null}));
    return res;
  } catch (err) {
    dispatch(requestFailure("Error"));
  }
};