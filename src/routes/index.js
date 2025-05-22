// This is a basic structure for future route organization
// You can gradually build and add these as your project develops

import ChatPage from "../pages/ChatPage";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login/index";

const routes = [
  {
    path: "/",
    name: "Home",
    header: true,
    page: HomePage,
  },
  {
    path: "/chat",
    name: "Chatting",
    page: ChatPage,
    header: false,
  },

  {
    path: "/login",
    name: "Login",
    page: Login,
    header: true,
  },
  //
];

export default routes;
