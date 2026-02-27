import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
