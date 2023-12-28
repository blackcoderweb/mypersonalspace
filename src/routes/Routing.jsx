import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "../pages/Authentication/Login";
import { NotFound } from "../pages/NotFound/NotFound";
import PrivateLayout from "../layout/PrivateLayout";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { AuthProvider } from "../components/context/AuthProvider";
import { Logout } from "../pages/Authentication/Logout";

export const Routing = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
          <Route exact={true} path="/login" element={<Login />} />

          <Route exact={true} path="/" element={<PrivateLayout />}>
            <Route exact={true} path="/dashboard" element={<Dashboard />} />
            <Route exact={true} path="/logout" element={<Logout/>} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>        
    </AuthProvider>
  );
};
