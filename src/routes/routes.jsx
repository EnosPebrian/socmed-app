import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import Profile from "../pages/Profile";
import { Register } from "../pages/Register";

class RouteClass {
  constructor(path, element) {
    this.path = path;
    this.element = element;
  }
}

export const routes = [
  new RouteClass("/login", <Login />),
  new RouteClass("/register", <Register />),
  new RouteClass("/home", <Home />),
  new RouteClass("/:username", <Profile />),
];
