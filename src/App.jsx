import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRoutes";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  useEffect(() => {
    // ✅ Force scroll to top on every refresh
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    // ✅ Also reset Lenis if initialized
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true })
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <RouterProvider router={router} />
    </>
  );
}