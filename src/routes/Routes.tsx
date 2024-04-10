import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Auth from "../auth/Auth";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import ErrorPage from "../pages/error/ErrorPage";
import Protected from "../components/Protected";
import ScrollToTop from "../components/ScrollToTop";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <ScrollToTop>
          <Root />
        </ScrollToTop>
      </Protected>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
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
