import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import "../public/home.css";
import AppPage from "./pages/app/AppPage";
import AuthPage from "./pages/home/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import MobileLoginPage from "./pages/MobileLoginPage";

function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      if (screenWidth < 768 && location.pathname === "/") {
        navigate("/mobile-login");
      } else if (screenWidth >= 768 && location.pathname === "/mobile-login") {
        navigate("/");
      }
    };

    checkScreenSize(); // Check on initial load and location change
  }, [screenWidth, location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mobile-login" element={<MobileLoginPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/app/*" element={<AppPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
