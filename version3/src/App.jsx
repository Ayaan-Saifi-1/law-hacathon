import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useApp } from "./context/AppContext";
import { AppShell } from "./components/layout/AppShell";
import { Login } from "./pages/Login/Login";
import { CauseList } from "./pages/CauseList/CauseList";
import { Workspace } from "./pages/Workspace/Workspace";
import { Archive } from "./pages/Archive/Archive";
import { Admin } from "./pages/Admin/Admin";

const ProtectedRoute = () => {
  const { currentUser } = useApp();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <AppShell />;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Navigate to="/causelist" replace />,
      },
      {
        path: "causelist",
        element: <CauseList />,
      },
      {
        path: "workspace",
        element: <Workspace />,
      },
      {
        path: "archive",
        element: <Archive />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/causelist" replace />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
