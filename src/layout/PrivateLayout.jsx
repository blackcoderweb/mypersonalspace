import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  if (loading) {
    return <h1>Cargando</h1>;
  } else {
    return <>{auth ? <Outlet /> : <Navigate to="/login" />}</>;
  }
};

export default PrivateLayout;
