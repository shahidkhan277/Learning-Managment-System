import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import ProtectedLayout from "../layouts/ProtectedLayout";
import NotFound from "../components/NotFound";
import PublicLayout from "../layouts/PublicLayout";
import Permissions from "../pages/Permissions";
import CreatePermissions from "../components/CreatePermissions";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedLayout />, // Protect routes inside this layout
        children: [
            {
                path: "/",
                element: <Navigate to="/dashboard" />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/settings/permissions",
                element: <Permissions />,
            },
            {
                path: "/settings/permissions/create",
                element: <CreatePermissions />,
            },
        ],
    },
    {
        path: "/",
        element: <PublicLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/login" />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },

    {
        path: "*",
        element: <NotFound />, // OR Redirect to login: <Navigate to="/login" replace />
    },
]);

export default router;
