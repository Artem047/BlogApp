import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Auth from "../auth/Auth";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Home from "../pages/Home";
import Collection from "../pages/Collection";
import Profile from "../pages/Profile";
import Protected from "../components/Protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Root />
      </Protected>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/collection",
        element: <Collection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
