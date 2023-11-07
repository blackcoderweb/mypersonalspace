import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    const user = localStorage.getItem("user");

    //Comprobar si tengo el nombre de usuario
    if (!user) {
      setLoading(false)
      return false;
    }

    setAuth(user);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        setLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
