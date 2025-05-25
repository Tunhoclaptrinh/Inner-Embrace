import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import routes from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { ChatProvider } from "./context/ChatContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Placeholder component for not found page
const NotFound = () => {
  return (
    <>
      <Header />
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ChatProvider>
          <div className="App">
            <Routes>
              <Route path="*" element={<NotFound />} />
              {/* Routes for all other pages */}
              {routes.map((route) => {
                const Page = route.page;
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    header={route.header}
                    element={<Page header={route.header} />}
                  />
                );
              })}
            </Routes>
          </div>
        </ChatProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
