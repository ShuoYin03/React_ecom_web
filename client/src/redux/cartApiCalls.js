import { userRequest } from "../requestMethods.js";
import { updateCart } from "./cartRedux.js";

export const createC = async (cart) => {
  try {
    console.log(cart)
    await userRequest.post("/carts/", cart);
  } catch (err) {
    console.log(err)
  }
}

export const updateC = async (dispatch, data) => {
  try {
    await userRequest.put(`/carts/${data.currentUserId}`, data.cart);
    dispatch(updateCart(data.cart));
  } catch (err) {
    console.log(err)
  }
}

export const getC = async (userId) => {
  try {
    const res = await userRequest.get(`/carts/find/${userId}`);
    return res;
  } catch (err) {
    console.log(err)
  }
}