import HomePage from "./pages/home/HomePage";
import "../public/home.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppPage from "./pages/app/AppPage";
import AuthPage from "./pages/home/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/app/*" element={<AppPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
