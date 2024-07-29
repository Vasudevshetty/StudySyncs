import HomePage from "./pages/home/HomePage";
import "../public/home.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppPage from "./pages/app/AppPage";
import AuthPage from "./pages/home/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/app/*" element={<AppPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
