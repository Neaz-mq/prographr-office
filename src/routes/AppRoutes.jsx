import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../layouts/MainLayout";
import Loader from "../components/Loader";

const Home      = lazy(() => import("../pages/Home"));
const About     = lazy(() => import("../pages/About"));
const Services  = lazy(() => import("../pages/Services"));
const Portfolio = lazy(() => import("../pages/Portfolio"));
const Process = lazy(() => import("../pages/Process"));
const Pricing = lazy(() => import("../pages/Pricing"));
const Contact   = lazy(() => import("../pages/Contact"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true,   element: <Suspense fallback={<Loader/>}><Home /></Suspense> },
      { path: "about",      element: <Suspense fallback={<Loader/>}><About /></Suspense> },
      { path: "services",   element: <Suspense fallback={<Loader/>}><Services /></Suspense> },
      { path: "portfolio",  element: <Suspense fallback={<Loader/>}><Portfolio /></Suspense> },
      { path: "process",  element: <Suspense fallback={<Loader/>}><Process /></Suspense> },
      { path: "pricing",  element: <Suspense fallback={<Loader/>}><Pricing /></Suspense> },
      { path: "contact",    element: <Suspense fallback={<Loader/>}><Contact /></Suspense> },
    ],
  },
]);
export default router;