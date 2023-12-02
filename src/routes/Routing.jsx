import { Routes, Route, HashRouter } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";
import { Login } from "../pages/Authentication/Login";
import { NotFound } from "../pages/NotFound/NotFound";
import PrivateLayout from "../layout/PrivateLayout";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { AuthProvider } from "../components/context/AuthProvider";
import { Logout } from "../pages/Authentication/Logout";

export const Routing = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="/dashboard" element={<PrivateLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="logout" element={<Logout/>} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};
