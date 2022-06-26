import { useCookies } from "react-cookie";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginRedirect from "./pages/LoginRedirect";
import Register from "./pages/Register";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setCookie={setCookie} />} />
        <Route path="/register" element={<Register cookies={cookies} />} />
        <Route
          path="/dashboard"
          element={<Dashboard cookies={cookies} removeCookie={removeCookie} />}
        />
        <Route
          path="/connect/:providerName"
          element={<LoginRedirect setCookie={setCookie} />}
        />
      </Routes>
    </div>
  );
}

export default App;
