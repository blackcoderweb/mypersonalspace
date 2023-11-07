import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

export const Logout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");
    setAuth(null);
    navigate("/login");
  });

  return <></>;
};
