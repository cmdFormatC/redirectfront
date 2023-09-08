import "../index";
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Authentication from "./Authentication";
import ProtectedRouteElement from "./ProtectedRoute";
import Dashboard from "./Dashboard";
import api from "../utils/Api";

function App() {
  const [isAuth, setIsAuth] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    api.checkAuth().then((res) => {
      if (res.ok) {
        setIsAuth(true);
        navigate("/dashboard", { replace: true });
      }
    });
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRouteElement element={Dashboard} loggedIn={isAuth} />
          }
        />
        <Route path="/" element={<Authentication />} />
      </Routes>
    </div>
  );
}

export default App;
