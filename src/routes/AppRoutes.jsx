import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../layouts/MainLayout";
import Loader from "../components/Loader";

const Home = lazy(() => import("../pages/Home"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        // ✅ Catch-all: any unknown route (e.g. /home, /about, /xyz) redirects to homepage
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router;