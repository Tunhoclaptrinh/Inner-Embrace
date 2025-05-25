import Header from "../../components/Header";
import HeaderLogged from "../../components/Header/HeaderLoggedIn";

import Footer from "../../components/Footer";
import BodyHomePage from "./Body";

function HomePage() {
  return (
    <>
      <Header />
      <BodyHomePage />
      <Footer />
    </>
  );
}

export default HomePage;
