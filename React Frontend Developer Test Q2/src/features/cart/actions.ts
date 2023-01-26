import { CartItem } from "../../interfaces/item";

export const addToCart = (item: CartItem) => {
  return {
    type: "ADD_TO_CART",
    item,
  };
};

export const removeFromCart = (item: CartItem) => {
  return {
    type: "REMOVE_FROM_CART",
    item,
  };
};

export const incrementItem = (item: CartItem) => {
  return {
    type: "INCREMENT_ITEM",
    item,
  };
};

export const decrementItem = (item: CartItem) => {
  return {
    type: "DECREMENT_ITEM",
    item,
  };
};
