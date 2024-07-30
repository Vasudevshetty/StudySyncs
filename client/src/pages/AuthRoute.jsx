// components/AuthRoute.js
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthRoute = ({ element }) => {
  const { isAuth, userData } = useAuth();
  const location = useLocation();

  if (!isAuth && userData.name !== "Guest") {
    // Redirect to login page if not authenticated
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return element;
};

export default AuthRoute;
