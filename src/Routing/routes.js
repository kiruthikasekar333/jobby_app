import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import Navbar from "../Components/Navbar";
import ResetPassword from "../Pages/ResetPassword";
import NotFound from "../Pages/NotFound";
import ProtectedRoute from "../Components/ProtecetdRoute";
import CreateJobs from "../Pages/Jobs/CreateJobs";
import JobListByEmployerId from "../Pages/Jobs/JobListByEmployerId";
import AllJobs from "../Pages/Jobs/AllJobs";
import { useTheme } from "../Helpers/ThemeContext";

const Layout = () => {
  const { backgroundImage } = useTheme();

  const outletStyles = {
    backgroundImage: backgroundImage,
    // backgroundSize: 'contain',  // Adjust as needed
    // backgroundPosition: 'center',  // Adjust as needed
    minHeight: '100vh',
    boxSizing: 'border-box',
    margin: "10px",
    transition: 'background-color 0.2s',
  };

  return (
    <div>
      <Navbar />
      <div style={{ ...outletStyles }}>
        <Outlet />
      </div>
    </div>
  );
};


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },

  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/getAllJobs",
        element: (
          <ProtectedRoute>
            <AllJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobListByEmployerId",
        element: (
          <ProtectedRoute>
            <JobListByEmployerId />
          </ProtectedRoute>
        ),
      },
      
      {
        path: "/createjobs",
        element: (
          <ProtectedRoute>
            <CreateJobs />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function BaseRoutes() {
  return <RouterProvider router={router} />;
}
