import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Pricing from "../pages/Pricing";
import Login from "../pages/Login/login";
import Register from "../pages/Login/register";
const Routes = [
  { path: "/", component: Home },
  { path: "/admin", component: Admin },
  { path: "/tulbur", component: Pricing },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

export { Routes };
