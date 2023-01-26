import React from "react";
import Cart from "./features/cart/Cart";
import "./App.css";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./errorPage";
import { Items } from "./features/items/item";
import { useSelector } from "react-redux";

const Root = () => {
  const cart = useSelector((state) => state.cart.cart);
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
]);

function App() {
  return (
    <>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </>
  );
}

export default App;
