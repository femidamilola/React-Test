import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import ErrorPage from "../errorPage";
import { Quotes } from "../features/quotes/quote";
import { Stats } from "../features/stats/stat";
import { Users } from "../features/users/user";
import { CartItem } from "../interfaces/item";

const Root = () => (
  <>
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to={`/users`}>User</Link>
            </li>
            <li>
              <Link to={`/stats`}>Covid Stats</Link>
            </li>
            <li>
              <Link to={`/quotes`}>Quotes</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <Outlet />
  </>
);
const RootElement = () => {
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
  // {
  //   path: "/",
  //   element: <RootElement />,
  //   errorElement: <ErrorPage />,
  //   children: [
  //     {
  //       path: "cart",
  //       element: <Cart />,
  //     },
  //     {
  //       path: "items",
  //       element: <Items />,
  //     },
  //   ],
  // },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/quotes",
        element: <Quotes />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/users",
        element: <Users />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/stats",
        element: <Stats />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];
