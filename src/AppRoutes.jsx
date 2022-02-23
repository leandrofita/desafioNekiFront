import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import HomePage from "./pages/homePage/HomePage";
import RegisterPage from "./pages/cadastro/RegisterPage";
import { AuthProvider, AuthContext } from "./contexts/auth";
import { useContext } from "react";

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authendicated } = useContext(AuthContext);

    if (!authendicated) {
      return <Navigate to={"/login"} />;
    }
    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<LoginPage/>} />
          <Route exact path="/cadastro" element={< RegisterPage/>} />
          <Route
            exact
            path="/"
            element={
              <Private>
                <HomePage />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
