import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./pages/Login";
import LandingPage from "./pages/Landing-page";

const router = createBrowserRouter([
  {
    path : "/",
    element : <LandingPage/>
  },
  {
    path : "/login",
    element : <Login/>
  },
  {
    path : "/home",
    element : <Home/>
  },
])

export default router