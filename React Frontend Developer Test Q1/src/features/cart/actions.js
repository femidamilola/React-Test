export const addToCart = (item) => {
  return {
    type: 'ADD_TO_CART',
    item
  }
}

export const removeFromCart = (item) => {
  return {
    type: 'REMOVE_FROM_CART',
    item
  }
}

export const incrementItem = (item) => {
  return {
    type: 'INCREMENT_ITEM',
    item
  }
}

export const decrementItem = (item) => {
  return {
    type: 'DECREMENT_ITEM',
    item
  }
}
