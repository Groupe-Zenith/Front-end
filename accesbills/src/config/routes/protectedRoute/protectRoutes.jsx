import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  const userRole = sessionStorage.getItem('userRole');

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="*" replace />;
  }

  return children;
};

export default ProtectedRoute;