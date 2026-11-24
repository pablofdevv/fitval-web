import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { NotFoundPage } from "../components/layout/NotFoundPage";
import { LoginPage } from "../features/auth/LoginPage";
import { RegisterPage } from "../features/auth/RegisterPage";
import { ClassDetailPage } from "../features/classes/ClassDetailPage";
import { ClassesPage } from "../features/classes/ClassesPage";
import { PlansPage } from "../features/plans/PlansPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <PlansPage /> },
      { path: "classes", element: <ClassesPage /> },
      { path: "classes/:id", element: <ClassDetailPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
