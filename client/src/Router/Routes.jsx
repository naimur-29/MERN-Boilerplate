import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Todo from "../pages/Todo";
import Error from "../pages/Error";
import RootPage from "./RootPage";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const PageRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/todo",
        element: <Todo />,
      },
    ],
  },

  {
    path: "/*",
    element: <Error />,
  },
]);
