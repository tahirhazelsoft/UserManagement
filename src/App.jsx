import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import Welcome from "./Components/Welcome/Welcome";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import AdminLayout from "./Components/Admin/AdminLayout";
import WelcomeAdmin from "./Components/Admin/WelcomeAdmin/WelcomeAdmin";
import Users from "./Components/Admin/Users/Users";
import { Toaster } from 'react-hot-toast';
const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <WelcomeAdmin />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
