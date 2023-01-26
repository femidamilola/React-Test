import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import ErrorPage from "../errorPage";
import Cart from "../features/cart/Cart";
import { Items } from "../features/items/item";
import { CartItem } from "../interfaces/item";

export const RootElement = () => {
  const cart = useSelector<{ cart: { cart: CartItem[] } }, CartItem[]>(
    (state) => state.cart.cart
  );
  return (
    <div className="root">
      <header>
        <nav>
          <ul>
            <li>
              <Link to={`/items`}>Items</Link>
            </li>
            <li>
              <Link to={`/cart`}>Cart</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
      <div className="rootCart">
        <Link to={"/cart"}>
          <div className="cartIcon">
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            <span className="cartBadge">{cart.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export const routes = [
  {
    path: "/",
    element: <RootElement />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "items",
        element: <Items />,
      },
    ],
  },
];
