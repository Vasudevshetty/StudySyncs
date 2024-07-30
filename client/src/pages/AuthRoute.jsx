// components/AuthRoute.js
import { Navigate, useLocation } from "react-router-dom";

const AuthRoute = ({ element, isAuth }) => {
  const location = useLocation();

  if (!isAuth) {
    // Redirect to login page if not authenticated
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return element;
};

export default AuthRoute;
