import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRoutes";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  return (
    <>
      <CustomCursor />
      <RouterProvider router={router} />
    </>
  );
}