import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartItem } from "../../interfaces/item";
import { removeFromCart, incrementItem, decrementItem } from "./actions";
import styles from "./Cart.module.css";

export default function Cart() {
  const cart = useSelector<{ cart: { cart: CartItem[] } }, CartItem[]>(
    (state) => state.cart.cart
  );
  const total = useSelector<{ cart: { total: number } }, number>(
    (state) => state.cart.total
  );
  const dispatch = useDispatch();

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <ul>
        {cart.length &&
          cart.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <span className={styles.cartItemName}>{item.name}</span>
              <span className="cart-item-price">{item.price}</span>
              <span className={styles.cartItemQuantity}>
                &nbsp;x {item.quantity}
              </span>
              <button
                className={styles.cartButton}
                onClick={() => dispatch(incrementItem(item))}
              >
                +
              </button>
              <button
                className={styles.cartButton}
                onClick={() => dispatch(decrementItem(item))}
              >
                -
              </button>
              <button
                className={styles.cartButton}
                onClick={() => dispatch(removeFromCart(item))}
              >
                Remove
              </button>
            </li>
          ))}
      </ul>
      <p>Total: {total}</p>
    </div>
  );
}
