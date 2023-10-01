import { Redirect } from "../components/Redirect";
import { Forgot_password } from "../pages/ForgotPasswordSubmission";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Message } from "../pages/Message";
import { MessageRoom } from "../pages/MessageRoom";
import { Profile } from "../pages/Profile";
import { Register } from "../pages/Register";
import { ResetPassword } from "../pages/ResetPassword";
import { SearchPage } from "../pages/SearchPage";
import { Verify } from "../pages/Verify";

class RouteClass {
  constructor(path, element) {
    this.path = path;
    this.element = element;
  }
}

export const routes = [
  new RouteClass(`/`, <Redirect />),
  new RouteClass("/login", <Login />),
  new RouteClass("/register", <Register />),
  new RouteClass("/home", <Home />),
  new RouteClass("/search_page", <SearchPage />),
  new RouteClass("/verify/:user_id/:token", <Verify />),
  new RouteClass("/reset_password/:token", <ResetPassword />),
  new RouteClass("/forgot_password", <Forgot_password />),
  new RouteClass("/message_room", <MessageRoom />),
  new RouteClass("/message/:username", <Message />),
  new RouteClass("/:username", <Profile />),
];
