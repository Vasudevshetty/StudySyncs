import HomePage from "./pages/home/HomePage";
import "../public/home.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import AppPage from "./pages/app/AppPage";
import AuthPage from "./pages/home/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import MobileLoginPage from "./pages/MobileLoginPage";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && location.pathname === "/") {
        navigate("/mobile-login");
      }
    };

    handleResize(); // Check the screen size on initial load
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navigate]);

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
