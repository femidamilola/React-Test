import React from "react";
import itemStyles from "../../styles/item.module.css";
import { addToCart, incrementItem } from "../cart/actions";
import { fetchItems } from "../cart/cartAPI";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../../interfaces/item";

const ItemComponent = ({ item }: { item: CartItem }) => {
  const dispatch = useDispatch();

  return (
    <div className={itemStyles.item}>
      <div>
        <h4 className={itemStyles.itemHeader}>{item.name}</h4>
        <div className={itemStyles.itemBody}>
          <span className={itemStyles.itemDescription}>{item.description}</span>
          <span className={itemStyles.itemPrice}>${item.price}</span>
        </div>
      </div>
      <button
        className={itemStyles.itemButton}
        onClick={() =>
          item.included
            ? dispatch(incrementItem(item))
            : dispatch(addToCart(item))
        }
      >
        Add to Cart
      </button>
      <span>In Cart: {item.quantity}</span>
    </div>
  );
};

export const Items = () => {
  const [items, setItems] = React.useState([]);
  const cart = useSelector<{ cart: { cart: CartItem[] } }, CartItem[]>(
    (state) => state.cart.cart
  );
  const getItems = () => {
    fetchItems()
      .then((r) => r.data)
      .then((items) => {
        let it = items.map((item) => {
          const included = cart.some((e) => e.id === item.id);
          return {
            ...item,
            quantity: cart.find((e) => e.id === item.id)?.quantity || 0,
            included: !!included,
          };
        });
        return it;
      })
      .then((items) => setItems([...items]));
  };

  React.useEffect(() => {
    getItems();
  }, [cart]);
  return (
    <div style={{ marginLeft: "15px" }}>
      <h1>Items</h1>
      <div style={{ marginLeft: "30px" }}>
        {items.map((item) => (
          <ItemComponent key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
