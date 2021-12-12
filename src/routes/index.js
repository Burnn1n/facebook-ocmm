import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Profile from "../pages/Admin/profile";
import Pricing from "../pages/Pricing";
import Login from "../pages/Login/login";
import Register from "../pages/Login/register";
const Routes = [
  { path: "/", component: Home },
  { path: "/admin", component: Admin },
  { path: "/profile", component: Profile },
  { path: "/tulbur", component: Pricing },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

export { Routes };
