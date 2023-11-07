import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("user");
  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
};
