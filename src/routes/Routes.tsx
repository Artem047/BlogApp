import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Auth from "../auth/Auth";
import Login from "../auth/Login";
import Register from "../auth/Register";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [

        ],
    },
    {
        path: '/auth',
        element: <Auth />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/register',
                element: <Register />
            }
        ],
    }
])