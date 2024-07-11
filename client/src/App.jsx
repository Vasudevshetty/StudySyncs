import HomePage from "./pages/home/HomePage";
import "../public/home.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppPage from "./pages/app/AppPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app/*" element={<AppPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
