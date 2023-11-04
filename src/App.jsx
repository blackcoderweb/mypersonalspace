import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "./pages/Authentication/Login";
import { NotFound } from "./pages/NotFound/NotFound";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { UserContext } from "./context/UserContext";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:userName" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
