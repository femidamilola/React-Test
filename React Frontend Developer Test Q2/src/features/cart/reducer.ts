import { CartItem } from "../../interfaces/item";

const initialState = {
  cart: [] as CartItem[],
  total: 0,
};
type actionType =
  | "ADD_TO_CART"
  | "REMOVE_FROM_CART"
  | "INCREMENT_ITEM"
  | "DECREMENT_ITEM";
export const cartReducer = (
  state = initialState,
  action: { type: actionType; item: { id: any; name: any; price: number } }
) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = {
        id: action.item.id,
        name: action.item.name,
        price: action.item.price,
        quantity: 1,
      };

      const included = state.cart.some((e) => e.id === item.id);
      return {
        ...state,
        cart: included ? state.cart : [...state.cart, item],
        total: state.total + action.item.price,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((i) => i.id !== action.item.id),
        total: state.total - action.item.price,
      };
    case "INCREMENT_ITEM":
      const incrementedItemIndex = state.cart.findIndex(
        (i) => i.id === action.item.id
      );
      const incrementedItem = {
        ...state.cart[incrementedItemIndex],
        quantity: state.cart[incrementedItemIndex].quantity + 1,
      };
      const newIncrementCart = [
        ...state.cart.slice(0, incrementedItemIndex),
        incrementedItem,
        ...state.cart.slice(incrementedItemIndex + 1),
      ];
      return {
        ...state,
        cart: newIncrementCart,
        total: state.total + incrementedItem.price,
      };
    case "DECREMENT_ITEM":
      const decrementedItemIndex = state.cart.findIndex(
        (i) => i.id === action.item.id
      );
      const decrementedItem = {
        ...state.cart[decrementedItemIndex],
        quantity: state.cart[decrementedItemIndex].quantity - 1,
      };
      const newDecrementCart = [
        ...state.cart.slice(0, decrementedItemIndex),
        decrementedItem,
        ...state.cart.slice(decrementedItemIndex + 1),
      ];
      if (decrementedItem.quantity === 0) {
        return {
          ...state,
          cart: state.cart.filter((i) => i.id !== action.item.id),
          total: state.total - decrementedItem.price,
        };
      } else {
        return {
          ...state,
          cart: newDecrementCart,
          total: state.total - decrementedItem.price,
        };
      }

    default:
      return state;
  }
};
