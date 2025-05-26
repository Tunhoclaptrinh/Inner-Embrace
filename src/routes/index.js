// // This is a basic structure for future route organization
// // You can gradually build and add these as your project develops

// import AboutPage from "../pages/AboutPage";
// import BlogsPage from "../pages/BlogsPage";
// import BlogDetail from "../pages/BlogsPage/BlogDetail";
// import ChatPage from "../pages/ChatPage";
// import HomePage from "../pages/HomePage";
// import Login from "../pages/Login";
// import PodcastsPage from "../pages/PodcastsPage/PodcastsPage";
// import PodcastDetail from "../pages/PodcastsPage/PodcastDetail";
// import PodcastList from "../pages/PodcastsPage/PodcastList";
// import Signup from "../pages/Signup";
// import LoggedInHomePage from "../pages/LoggeIn/index";

// const routes = [
//   {
//     path: "/",
//     name: "Home",
//     header: true,
//     page: HomePage,
//   },
//   {
//     path: "/about",
//     name: "About",
//     page: AboutPage,
//     header: false,
//   },
//   {
//     path: "/blogs",
//     name: "Blogs",
//     page: BlogsPage,
//     header: false,
//   },
//   {
//     path: "/blog-detail",
//     name: "Blog Detail",
//     page: BlogDetail,
//     header: false,
//   },
//   {
//     path: "/podcast",
//     name: "Podcast",
//     page: PodcastsPage,
//     header: false,
//   },
//   {
//     path: "/podcast-detail",
//     name: "Podcast Detail",
//     page: PodcastDetail,
//     header: false,
//   },
//   {
//     path: "/podcast-list",
//     name: "Podcast List",
//     page: PodcastList,
//     header: false,
//   },
//   {
//     path: "/chat",
//     name: "Chatting",
//     page: ChatPage,
//     header: false,
//   },
//   {
//     path: "/login",
//     name: "Login",
//     page: Login,
//     header: true,
//   },
//   {
//     path: "/signup",
//     name: "Signup",
//     page: Signup,
//     header: true,
//   },
//   {
//     path: "/logged-in",
//     name: "Home Page",
//     page: LoggedInHomePage,
//     header: true,
//   },
// ];

// export default routes;
import AboutPage from "../pages/AboutPage";
import BlogsPage from "../pages/BlogsPage";
import BlogDetail from "../pages/BlogsPage/BlogDetail";
import ChatPage from "../pages/ChatPage";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import PodcastsPage from "../pages/PodcastsPage/PodcastsPage";
import PodcastDetail from "../pages/PodcastsPage/PodcastDetail";
import PodcastList from "../pages/PodcastsPage/PodcastList";
import Signup from "../pages/Signup";
import LoggedInHomePage from "../pages/LoggeIn/index";
import InnerMapPage from "../pages/ChatPage/InnerMapPage";
import ImaginaryPage from "../pages/ChatPage/ImaginaryPage";
import PortalPage from "../pages/ChatPage/PortalPage";

const routes = [
  {
    path: "/",
    name: "Home",
    header: true,
    page: HomePage,
  },
  {
    path: "/about",
    name: "About",
    page: AboutPage,
    header: false,
  },
  {
    path: "/blogs",
    name: "Blogs",
    page: BlogsPage,
    header: false,
  },
  {
    path: "/blog-detail",
    name: "Blog Detail",
    page: BlogDetail,
    header: false,
  },
  {
    path: "/podcast",
    name: "Podcast",
    page: PodcastsPage,
    header: false,
  },
  {
    path: "/podcast-detail",
    name: "Podcast Detail",
    page: PodcastDetail,
    header: false,
  },
  {
    path: "/podcast-list",
    name: "Podcast List",
    page: PodcastList,
    header: false,
  },
  {
    path: "/chat/map",
    name: "Inner Map Chat",
    page: InnerMapPage,
    header: false,
  },
  {
    path: "/chat/chat",
    name: "Inner Map Chat",
    page: ChatPage,
    header: false,
  },
  {
    path: "/chat/imaginary",
    name: "Imaginary Chat",
    page: ImaginaryPage,
    header: false,
  },
  {
    path: "/chat/portal",
    name: "Portal Chat",
    page: PortalPage,
    header: false,
  },
  {
    path: "/login",
    name: "Login",
    page: Login,
    header: true,
  },
  {
    path: "/signup",
    name: "Signup",
    page: Signup,
    header: true,
  },
  {
    path: "/logged-in",
    name: "Home Page",
    page: LoggedInHomePage,
    header: true,
  },
];

export default routes;
